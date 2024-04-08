import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import ig from '../images/man-vai-tron-can-nang-dep.jpg'; // Placeholder image, replace with actual product images.
import './Product.css';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import { API_KEY } from '../utils/createAxios';
import axios from 'axios';

function Product() {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [brand, setBrand] = useState([]);
    const [top, setTop] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const handleSearch = () => {
        let url;
        if (!searchQuery) {
            url = `${API_KEY}/product`;
        } else {
            url = `${API_KEY}/product/name?name=${searchQuery}`;
        }
    
        axios.get(url)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error searching:', error);
            });
    };
    
    useEffect(() => {
        axios
            .get(
                selectedBrand === null ?
                    `${API_KEY}/product` : `${API_KEY}/product/brandId?id=${selectedBrand}`
            )
            .then(res => setData(res?.data))
            .catch(err => {
                console.log(err?.message);
            });
        axios
            .get(
                `${API_KEY}/brand`
            )
            .then(res => setBrand(res?.data))
            .catch(err => {
                console.log(err?.message);
            });
        axios
            .get(
                `${API_KEY}/product/top3`
            )
            .then(res => setTop(res?.data))
            .catch(err => {
                console.log(err?.message);
            });
    }, [selectedBrand]);
    const handleBrandClick = (brandId) => {
        setSelectedBrand(brandId);
    };
    const productsPerPage = 8;
    const totalPages = Math.ceil(data.length / productsPerPage);
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = Math.min(startIndex + productsPerPage, data.length);

    // Danh sách sản phẩm trên trang hiện tại
    const currentProducts = data.slice(startIndex, endIndex);

    // Handler cho nút Trang trước
    const goToPreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    // Handler cho nút Trang sau
    const goToNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    return (
        <div className="product-list-container">
            <div className="product-left">
                <h5>Showing {startIndex + 1}–{endIndex} of {data.length} results</h5>
                <div className="product-container">
                    {currentProducts.map((product, index) => (
                        <ProductItem key={index} {...product} />
                    ))}
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    goToPreviousPage={goToPreviousPage}
                    goToNextPage={goToNextPage}
                />
            </div>
            <div className="product-list-right">
                <div className="input-group">
                    <div className="form-outline">
                        <input
                            name="txt"
                            type="text"
                            className="form-control"
                            placeholder="Search"
                            style={{ height: '30px' }}
                            value={searchQuery}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={handleSearch}>
                        <i className="fas fa-search"></i>
                    </button>
                </div>
                <div className="product-categories">
                    <h1>PRODUCT CATEGORIES</h1>
                    <ul className="list-group">
                        <li className={`list-group-item text-white`} >
                            <Link onClick={() => handleBrandClick(null)}>Fill All</Link>
                        </li>
                        {brand.map((item) => (
                            <li className={`list-group-item text-white`} key={item.brandId} >
                                <Link onClick={() => handleBrandClick(item.brandId)}>{item.brandName}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="product">
                    <h1>NEW PRODUCT</h1>
                    <div className="products-1">
                        {top.map((item) => (
                            <Link to={`/productdetal/${item.productId}`} key={item.productId} style={{ textDecoration: 'none', color: 'black' }}>
                                <div className="product-img" style={{ display: 'flex', paddingTop: '15px' }}>
                                    <img src={item.pImg} alt="" />
                                    <div className="product-content" style={{ paddingLeft: '10px' }}>
                                        <h4>{item.productName}</h4>
                                        <div>
                                            <i className="far fa-star"></i>
                                            <i className="far fa-star"></i>
                                            <i className="far fa-star"></i>
                                            <i className="far fa-star"></i>
                                            <i className="far fa-star"></i>
                                        </div>
                                        <h5>{item.quantity} VNĐ</h5>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;

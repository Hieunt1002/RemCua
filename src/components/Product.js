import React, { useState } from 'react';
import ProductItem from './ProductItem';
import ig from '../images/man-vai-tron-can-nang-dep.jpg'; // Placeholder image, replace with actual product images.
import './Product.css';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';

function Product() {
    const products = [
        { src: ig, price: '100.000VNĐ', productName: 'Rèm chóng nắng 1', beautyRating: 4 },
        { src: ig, price: '100.000VNĐ', productName: 'Rèm chóng nắng 2', beautyRating: 5 },
        { src: ig, price: '100.000VNĐ', productName: 'Rèm chóng nắng 3', beautyRating: 3 },
        { src: ig, price: '100.000VNĐ', productName: 'Rèm chóng nắng 4', beautyRating: 4 },
        { src: ig, price: '100.000VNĐ', productName: 'Rèm chóng nắng 4', beautyRating: 4 },
        // Add more product items
    ];
    const productsPerPage = 4;
    const totalPages = Math.ceil(products.length / productsPerPage);
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = Math.min(startIndex + productsPerPage, products.length);

    // Danh sách sản phẩm trên trang hiện tại
    const currentProducts = products.slice(startIndex, endIndex);

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
                <h5>Showing {startIndex + 1}–{endIndex} of {products.length} results</h5>
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
                        <input name="txt" type="text" id="idSearch" className="form-control" placeholder="search" />
                    </div>
                    <button className="btn btn-primary">
                        <i className="fas fa-search"></i>
                    </button>
                </div>
                <div className="product-categories">
                    <h1>PRODUCT CATEGORIES</h1>
                    <ul className="list-group">
                        <li className="list-group-item text-white"><Link to="/">a</Link></li>
                        <li className="list-group-item text-white"><Link to="/">a</Link></li>
                        <li className="list-group-item text-white"><Link to="/">a</Link></li>
                    </ul>
                </div>
                <div className="product">
                    <h1>NEW PRODUCT</h1>
                    <div className="products-1">
                        <Link to="productDetail.html?id=${data.productId}">
                            <div className="product-img" >
                                <img src={ig} alt=""/>
                            </div>
                            <div className="product-content">
                                <h4>ab</h4>
                                <div>
                                    <i className="far fa-star"></i>
                                    <i className="far fa-star"></i>
                                    <i className="far fa-star"></i>
                                    <i className="far fa-star"></i>
                                    <i className="far fa-star"></i>
                                </div>
                                <h5>100VNĐ</h5>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;

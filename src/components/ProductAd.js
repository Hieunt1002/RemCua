import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_KEY } from '../utils/createAxios';
import Pagination from './Pagination';
import ModalPage from './ModalPage';

function ProductAd() {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [brand, setBrand] = useState([]);
    const [top, setTop] = useState(0);
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

    }, [selectedBrand,]);
    const handleBrandClick = (brandId) => {
        setSelectedBrand(brandId);
    };
    const productsPerPage = 5;
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
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '60%',
        },
    };

    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function openModalUpdate(id) {
        setIsOpen(true);
        setTop(id);
    }
    function closeModal() {
        setIsOpen(false);
    }
    return (
        <>
            <div style={{ display: 'flex', width: '100%', height: '800px' }}>
                <div style={{ width: '80%' }}>
                    <div style={{ paddingTop: '30px', paddingBottom: '20px' }}>
                        <h1>SẢN PHẨM</h1>
                    </div>
                    <div style={{ marginLeft: '90%', paddingBottom: '20px' }}>
                        <button onClick={openModal} >Thêm sản phẩm</button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ paddingLeft: '100px' }}>ID</th>
                                    <th style={{ paddingLeft: '100px' }}>Name</th>
                                    <th style={{ paddingLeft: '100px' }}>Image</th>
                                    <th style={{ paddingLeft: '100px' }}>Quantity</th>
                                    <th style={{ paddingLeft: '100px' }}>Price</th>
                                    <th style={{ paddingLeft: '100px' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentProducts.map((item) => (
                                    <tr key={item.productId}>
                                        <td style={{ paddingLeft: '100px' }}>{item.productId}</td>
                                        <td style={{ paddingLeft: '100px', textAlign: 'center' }}>{item.productName}</td>
                                        <td style={{ paddingLeft: '100px', textAlign: 'center' }}>
                                            <img src={item.pImg} alt="" style={{ height: '100px', width: '100px', borderRadius: '50%' }} />
                                        </td>
                                        <td style={{ paddingLeft: '100px', textAlign: 'center' }}>{item.quantity}</td>
                                        <td style={{ paddingLeft: '100px', textAlign: 'center' }}>{item.price}</td>
                                        <td style={{ paddingLeft: '100px', textAlign: 'center' }}>
                                            <button onClick={() => openModalUpdate(item.productId)}>Edit</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div style={{ position: 'absolute', bottom: '10px', width: '100%', textAlign: 'center' }}>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            goToPreviousPage={goToPreviousPage}
                            goToNextPage={goToNextPage}
                        />
                    </div>
                </div>
                <div style={{ paddingTop: '30px', backgroundColor: 'whitesmoke', width: '20%' }}>
                    <div className="input-group" style={{ marginLeft: '30px' }}>
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
                        <button style={{ marginRight: '40px' }} className="btn btn-primary" onClick={handleSearch}>
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                    <h1>LOẠI SẢN PHẨM</h1>
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
            </div>
            <ModalPage
                modalIsOpen={modalIsOpen}
                closeModal={closeModal}
                customStyles={customStyles}
                brand={brand}
                id={top}
            />
        </>
    )
}

export default ProductAd

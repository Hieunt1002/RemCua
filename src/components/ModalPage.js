import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { API_KEY } from '../utils/createAxios';

function ModalPage({
    modalIsOpen,
    closeModal,
    customStyles,
    brand,
    id
}) {
    const [product, setUproduct] = useState('');
    let subtitle;
    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }
    useEffect(() => {
        if (id !== 0) {
            axios
                .get(
                    `${API_KEY}/product/productId?id=${id}`
                )
                .then(res => setUproduct(res?.data))
                .catch(err => {
                    console.log(err?.message);
                });
        }
    }, [id]);
    const handleAdd = async () => {
        try {
            validateUserDataForAdd(pImg, name, descrip, brandid, price, quantity);
    
            const userData = {
                pImg: pImg,
                productName: name,
                productDescription: descrip,
                brandId: brandid,
                price: price,
                quantity: quantity,
            };
            await axios.post(`${API_KEY}/product`, userData);
            alert("Product added successfully");
            closeModal();
        } catch (error) {
            console.error("Error occurred while adding product:", error);
            alert("An error occurred while adding product. Please try again later.");
        }
    };
    
    const handleUpdate = async () => {
        try {
            validateUserDataForUpdate(id, product);
    
            const userData = {
                productId: id,
                pImg: product.pImg,
                productName: product.productName,
                productDescription: product.productDescription,
                brandId: product.brandId,
                price: product.price,
                quantity: product.quantity,
            };
            await axios.put(`${API_KEY}/product`, userData);
            alert("Product updated successfully");
            closeModal();
        } catch (error) {
            console.error("Error occurred while updating product:", error);
            alert("An error occurred while updating product. Please try again later.");
        }
    };
    
    const validateUserDataForAdd = (pImg, name, descrip, brandid, price, quantity) => {
        if (!pImg || !name || !descrip || !brandid || !price || !quantity) {
            throw new Error("Missing required fields for adding product");
        }
    };
    
    const validateUserDataForUpdate = (id, product) => {
        if (!id || !product) {
            throw new Error("Missing required fields for updating product");
        }
    };
    const [name, setName] = useState('');
    const [pImg, setPimg] = useState('');
    const [descrip, setDescrip] = useState('');
    const [brandid, setBrandid] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{ textAlign: 'center' }}>Thêm sản phẩm</h2>
                <button onClick={closeModal} style={{ marginLeft: '90%', backgroundColor: 'red' }}>close</button>
                <img style={{ width: '100px', height: '100px', borderRadius: '50%', marginLeft: '46%' }} src={product.pImg || pImg || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlSDpa6YCAfldMj623uws_Sx9MlzKcOsnZuIb1jBgCdPzC8rJ7j-vX4o8aBiT3caKlQe8&usqp=CAU'} />
                <div style={{ justifyContent: 'center', display: 'flex' }}>
                    <div style={{ paddingRight: '40px' }}>
                        <div>
                            <p>Tên sản phẩm</p>
                            <input value={product.productName || name} onChange={product.productName
                                ? (e) => setUproduct({ ...product, productName: e.target.value })
                                : (e) => setName(e.target.value)} type='text' style={{ width: '400px', height: '30px' }} />
                        </div>
                        <div>
                            <p>Link Hình ảnh</p>
                            <input value={product.pImg || pImg}
                                onChange={product.pImg
                                    ? (e) => setUproduct({ ...product, pImg: e.target.value })
                                    : (e) => setPimg(e.target.value)}
                                type='text' style={{ width: '400px', height: '30px' }} />
                        </div>
                        <div>
                            <p>Mô tả</p>
                            <textarea value={product.productDescription || descrip}
                                onChange={product.productDescription
                                    ? (e) => setUproduct({ ...product, productDescription: e.target.value })
                                    : (e) => setDescrip(e.target.value)}
                                style={{ width: '400px', height: '50px' }} />
                        </div>
                    </div>
                    <div style={{ paddingLeft: '40px' }}>
                        <div>
                            <p>Nhãn hiệu</p>
                            <select
                                value={product.brandId || brandid}
                                style={{ width: '400px', height: '30px' }}
                                onChange={(e) => {
                                    if (product.brandId) {
                                        setUproduct({ ...product, brandId: e.target.value });
                                    } else {
                                        setBrandid(e.target.value);
                                    }
                                }}
                            >
                                {brand.map((b) => (
                                    <option key={b.brandId} value={b.brandId}>
                                        {b.brandName}
                                    </option>
                                ))}
                            </select>

                        </div>

                        <div>
                            <p>Giá</p>
                            <input value={product.price || price}
                                onChange={product.price
                                    ? (e) => setUproduct({ ...product, price: e.target.value })
                                    : (e) => setPrice(e.target.value)}
                                type='number' style={{ width: '400px', height: '30px' }} />
                        </div>
                        <div>
                            <p>Số lượng</p>
                            <input value={product.quantity || quantity}
                                onChange={product.quantity
                                    ? (e) => setUproduct({ ...product, quantity: e.target.value })
                                    : (e) => setQuantity(e.target.value)}
                                type='number' style={{ width: '400px', height: '30px' }} />
                        </div>
                    </div>
                </div>
                {id === 0 ?
                    <button
                        style={{
                            marginLeft: '49%',
                            height: '40px',
                            width: '70px',
                            backgroundColor: 'greenyellow',
                            fontSize: '18px'
                        }} onClick={handleAdd}>
                        Thêm
                    </button> :
                    <button
                        style={{
                            marginLeft: '49%',
                            height: '40px',
                            width: '70px',
                            backgroundColor: 'greenyellow',
                            fontSize: '18px'
                        }} onClick={handleUpdate}>
                        Update
                    </button>
                }
            </Modal>
        </>
    )
}

export default ModalPage

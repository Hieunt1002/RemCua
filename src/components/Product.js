import React from 'react';
import ProductItem from './ProductItem';
import ig from '../images/man-vai-tron-can-nang-dep.jpg';

function Product() {
    return (
        <div className="product-list container mx-auto">
            <h5 className="text-center my-4">Showing 1–9 of 20 results</h5>
            <div className="flex flex-wrap justify-between">
                <div className="w-full md:w-1/2 lg:w-1/4 p-2">
                    <ProductItem
                        src={ig}
                        price="100.000VNĐ"
                        productName="Rèm chóng nắng"
                        url="/products"
                        path="/products"
                    />
                    <ProductItem
                        src={ig}
                        price="100.000VNĐ"
                        productName="Rèm chóng nắng"
                        url="/products"
                        path="/products"
                    />
                    <ProductItem
                        src={ig}
                        price="100.000VNĐ"
                        productName="Rèm chóng nắng"
                        url="/products"
                        path="/products"
                    />
                    <ProductItem
                        src={ig}
                        price="100.000VNĐ"
                        productName="Rèm chóng nắng"
                        url="/products"
                        path="/products"
                    />
                </div>
            </div>
        </div>
    );
}

export default Product;

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';

function ProductItem(props) {
    return (
        <>
            <Link to={props.path} className="block relative">
                <img src={props.src} alt="rem cua" className="max-w-full h-auto" />
                <div className="absolute bottom-0 bg-white w-full p-4">
                    <h5 className="text-center">${props.price}</h5>
                    <div className="flex justify-center mb-2">
                        {[...Array(5)].map((_, index) => (
                            <i key={index} className="far fa-star"></i>
                        ))}
                    </div>
                    <h4 className="text-center">{props.productName}</h4>
                </div>
            </Link>
            <div className="flex justify-center mt-2">
                <Button
                    className='btns'
                    buttonStyle='btn--outline'
                    buttonSize='btn--large'>
                    <Link to={props.url}>ADD TO CART</Link>
                </Button>
            </div>
        </>
    );
}

export default ProductItem;

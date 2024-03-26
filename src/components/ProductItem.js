// ProductItem.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';

function ProductItem(props) {
    return (
        <div className="product-item">
            <Link to={props.path}>
                <img src={props.src} alt="rem cua" />
                <div className="product-text">
                    <h5>{props.price}</h5>
                    <div>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                    </div>
                    <h4>{props.productName}</h4>
                </div>
            </Link>
            <div className="product-button-wrapper">
                <Button>
                    <Link to={props.url}>ADD TO CART</Link>
                </Button>
            </div>
        </div>
    );
}

export default ProductItem;

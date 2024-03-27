import React from 'react'
import CardItem from './CardItem';
import './Cards.css';
import ig from '../images/man-vai-tron-can-nang-dep.jpg';
import ig1 from '../images/13-rem-cua-5.jpg';
import ig2 from '../images/rem-so-co-dien-phong-khach(3).jpg';
import ig3 from '../images/rem-cua-cao-cap-tai-quang-ninh-1.jpg';
import ig4 from '../images/cac-mau-rem-cua-phong-khach-dep-2.jpg.webp';

function Cards() {
    return (
        <div className='cards'>
            <h1>Kiểm tra các những sản phẩm này!</h1>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <ul className='cards__items'>
                        <CardItem src={ig}
                            text='Khám phá và trải nghiệm rèm cửa từ Rèm cửa như ý'
                            label='Luxury'
                            path='/products' />
                        <CardItem src={ig1}
                            text='Khám phá và trải nghiệm rèm cửa từ Rèm cửa như ý'
                            label='Luxury'
                            path='/products' />
                    </ul>
                    <ul className='cards__items'>
                        <CardItem src={ig2}
                            text='Khám phá và trải nghiệm rèm cửa từ Rèm cửa như ý'
                            label='Adventure'
                            path='/products' />
                        <CardItem src={ig3}
                            text='Khám phá và trải nghiệm rèm cửa từ Rèm cửa như ý'
                            label='Luxury'
                            path='/products' />
                        <CardItem src={ig4}
                            text='Khám phá và trải nghiệm rèm cửa từ Rèm cửa như ý'
                            label='Luxury'
                            path='/products' />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Cards

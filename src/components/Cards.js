import React from 'react'
import CardItem from './CardItem';
import './Cards.css';
import ig from '../images/img-9.jpg';
import ig1 from '../images/img-2.jpg';
import ig2 from '../images/img-3.jpg';
import ig3 from '../images/img-4.jpg';
import ig4 from '../images/img-8.jpg';

function Cards() {
    return (
        <div className='cards'>
            <h1>Check out these EPIC Destinations!</h1>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <ul className='cards__items'>
                        <CardItem src={ig}
                            text='Explore the hidden waterfall deep inside the Amazon Jungle'
                            label='Adventure'
                            path='/services' />
                        <CardItem src={ig1}
                            text='Travel through the Islands of Bali in a Private Cruise'
                            label='Luxury'
                            path='/services' />
                    </ul>
                    <ul className='cards__items'>
                        <CardItem src={ig2}
                            text='Explore the hidden waterfall deep inside the Amazon Jungle'
                            label='Adventure'
                            path='/services' />
                        <CardItem src={ig3}
                            text='Travel through the Islands of Bali in a Private Cruise'
                            label='Luxury'
                            path='/services' />
                        <CardItem src={ig4}
                            text='Travel through the Islands of Bali in a Private Cruise'
                            label='Luxury'
                            path='/services' />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Cards

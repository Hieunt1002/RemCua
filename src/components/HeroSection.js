import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import vd from '../videos/video-3.mp4';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src={vd} autoPlay loop muted />
      <h1>RÈM CỬA NHƯ Ý</h1>
      <p>Bạn còn chờ gì nữa?</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          BẮT ĐẦU
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
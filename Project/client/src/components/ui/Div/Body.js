import './Body.css'
import React from 'react'
import FlashMessage from '../FlashMessage/FlashMessage';

export default function Body({ children }) {
  return (
    <div>
      <div className='horizontal'>
        <div className="Content">
          <FlashMessage />
          {children}
        </div>
      </div>
    </div>
  );
}
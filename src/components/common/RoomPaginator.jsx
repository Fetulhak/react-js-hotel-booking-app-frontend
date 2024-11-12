import React from 'react'

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const RoomPaginator = ({currentPage, totalPages, onPageChange}) => {

  const pageNumbers = Array.from({length:totalPages}, (_, i) => i+1)
  return (
    <nav>
      <ul className='pagination justify-content-center'>
        {pageNumbers.map((pagenumber) =>(

          <li key={pagenumber} 
          className={`page-item ${currentPage === pagenumber ? "active" : ""} `}> 
          
          <button className='page-link' onClick={()=> onPageChange(pagenumber)}>
            {pagenumber}
          </button>
          </li>

        ))}


      </ul>
      
    </nav>
  )
}

export default RoomPaginator

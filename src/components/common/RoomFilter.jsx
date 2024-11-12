import React, { useState } from 'react'

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';
import {Link} from "react-router-dom"

import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const RoomFilter = ({data,setFilteredData}) => {
  const [filter,setFilter] = useState("")

  const handleSelectChange = (e) => {
    const selectedRoomType = e.target.value
    setFilter(selectedRoomType)
    const filteredRooms = data.filter((room) => room.roomType.toLowerCase().includes(selectedRoomType.toLowerCase()))
    setFilteredData(filteredRooms)

  }

  const clearFilter = () => {
    setFilter("")
    setFilteredData(data)
  }

  const roomTypes = ["",...new Set(data.map((room) => room.roomType))]


  return (
    
    <div className='input-group mb-3'>
      <span className='input-group-text ' id='room-type-filter'>
        Filter Rooms By Type
      </span>
      <select className='form-select' value={filter} onChange={handleSelectChange}>
        <option value={""}>Select A Room Type To Filter</option>
        {
          roomTypes.map((type,index) =>(
            <option key={index} value={type}>{type}</option>
          ) )
        }


      </select>
      <button className="btn btn-hotel" type='button' onClick={clearFilter}>Clear Filter</button>
     
      
    </div>

    

      




  )
}

export default RoomFilter

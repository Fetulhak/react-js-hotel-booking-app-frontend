import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import Header from './Header'
import { FaClock, FaCocktail, FaTshirt, FaUtensils, FaWifi } from 'react-icons/fa'

const HotelServices = () => {
  return (
    <>
    <Container className='mb-2 '>
      <Header title={"our services"}/>
      <Row>
        <h4 className='text-center '>

          Services at <span className='hotel-color'> our Hotel</span>
          <span className='gap-2'>
            <FaClock/>
              - 24-Hour Front Desk
            
          </span>
        </h4>
      </Row>
      <hr/>
      <Row xs={1} md={2} lg={3} className='g-4 mt-2'> 
      <Col>
      <Card>
        <Card.Body>
          <Card.Title className='hotel-color'>
            <FaWifi/> Wifi

          </Card.Title>
          <Card.Text>
            Stay Connected with high Speed Internet
          </Card.Text>

        </Card.Body>


      </Card>
      
      </Col>


      <Col>
      <Card>
        <Card.Body>
          <Card.Title className='hotel-color'>
            <FaUtensils/> Breakfast

          </Card.Title>
          <Card.Text>
            Start your day with delicious breakfast
          </Card.Text>

        </Card.Body>


      </Card>
      
      </Col>

      <Col>
      <Card>
        <Card.Body>
          <Card.Title className='hotel-color'>
            <FaTshirt/> Laundary

          </Card.Title>
          <Card.Text>
            Keep your clothes clean and fresh
          </Card.Text>

        </Card.Body>


      </Card>
      
      </Col>


      <Col>
      <Card>
        <Card.Body>
          <Card.Title className='hotel-color'>
            <FaCocktail/> Mini bar

          </Card.Title>
          <Card.Text>
            Enjoy refreshing drinks and snacks
          </Card.Text>

        </Card.Body>


      </Card>
      
      </Col>


      </Row>

    </Container>
      
    </>
  )
}

export default HotelServices

import React, { useEffect } from "react"
import moment from "moment"
import { useState } from "react"
import { Form, FormControl, Button } from "react-bootstrap"
import BookingSummary from "./BookingSummary"
import { bookRoom, getRoomById } from "../utils/ApiFunctions"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../auth/AuthProvider"

const BookingForm = () => {
	const [validated, setValidated] = useState(false)
	const [isSubmitted, setIsSubmitted] = useState(false)
	const [errorMessage, setErrorMessage] = useState("")
	const [roomPrice, setRoomPrice] = useState(0)

const currentUser = localStorage.getItem("userId")

	const [booking, setBooking] = useState({
		guestName: "",
		guestEmail: currentUser,
		checkInDate: "",
		checkOutDate: "",
		numOfAdults: "",
		numOfChildren: ""
	})

	const { roomId } = useParams()
	const navigate = useNavigate()

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setBooking({ ...booking, [name]: value })
		setErrorMessage("")
	}


	const getRoomPriceById = async (roomId) => {
		try {
			const response = await getRoomById(roomId)
			setRoomPrice(response.roomPrice)
		} catch (error) {
			throw new Error(error)
		}
	}

	useEffect(() => {
		getRoomPriceById(roomId)
	}, [roomId])

	const calculatePayment = () => {
		const checkInDate = moment(booking.checkInDate)
		const checkOutDate = moment(booking.checkOutDate)
		const diffInDays = checkOutDate.diff(checkInDate, "days")
		const paymentPerDay = roomPrice ? roomPrice : 0
		return diffInDays * paymentPerDay
	}

	const isGuestCountValid = () => {
		const adultCount = parseInt(booking.numOfAdults)
		const childrenCount = parseInt(booking.numOfChildren)
		const totalCount = adultCount + childrenCount
		return totalCount >= 1 && adultCount >= 1
	}

	const isCheckOutDateValid = () => {
		if (!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))) {
			setErrorMessage("Check-out date must be after check-in date")
			return false
		} else {
			setErrorMessage("")
			return true
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const form = e.currentTarget
		if (form.checkValidity() === false || !isGuestCountValid() || !isCheckOutDateValid()) {
			e.stopPropagation()
		} else {
			setIsSubmitted(true)
		}
		setValidated(true)
	}

	const handleFormSubmit = async () => {
		try {
			const confirmationCode = await bookRoom(roomId, booking)
			setIsSubmitted(true)
			navigate("/booking-success", { state: { message: confirmationCode } })
		} catch (error) {
			const errorMessage = error.message
			console.log(errorMessage)
			navigate("/booking-success", { state: { error: errorMessage } })
		}
	}

	return (
		<>
			<div className="container mb-5">
				<div className="row">
					<div className="col-md-6">
						<div className="card card-body mt-5">
							<h4 className="card-title">Reserve Room</h4>

							<Form noValidate validated={validated} onSubmit={handleSubmit}>
								<Form.Group>
									<Form.Label htmlFor="guestName" className="hotel-color">
										Fullname
									</Form.Label>
									<FormControl
										required
										type="text"
										id="guestName"
										name="guestName"
										value={booking.guestName}
										placeholder="Enter your fullname"
										onChange={handleInputChange}
									/>
									<Form.Control.Feedback type="invalid">
										Please enter your fullname.
									</Form.Control.Feedback>
								</Form.Group>

								<Form.Group>
									<Form.Label htmlFor="guestEmail" className="hotel-color">
										Email
									</Form.Label>
									<FormControl
										required
										type="email"
										id="guestEmail"
										name="guestEmail"
										value={booking.guestEmail}
										placeholder="Enter your email"
										onChange={handleInputChange}
										disabled
									/>
									<Form.Control.Feedback type="invalid">
										Please enter a valid email address.
									</Form.Control.Feedback>
								</Form.Group>

								<fieldset style={{ border: "2px" }}>
									<legend>Lodging Period</legend>
									<div className="row">
										<div className="col-6">
											<Form.Label htmlFor="checkInDate" className="hotel-color">
												Check-in date
											</Form.Label>
											<FormControl
												required
												type="date"
												id="checkInDate"
												name="checkInDate"
												value={booking.checkInDate}
												placeholder="check-in-date"
												min={moment().format("MMM Do, YYYY")}
												onChange={handleInputChange}
											/>
											<Form.Control.Feedback type="invalid">
												Please select a check in date.
											</Form.Control.Feedback>
										</div>

										<div className="col-6">
											<Form.Label htmlFor="checkOutDate" className="hotel-color">
												Check-out date
											</Form.Label>
											<FormControl
												required
												type="date"
												id="checkOutDate"
												name="checkOutDate"
												value={booking.checkOutDate}
												placeholder="check-out-date"
												min={moment().format("MMM Do, YYYY")}
												onChange={handleInputChange}
											/>
											<Form.Control.Feedback type="invalid">
												Please select a check out date.
											</Form.Control.Feedback>
										</div>
										{errorMessage && <p className="error-message text-danger">{errorMessage}</p>}
									</div>
								</fieldset>

								<fieldset style={{ border: "2px" }}>
									<legend>Number of Guest</legend>
									<div className="row">
										<div className="col-6">
											<Form.Label htmlFor="numOfAdults" className="hotel-color">
												Adults
											</Form.Label>
											<FormControl
												required
												type="number"
												id="numOfAdults"
												name="numOfAdults"
												value={booking.numOfAdults}
												min={1}
												placeholder="0"
												onChange={handleInputChange}
											/>
											<Form.Control.Feedback type="invalid">
												Please select at least 1 adult.
											</Form.Control.Feedback>
										</div>
										<div className="col-6">
											<Form.Label htmlFor="numOfChildren" className="hotel-color">
												Children
											</Form.Label>
											<FormControl
												required
												type="number"
												id="numOfChildren"
												name="numOfChildren"
												value={booking.numOfChildren}
												placeholder="0"
												min={0}
												onChange={handleInputChange}
											/>
											<Form.Control.Feedback type="invalid">
												Select 0 if no children
											</Form.Control.Feedback>
										</div>
									</div>
								</fieldset>

								<div className="fom-group mt-2 mb-2">
									<button type="submit" className="btn btn-hotel">
										Continue
									</button>
								</div>
							</Form>
						</div>
					</div>

					<div className="col-md-4">
						{isSubmitted && (
							<BookingSummary
								booking={booking}
								payment={calculatePayment()}
								onConfirm={handleFormSubmit}
								isFormValid={validated}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	)
}
export default BookingForm









// import React, { useEffect, useState } from 'react'
// import { Form, Button } from 'react-bootstrap'
// import { useNavigate, useParams } from 'react-router-dom'
// import moment from "moment"
// import BookingSummary from './BookingSummary'
// import { bookRoom, getRoomById } from '../utils/ApiFunctions'

// const BookingForm = () => {
//   const [isValidated, setIsValidated] = useState(false)
//   const [isSubmitted, setIsSubmitted] = useState(false)
//   const [errorMessage, setErrorMessage] = useState("")
//   const [roomPrice, setRoomPrice] = useState(0)
//   const [booking, setBooking] = useState({
//     guestFullName: "",
//     guestEmail: "",
//     checkInDate: "",
//     checkOutDate: "",
//     numberOfAdults: "",
//     numberOfChildren: ""
//   })

//   const [roomInfo, setRoomInfo] =useState({
//     photo:"",
//     roomType:"",
//     roomPrice:""
//   })

//   const navigate = useNavigate()
//   const { roomId } = useParams()

//   useEffect(() => {
//     const fetchRoomPrice = async () => {
//       try {
//         const response = await getRoomById(roomId)
//         setRoomPrice(response.roomPrice)
//       } catch (error) {
//         setErrorMessage("Failed to fetch room price")
//       }
//     }
//     fetchRoomPrice()
//   }, [roomId])

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setBooking({ ...booking, [name]: value })
//     setErrorMessage("")
//   }

//   const calculatePayments = () => {
//     const checkInDate = moment(booking.checkInDate)
//     const checkOutDate = moment(booking.checkOutDate)
//     const diffInDays = checkOutDate.diff(checkInDate, 'days')
//     const price = roomPrice ? roomPrice : 0
//     return diffInDays * price
//   }

//   const isGuestCountValid = () => {
//     const adultCount = parseInt(booking.numberOfAdults)
//     const childrenCount = parseInt(booking.numberOfChildren)
//     const totalCount = adultCount + childrenCount
//     return totalCount >= 1 && adultCount >= 1
//   }

//   const isCheckOutDateValid = () => {
//     if (!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))) {
//       setErrorMessage("Check-out date must come after check-in date")
//       return false
//     } else {
//       setErrorMessage("")
//       return true
//     }
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     const form = e.currentTarget
//     if (form.checkValidity() === false || !isGuestCountValid() || !isCheckOutDateValid()) {
//       e.stopPropagation()
//     } else {
//       setIsSubmitted(true)
//     }
//     setIsValidated(true)
//   }

//   const handleBooking = async () => {
//     try {
//       const confirmationCode = await bookRoom(roomId, booking)
//       navigate("/booking-success", { state: { message: confirmationCode } })
//     } catch (error) {
//       setErrorMessage("Booking failed: " + error.message)
//       navigate("/booking-success", { state: { error: errorMessage } })
//     }
//   }

//   return (
//     <div className='container mb-5'>
//       <div className='row'>
//         <div className='col-md-6'>
//           <div className='card card-body mt-5'>
//             <h4 className='card card-title'>Reserve Room</h4>
//             <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
//               <Form.Group>
//                 <Form.Label htmlFor="guestFullName">Full Name:</Form.Label>
//                 <Form.Control
//                   required
//                   type='text'
//                   id='guestFullName'
//                   name='guestFullName'
//                   value={booking.guestFullName}
//                   placeholder='Enter Your Full Name'
//                   onChange={handleInputChange}
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   Please Enter Your Full Name
//                 </Form.Control.Feedback>
//               </Form.Group>

//               <Form.Group>
//                 <Form.Label htmlFor="guestEmail">Email:</Form.Label>
//                 <Form.Control
//                   required
//                   type='email'
//                   id='guestEmail'
//                   name='guestEmail'
//                   value={booking.guestEmail}
//                   placeholder='Enter Your Email Address'
//                   onChange={handleInputChange}
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   Please Enter a Valid Email Address
//                 </Form.Control.Feedback>
//               </Form.Group>

//               <fieldset>
//                 <legend>Lodging Period</legend>
//                 <div className='row'>
//                   <div className='col-6'>
//                     <Form.Label htmlFor="checkInDate">Check In Date:</Form.Label>
//                     <Form.Control
//                       required
//                       type='date'
//                       id='checkInDate'
//                       name='checkInDate'
//                       value={booking.checkInDate}
//                       onChange={handleInputChange}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       Please Select Your Check-in Date
//                     </Form.Control.Feedback>
//                   </div>

//                   <div className='col-6'>
//                     <Form.Label htmlFor="checkOutDate">Check Out Date:</Form.Label>
//                     <Form.Control
//                       required
//                       type='date'
//                       id='checkOutDate'
//                       name='checkOutDate'
//                       value={booking.checkOutDate}
//                       onChange={handleInputChange}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       Please Select Your Check-out Date
//                     </Form.Control.Feedback>
//                   </div>
//                 </div>
//                 {errorMessage && <p className='text-danger'>{errorMessage}</p>}
//               </fieldset>

//               <fieldset>
//                 <legend>Number of Guests</legend>
//                 <div className='row'>
//                   <div className='col-6'>
//                     <Form.Label htmlFor="numberOfAdults">Adults:</Form.Label>
//                     <Form.Control
//                       required
//                       type='number'
//                       id='numberOfAdults'
//                       name='numberOfAdults'
//                       value={booking.numberOfAdults}
//                       min={1}
//                       onChange={handleInputChange}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       Please Select at least 1 Adult
//                     </Form.Control.Feedback>
//                   </div>
//                   <div className='col-6'>
//                     <Form.Label htmlFor="numberOfChildren">Children:</Form.Label>
//                     <Form.Control
//                       type='number'
//                       id='numberOfChildren'
//                       name='numberOfChildren'
//                       value={booking.numberOfChildren}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                 </div>
//               </fieldset>

//               <div className='form-group mt-2 mb-2'>
//                 <Button type='submit' className='btn btn-hotel'>Continue</Button>
//               </div>
//             </Form>
//           </div>
//         </div>

//         <div className='col-md-4'>
//           {isSubmitted && (
//             <BookingSummary
//               booking={booking}
//               payment={calculatePayments}
//               isFormValid={isValidated}
//               onConfirm={handleBooking}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default BookingForm


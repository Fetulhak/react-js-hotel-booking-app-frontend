import React, { useState } from "react"
import moment from "moment"
import { cancelBooking, getBookingByConfirmationCode } from "../utils/ApiFunctions"

const FindBooking = () => {
	const [confirmationCode, setConfirmationCode] = useState("")
	const [error, setError] = useState(null)
	const [successMessage, setSuccessMessage] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const [bookingInfo, setBookingInfo] = useState({
		bookingId: "",
		bookingConfirmationCode: "",
		room: { id: "", roomType: "" },
		roomNumber: "",
		checkInDate: "",
		checkOutDate: "",
		guestName: "",
		guestEmail: "",
		numOfAdults: "",
		numOfChildren: "",
		totalNumOfGuests: ""
	})

	const emptyBookingInfo = {
		bookingId: "",
		bookingConfirmationCode: "",
		room: { id: "", roomType: "" },
		roomNumber: "",
		checkInDate: "",
		checkOutDate: "",
		guestName: "",
		guestEmail: "",
		numOfAdults: "",
		numOfChildren: "",
		totalNumOfGuests: ""
	}
	const [isDeleted, setIsDeleted] = useState(false)

	const handleInputChange = (event) => {
		setConfirmationCode(event.target.value)
	}

	const handleFormSubmit = async (event) => {
		event.preventDefault()
		setIsLoading(true)

		try {
			const data = await getBookingByConfirmationCode(confirmationCode)
			setBookingInfo(data)
			setError(null)
		} catch (error) {
			setBookingInfo(emptyBookingInfo)
			if (error.response && error.response.status === 404) {
				setError(error.response.data.message)
			} else {
				setError(error.message)
			}
		}

		setTimeout(() => setIsLoading(false), 2000)
	}

	const handleBookingCancellation = async (bookingId) => {
		try {
			await cancelBooking(bookingInfo.bookingId)
			setIsDeleted(true)
			setSuccessMessage("Booking has been cancelled successfully!")
			setBookingInfo(emptyBookingInfo)
			setConfirmationCode("")
			setError(null)
		} catch (error) {
			setError(error.message)
		}
		setTimeout(() => {
			setSuccessMessage("")
			setIsDeleted(false)
		}, 2000)
	}

	return (
		<>
			<div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
				<h2 className="text-center mb-4">Find My Booking</h2>
				<form onSubmit={handleFormSubmit} className="col-md-6">
					<div className="input-group mb-3">
						<input
							className="form-control"
							type="text"
							id="confirmationCode"
							name="confirmationCode"
							value={confirmationCode}
							onChange={handleInputChange}
							placeholder="Enter the booking confirmation code"
						/>

						<button type="submit" className="btn btn-hotel input-group-text">
							Find booking
						</button>
					</div>
				</form>

				{isLoading ? (
					<div>Finding your booking...</div>
				) : error ? (
					<div className="text-danger">Error: {error}</div>
				) : bookingInfo.bookingConfirmationCode ? (
					<div className="col-md-6 mt-4 mb-5">
						<h3>Booking Information</h3>
						<p className="text-success">Confirmation Code: {bookingInfo.bookingConfirmationCode}</p>
						<p>Room Number: {bookingInfo.room.id}</p>
						<p>Room Type: {bookingInfo.room.roomType}</p>
						<p>
							Check-in Date:{" "}
							{moment(bookingInfo.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}
						</p>
						<p>
							Check-out Date:{" "}
							{moment(bookingInfo.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}
						</p>
						<p>Full Name: {bookingInfo.guestName}</p>
						<p>Email Address: {bookingInfo.guestEmail}</p>
						<p>Adults: {bookingInfo.numOfAdults}</p>
						<p>Children: {bookingInfo.numOfChildren}</p>
						<p>Total Guest: {bookingInfo.totalNumOfGuests}</p>

						{!isDeleted && (
							<button
								onClick={() => handleBookingCancellation(bookingInfo.id)}
								className="btn btn-danger">
								Cancel Booking
							</button>
						)}
					</div>
				) : (
					<div>find booking...</div>
				)}

				{isDeleted && <div className="alert alert-success mt-3 fade show">{successMessage}</div>}
			</div>
		</>
	)
}

export default FindBooking







// import React, { useState } from 'react'
// import { cancelBooking, getBookingByConfirmationCode } from '../utils/ApiFunctions'

// const FindBooking = () => {
//   const [confirmationCode,setConfirmationCode] = useState("")
//   const [error,setError] = useState("")
//   const [isLoading,setIsLoading] = useState(false)
//   const [bookingInfo,setBookingInfo] = useState({
//     bookingId:"",
//     room:{id:""},
//   bookingConfirmationCode:"",
// roomNumber: "",
// checkInDate:"",
// checkOutDate:"",
// guestFullName:"",
// guestEmail:"",
// numberOfAdults:"",
// numberOfChildren:"",
// totalNumOfGuests:""  })
// const [isDeleted, setIsDeleted] = useState(false)

// const clearBookingInfo =  {
//   bookingId:"",
//     room:{id:""},
//   bookingConfirmationCode:"",
// roomNumber: "",
// checkInDate:"",
// checkOutDate:"",
// guestFullName:"",
// guestEmail:"",
// numberOfAdults:"",
// numberOfChildren:"",
// totalNumOfGuests:""  

// }

// const handleInputChange = (e) => {
//   setConfirmationCode(e.target.value)
// }


// const handleFormSubmit = async (e) => {
//   e.preventDefault()
//   setIsLoading(true)
//   try {
//     const data = await getBookingByConfirmationCode(confirmationCode)
//     console.log(data)
//     setBookingInfo(data)

//   } catch (error) {
//     setBookingInfo(clearBookingInfo)
//     if(error.response && error.response.status === 500){
//       setError(error.response.data.message)
//     }else{
//       setError(error.response)
//     }
//   }
//   setTimeout(()=>{
//     setIsLoading(false)
//   },2000)
// } 


// const handleBookingCancellation = async() => {
//   try {
//     await cancelBooking(bookingInfo.bookingId)
//     setIsDeleted(true)
//     setBookingInfo(clearBookingInfo)
//     setConfirmationCode("")
//     setError("")
//   } catch (error) {
//     setError(error.message)
//   }
// }
//   return (
//     <>
//     <div className='container mt-5 d-flex flex-column justify-content-center align-items-center'>
//       <h2>Find My Booking</h2>
//       <form onSubmit={handleFormSubmit} className='col-md-6'>
//         <div className='input-group mb-3'>
//           <input className='form-control' id='confirmationCode' 
//           name='confirmationCode' value={confirmationCode}
//           onChange={handleInputChange}
//           placeholder='Enter your booking confirmation code'/>
//           <button className='btn btn-hotel input-group-text'>Find Booking</button>
//         </div>
//       </form>

//       {
//         isLoading ? (<div>Finding Your Booking ....</div>): error ? (
//           <div className='text-danger'>{error}</div>
//         ): bookingInfo.bookingConfirmationCode ? (
//           <div className='col-;d-6 mt-4 mb-5'> 
//           <h3>Booking Information</h3>
//           <p>Booking Confirmation Code: {bookingInfo.bookingConfirmationCode}</p>
//           <p>Booking Id: {bookingInfo.bookingId}</p>
//           <p>Room Number: {bookingInfo.room.id}</p>
//           <p>Check In date : {bookingInfo.checkInDate}</p>
//           <p>Check out Dtae: {bookingInfo.checkOutDate}</p>
//           <p>Full Name: {bookingInfo.guestFullName}</p>
//           <p>Email: {bookingInfo.guestEmail}</p>
//           <p>Adults: {bookingInfo.numberOfAdults}</p>
//           <p>Children: {bookingInfo.numberOfChildren}</p>
//           <p>cTotal guest: {bookingInfo.totalNumOfGuests}</p>

//           {!isDeleted && (
//             <button className='btn btn-danger' onClick={ ()=> handleBookingCancellation()}
//             >Cancel Booking</button>
//           )}



//           </div>
//         ):(
//           <div>find booking .....</div>
//         )
//       }

//       {isDeleted && (
//         <div className='alert alert-success mt-3' role='alert'>Booking has been cancelled succesfully</div>
//       )}


//     </div>
      
//     </>
//   )
// }

// export default FindBooking

import { parseISO } from "date-fns"
import React, { useState, useEffect } from "react"
import DateSlider from "../common/DateSlider"

const BookingsTable = ({ bookingInfo, handleBookingCancellation }) => {
	const [filteredBookings, setFilteredBookings] = useState(bookingInfo)

	const filterBooknigs = (startDate, endDate) => {
		let filtered = bookingInfo
		if (startDate && endDate) {
			filtered = bookingInfo.filter((booking) => {
				const bookingStarDate = parseISO(booking.checkInDate)
				const bookingEndDate = parseISO(booking.checkOutDate)
				return (
					bookingStarDate >= startDate && bookingEndDate <= endDate && bookingEndDate > startDate
				)
			})
		}
		setFilteredBookings(filtered)
	}

	useEffect(() => {
		setFilteredBookings(bookingInfo)
	}, [bookingInfo])

	return (
		<section className="p-4">
			<DateSlider onDateChange={filterBooknigs} onFilterChange={filterBooknigs} />
			<table className="table table-bordered table-hover shadow">
				<thead>
					<tr>
						<th>S/N</th>
						<th>Booking ID</th>
						<th>Room ID</th>
						<th>Room Type</th>
						<th>Check-In Date</th>
						<th>Check-Out Date</th>
						<th>Guest Name</th>
						<th>Guest Email</th>
						<th>Adults</th>
						<th>Children</th>
						<th>Total Guest</th>
						<th>Confirmation Code</th>
						<th colSpan={2}>Actions</th>
					</tr>
				</thead>
				<tbody className="text-center">
					{filteredBookings.map((booking, index) => (
						<tr key={booking.bookingId}>
							<td>{index + 1}</td>
							<td>{booking.bookingId}</td>
							<td>{booking.room.id}</td>
							<td>{booking.room.roomType}</td>
							<td>{booking.checkInDate}</td>
							<td>{booking.checkOutDate}</td>
							<td>{booking.guestName}</td>
							<td>{booking.guestEmail}</td>
							<td>{booking.numOfAdults}</td>
							<td>{booking.numOfChildren}</td>
							<td>{booking.totalNumOfGuests}</td>
							<td>{booking.bookingConfirmationCode}</td>
							<td>
								<button
									className="btn btn-danger btn-sm"
									onClick={() => handleBookingCancellation(booking.bookingId)}>
									Cancel
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{filteredBookings.length === 0 && <p> No booking found for the selected dates</p>}
		</section>
	)
}

export default BookingsTable







// import { parseISO } from 'date-fns'
// import React, { useEffect, useState } from 'react'
// import DateSlider from '../common/DateSlider'

// const BookingsTable = ({bookingInfo, handleBookingCancellation}) => {
//   const [filteredBookings, setFilteredBookings] = useState(bookingInfo)

//   const filterBookings = (startDate, endDate) => {
//     let filtered = bookingInfo
//     if(startDate && endDate){
//       filtered = bookingInfo.filter((booking) =>{
//         const bookingStartDate = parseISO(booking.checkInDate)
//         const bookingEndDate = parseISO(booking.checkOutDate)
//         console.log('bookingStartDate:', bookingStartDate, 'bookingEndDate:', bookingEndDate);
//         return bookingStartDate >= startDate && bookingEndDate <= endDate && bookingEndDate > startDate
//       })
//     }
//     setFilteredBookings(filtered)

    
//   }



//   useEffect(()=>{
//     setFilteredBookings(bookingInfo)
//   },[bookingInfo])

//   return (
//     <section className='p-4'>
//       <DateSlider onDateChange={filterBookings} onFilterChange={filterBookings}/>
//       <table>
//         <thead>
//           <tr>
//             <th>S/N</th>
//             <th>Booking Id</th>
//             <th>Room Id</th>
//             <th>Check In Date</th>
//             <th>Check Out Date</th>



//             <th>Guest Name </th>
//             <th> Guest Email</th>

//             <th>Number of Adults</th>
//             <th>Number of Children</th>
//             <th>Total Number of Guest</th>
//             <th>Confirmation Code</th>
//             <th colSpan={2}>Actions</th>

//           </tr>
//         </thead>

//         <tbody className='text-center'>
//           {
//             filteredBookings.map((booking,index)=>(
//               <tr key={booking.id}>
//                 <td>{index + 1}</td>
//                 <td>{booking.id}</td>
//                 <td>{booking.room.id}</td>
//                 <td>{booking.checkInDate}</td>
//                 <td>{booking.checkOutDate}</td>
//                 <td>{booking.guestFullName}</td>
//                 <td>{booking.guestEmail}</td>
//                 <td>{booking.numberOfAdults}</td>
//                 <td>{booking.numberOfChildren}</td>
//                 <td>{booking.totalNumOfGuests}</td>
//                 <td>{booking.bookingConfirmationCode}</td>
//                 <td>
//                   <button className='btn btn-danger btn-sm' onClick={()=> handleBookingCancellation(booking.id)}> Cancel

//                   </button>
//                 </td>




//               </tr>
//             )

//             )
//           }


//         </tbody>



//       </table>
//       {filteredBookings.length === 0 && <p>No Booking Found for selected date</p>}
      
//     </section>
//   )
// }

// export default BookingsTable

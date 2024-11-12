import React, { useEffect, useState } from "react"
import { getRoomById, updateRoom } from "../utils/ApiFunctions"
import { Link, useParams } from "react-router-dom"

const EditRoom = () => {
	const [room, setRoom] = useState({
		photo: "",
		roomType: "",
		roomPrice: ""
	})

	const [imagePreview, setImagePreview] = useState("")
	const [successMessage, setSuccessMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const { roomId } = useParams()

	const handleImageChange = (e) => {
		const selectedImage = e.target.files[0]
		setRoom({ ...room, photo: selectedImage })
		setImagePreview(URL.createObjectURL(selectedImage))
	}

	const handleInputChange = (event) => {
		const { name, value } = event.target
		setRoom({ ...room, [name]: value })
	}

	useEffect(() => {
		const fetchRoom = async () => {
			try {
				const roomData = await getRoomById(roomId)
				setRoom(roomData)
				setImagePreview(roomData.photo)
			} catch (error) {
				console.error(error)
			}
		}

		fetchRoom()
	}, [roomId])

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const response = await updateRoom(roomId, room)
			if (response.status === 200) {
				setSuccessMessage("Room updated successfully!")
				const updatedRoomData = await getRoomById(roomId)
				setRoom(updatedRoomData)
				setImagePreview(updatedRoomData.photo)
				setErrorMessage("")
			} else {
				setErrorMessage("Error updating room")
			}
		} catch (error) {
			console.error(error)
			setErrorMessage(error.message)
		}
	}

	return (
		<div className="container mt-5 mb-5">
			<h3 className="text-center mb-5 mt-5">Edit Room</h3>
			<div className="row justify-content-center">
				<div className="col-md-8 col-lg-6">
					{successMessage && (
						<div className="alert alert-success" role="alert">
							{successMessage}
						</div>
					)}
					{errorMessage && (
						<div className="alert alert-danger" role="alert">
							{errorMessage}
						</div>
					)}
					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<label htmlFor="roomType" className="form-label hotel-color">
								Room Type
							</label>
							<input
								type="text"
								className="form-control"
								id="roomType"
								name="roomType"
								value={room.roomType}
								onChange={handleInputChange}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="roomPrice" className="form-label hotel-color">
								Room Price
							</label>
							<input
								type="number"
								className="form-control"
								id="roomPrice"
								name="roomPrice"
								value={room.roomPrice}
								onChange={handleInputChange}
							/>
						</div>

						<div className="mb-3">
							<label htmlFor="photo" className="form-label hotel-color">
								Photo
							</label>
							<input
								required
								type="file"
								className="form-control"
								id="photo"
								name="photo"
								onChange={handleImageChange}
							/>
							{imagePreview && (
								<img
									src={`data:image/jpeg;base64,${imagePreview}`}
									alt="Room preview"
									style={{ maxWidth: "400px", maxHeight: "400" }}
									className="mt-3"
								/>
							)}
						</div>
						<div className="d-grid gap-2 d-md-flex mt-2">
							<Link to={"/existing-rooms"} className="btn btn-outline-info ml-5">
								back
							</Link>
							<button type="submit" className="btn btn-outline-warning">
								Edit Room
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
export default EditRoom

// import React, { useState, useEffect} from 'react'
// import { useParams } from 'react-router-dom'
// import { getRoomById, updateRoom } from '../utils/ApiFunctions'
// import {Link} from "react-router-dom"

// const EditRoom = () => {

//  const [room, setRoom] = useState({photo:null, roomType: "", roomPrice: ""})
//  const[successmessage, setSuccessMessage] = useState("")
//  const[erroeMessage, setErrorMessage] = useState("")
//  const[imagePreview, setImagePreview] = useState("")
//  const {roomId} = useParams()
 
//  const handleImageChange = (e) => {
//   const selectedImage = e.target.files[0]
//   setRoom({...room, photo: selectedImage})
//   setImagePreview(URL.createObjectURL(selectedImage))
//  }


//  const handleRoomInputChange = (event) => {

//   const {name, value} = event.target

//   setRoom({...room, [name]:value})

  
//  }


//  useEffect(() => {
//   fetchRoom()
// },[roomId])

// const fetchRoom = async () =>{
  
//   try {
//     const roomData = await getRoomById(roomId)
//     setRoom(roomData)
//     setImagePreview(roomData.photo)    
//   } catch (error) {
//     console.error(error)
    
//   }

// }


//  const handleSubmit = async (e) => {
//   e.preventDefault()
//   try {

//     const response = await updateRoom(roomId,room)
//     if(response.status === 200){
//       setSuccessMessage("Room updated Sucessfully")
//       const updateRoomData = await getRoomById(roomId)
//       setRoom(updateRoomData)
//       setImagePreview(updateRoomData.photo)
//       setErrorMessage("")
//     }else{
//       setErrorMessage("Error updating room")
//     }
//   } catch (error) {
//     setErrorMessage(error.message)
//   }


//  }



//  return (
//   <>
//     <section className='container mt-5 mb-5'>    
//       <div className='row justify-content-center'>
//         <div className='col-md-8 col-lg-6'>
//           <h2 className='mt-5 mb 2'>Edit Room</h2>


//           {successmessage && (
//             <div className='alert alert-success fade show'> {successmessage} </div>
//           )}

//           {erroeMessage && (
//             <div className='alert alert-danger fade show'> {erroeMessage} </div>
//           )}







//           <form onSubmit={handleSubmit}>
//             <div className='mb-3'>
//               <label htmlFor='roomType' className='form-label'> Room Type</label>
//               <input className='form-control' id='roomType' name='roomType' type='text' value={room.roomType} onChange={handleRoomInputChange}/>
//             </div>

//             <div className='mb-3'>
//               <label htmlFor='roomPrice' className='form-label'> Room Price</label>
//               <input className='form-control' id='roomPrice' name='roomPrice' type='number' value={room.roomPrice} onChange={handleRoomInputChange}/>

//             </div>

//             <div className='mb-3'>
//               <label htmlFor='photo' className='form-label'> Room Photo</label>
//               <input className='form-control' required id='photo' name='photo' type='file'
//                onChange={handleImageChange}/>
//               {
//                 imagePreview && (
//                   <img src={`data:image/jpeg;base64,${imagePreview}`} alt='Room Preview' style={{maxWidth: "400px", maxHeight: "400px"}} className='mb-3 mt-3'></img>
//                   // <img src={imagePreview} alt='Room Preview' style={{maxWidth: "400px", maxHeight: "400px"}} className='mb-3 mt-3'></img>
//                   //<img src={imagePreview} alt='Preview Photo' style={{maxWidth: "400px", maxHeight: "400px"}} className='mb-3'></img>
//                 )
//               }
              

//             </div>

//             <div className='d-.grid d-md-flex mt-2 mr-5'>
//             <button type="submit" className='btn btn-outline-info me-3' ><Link to={"/existing-rooms" } className= 'btn-outline-info mr-5'> back </Link></button>
              
//               <button type="submit" className='btn btn-outline-warning ml-5' >Edit Room</button>
//             </div>

//           </form>

//         </div>
//       </div>
//     </section>
//   </>

// )


// }

// export default EditRoom

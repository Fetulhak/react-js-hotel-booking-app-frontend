import axios from "axios"

export const api = axios.create({
  baseURL: "http://localhost:8080"
})

// export const api = axios.create({
//   baseURL: "http://localhost:9090"
// })

export const getHeader = () => {
  const token = localStorage.getItem("token")
  return{
    Authorization: `Bearer ${token}`,
    "Content-type": "application/json"
  }

}

// For multipart/form-data requests
export const getHeader2 = () => {
  const token = localStorage.getItem("token")
  return {
    Authorization: `Bearer ${token}`,
  }
}


/* this function add new room*/
export async function addRoom(photo, roomType, roomPrice){

  const formData = new FormData()
  formData.append("photo", photo)
  formData.append("roomType", roomType)
  formData.append("roomPrice", roomPrice)

  const response = await api.post("/rooms/add/new-room", formData, {headers: getHeader2()})
  if(response.status === 201){
    return true
  }else{
    return false
  }

}

/* This function returns all room types */
export async function getRoomTypes(){
  try {
    const response = await api.get("/rooms/room/types")
    return response.data
    
  } catch (error) {
    throw new Error("Error fetching room types")
    
  }
}

// This function gets all rooms from the DB
export async function getAllRooms(){
  try {
    const result = await api.get("/rooms/all-rooms")
    return result.data
    
  } catch (error) {

    throw new Error("Error fetching rooms")
    
  }
  
}

export async function deleteRoom(roomId){
  try {
    const result = await api.delete(`/rooms/delete/room/${roomId}`,{headers: getHeader()})
    return result.data
    
  } catch (error) {
    throw new Error(`Error deleting room ${error.message}`)
    
  }
    
} 


export async function updateRoom(roomId, roomData){

  const formData = new FormData();
  formData.append("roomType",roomData.roomType)
  formData.append("roomPrice",roomData.roomPrice)
  formData.append("photo",roomData.photo)

  const response = await api.put(`/rooms/update/${roomId}`, formData,{headers: getHeader2()})
  return response

}

export async function getRoomById(roomId){

  try {
    const result = await api.get(`/rooms/room/${roomId}`)
    return result.data
    
  } catch (error) {

    throw new Error(`Error fetching room ${roomId}`)
    
  }
}


export async function bookRoom(roomId, booking){
  try {
    const response= await api.post(`/bookings/room/${roomId}/booking`,booking)
    return response.data
    
  } catch (error) {
    if(error.response && error.response.data){
      throw new Error(error.response.data)
    }else{
      throw new Error(`Error booking room: ${error.message}`)
    }
    
  }
}


export async function getAllBookings(){
  try {
    const result = await api.get("/bookings/all-bookings",{headers: getHeader()})
    return result.data
    
    
  } catch (error) {
    throw new Error(`Error fetching bookings: ${error.message}`)
    
  }
}


export async function getBookingByConfirmationCode(confirmationcode){
  try {
    const result = await api.get(`/bookings/confirmation/${confirmationcode}`)
    return result.data
    
  } catch (error) {
    if(error.response && error.response.data){
      throw new Error(error.response.data)
    }else{
      throw new Error(`Error find booking: ${error.message}`)
    }
  }
}


export async function cancelBooking(bookingId){
  try {
    const result = await api.delete(`/bookings/booking/${bookingId}/delete`) 
    return result.data
    
  } catch (error) {
    throw new Error(`Error cancelling booking: ${error.message}`)
    
  }
}


export async function getAvailableRooms(checkInDate, checkOutDate, roomType){
  const result = await api.get(
    `/rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`)

    return result
}


export async function registerUser(registration){
  try {
    const response = await api.post("/auth/register-user",registration)
    return response.data
  } catch (error) {
    if(error.response && error.response.data){
      throw new Error(error.response.data)
    }else{
      throw new Error(`Error registering user:  ${error.message}`)
    }
  }
}


export async function loginUser(login){
  
  try {
    const response = await api.post("/auth/login",login)
  if(response.status >= 200 && response.status < 300) {
    return response.data
  }else{
    return null
  }
    
  } catch (error) {
    console.error(error)
    return null
  }
  
  

}


export async function getUserProfile(userId, token){
  try {
    const response = await api.get(`users/profile/${userId}`, {
      headers: getHeader()
    })
    return response.data
  } catch (error) {
     throw error
  }
}

export async function deleteUser(userId){
  try {
    const response = await api.delete(`/users/delete/${userId}`,{
      headers: getHeader()
    })
    return response.data
  } catch (error) {
    return error.message
  }
}


export async function getUser(userId,token){
  try {
    const response = await api.get(`/users/${userId}`,{
      headers: getHeader()
    })
    console.log(response.data)
    return response.data
  } catch (error) {
    throw error
  }
}

export async function getBookingsByUserId(userId, token) {
	try {
		const response = await api.get(`/bookings/user/${userId}/bookings`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		console.error("Error fetching bookings:", error.message)
		throw new Error("Failed to fetch bookings")
	}
}





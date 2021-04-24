const httpStatus = require('http-status');
const { FlightBooking } = require('../models');
const ApiError = require('../utils/ApiError');
const {fetchFlightById} = require('./flight.service');

const bookAFlight= async (req)=>{
    const flight = await fetchFlightById(req.body.flight_id);
    if(!flight){
        throw new ApiError(httpStatus.NOT_FOUND,"Flight ID is not correct");
    }
    let seatNumber;
        flight.seats.forEach((s)=>{
      if(s._id == req.body.seat_id) {
          seatNumber = s.seat_number;
          s.isavailable=false;
      }
    });
        const booking= new FlightBooking({
            user_id: req.user.id,
            flight_id: req.body.flight_id,
            selected_seat:seatNumber || 0,
        });
        await booking.save();
        console.log(flight);
        await flight.save();
    return booking;
};

const showBookingFlights= async (userId)=>{
   const flights=await FlightBooking.find({user_id:userId}).populate('user_id').populate({path:'flight_id',
   select: '-seats'});
   if(!flights)
       throw new ApiError(httpStatus.NOT_FOUND,"no booking available");
   return flights;
};
const changeBookingStatus= async(reqBody)=>{
     const booking= await FlightBooking.findById(reqBody.booking_id);
     booking.booking_status=reqBody.status;
     await booking.save();
     return booking;
}

module.exports ={
    bookAFlight,
    showBookingFlights,
    changeBookingStatus,
};
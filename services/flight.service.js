const httpStatus = require('http-status');
const { Flight } = require('../models');
const ApiError = require('../utils/ApiError');

const createFlight = async (flightBody) =>{
    const flight = await Flight.create(flightBody);
    return flight;
};
const fetchFlights= async ()=>{
    const flights= await Flight.find();
    return flights;
};
const fetchFlightById= async (flightId)=>{
    const flight= await Flight.findById(flightId);
    return flight;
};
const updateFlightById= async (flightId,updateBody)=>{
    const flight = await fetchFlightById(flightId);
    if (!flight) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Flight not found');
    }
    Object.assign(flight, updateBody);
    await flight.save();
    return flight;
}
const deleteFlightById=async (flightId)=>{
    const flight = await fetchFlightById(flightId);
    if (!flight) {
        throw new ApiError(httpStatus.NOT_FOUND, 'flight not found');
    }
    await flight.remove();
    return flight;
};

const showFilterFlights= async (reqBody)=>{
         const flights= await  Flight.find().and([
             {from: reqBody.from},
             {to: reqBody.to},
             {trip: reqBody.trip},
             {class: reqBody.class},
             {departure: reqBody.departure},
         ]);
         return flights;
};

module.exports ={
    createFlight,
    fetchFlights,
    fetchFlightById,
    updateFlightById,
    deleteFlightById,
    showFilterFlights,
};
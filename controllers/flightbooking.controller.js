const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { flightBookingService } = require('../services');

const bookFlight= catchAsync(async (req,res)=>{
    const flights= await flightBookingService.bookAFlight(req);
    res.send(flights);
});

const showFlights= catchAsync(async (req,res)=>{
    const flights= await flightBookingService.showBookingFlights(req.params.userId);
    res.send(flights);
});
const changeStatus= catchAsync(async (req,res)=>{
    const status= await flightBookingService.changeBookingStatus(req.body);
    res.send(status);
});
module.exports = {
    bookFlight,
    showFlights,
    changeStatus,
};
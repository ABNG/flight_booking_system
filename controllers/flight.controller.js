const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { flightService } = require('../services');
const addFlight = catchAsync(async (req,res)=>{
    const flight = await flightService.createFlight(req.body);
    res.status(httpStatus.CREATED).send(flight);
});

const getFlights = catchAsync( async(req,res)=>{
    const flights= await flightService.fetchFlights();
    res.send(flights);
});

const getFlight = catchAsync(async (req,res)=>{
    const flight= await flightService.fetchFlightById(req.params.flightId);
    if(!flight){
        throw new ApiError(httpStatus.NOT_FOUND,"Flight Not Found");
    }
    res.send(flight);
});

const updateFlight= catchAsync(async (req,res)=>{
    const flight = await flightService.updateFlightById(req.params.flightId, req.body);
    res.send(flight);
});
const deleteFlight= catchAsync(async (req,res)=>{
    await flightService.deleteFlightById(req.params.flightId);
    res.status(httpStatus.NO_CONTENT).send();

});
const showFlights= catchAsync(async (req,res)=>{
    const flights= await flightService.showFilterFlights(req.body);
    res.send(flights);
});

module.exports = {
    addFlight,
    getFlights,
    getFlight,
    updateFlight,
    deleteFlight,
    showFlights,
};
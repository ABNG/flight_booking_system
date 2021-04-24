const express = require('express');
// const validate = require('../../middlewares/validate');
// const authValidation = require('../../validations/auth.validation');
const flightController = require('../../controllers/flight.controller');
const auth = require("../../middlewares/auth");

const router = express.Router();

router
    .route('/')
    .post(auth('addFlights'), flightController.addFlight)
    .get(auth('getFlights'), flightController.getFlights);

router
    .route('/:flightId')
    .get(auth('getFlights'), flightController.getFlight)
    .patch(auth('addFlights'), flightController.updateFlight)
    .delete(auth('addFlights'), flightController.deleteFlight);

//api for role user

router.post('/showflights',auth('getFilterFlights'),flightController.showFlights)
module.exports = router;
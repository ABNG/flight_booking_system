const express = require('express');
// const validate = require('../../middlewares/validate');
// const authValidation = require('../../validations/auth.validation');
const flightBookingController = require('../../controllers/flightbooking.controller');
const auth = require("../../middlewares/auth");

const router = express.Router();

//api for role user
router.post('/bookflight',auth('bookAFlight'),flightBookingController.bookFlight)
router.get('/showflights/:userId',auth('bookAFlight'),flightBookingController.showFlights)
//api for admin role
router.post('/changestatus',auth('changeStatus'),flightBookingController.changeStatus)

module.exports = router;
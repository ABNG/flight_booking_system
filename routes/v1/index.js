const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const flightRoute = require('./flight.route');
const flightBookingRoute = require('./flightbooking.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/flight', flightRoute);
router.use('/booking', flightBookingRoute);

module.exports = router;

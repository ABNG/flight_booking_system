const mongoose = require('mongoose');
const {toJSON} = require('./plugins');
const SeatSchema= mongoose.Schema({
   seat_number:{
       type: Number,
       required: true,
       min: 1,
   },
    isavailable:{
       type: Boolean,
        required: true,
        default: true,
    }
});

SeatSchema.plugin(toJSON);

module.exports =SeatSchema;
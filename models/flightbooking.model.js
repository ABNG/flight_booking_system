const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const {toJSON} = require('./plugins');

const FlightBookingSchema=mongoose.Schema({
   user_id :{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User',
       required: true,
   },
    flight_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flight',
        required: true,
    },
    selected_seat:{
        type: Number,
        required: true,
    },
    booking_status:{
        type: String,
        enum:["pending","confirmed","rejected"],
        default: "pending"
    }
});

FlightBookingSchema.plugin(toJSON);
FlightBookingSchema.plugin(mongoosePaginate);

const FlightBooking= mongoose.model('FlightBooking',FlightBookingSchema);

module.exports= FlightBooking;
const mongoose = require('mongoose');
const mongoosePaginate=require('mongoose-paginate-v2');
const SeatSchema = require('./seat.model');
const {toJSON} = require('./plugins');
const FlightSchema= mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required:true,
    },
    trip:{
        type: String,
        enum: ["one way", "round"],
        default: "one way"
    },
    class :{
        type: String,
        enum:["economy","business"],
        default: "economy"
    },
    price:{
        type: Number,
        required: true,
        set: v => Math.round(v),
        get: v => Math.round(v),
    },
    offerprice:{
        type: Number,
        default: 0,
        set: v => Math.round(v),
        get: v => Math.round(v),

    },
    to: {
        type: String,
        required: true,
    },
    from: {
        type: String,
        required: true,
    },
    departure:{
        type: Date,
        required: true,
    },
    arrival:{
        type: Date,
        required: true,
    },
    duration:{
        type: String,
        required: true,
    },
        seats:[{type:SeatSchema,required: true}],
},
    {
        timestamps: true,
    },);

FlightSchema.plugin(toJSON);
FlightSchema.plugin(mongoosePaginate);

FlightSchema.pre('validate',function (next){

    const flight = this;
    if(!(flight.price> flight.offerprice)){
        next(new Error('offer price should be smaller than original price'));
    }
    next();

});

const Flight= mongoose.model('Flight',FlightSchema);

module.exports= Flight;
var mongoose = require('mongoose');



var UserInfoSchema = new mongoose.Schema({
    usrName : String,
    realName : String,
    email : String,
    password: String,
    isAdmin : Boolean
})

/*
var UserGardenSchema = new mongoose.Schema({
    user : Objectid,
    units : [{
        name : String, 
        beds : [{
            name : String,
            vegets : [String],
            numVeget : Number
        }],
        numBed : Number}],
    numUnit : Number,
    name : String
});

var UnitMonthlyStatistic = new mongoose.Schema({
    usrName : String,
    unitIndex : Number,
    date : Date,
    status : [
        {
            day : Number,
            ph : Number,
            nitrat : Number,
            temp : Number
        }
    ])

var UnitDailyStatistic = new mongoose.Schema({
    usrName : String,
    unitIndex : Number,
    date : Date,
    hourly : [{
        hour : Number,
        ph : Number,
        nitrat : Number,
        temp: Number
    }]
})
*/

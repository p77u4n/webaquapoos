var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var ResearcherInfoSchema = new mongoose.Schema({
    usrName : String,
    realName : String,
    email : String,
    password: String,
    isAdmin : Boolean
});

ResearcherInfoSchema.index({usrName : 1}, {unique : true});

ResearcherInfoSchema.methods.comparePassword = function(password, callback) {
    bcrypt.compare(password, this.password, callback);
}

ResearcherInfoSchema.pre('save', function(next) {
    if(!this.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(function(err, salt) {
        if(err) {return next(err);}
        bcrypt.hash(this.password, salt, function(err, hash){
            if(err) {return next(err);}

            this.password = hash;
            return next();
        });
    });
});

exports.ResearcherInfoSchema = ResearcherInfoSchema;
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

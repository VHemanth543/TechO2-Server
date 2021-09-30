const mongoose = require('mongoose')



const formSchema = new mongoose.Schema({

    
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    
     Type:{
            type:String,
            require : true
    },

    email : {
        type : String,
        required : true
    },
    
    password : {
        type : String,
        required : true
    },
    phone :{
        type: Number,
        require : false
    },


    date : {
        type : Date,
        default : Date.now 
    }
})



const Form = mongoose.model('Form' , formSchema)

module.exports = Form;
const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Validator = require('password-validator')
const reportSchema = new mongoose.Schema({
    //properties
    name:{
        type:String,
        required:true,
        trim:true  
    },
   
    age:{
        type:Number,
        default : 23,
        validate(ageValue){
            if(ageValue<=0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    email:{
        type:String,
        required : true,
        trim:true,
        lowercase:true, 
        unique : true,

        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password:{
      
        type:String,
        required:true,
        validate(value){
            if(!validatePassword(value)){
                throw new Error('Password is invalid')
            }
        }
        
    },
    phoneNumber:{
        type : String,
        required : true,
       
       validate(value){
        if(!validatePhone(value) && value[0]!==0){
            throw new Error('Phone Number is invalid')
        }
       }
        
    },
    image : {
        type : Buffer
        // data : Buffer,
        // contentType : String
    },

    

      
    
    // news : [
    //     {
    //         type : mongoose.Schema.Types.ObjectId,
    //         ref : 'New'
    //     }
    // ]

})



const validatePassword = function(value){

    // Create a schema
var schema = new Validator();

// Add properties to it
schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values
return schema.validate(value)
}


const validatePhone = function(value){

    // Create a schema
var schema = new Validator();

// Add properties to it
schema
.is().min(11)                                    // Minimum length 11
.is().max(11)                                  // Maximum length 11
.has().not().uppercase()                              // Must have not uppercase letters
.has().not().lowercase()                        // Must not have lowercase letters
// .has().digits()                                
.has().not().spaces()                           // Should not have spaces
return schema.validate(value)
}
// another way to validate phone

// function validatePhone(inputtxt)
// {
//   var phoneno = /^\d{10}$/;      
//   return phoneno.test(inputtxt)
// }

//////////////////////////////////////////////////////////////////////////////////

// another way to validate password

// Check at least one number and one Capital letter exists in the password and minimum length of 12 characters
// function validatePassword(pwd)
// {
//   var re = /^(?=.*\d)(?=.*[A-Z])(.{12,50})$/
  
//   return re.test(pwd)
// }

/////////////////////////////////////////////////////////////////////////////////////////

// another way to validate phone

// function validatePhone(input_str) {
//     var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

//     return re.test(input_str);
// }

// function validatePhone(pwd) {
    
//   var re = /\d{3}-\d{3}-\d{4}/
//   return re.test(pwd)
// }




// virtual 

// create virtual relation 
reportSchema.virtual('news',{
    localField : '_id',
    foreignField : 'client',
    ref : 'News'
})





reportSchema.pre('save',async function(){
    // this --> document
    // console.log(this)
    if(this.isModified('password')){
    this.password = await bcryptjs.hash(this.password,8)
    }
})
/////////////////////////////////////////

// findByCredentials --> login
// function body
// email --> req.body.email
// password --> req.body.password

reportSchema.statics.findByCredentials = async(email,password)=>{
    const reporter = await Reporter.findOne({email})
    console.log(reporter)

    if(!reporter){
        throw new Error('Please Check Your Email ')
    }
   const isMatch = await bcryptjs.compare(password,reporter.password)
if(!isMatch){
    throw new Error ('Please Check your Password')
}
return reporter
}
////////////////////////////////////////////////////////////////////////////////

// create Token 
// function body

reportSchema.methods.generateToken = function(){
    // create token 
    // console.log(this)
    const token = jwt.sign({_id:this._id.toString()},'nodeAPI')
    return token
}



const Reporter = mongoose.model('Reporter',reportSchema)

module.exports = Reporter
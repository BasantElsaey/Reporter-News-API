const express = require('express')
const router = express.Router()
const Reporter = require('../DataBase/models/reporters')
const auth = require('../DataBase/middleware/auth')
const multer = require('multer')

// cb --> callback
const upload = multer({
    fileFilter(req,file,cb){
        // wdwsgh@$.pdf --> /\ . $/
        // /\ --> accept anything 
        // . --> after . access any kind of format from down
        if(!file.originalname.match(/\.(jpg|jpeg|png|jfif)$/)){
              
           return cb(new Error ('Please upload an image'),null)
        }
        cb(null,true)
    }
})


router.post('/signup',upload.single("Avatar"),async(req,res)=>{
    try{
        const reporter = new Reporter(req.body)
        reporter.image = req.file.buffer
       // console.log(user)
        await reporter.save()
        const token = reporter.generateToken()
        res.send({reporter,token})
    }
    catch(e){
        res.send(e.message)
    }
})


////////////////////////////////////////////////////////////////////////////////////

// Avatar --> body --> form-data --> key
router.post('/profileImage',auth,upload.single('Avatar'),async(req,res)=>{
    try{
        req.reporter.image = req.file.buffer
        await req.reporter.save()
        res.send("Image is saved successfully")
    }
    catch(e){
        console.log(e.message)
    }
   
})
//////////////////////////////////////////////////////////////////
// login

router.post('/login',async(req,res)=>{
    try{
        const reporter = await Reporter.findByCredentials(req.body.email,req.body.password)
        const token = reporter.generateToken()
        res.send({reporter,token})
    
   
    }
    catch(e){
        console.log(e.message)
    }

})


////////////////////////////////////////////////////////////////

// get all
router.get('/reporters',auth,(req,res)=>{
   Reporter.find({}).then((data)=>{
        res.send(data)
    }).catch((e)=>{
        res.send(e)
    })
})

////////////////////////////////////////////////////////////////////

// get by id
// :id --> dynamic
router.get('/reporters/:id',auth,(req,res)=>{
    //console.log(req.params)
    const _id = req.params.id
    // document 
    /**
     * {
     * name:}
     */
   Reporter.findById(_id).then((reporter)=>{
        if(!reporter){
            return res.send('No reporter is found')
        }
        res.send(reporter)
    }).catch((e)=>{
        res.send(e)
    })
    
})
//////////////////////////////////////////////////////////////////////
//async --> function return promise
//await --> wait till promise finish
router.get('/profile',auth,(req,res)=>{
res.send(req.reporter)
})
////////////////////////////////////////////////////////////////////


// password
router.patch('/reporter/:id',auth,async(req,res)=>{
    const updates = Object.keys(req.body)
    console.log(updates) // ['name','age','password']
    try{
        const _id = req.params.id
        // bypass save
       const reporter = await Reporter.findById(_id)
       console.log(reporter)
        if(!reporter){
            return res.send('No reporter is found')
        }
        updates.forEach((el)=> reporter[el] = req.body[el])
        await reporter.save()
        res.send(reporter)
    }
    catch(e){
        res.send(e.message)
    }
})

// delete
router.delete('/reporter/:id',auth,async(req,res)=>{
    try{
        const _id = req.params.id
        const reporter = await Reporter.findByIdAndDelete(_id)
        if(!reporter){
            return res.send('No reporter is found')
        }
        res.send(reporter)
    }
    catch(e){
        res.send(e.message)
    }
})

module.exports = router
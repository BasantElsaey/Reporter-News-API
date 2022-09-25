const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const auth = require('../DataBase/middleware/auth')

const News = require('../DataBase/models/news')



// version 2
router.post('/news',auth,async(req,res)=>{
    try{
        // ... spread operator
        console.log(req.reporter)
        const news = new News({...req.body,client:req.reporter._id,userName:req.reporter.name})
        await news.save()
        res.send(news)
    }
    catch(e){
        res.send(e.message)
    }
})

// get all

router.get('/news',auth,async(req,res)=>{
    try{
        await req.reporter.populate("news")
        res.send(req.reporter.news)
    }
    catch(e){
        res.send(e.message)
    }
})



// get by id

router.get('/news/:id',auth,async(req,res)=>{
    try{
        const _id = req.params.id
        const news = await News.findOne({_id, client : req.reporter._id})
        if(!news){
           return res.send('No news is found')
        }
        res.send(news)
    }
    catch(e){
        res.send(e.message)
    }
})


router.get('/ReporterNews/:id',auth,async(req,res)=>{
    try{
       const _id = req.params.id
       const news = await News.findById(_id)
        if(!news){
           return res.send('No news is found')
        }
        await news.populate('client')
        res.send(news.client)
    }
    catch(e){
        res.send(e.message)
    }
})


router.patch('/news/:id',auth,async(req,res)=>{
    try{
        // const task = await Task.findByIdAndUpdate(req.params.id,req.body,{
        //    new:true,
        //    runValidators:true
        // })

        const _id = req.params.id
        const news = await News.findOneAndUpdate({_id,client:req.reporter._id},req.body,{
            new:true,
            runValidators:true
        })
        if(!news){
            return res.send('No news is found')
        }
        res.send(news)
    }
    catch(e){
        res.send(e.message)
    }
})



router.delete('/news/:id',auth,async(req,res)=>{
    try{
        // const task = await Task.findByIdAndDelete(req.params.id)
       const _id = req.params.id
       const news = await News.findOneAndDelete({_id,client:req.reporter._id},req.body,)
        if(!news){
            return res.send('No news is found')
        }
        res.send(news)
    }
    catch(e){
        res.send(e.message)
    }

})

module.exports = router
const express = require('express')
const app = express()
const port = process.env.PORT || 3000



require('./DataBase/mongoose')
// parse automatic to json 
app.use(express.json())

const reportRouter = require('./routers/report_router')

app.use(reportRouter)

const newsRouter = require('./routers/news_router')
app.use(newsRouter)


const mongodb = require('mongodb')
// const mongoClient = mongodb.MongoClient



// const connectionURL = 'mongodb://127.0.0.1:27017'
// const dbName = 'news-manager'
// mongoClient.connect(connectionURL,(error,client)=>{
//     if(error){
//         return console.log('Error has ocurred')
//     }
//     console.log('success')

  
//     const db = client.db(dbName)


// db.collection('news').insertMany([

//     {title:'Rossia war', description : 'There is a war in Ukranie'},
//     {title:'weather conditions',description : 'Waether is cool these days'},
//     {title:'sea waves', description : 'There are high waves these days'},
  
// ])

// db.collection('news')

// db.collection('reporters').insertMany([

//     {name:'Ahmed',age:24},
//     {name:'Mohamed',age:27},
//     {name:'Hossam',age:28}
    
// ])

// db.collection('reporters')

// })
// .deleteMany({})


// const mongoose = require('mongoose')
// mongoose.connect('mongodb://127.0.01:27017/task-manger-api')

// require('./DataBase/mongoose')




/////////////////////////////////////////////////////////////////////////////////

// token 
// npm i jsonwebtoken

const jwt = require('jsonwebtoken')
const myToken = () =>{

    // header/payload/signature
    // header --> info about token algo
    // payload --> id
    // secretkey

    const token = jwt.sign({_id:'123'},'nodecourse')
    console.log(token)

    // verify
    const tokenVerify = jwt.verify(token,'nodecourse')
    console.log(tokenVerify)

}
myToken()


//////////////////////////////////////////////////////////////////

app.listen(port,() =>{
    console.log(`News app is done successfully ${port}`)
})

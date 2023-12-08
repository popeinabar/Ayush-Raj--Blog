require('dotenv').config()

const mongoose=require('mongoose')
const express= require('express')
const blogRoutes=require('./routes/blogs')
const userRoutes= require('./routes/users')
const cors = require('cors');


// express app
const app = express()

app.use(cors());

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console. log(req.path, req.method) 
next()
})
// routes
app.use('/api/blogs',blogRoutes)

app.use('/api/user',userRoutes)


//connect to db
mongoose.connect(process.env.MONG0_URI)
.then(()=>{

    //listen for req
    app.listen(process.env.PORT,()=>{
        console.log('connceted to db and listning to port ', process.env.PORT)
    })
})
.catch((error)=>{
    console.log(error)
})



const app = require('./app')
const cloudinary = require('cloudinary')

// DataBase Import 
const connectDatabase = require('./config/database');

const dotenv = require('dotenv');

// Handle Uncaught exception
process.on('uncaughtException' , err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('shutting down server due to uncaught exception');
    process.exit(1)
})

// Setting up Config File 

if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })

//dotenv.config({path:'backend/config/config.env'})

 // Setting up cloudinary configuration
cloudinary.config({

    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY ,
    api_secret : process.env.CLOUDINARY_API_SECRET



})




// Connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT : ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

// Handle Unhandled Promise rejections

process.on('unhandledRejection',err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting Down the server to Unhandled Promise Rejections');
    server.close(()=>{
        process.exit(1)
    })
})
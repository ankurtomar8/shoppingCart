const app = require('./app')

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

dotenv.config({path:'backend/config/config.env'})

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
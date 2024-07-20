const express = require('express');
const app = express();
const task = require('./routes/tasks');
const connectDB = require('./DB/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errHandlerMiddleware = require('./middleware/error-handler');

//middleware 
app.use(express.static('./public'));
app.use(express.json());  //parsing the json to get req.body


//routes
app.use('/api/v1/tasks', task);
app.use(notFound);
app.use(errHandlerMiddleware);


const port = process.env.PORT || 3000
//Fix for some errors
process.setMaxListeners(0);


const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => { console.log(`Server listening on port ${port}...`);})

    }   
    catch(err){
        console.log(err)
    }
}

start()


const mongoose = require('mongoose')

// const connectionString = 
//  'mongodb+srv://swapnilchaki:zTWfKL3Kwma2ilbL@nodeexpressprojects.bv0sgo1.mongodb.net/03-TASK-MANAGER?retryWrites=true&w=majority&appName=NodeExpressProjects'

const connectDB = (url) => {
    return mongoose.connect(url,  //returns a promise
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify:true,
            useUnifiedTopology: true 
        })
}

module.exports = connectDB;

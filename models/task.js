const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Error: must provide name'],
      trim: true,
      maxlength: [20, 'Error: name can not be more than 20 characters'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  })

  module.exports = mongoose.model('Task', TaskSchema);

// const TaskSchema = new mongoose.Schema({  //using a constructor 
//     name : {
//         //validators
//         types: String,  //sets the type of data
//         required: [true, 'Req Error: Please provide a name'],  //user has to provide a name or else error msg is pop up
//         trim: true,  //trims the spaces in given name For eg:  "  John  " --> "John"
//         maxlength: [20, 'Length Error: Name cannot be more than 20 characters'],
//     },
//     completed:{
//         type:Boolean,
//         default:false,

//     }
// })


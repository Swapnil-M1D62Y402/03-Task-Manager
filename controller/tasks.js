const Task = require('../models/task');
const AsyncWrapper = require('../middleware/async');

//ALL the CRUD OPERATIONS 
// app.get('/api/v1/tasks')            - get all the tasks 
// app.post('/api/v1/tasks')           - create a new task 
// app.get('/api/v1/tasks/:id')        - get single task
// app.patch('/api/v1/tasks/:id')      - update a task 
// app.delete('/api/v1/tasks/:id')     - delete a task


const getAllTasks = async (req,res) => {

    try{
        const tasks = await Task.find({})
        return res.status(201).json({tasks, amount:tasks.length})
        //1. return res.status(201).json({success:true ,data:{tasks, amount:tasks.length}})
        //2. return res.status(201).json({status :'success' ,data:{tasks, amount:tasks.length}})

    }
    catch(err){
        console.log(err);
        res.status(500).json({msg: err});
    }
}

//Using the AsyncWrapper --> I didnt use it, as the logic gets complicated with the wrapper
//But it can be used to all the CRUD functions, just wrap the functions and remove the try catch blocks
const AsyncgetAllTasks = AsyncWrapper(async (req,res) => {
    const tasks = await Task.find({})
    return res.status(201).json({tasks, amount:tasks.length})
})

const getTask = async (req,res) => {
    try{
        const {id:taskID} = req.params;
        const task = await Task.findOne({_id:taskID});
        if(!task){     //***IMPORTANT*** Always return the res for error. Or else both res.json gets sent
            return res.status(404).json({msg: `No Task with ID : ${taskID}`})
        }
        else{
            res.status(200).json({task});
        }
    }
    catch(err){
        res.status(500).json({msg: err})
    }
}

const createTask = async (req,res) => {
    try{
        const task = await Task.create(req.body); // we are using try and catch block as without it, errors will cause the server to just hang up
        res.status(201).json({task});
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg: err});
    }
}

const updateTask = async (req,res) => {
    try{
        const {id:taskID} = req.params;
        
        const task = await Task.findOneAndUpdate({_id:taskID}, req.body, {
            new:true, 
            runValidators:true, 
        });
        if(!task){
            return res
                    .status(404)
                    .json({msg: `No Task exists with ID: ${taskID}`});
        }
        else{
            res.status(200).json({task: task});
        }
    }
    catch(err){
        res.status(400).json({msg: err});
    }
}

const deleteTask = async (req,res) => {
    try{
        const {id:taskID} = req.params;
        const task = await Task.findOneAndDelete({_id:taskID});
        if(!task){
            return res
                    .status(404)
                    .json({msg: `No Task exists with ID: ${taskID}`});
        }
        else{
            res.status(200).json({task: null, status: 'success'});
        }
    }
    catch(err){
        res.status(404).json({msg: err});
    }
    res.send('delete task');
}

module.exports = {
    getAllTasks, 
    getTask,
    createTask,
    updateTask,
    deleteTask,
    AsyncgetAllTasks
}
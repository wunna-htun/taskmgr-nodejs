const Task = require("../models/Task")


// get all tasks
const getAllTasks =async (req, res) => {

    try {

        const tasks=await Task.find({})
        res.status(200).json({tasks})

    } catch (error) {
        res.status(500).json({msg:error})

    }

}

// create Task
const createTask = async(req, res) => {
    
    try {
        const task = await Task.create(req.body)
        res.status(201).json(task)
    } catch (error) {
        res.status(500).json({msg:error})
    }

}

// get task by id 
const getTask = async(req, res) => {
  
    try {
        const {id:taskId}=req.params
        const task=await Task.findOne({_id:taskId})

        if(!task){
            return res.status(404).json({msg:`No Task with id : ${taskId}`})
        }
        res.status(201).json(task)


    } catch (error) {
        res.status(500).json({msg:error})
    }


}

// update Task
const updateTask = async (req, res) => {

    try {
        const {id:taskId}=req.params;
        const task=await Task.findOneAndUpdate({_id:taskId},req.body)
        if(!task){
            return res.status(404).json({msg:`No Task with id : ${taskId}`})
        }
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

// delete task by id 
const deleteTask = async(req, res) => {
    try {
        const {id:taskId}=req.params;
        const task=await Task.findOneAndDelete({_id:taskId})
        if(!task){
            return res.status(404).json({msg:`No Task with id: ${taskId} `})
        }
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({msg:error})

    }
    
}


module.exports={
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}
const Task = require("../models/Task")
  /**
         * @swagger
         * components:
         *   schemas:
         *     Task:
         *       type: object
         *       required:
         *         - name
         *         - complete
         *       properties:
         *         id:
         *           type: string
         *           description: The auto-generated id of the task
         *         name:
         *           type: string
         *           description: The task name
         *         complete:
         *           type: boolean
         *           description: Task complete
         *       example:
         *         id: d5fE_asz
         *         name: Design
         *         complete: true
         */

   /**
  * @swagger
  * tags:
  *   name: Tasks
  *   description: The tasks managing API
  */




/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Returns the list of all the tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: The list of the tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */


// get all tasks
const getAllTasks =async (req, res) => {

    try {

        const tasks=await Task.find({})
        res.status(200).json({tasks})

    } catch (error) {
        res.status(500).json({msg:error})

    }

}


/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get the task by id
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task id
 *     responses:
 *       200:
 *         description: The task description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: The task was not found
 */

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



/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: The task was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       500:
 *         description: Some server error
 */

// create Task
const createTask = async(req, res) => {
    
    try {
        const task = await Task.create(req.body)
        res.status(201).json(task)
    } catch (error) {
        res.status(500).json({msg:error})
    }

}


/**
 * @swagger
 * /tasks/{id}:
 *  patch:
 *    summary: Update the task by the id
 *    tags: [Tasks]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The task id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Task'
 *    responses:
 *      200:
 *        description: The task was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Task'
 *      404:
 *        description: The task was not found
 *      500:
 *        description: Some error happened
 */

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


/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Remove the task by id
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task id
 * 
 *     responses:
 *       200:
 *         description: The task was deleted
 *       404:
 *         description: The task was not found
 */

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
////////////////////////////////////////////////////////////////////
//                          _ooOoo_                               //
//                         o8888888o                              //
//                         88" . "88                              //
//                         (| ^_^ |)                              //
//                         O\  =  /O                              //
//                      ____/`---'\____                           //
//                    .'  \\|     |//  `.                         //
//                   /  \\|||  :  |||//  \                        //
//                  /  _||||| -:- |||||-  \                       //
//                  |   | \\\  -  /// |   |                       //
//                  | \_|  ''\---/''  |   |                       //
//                  \  .-\__  `-`  ___/-. /                       //
//                ___`. .'  /--.--\  `. . ___                     //
//              ."" '<  `.___\_<|>_/___.'  >'"".                  //
//            | | :  `- \`.;`\ _ /`;.`/ - ` : | |                 //
//            \  \ `-.   \_ __\ /__ _/   .-` /  /                 //
//      ========`-.____`-.___\_____/___.-`____.-'========         //
//                           `=---='                              //
//      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^        //
//                  Buddha bless, never BUG, ​​never modify                      //
////////////////////////////////////////////////////////////////////

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Task  Express API with Swagger",
        version: "0.1.0",
        description:
          "This is a TASK CRUD API application ",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "LogRocket",
          url: "https://logrocket.com",
          email: "wunnahtun99@gmail.com",
        },
      },
      servers: [
        {
          url: "http://localhost:3000/api/v1",
        },
      ],
    },
    apis: ["./routers/*.js","./controllers/task.js"],
  };

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const tasks=require('./routers/tasks')
const connectDb=require('./db/connnect')

const swaggerJsdoc = require("swagger-jsdoc")

const swaggerUi = require("swagger-ui-express")

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);
require('dotenv').config()
// middle 
app.use(express.json())

const start =async ()=>{

    try {
        await connectDb(process.env.MONGO_URL)
        app.listen(port, () => console.log(`listening on http://localhost:${port}`));

    } catch (error) {
        console.log(error)
    }
}


// router 
app.use('/api/v1/tasks',tasks)

app.get('/', (req, res) => {
    res.send("task manager  api")
});



start()

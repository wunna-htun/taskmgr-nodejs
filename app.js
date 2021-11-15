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
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const tasks=require('./routers/tasks')
const connectDb=require('./db/connnect')
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

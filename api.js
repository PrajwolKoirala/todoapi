const express = require("express")
const app = express();

const todos_route = require("./routes/todos.js")

/*
get -fetch
post- insert
put/patch-update
delete
*/

//creating todos api

/*
// MVC PATTERN

m-modal // atabase
v-view //react
c-controller //logics

*/
 app.use("/todos",todos_route);

app.get("/todos",(req,res)=>{
    res.send([{title:"css",status:false},{},{}]
    )
})

app.listen(8000,()=>{
    console.log("server is started");
})
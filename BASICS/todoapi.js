const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Todo = require("./modal/todo.js");




mongoose.connect('mongodb://127.0.0.1:27017/todosDB')
  .then(() => console.log('Connected!')); 
  
app.use(express.json());

app.get("/todos",async (req,res)=>{
    // res.send("list of todos");
     let todos = await Todo.find({})
    res.send({
        data:todos
    })
})
app.post("/todos", async (req, res,next) => {
    try {
        const todo = new Todo(req.body);
        await todo.validate(); // This will trigger schema validation
        await todo.save();
        res.send("created");
    } catch (err) {
        // console.log(err.message);
        // res.status(400).send("Bad Request");
        next(err);
    }
});

// app.post("/todos",(req,res)=>{
//without err handeling

//     Todo.create(req.body)
//     res.send("created");
// })
//update
app.put("/todos/:id",async (req,res)=>{   //id here is a slug. slug means 
    console.log(req.params.id);
//db.todos.updateOne({id:adadf},{$set:})
    let updateTodo = await todo.findByIdAndUpdate(req.params.id,req.body,{new:true})
    // await todo.findByIdAndUpdate("64cf6ca8129b0349928d67d7",{status:true})
res.send(updateTodo) ;
})

//delete
app.delete("/todos/:id",async (req,res)=>{   //id here is a slug. slug means 
    console.log(req.params.id);
    let deleteTodo = await todo.findByIdAndDelete(req.params.id)
res.send(deleteTodo); 
})

//validation==yedi title bina lekhem vaney pani database maa without title janxa....validation le strict garxa

app.use((req,res)=> {
    // res.send("data");
    res.status(404).send({msg:"resource not found"})

})

app.use((err,req,res,next) => {
    console.log(err.message);

    console.log("Error Object:", err);
    console.log(err.name);
let errors = null;
console.log(err.errors);

    let status = 500;
    let msg = "Server Error"
    if (err.name === "ValidationError"){
        status = 400;
        msg = "bad request"

        let error_arr = Object.entries(err.errors)
        let temp = []
        error_arr.forEach(el => {
            let obj = {}
            obj.params = el[0]
            obj.msg = el[1].message
            temp.push(obj)
        });
        errors = temp;
    }
    res.status(status).send({msg: msg , errors})
})

app.listen(8090, () => {
    console.log("server started");
});

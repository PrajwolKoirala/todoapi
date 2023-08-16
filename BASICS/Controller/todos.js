
// app.get("/todos",(req,res)=>{
//     res.send([{title:"css",status:false},{},{}]
//     )
// })

const fetchTodos = (req , res) => {
    res.send ([{title :"css",status : false},{},{}])
}

const createTodos = (req,res) => {
    res.send("prodict created")
}

module.exports ={
    fetchTodos : fetchTodos,
    createTodos : createTodos
}
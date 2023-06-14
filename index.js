const express = require('express')
const bodyparser = require('body-parser')
const app = express()
const PORT = 3000


app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json());

let alist = []

app.get("/blogs",(req,res)=>{
    res.status(200).json({
        data : alist,
        success : true
    })
    
})

app.post('/blogs',(req,res)=>{
    alist.push({
        title: req.body.Title,
        content: req.body.content,
        id: Math.floor(Math.random()*1000)
    })
    res.send({
        sucess: true
    })
})

app.get('/blogs/:id',(req,res)=>{
    const result = alist.filter((word)=> word.id == req.params.id);
    res.send({
        data: result,
        success: true
    })
})

app.delete('/blogs/:id',(req,res)=>{
    let index
    for(let i=0;i<alist.length;i++)
    {
        if(alist[i].id==req.params.id)
        {
            index=i
        }
    }
    alist.splice(index,1)

    res.status(200).json({
        data : alist,
        success : true
    })
})


app.listen(PORT,()=>{
    console.log("server is running at port: ",PORT)
})
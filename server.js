const express=require('express')

const app=express()

app.get('/',(req,res)=>{
    res.send('home page')
})

app.get('/admin',(req,res)=>{
    res.end('admin page')
})
app.listen(3000)
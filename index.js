const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const FriendModel = require('./models/friends')
require('dotenv').config()
//database connection
mongoose.connect(process.env.DBURI,{useNewUrlParser: true})

//middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
    
app.post('/addFriend',async (req,res) => {
    // const friend = new FriendModel({name:'Jessica',age:'45'})
    // const resp = await FriendModel.save()
    const {name,age} = req.body
    const resp = await FriendModel.create({name,age})
    console.log('************',resp)
    res.status(201).json(resp)
})

app.get('/read',async (req,res) => {
    // const friend = new FriendModel({name:'Jessica',age:'45'})
    const resp = await FriendModel.find({})
    console.log('--------------',resp)
    res.json(resp) 
    
})


app.put('/update',async (req,res) => {
    const {id,newAge} = req.body
    try{
        const friend = await  FriendModel.findById(id)
            // ,async (error,friendtoUpdate)=>{
        //     if(error){
        //         res.status(400).json(error)
        //     } else {
        //         friendtoUpdate.age = Number(newAge)
        //         await friendtoUpdate.save()
        //         res.json(friendtoUpdate)
        //     }    
        // })
        if(friend){
            friend.age = newAge
            await friend.save()
            res.json(friend)
        } else {
            res.send('was not able to update!')
        }
    } catch (e) {
        console.error(e.message)
        res.json({error:e.message})
    }
})


app.delete('/delete/:id',async (req,res) =>{
    const id = req.params.id
    try{
        const friend = await FriendModel.findByIdAndRemove(id).exec()
        res.json(friend)
    } catch (e) {
        console.error(e.message)
    }
})

app.listen(process.env.PORT || 5000, () => {
    console.log('listening on port 5000')
})
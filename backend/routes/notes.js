const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/middleware.js');
const Notes = require('../models/Notes.js');
const { body, validationResult } = require('express-validator');
const fecthuser = require('../middleware/middleware.js');

//get all notes 
router.get('/fetchuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    }
    catch (error) {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    }
});

//add a new note 
router.post('/addnotes', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, description, tag, user } = req.body;
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Error Occu");
    }
});

//update an existing node
//router.get('/fecthnotes', fetchuser, async (req, res) => {

router.put('/updatenotes/:id',fetchuser,async(req,res,)=>{

    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const{title,description,tag} = req.body;
        const newNote ={};
        if(title){
            newNote.title = title; 
        } 
        if(description){
            newNote.description = description; 
        }  
        if(tag){
            newNote.tag = tag; 
        } 
        //find the note to be update 
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found");
        }
        if(note.user.toString()!== req.user.id){
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true});
        res.json({note});

    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Error Occu");
    }
})

//To delete the note
router.delete('/deletenotes/:id',fecthuser,async(req,res)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const newNote ={};
       
        //find the note to be update 
        const mongoose = require('mongoose');
        console.log(mongoose.Types.ObjectId.isValid('62cdd52e4a2c15eb4bfd0570'));

        var note = {};
        note.id =  await Notes.findById(req.params.id);
       

        //let note = await Notes.findById({_id: req.params.id});
    //     if(!note){
    //         return res.status(404).send("Not Found");
    //     }
    //     if(note.user.toString()!== req.user.id){
    //         return res.status(401).send("Not Allowed");
    //     }
    // note = await Notes.findByIdAndDelete({_id: req.params.id});

        res.json("Note Deleted");

    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Error Occu");
    }


    //making new note object
    // const{title,description,tag} = req.body;
    // const mongoose = require('mongoose');
    // console.log(mongoose.Types.ObjectId.isValid('62cf22897e70e3325f799a0b'));
    // let note = await Notes.findById(req.params.id);
    // if(!note){
    //     return res.status(404).send("Not Found");
    // }
    // if(note.user.toString()!== req.user.id){
    //     return res.status(401).send("Not Allowed");
    // }

    // // note =  Notes.findByIdAndDelete(req.params.id);

    // res.json("Note Deleted");
})
module.exports = router;
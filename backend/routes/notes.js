const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require('express-validator');

const router = express.Router();

//Route 1: Get all the Logged-in user's notes using: get /api/notes/fetchallnotes. Login required.
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal sever error");
    }
});
//Route 2: Add a note using: POST /api/notes/addnote. Login required.
router.post("/addnote", fetchuser, [
    body("title", "Enter a valid Title.").isLength({ min: 3 }),
    body("description", "Min Length 5 Char").isLength({ min: 5 }),
], async (req, res) => {
    try {
        //In case of errors, return Bad Request and corresponding error.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, tag } = req.body;
        const note = new Notes({
            title, description, tag, user: req.user.id
        });
        const savednote = await note.save();
        res.json(savednote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal sever error");
    }
});

//Route 3: Update an existing note using: PUT /api/notes/updatenote. Login required.
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        //create new note object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //Find the note to be updated and update it.
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }
        if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") }

        note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote}, {new:true});

        res.json({note});
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal sever error");
    }
});

//Route 4: Delete an existing note using: Delete /api/notes/deletenote. Login required.
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        //Find the note to be deleted.
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }
        if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") }

        note = await Notes.findByIdAndDelete(req.params.id);

        res.json({"success":"Delete Success", note:note});
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal sever error");
    }
});

module.exports = router;
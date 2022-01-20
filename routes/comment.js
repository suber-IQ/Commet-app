const express = require("express")
const Comment = require("../models/comment")
const router = express.Router();

router.post("/comments" , (req, res) => {
    const comment = new Comment({
        username: req.body.username,
        comment: req.body.comment,

    })
     comment.save().then(response => {
         res.send(response)
     })

})
router.get("/comments" , (req, res) => {
     Comment.find().then(comments => res.send(comments))
})




module.exports = router


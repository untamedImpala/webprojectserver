var express = require("express");
var router = express.Router();

const _ = require("lodash");
const auth = require("../middleware/auth");

const { User } = require("../models/user");
const { Post } = require("../models/post");
const { Like } = require("../models/like");

router.get("/like/:id", auth, async (req, res) => {
    try {
        let user = await User.findById(req.user._id);
        if (!user) return res.status(400).send("Can't find User!");

        let post = await Post.findById(req.params.id);
        if (!post) return res.status(400).send("Post not found!");

        let like = await Like.findOneAndUpdate(
            { post: post._id },
            {
                $addToSet: {
                    likedBy: req.user._id,
                },
            }
        );

        res.status(200).send();
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
});

router.get("/unlike/:id", auth, async (req, res) => {
    try {
        let user = await User.findById(req.user._id);
        if (!user) return res.status(400).send("Can't find User!");

        let post = await Post.findById(req.params.id);
        if (!post) return res.status(400).send("Post not found!");

        like = await Like.findOneAndUpdate(
            { post: post.id },
            {
                $pull: {
                    likedBy: req.user._id,
                },
            }
        );

        res.status(200).send();
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
});

module.exports = router;

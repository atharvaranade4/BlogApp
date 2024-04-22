const router = require("express").Router();
const Post = require("../models/Post");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// CREATE POST
router.post("/", upload.single("blogImage"), async (req, res) => {
  console.log("BODY", req.body);
  console.log("FILE", req.file);
  try {
    const { title, desc, username } = req.body;

    const newPost = new Post({
      title,
      desc,
      username,
      blogImage: {
        data: req.file.buffer.toString("base64"),
        contentType: req.file.mimetype,
      },
    });

    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (e) {
        res.status(500).json(e);
      }
    } else {
      res.status(401).json("You can update only your post");
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

// DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json("Post has been deleted");
      } catch (e) {
        res.status(500).json(e);
      }
    } else {
      res.status(401).json("You can delete only your post");
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

// GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (e) {
    res.status(500).json(e);
  }
});

// GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username: username });
    } else if (catName) {
      posts = await Post.find({ categories: { $in: [catName] } });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;

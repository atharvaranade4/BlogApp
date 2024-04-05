const router = require("express").Router();
const Category = require("../models/Category")

// POST
router.post("/", async (req, res) => {
  const newCategory = new Category(req.body)
  try {
    const savedCat = await newCategory.save()
    res.status(200).json(savedCat)
  } catch(e) {
    res.status(500).json(e)
  }
});

// GET
router.get("/", async (req, res) => {
  try {
    const cats = await Category.find()
    res.status(200).json(cats)
  } catch(e) {
    res.status(500).json(e)
  }
})


module.exports = router;
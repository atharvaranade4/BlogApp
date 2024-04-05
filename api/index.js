const express = require("express");
const app = express();
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const multer = require("multer")
const cors = require('cors');

const authRoute = require("./routes/auth")
const usersRoute = require("./routes/users")
const postsRoute = require("./routes/posts")
const categoriesRoute = require("./routes/categories")


dotenv.config();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL,{})
.then(console.log("connected to MONGODB"))
.catch((e) => console.log(e))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images")
  }, filename: (req, file, cb )=> {
    cb(null, req.body.name)
  }
});
const upload = multer({storage: storage})

app.post("/api/upload", upload.single("file"), (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const reqPlaceHolder = req.query.name;
  res.status(200).json("file is uploaded")
});


app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/posts", postsRoute)
app.use("/api/categories", categoriesRoute)

app.listen("5000", () => {
    console.log("Backend is running")
})
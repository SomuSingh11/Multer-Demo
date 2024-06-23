const path = require("path");
const express = require("express");
const { json } = require("body-parser");
const multer = require("multer");

const app = express();
const PORT = 3000;

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // destination is used to specify the path of the directory in which the files have to be stored
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    // It is the filename that is given to the saved file
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Use diskstorage option in multer
const upload = multer({ storage: multerStorage });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false })); //Parses Form Data

app.get("/", (req, res) => {
  return res.render("homepage");
});

app.post(
  "/upload",
  upload.fields([{ name: "pfp" }, { name: "resume" }]),
  (req, res) => {
    console.log("Body : ", req.body);
    console.log("File : ", req.files);
    return res.send("File Uploaded Successfully!");
  }
);

app.listen(PORT, () => {
  console.log(`Server started at PORT : ${PORT} `);
});

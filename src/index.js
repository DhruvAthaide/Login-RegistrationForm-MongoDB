const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");

const tempelatePath = path.join(__dirname, "../templates");

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", tempelatePath);
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("login");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  const { name, password } = req.body;

  if (password.length < 7) {
    return res.render("signup", {
      error: "Password must be at least 7 characters long.",
    });
  }

  const data = {
    name,
    password,
  };

  await collection.insertMany([data]);

  res.render("home");
});

app.all("/login", async (req, res) => {
  if (req.method === "GET") {
    res.render("login");
  } else if (req.method === "POST") {
    try {
      const check = await collection.findOne({ name: req.body.name });

      if (check.password === req.body.password) {
        res.render("home");
      } else {
        res.send("Wrong Password!");
      }
    } catch {
      res.send("Wrong Details!");
    }
  }
});

app.get("/logout", (req, res) => {
  res.redirect("/login");
});

app.listen(3000, () => {
  console.log("Port Connected at the following website http://localhost:3000/");
});

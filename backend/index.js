const express = require("express");
const Database = require("better-sqlite3"); // better-sqlite3 exports a class
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT || 8069;

// open database (synchronous, no callback)
const dbPath = "database/database.db";
let db;
try {
  db = new Database(dbPath);
  console.log("Connected to SQLite database at", dbPath);
} catch (err) {
  console.error("Error opening database:", err.message);
}

const app = express();

function addEntry(name, email, number, content) {
  const stmt = db.prepare("INSERT INTO entries (name, email, number, content)  VALUES (?, ?, ?, ?);");
  const result = stmt.run(name, email, number, content);
  return result;
}

function getEntries() {
  const stmt = db.prepare("SELECT * FROM entries;");
  const result = stmt.all();
  return result;
}

function deleteEntry(id) {
  const stmt = db.prepare("DELETE FROM entries WHERE id = ?");
  const result = stmt.run(id);
  return result;
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.render("main");
});

app.post("/submitForm", (req, res) => {
  console.log(req.body)
  const { name, email, number, content } = req.body;
  if (!name || !email || !number || !content) {
    return res.redirect("/error");
  }

  addEntry(name, email, number, content);

  return res.redirect("/");
});

app.get("/sas", (req, res) => {
  const entries = getEntries();
  if (!entries) {
    return res.redirect("/error");
  }

  return res.render("entries", { entries });
});

app.post("/deleteEntry", (req, res) => {
  const { id } = req.body;
  if (!id) return res.sendStatus(400);

  deleteEntry(id);
  return res.redirect("/sas")
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

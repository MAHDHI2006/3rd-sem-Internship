const express = require("express");
const mbd = require("mongoose");
const Signup = require("./src/models/SigupSchema");
const app = express();
const PORT = 3000;

app.use(express.json());

mdb 
  .connect("mongodb://localhost:27017/mydatabase")
  .then(() => {
    console.log("Connected to the database successfully!");
    app.get("/", (req, res) => {
      res.send("Hello, World!");
    });

    app.post("/signup",(req, res) => {
        console.log("req.body:", req.body);
        const {email, Username, Password} = req.body;
        const newSingup = new Signup({
            email: email,
            username:username,
            password:password
        } )
        newSingup.save()
        res.json({message: "User signed up successfully!","isSignedUp": true});

    });

    app.get("/json", (req, res) => {   
        res.json({ message: "This is a JSON response" });
    });
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  });

  app.post("/login", async (req, res) => {
    try {
      const { email, Password } = req.body;
      const user = await Signup.findOne({ email: email });
      console.log(existingUser);
      if (!user) {
        return res.status(404).json({ message: "User not found", isLoggedIn: false });
      }
      const isValidPassword = user.password === Password;
      if (isValidPassword) {
        return res.status(200).json({ message: "login succesfully", isLoggedIn: true });
      }
      return res.status(401).json({ message: "Invalid password", isLoggedIn: false });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Internal server error", isLoggedIn: false });
    } 
  });


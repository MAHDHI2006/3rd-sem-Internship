const express = require("express");
const connectDB = require("./config/db");
const Signup = require("./models/SignupSchema");
const Auction = require("./models/AuctionSchema");
const bcrypt = require("bcrypt");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken')
const app = express();
const PORT = process.env.PORT || 8001;

app.use(express.json());
app.use(cors())
dotenv.config()

// Connect to MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("Auction Server started successfully");
});

const verifyToken = (req,res,next) =>{
  const authHeader = req.headers.authorization
  if(!authHeader){
    return res.status(401).send("Request Denied - No Token")
  }
  
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader
  
  try{
    const payload = jwt.verify(token, process.env.SECRET_KEY)
    req.username = payload.username
    next();
  }
  catch(err){
    console.log(err);
    return res.status(401).send("Invalid Token")
  }
}

app.post("/signup", async (req, res) => {
  try {
    const { email, username, password, role, userType } = req.body;
    
    const existingUser = await Signup.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ "message": "User already exists", "isSignup": false });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Signup({
      email,
      username,
      password: hashedPassword,
      role: role || 'user',
      userType: userType || 'buyer'
    });
    
    await newUser.save();
    res.status(200).json({ "message": "Signup Successful", "isSignup": true });
  } catch (error) {
    res.status(500).json({ "message": "Signup failed: " + error.message, "isSignup": false });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await Signup.findOne({ email });

    if (existingUser) {
      const payload = {
        email: existingUser.email,
        username: existingUser.username,
        role: existingUser.role,
        userType: existingUser.userType
      }
      const isValidPassword = await bcrypt.compare(password, existingUser.password);

      if (isValidPassword) {
        const token = jwt.sign(payload, process.env.SECRET_KEY)
        res.status(200).json({
          message: "Login Successful",
          isLoggedIn: true,
          token: token,
          user: {
            username: existingUser.username,
            email: existingUser.email,
            role: existingUser.role,
            userType: existingUser.userType
          }
        });
      } else {
        res.status(401).json({
          message: "Incorrect Password",
          isLoggedIn: false,
        });
      }
    } else {
      res.status(404).json({
        message: "User not Found Signup First",
        isLoggedIn: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Login Error",
      isLoggedIn: false,
    });
  }
});

// Auction Routes
app.post('/create-auction', verifyToken, async (req, res) => {
  try {
    const { title, description, startingPrice, duration } = req.body;
    const endTime = new Date(Date.now() + duration * 60 * 60 * 1000);
    
    const newAuction = new Auction({
      title,
      description,
      startingPrice: parseFloat(startingPrice),
      currentPrice: parseFloat(startingPrice),
      seller: req.username,
      endTime,
      status: 'active',
      bids: []
    });
    
    await newAuction.save();
    res.status(201).json({ message: 'Auction created successfully', auction: newAuction });
  } catch (error) {
    res.status(500).json({ message: 'Error creating auction', error });
  }
});

app.get('/auctions', async (req, res) => {
  try {
    const activeAuctions = await Auction.find({ status: 'active' })
      .sort({ createdAt: -1 });
    res.json(activeAuctions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching auctions', error });
  }
});

app.post('/place-bid', verifyToken, async (req, res) => {
  try {
    const { auctionId, bidAmount } = req.body;
    const auction = await Auction.findById(auctionId);
    
    if (!auction || auction.status !== 'active') {
      return res.status(400).json({ message: 'Auction not available' });
    }
    
    if (parseFloat(bidAmount) <= auction.currentPrice) {
      return res.status(400).json({ message: 'Bid must be higher than current price' });
    }
    
    auction.bids.push({ bidder: req.username, amount: parseFloat(bidAmount), timestamp: new Date() });
    auction.currentPrice = parseFloat(bidAmount);
    
    await auction.save();
    res.json({ message: 'Bid placed successfully', auction });
  } catch (error) {
    res.status(500).json({ message: 'Error placing bid', error });
  }
});

app.post('/complete-auction/:id', verifyToken, async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    
    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }
    
    const highestBid = auction.bids.sort((a, b) => b.amount - a.amount)[0];
    
    auction.status = 'sold';
    auction.winner = highestBid ? highestBid.bidder : null;
    
    await auction.save();
    res.json({ message: 'Auction completed', auction });
  } catch (error) {
    res.status(500).json({ message: 'Error completing auction', error });
  }
});

app.get('/my-bids', verifyToken, async (req, res) => {
  try {
    const userBidAuctions = await Auction.find({
      'bids.bidder': req.username
    });
    res.json(userBidAuctions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bids', error });
  }
});

app.get('/getallsignup', async(req, res) => {
  try {
    const users = await Signup.find({}, { password: 0 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
})

app.listen(PORT, () => {
  console.log(`Auction Server Started Successfully in the port ${PORT}`);
});
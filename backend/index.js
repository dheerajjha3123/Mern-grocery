const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const nodemailer = require('nodemailer'); 
const Stripe = require('stripe')
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
 });
 

//MongoDB Connection




// Connect to MongoDB using Mongoose

  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to MongoDB DataBase"))
    .catch((err) => console.log(err));
// Schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  mobile : String,
  confirmpassword: String,
  image: String,
});

// Model
const userModel = mongoose.model("user", userSchema);

// API
app.get("/", (req, res) => {
  res.send("Server is running :");
});

// Sing Up

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
     user: process.env.EMAIL_USER, // Your Gmail email
     pass: process.env.EMAIL_PASSWORD, // Your Gmail password or App Password
  }
 });
 

const crypto = require('crypto');

const bcrypt = require('bcrypt');
const saltRounds = 10;

app.post("/singup", async (req, res) => {
 const { email, password } = req.body;
 try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      res.send({ message: "Email id is already registered", alert: false });
    } else {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = new userModel({ ...req.body, password: hashedPassword });
      const savedUser = await newUser.save();
      // Send confirmation email...
      res.status(201).json({ message: "User created successfully", userId: savedUser._id });
    }
 } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Internal Server Error" });
 }
});


app.get("/some-route", (req, res) => {
  const userId = req.cookies.userId;
  // Use the userId as needed...
 });




async function sendConfirmationEmail(email, token) {
  let mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email Confirmation',
      text: `Please confirm your email by clicking the following link: http://localhost:8080/confirm/${token}`
  };
  
  await transporter.sendMail(mailOptions);
 }
 
 app.get("/confirm/:token", async (req, res) => {
  const { token } = req.params;
  
  try {
      const user = await userModel.findOne({ confirmationToken: token });
      if (!user) {
        return res.status(400).send({ message: "Invalid confirmation token" });
      }
  
      user.emailConfirmed = true;
      user.confirmationToken = undefined;
      await user.save();
  
      res.send({ message: "Email confirmed successfully" });
  } catch (error) {
      console.error("Error:", error);
      res.status(500).send({ message: "Internal Server Error" });
  }
 });
 
 

// Api Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  try {
     const user = await userModel.findOne({ email: email });
     if (user) {
       const isMatch = await bcrypt.compare(password, user.password);
       if (isMatch) {
         
         // Proceed with login
         const dataSend = {
           _id: user._id,
           firstName: user.firstName,
           lastName: user.lastName,
           email: user.email,
           image: user.image,
         };
         res.send({ message: "Login is Successfully", alert: true, dataSend });
       } else {
         
         res.status(401).send({ message: "Incorrect password", alert: false });
       }
     } else {
       console.log("User not found"); // Debugging line
       res.status(404).send({ message: "User Email not found", alert: false });
     }
  } catch (error) {
     console.error("Error:", error);
     res.status(500).send({ message: "Internal Server Error" });
  }
 });
 
 



// Order Schema



const orderSchema = new mongoose.Schema({
 userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
 },
 items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Assuming you have a Product model
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
 ],
 totalAmount: {
    type: Number,
    required: true,
 },
 paymentMethod: {
    type: String,
    enum: ['cod', 'online'], // Assuming 'cod' for Cash on Delivery and 'online' for online payment
    required: true,
 },
 shippingAddress: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
 },
 status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
 },
 createdAt: {
    type: Date,
    default: () => new Date().toISOString(),
 },
});

const Order = mongoose.model('Order', orderSchema);


module.exports = Order;

app.post("/create-order", async (req, res) => {
    console.log(req.body);
  try {
     const orderDetails = req.body;
     // Ensure all required fields are present
     if (!orderDetails.userId || !orderDetails.items || !orderDetails.totalAmount || !orderDetails.paymentMethod || !orderDetails.shippingAddress) {
       return res.status(400).json({ message: 'Missing required fields' });
     }
 
     // Create a new order in the database
     const order = new Order(orderDetails);
     await order.save();
     if (orderDetails.paymentMethod === 'online') {
      // Construct the PhonePe payment URL
      const phonePePaymentUrl = `https://www.phonepe.com/pay?amount=${orderDetails.totalAmount}&orderId=${order._id}&redirectUrl=${encodeURIComponent(`${process.env.FRONTEND_URL}/payment-success`)}&cancelUrl=${encodeURIComponent(`${process.env.FRONTEND_URL}/payment-cancel`)}`;
      // Redirect the user to the PhonePe payment page
      res.redirect(phonePePaymentUrl);
    } else {
      res.status(201).json({ message: 'Order created successfully', order });
    }
 } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
 }
 });

 // Assuming this is part of your existing server setup

// Route to fetch orders by userId
app.get("/orders", async (req, res) => {
  const { userId } = req.query;
 
  try {
     let orders;
     if (userId) {
       orders = await Order.find({ userId: userId });
     } else {
       orders = await Order.find({}); // Fetch all orders if userId is not provided
     }
     res.status(200).json(orders);
  } catch (error) {
     console.error("Error fetching orders:", error);
     res.status(500).json({ message: "Internal Server Error" });
  }
 });
 

 app.put("/update-order-status/:orderId", async (req, res) => {
  try {
     const { orderId } = req.params;
     const { status } = req.body;
 
     // Check if the status is valid
     if (!['pending', 'shipped', 'delivered', 'cancelled'].includes(status)) {
       return res.status(400).json({ message: 'Invalid status' });
     }
 
     // Find the order by ID and update its status
     const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
 
     if (!order) {
       return res.status(404).json({ message: 'Order not found' });
     }
 
     res.status(200).json({ message: 'Order status updated successfully', order });
  } catch (error) {
     console.error(error);
     res.status(500).json({ message: 'Server error' });
  }
 });
 



// Product Section
const schemaProduct = mongoose.Schema({
    name : String,
    category : String,
    image : String,
    price : String,
    description : String
})

const productModel = mongoose.model("product",schemaProduct)

// Save Product in Database 
// Api
// Assuming you have a route setup for "/uploadProduct"
app.post("/uploadProduct", async (req, res) => {
 try {
    // Assuming the image is sent as a Base64 string in the 'image' field
    const { name, category, image, price, description } = req.body;

    // If you're storing the image directly in the database as a Base64 string,
    // you can proceed as is. However, if you're saving the image as a file,
    // you'll need to decode the Base64 string and save it as a file.

    // Create a new product document
    const product = new productModel({
      name,
      category,
      image, // This is the Base64 string
      price,
      description,
    });

    // Save the product document
    const savedProduct = await product.save();

    // Send a success response
    res.status(201).send({ message: "Product uploaded successfully", product: savedProduct });
 } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
 }
});


//
app.get("/product",async(req,res)=>{
  const data = await productModel.find({})
  res.send(JSON.stringify(data))
})


// Product Details Endpoint
app.get("/products/:productId", async (req, res) => {
  try {
     const product = await productModel.findById(req.params.productId);
     if (!product) {
       return res.status(404).send({ message: "Product not found" });
     }
     res.send(product);
  } catch (error) {
     console.error(error);
     res.status(500).send({ message: "Server error" });
  }
 });

 // Example DELETE endpoint
 

 app.delete("/products/:productId", async (req, res) => {
  console.log(`DELETE request received for product ID: ${req.params.productId}`);
  const productId = req.params.productId;
 
  // Validate the productId
  if (!mongoose.Types.ObjectId.isValid(productId)) {
     return res.status(400).send({ message: "Invalid product ID" });
  }
 
  try {
     const product = await productModel.findByIdAndDelete(productId);
     if (!product) {
       return res.status(404).send({ message: "Product not found" });
     }
     res.send({ message: "Product deleted successfully" });
  } catch (error) {
     console.error(error);
     res.status(500).send({ message: "Server error" });
  }
 });
 
 
 


/* Payment Gateway */








// Server Running API
app.listen(PORT, () => console.log("Server is running at port :" + PORT));

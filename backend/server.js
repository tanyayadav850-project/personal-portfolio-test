const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected Successfully!");
    })
    .catch((error) => {
        console.log("MongoDB Connection Error:", error);
    });

// Contact Schema
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Contact Model
const Contact = mongoose.model("Contact", contactSchema);

// Test route
app.get("/", (req, res) => {
    res.send("Portfolio Backend is Running!");
});

// Contact Form API
app.post("/api/contact", async (req, res) => {

    try {
        const { name, email, subject, message } = req.body;

        const newContact = new Contact({
            name,
            email,
            subject,
            message
        });

        await newContact.save();

        console.log("New Contact Message Saved!");

        res.json({
            success: true,
            message: "Your message has been saved successfully!"
        });

    } catch (error) {

        console.log("Error saving contact:", error);

        res.status(500).json({
            success: false,
            message: "Failed to save your message."
        });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
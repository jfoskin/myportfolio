const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true },
    reason: { type: String, enum: ["job", "freelance", "collab", "hello"], required: true },
    company: { type: String, trim: true },
    message: { type: String, required: true, maxlength: 5000 },
    status: { type: String, enum: ["new", "read", "replied"], default: "new" },
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact
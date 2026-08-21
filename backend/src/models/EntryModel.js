const mongoose = require('mongoose')

const entrySchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        summary: { type: String },
        tags: {
            type: [String],
            default: []
        }
    },
    {
        timestamps: true
    }

)
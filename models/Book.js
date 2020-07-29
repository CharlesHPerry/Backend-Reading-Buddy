const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookSchema = new Schema({
    api_id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
    },
    genre: {
        type: String,
    },
    image_url: {
        type: String,
    },
    description: {
        type: String,
    },
    readerExperiences: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ReaderExperiences"
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = Book = mongoose.model('Book', BookSchema)
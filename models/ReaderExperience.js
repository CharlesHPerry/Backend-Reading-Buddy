let mongoose = require('mongoose');


let ReaderExperienceSchema = new mongoose.Schema({
    rating: {
        type: Number,
        minimum: 0,
        maximum: 5
    },
    review: String,
    status: {
        type: String,
        validate: /^wishlist$|^started$|^finished$/,
        required: true
    },
    date_started: Date,
    date_finished: Date,
    book: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Book",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

module.exports = mongoose.model('ReaderExperience', ReaderExperienceSchema);

// May want to add validations later, say to make sure no one reviews books they haven't read, or to add finished status when people provide a date_finished
// will have to coordinate with front end peeps
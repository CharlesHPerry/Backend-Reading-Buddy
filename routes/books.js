const express = require('express');
const router = express.Router();

const readerExperience = require("../models/ReaderExperience");
const Book = require("../models/Book");
const User = require("../models/User");

router.get("/:api_id", (req,res) => {
    Book.find({title: req.query.title, author: req.query.author}) // we want reviews for all editions of the book, not just the one specified by req.params.api_id
        .populate("readerExperiences")
        .then(booksInfo => {
            let readerExperiencesInfo = [];
            booksInfo.forEach(book => {
                readerExperiencesInfo.concat(book.readerExperiences);
            })
            readerExperiencesInfo.forEach((experience, index) => {
                if (!experience.rating && !experience.review) {
                    readerExperiencesInfo.splice(index, 1);
                }
            })
            res.send({readerExperiencesInfo});
        })
        .catch(err => {
            res.send({error: `Error in books controller show route: ${err}`});
        })
})


// old version of Create Book - it's now handled by readerExperiences controller.
/*
router.post("/", (req,res) => {
    Book.findOne({title: req.body.title})
    .then(foundBook => {
        if (foundBook && (foundBook.author == req.body.author)) {
            res.redirect(`/books/${foundBook._id}`)
        } else {
            Book.create(req.body)
            .then(createdBook => {
               res.redirect(`/books/${createdBook._id}`);
            })
            .catch(err => {
                res.send({error: `Error in books controller create route creating book: ${err}`})
            })
        }
    })
    .catch(err => {
        res.send({error: `Error in books controller create route finding book: ${err}`})
    })
})
*/

module.exports = router;
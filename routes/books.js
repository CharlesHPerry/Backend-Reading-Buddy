const express = require('express');
const router = express.Router();

const readerExperience = require("../models/ReaderExperience");
const Book = require("../models/Book");
const User = require("../models/User");

//const SEEDFILE = require('../seed2.js'); 
const BIG_OL_LIST = require('../seed2.js');

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

// only use for seeding db
router.post("/", (req, res) => {
    // format list so we can insert it with a single Mongoose create() call.
    BIG_OL_LIST_FOR_MONGOOSE = BIG_OL_LIST.map(book => {
        // I think this sort of isbn number always has 10 digits, 
        // and our seed file sometimes leaves out initial zeros, 
        // so we need to put them in in order for openlibrary API to work
        while ( book[2].length < 10 ) {
            book[2] = `0${book[2]}`;
        }
        return {title: book[0], author: book[1], api_id: book[2]}
    })
    console.log(`🔴🔴🔴🔴🔴 ${JSON.stringify(BIG_OL_LIST_FOR_MONGOOSE[0])}`);
    Book.find({title: BIG_OL_LIST_FOR_MONGOOSE[0].title})
        .then(foundBook => {
            if (foundBook.title) {
                console.log(`Seeding aborted - the database may be already seeded: ${foundBook}`)
            } else {
                Book.create(BIG_OL_LIST_FOR_MONGOOSE)
                    .then(result => {
                        res.send(`Database seeded.  Db response: ${JSON.stringify(result)}`);
                    })
                    .catch(err => {
                        res.send(`error seeding database: ${err}`)
                    })
            }
        })
        .catch(err => {
            console.log(`error determining whether database was previously seeded: ${err}`)
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
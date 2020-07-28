const express = require('express');
const router = express.Router()

//const db = require('../../models')

const UserExperience = require('../models/UserExperience');
const Book = require('../models/Book');
const User = require('../models/User');

router.post('/', (req,res) => {     // assumes req.body structure of {bookInfo: {title: XXX, author: XXX, etc}, userExperienceInfo: {rating: X, status: XXXX, etc}}

    const createUserExperience = (bookId) => {    // will be called later in the route, depending on whether the relevant Book is found or created
        req.body.userExperienceInfo.bookId = bookId;
        UserExperience.create(req.body.userExperienceInfo) 
        // may want to refactor later to make sure bookId&userId combo is unique, so that user doesn't accidentally review the same book twice
        .then(createdUserExperience => {
            Book.findOneAndUpdate({_id: createdUserExperience.bookId}, {$push: {userExperiences: createdUserExperience._id}})
            .then(bookUpdateResult => {
                User.findOneAndUpdate({_id: createdUserExperience.userId}, {$push: {userExperiences: createdUserExperience._id}})
                .then(userUpdateResult => {
                    res.send({createdUserExperience})
                })
                .catch(err => {
                    res.send({error: `Error in userExperiences create route adding experience id to user experience list: ${err}`})
                })
            })
            .catch(err => {
                res.send({error: `Error adding new user experience id to book userExperience list: ${err}`});
            })
        })
        .catch(err => {
            res.send({error: `Error in userExperience router Create method while creating userExperience: ${err}`});
        })
    }

    //Look for book with same api_id as new userExperience's book.  If it doesn't exist, create it.  Return its id here,
    //then create the new userExperience, then update the Book with the experience's ID, then associate the User with the experience, using the above function.
    Book.findOne({api_id: req.body.bookInfo.api_id})
        .select("_id")
        .then(foundBook => {
            if (foundBook){
                createUserExperience(foundBook._id);
            } else {              
                Book.create(req.body.bookInfo)
                    .then(createdBook => {
                        createUserExperience(createdBook._id);
                    })
                    .catch(err => { 
                        res.send({error: `Error in userExperience route Create method while creating Book: ${err}`});
                    })
            }
        })
        .catch(err => { 
            res.send({error: `Error in userExperience route Create method while finding Book: ${err}`})
        })
})

router.put('/:id', (req,res) => {
    UserExperience.findOneAndUpdate(req.params.id, {$set: req.body}, {new: true, runValidators: true})
        .then(updatedUserExperience => {
            res.send({updatedUserExperience})
        })
        .catch(err => {
            res.send({error: `Error in userExperience router Update method: ${err}`})
        })
})

module.exports = router;
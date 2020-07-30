const express = require('express');

const ReaderExperience = require('./models/ReaderExperience');
const User = require('./models/User');
const Book = require('./models/Book');

const theseUsers = [
    {
        first_name: "Lobelia",
        last_name: "Sackville-Baggins",
        user_name: "Bagville-Sackins",
        email: "Lobie@bag-end.com",
        password: "not hashed",
        readerExperiences: [],
        friends: []
    },
    {
        first_name: "Bodo",
        last_name: "Proudfoot",
        user_name: "ProudFEET",
        email: "feet@stinkysocks.com",
        password: "not hashed",
        readerExperiences: [],
        friends: []
    },
    {
        first_name: "Robin",
        last_name: "Smallburrow",
        user_name: "Wormsbane",
        email: "cozynest@home.net",
        password: "not hashed",
        readerExperiences: [],
        friends: []
    },
    {
        first_name: "Camelia",
        last_name: "Sackville",
        user_name: "other_sackville",
        email: "cam@sack.com",
        password: "not hashed",
        readerExperiences: [],
        friends: []
    },
    {
        first_name: "Lotho",
        last_name: "Gammidge",
        user_name: "Lotho1",
        email: "Lotho@prodigy.net",
        password: "not hashed",
        readerExperiences: [],
        friends: []
    },
    {
        first_name: "Lotho",
        last_name: "Greenhand",
        user_name: "Greenbud",
        email: "greenie@hotmail.com",
        password: "not hashed",
        readerExperiences: [],
        friends: []
    },
    {
        first_name: "Meriadoc",
        last_name: "Brandybuck",
        user_name: "Merry",
        email: "brandy@compuserve.net",
        password: "not hashed",
        readerExperiences: [],
        friends: []
    }
];

let theseBooks = [
    {
        api_id: "1Za8QgAACAAJ",
        title: "The Fellowship of the Ring",
        author: "John Ronald Reuel Tolkien",
        genre: "fantasy",
        description: "The first part of Tolkien's epic masterpiece, The Lord of the Rings, featuring an exclusive cover designed to complement the new 'History of Middle-earth' series. Sauron, the Dark Lord, has gathered to him all the Rings of Power -- the means by which he intends to rule Middle-earth. All he lacks in his plans for dominion is the One Ring -- the ring that rules them all -- which has fallen into the hands of the hobbit, Bilbo Baggins. In a sleepy village in the Shire, young Frodo Baggins finds himself faced with an immense task, as his elderly cousin Bilbo entrusts the Ring to his care. Frodo must leave his home and make a perilous journey across Middle-earth to the Cracks of Doom, there to destroy the Ring and foil the Dark Lord in his evil purpose. Now available in smart a new livery to match the 'History of Middle-earth' series, and impossible to describe in a few words, JRR Tolkien's great work of imaginative fiction has been labelled both a heroic romance and a classic fantasy fiction. By turns comic and homely, epic and diabolic, the narrative moves through countless changes of scene and character in an imaginary world which is totally convincing in its detail.",
        readerExperiences: []
    },    {
        api_id: "JvdzzQEACAAJ",
        title: "The Two Towers",
        author: "John Ronald Reuel Tolkien",
        genre: "fantasy",
        description: "Frodo and the Companions of the Ring have been beset by danger during their quest to prevent the Ruling Ring from falling into the hands of the Dark Lord by destroying it in the Cracks of Doom. They have lost the wizard, Gandalf, in the battle with an evil spirit in the Mines of Moria; and at the Falls of Rauros, Boromir, seduced by the power of the Ring, tried to seize it by force. While Frodo and Sam made their escape the rest of the company were attacked by Orcs.Now they continue their journey alone down the great River Anduin - alone, that is, save for the mysterious creeping figure that follows wherever they go.To celebrate the release of the first of Peter Jackson's two-part film adaptation of THE HOBBIT, THE HOBBIT: AN UNEXPECTED JOURNEY, this second part of THE LORD OF THE RINGS is available for a limited time with an exclusive cover image from Peter Jackson's award-winning trilogy.",
        readerExperiences: []
    },   {
        api_id: "JuDInK3YtyMC",
        title: "The Essential Calvin and Hobbes",
        author: "Bill Watterson",
        genre: "fantasy",
        description: "The Essential Calvin and Hobbes is an over-size anthology-type book including an original 16-page story and color Sunday cartoons.",
        readerExperiences: []
    },    {
        api_id: "fCCWWgZ7d6UC",
        title: "A Fire upon the Deep",
        author: "Vernor Vinge",
        genre: "sci-fi",
        description: "Thousands of years in the future, humanity is no longer alone in a universe where a mind's potential is determined by its location in space, from superintelligent entities in the Transcend, to the limited minds of the Unthinking Depths, where only simple creatures, and technology, can function. Nobody knows what strange force partitioned space into these \"regions of thought,\" but when the warring Straumli realm use an ancient Transcendent artifact as a weapon, they unwittingly unleash an awesome power that destroys thousands of worlds and enslaves all natural and artificial intelligence. Fleeing this galactic threat, Ravna crash lands on a strange world with a ship-hold full of cryogenically frozen children, the only survivors from a destroyed space-lab. They are taken captive by the Tines, an alien race with a harsh medieval culture, and used as pawns in a ruthless power struggle.",
        readerExperiences: []
    },    {
        api_id: "ACNguHpaRsoC",
        title: "Tis",
        author: "Frank McCourt",
        genre: "memoir",
        description: "FROM THE PULIZER PRIZE-WINNING AUTHOR OF THE #1 \"NEW YORK TIMES\" BESTSELLER \"ANGELA'S ASHES\" Frank McCourt's glorious childhood memoir, \"Angela's Ashes, \" has been loved and celebrated by readers everywhere. It won the National Book Critics Circle Award, the \"Los Angeles Times\" Book Award and the Pulitzer Prize. Rarely has a book so swiftly found its place on the literary landscape. And now we have \"'Tis, \" the story of Frank's American journey from impoverished immigrant to brilliant teacher and raconteur. Frank lands in New York at age nineteen and gets a job at the Biltmore Hotel, where he immediately encounters the vivid hierarchies of this \"classless country,\" and then is drafted into the army and is sent to Germany to train dogs and type reports. It is Frank's incomparable voice that renders these experiences spellbinding. When Frank returns to America in 1953, he works on the docks, always resisting what everyone tells him. He knows that he should be getting an education, and though he left school at fourteen, he talks his way into New York University. There, he falls in love with the quintessential Yankee and tries to live his dream. But it is not until he starts to teach that Frank finds his place in the world.",
        readerExperiences: []
    }
];

let theseExperiences = [
    {
        rating: null,
        review: null,
        status: "started",
        date_started: "2020-07-24",
        date_finished: null,
        book:
        user:

    },{
        rating: 2,
        review: 
        status: 
        date_started:
        date_finished:
        book:
        user:

    },{
        rating: 5,
        review: 
        status: 
        date_started:
        date_finished:
        book:
        user:

    },{
        rating: 1,
        review: 
        status: 
        date_started:
        date_finished:
        book:
        user:

    },{
        rating: 4,
        review: 
        status: 
        date_started:
        date_finished:
        book:
        user:

    },{
        rating: 4,
        review: 
        status: 
        date_started:
        date_finished:
        book:
        user:

    },{
        rating: null,
        review: null,
        status: "wishlist",
        date_started: null,
        date_finished: null,
        book:
        user:

    },{
        rating: null,
        review: null,
        status: "finished"
        date_started: "2020-05-25",
        date_finished: "2020-06-05",
        book: 
        user:

    },
]
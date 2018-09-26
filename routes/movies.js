const {Movie, validateMovie} = require('../models/movie');
const {Genre} = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();



//*****************Route Starts**********************


//To get all Movies
router.get('/', async(req, res) => {

	const movie = await Movie.find().sort('name');
	res.send(movie);

});


//To get specific Movies
router.get('/:id', async(req, res) => {

	const movie = await Movie.findById(req.params.id);
	if(!movie) return res.status(404).send('Movie could not be found');

	res.send(movie);

});


//To post Movies
router.post('/', async(req,res) => {

	const {error} = validateMovie(req.body);
	if(error) return res.status(400).send(error.details[0].message);

	const genre = await Genre.findById(req.body.genreId);
	if(!genre) return res.status(400).send('Invalid genre');

	let movie = new Movie({
		title: req.body.title,
		genre:{
			_id:genre._id,
			name: genre.name
		},
		numberInStock:req.body.numberInStock,
		dailyRentalRate: req.body.dailyRentalRate
	});

	movie = await movie.save();

	res.send(movie);

});


//To update Movies
router.put('/:id', async(req,res) => {

	const {error} = validateMovie(req.body);
	if(error) return res.status(400).send(error.details[0].message);

	const genre = await Genre.findById(req.body.genreId);
	if (!genre) return res.status(400).send('Invalid genre.');

	const movie = await Movie.findByIdAndUpdate(req.params.id,
	{
		title: req.body.title,
		genre: {
			_id: genre._id,
			name: genre.name
		}, 
		numberInStock: req.body.numberInStock,
		dailyRentalRate: req.body.dailyRentalRate

		{new : true});

	if(!movie) return res.status(404).send('The Movie id was not found');

	res.send(movie);

});


//To delete Movies
router.delete('/:id', async(req,res) => {

	const movie = await Movie.findByIdAndRemove(req.params.id);
	if(!movie) return res.status(404).send('Movie Id not found');

	res.send(movie);
});



//*****************Routes Finish*********************

module.exports = router;
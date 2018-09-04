const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const genres = [

{id: 1, genre:'Action'},
{id: 2, genre:'Horror'},
{id: 3, genre:'Romance'},

];


//To Get all Genres
app.get('/api/genres', (req,res) =>{
	res.send(genres);
});


//To Get an especific Genre
app.get('/api/genres/:id', (req,res) => {
	const genre = genres.find(c=> c.id === parseInt(req.params.id));
	if(!genre) return res.status(404).send('The genre id was not found');
	res.send(genre);
});


//To post a Genre
app.post('/api/genres', (req,res)=> {
	const {error} = validateGenre(req.body);
	if(error) return res.status(400).send(error.details[0].message);

	const genre = {
		id: genres.length + 1,
		genre: req.body.genre,
	};

	genres.push(genre);
	res.send(genre);
});


//To update a Genre
app.put('/api/genres/:id', (req,res) => {
	const genre = genres.find(c=> c.id === parseInt(req.params.id));
	if(!genre) return res.status(404).send('The genre id was not found');

	const {error} = validateGenre(req.body);
	if(error) return res.status(400).send(error.details[0].message);

	genre.genre = req.body.genre;
	res.send(genre);

});


//To Delete a gender
app.delete('/api/genres/:id', (req,res)=> {
	const genre = genres.find(c=> c.id === parseInt(req.params.id));
	if(!genre) return res.status(404).send('The genre id was not found');

	const index = genres.indexOf(genre);
	genres.splice(index, 1);

	res.send(genre);
});





function validateGenre(genre){
	const schema = {
		genre: Joi.string().min(4).required()
	};
	return Joi.validate(genre, schema);

}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
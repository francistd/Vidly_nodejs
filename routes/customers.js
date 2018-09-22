const {Customers , validateCustomer} = require('../models/customers');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


//*****************Route Starts**********************


//To get all Customers
router.get('/', async(req, res) => {

	const customer = await Customers.find().sort('name');
	res.send(customer);

});


//To get specific Customer
router.get('/:id', async(req, res) => {

	const customer = await Customers.findById(req.params.id);
	if(!customer) return res.status(404).send('Customer could not be found');

	res.send(customer);

});


//To post Customers
router.post('/', async(req,res) => {

	const {error} = validateCustomer(req.body);
	if(error) return res.status(400).send(error.details[0].message);

	let customer = new Customers({
		name: req.body.name,
		isGold: req.body.isGold,
		phone : req.body.phone
	});

	customer = await customer.save();

	res.send(customer);

});


//To update Customers
router.put('/:id', async(req,res) => {

	const {error} = validateCustomer(req.body);
	if(error) return res.status(400).send(error.details[0].message);

	const customer = await Customers.findByIdAndUpdate(
		req.params.id,
		{
			name: req.body.name,
			isGold: req.body.isGold,
			phone: req.body.phone
		}, 

		{new : true});

	if(!customer) return res.status(404).send('The customer id was not found');

	res.send(customer);

});


//To delete customers
router.delete('/:id', async(req,res) => {

	const customer = await Customers.findByIdAndRemove(req.params.id);
	if(!customer) return res.status(404).send('customer Id not found');

	res.send(customer);
});



//*****************Routes Finish*********************


module.exports = router;
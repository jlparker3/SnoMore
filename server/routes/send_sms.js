const express = require('express')
const router = express.Router()
const {SMS} = require('../database/models')
const mongoose = require('mongoose');
require('dotenv').config();
const client = require('twilio')(
	process.env.TWILIO_ACCOUNT_SID,
	process.env.TWILIO_AUTH_TOKEN
);

router.post('/messages', (req, res) => {
  console.log('req body', req.body.sms)
	// res.header('Content-Type', 'application/json');
	// client.messages
	// 	.create({
	// 		from: process.env.TWILIO_PHONE_NUMBER,
	// 		to: req.body.sms.messageTo,
	// 		body: 'this is another test'
	// 	})
	// 	.then(() => {
	// 		res.send(JSON.stringify({ success: true }));
	// 	})
	// 	.catch(err => {
	// 		console.log(err);
	// 		res.send(JSON.stringify({ success: false }));
	// 	});
});

module.exports = router
 const Clarifai = require('clarifai');

 const app = new Clarifai.App({
  apiKey : '9f98197c0c4d465b8cbd2cbf651855e7',
});

 const handleImage = (req, res, db) => {
	db('users').where('id', '=', req.body.id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => {console.log(err);
		res.status(400).json('unable to get entries')
	});
};

 const handleApiCall = (req, res) => {
 	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
 	 .then(data => {
 	 	res.json(data);
 	 })
 	  .catch(err => res.status(400).json('unable to work with API'));
 }

module.exports = {
	handleImage,
	handleApiCall
};
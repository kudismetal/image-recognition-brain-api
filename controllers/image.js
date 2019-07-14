const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '5730a41b22fb4aae99cc8d6e0e36e02b'
});

const handleApiCall = (req, res) => {
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
      .then(response => res.json(response))
      .catch(err => res.status(400).json('unable to work with API'));
}

const handleImagePost = (db) => (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get entries'));
} 

module.exports = {
    handleImagePost,
    handleApiCall
}
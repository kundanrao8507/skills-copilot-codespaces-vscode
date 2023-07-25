// Create web server with express
// Create routes with express
// Create comments routes
// Create comments api routes
// Create comments api routes with express
// Create comments api routes with express router
// Create commenconst express = require('express');
const app = express();

// Create web server with express
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/comment');

// Create schema
const commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});

// Create model
const Comment = mongoose.model('Comment', commentSchema);

// Create new comment
app.post('/comment', async (req, res) => {
    try {
        const comment = new Comment(req.body);
        await comment.save();
        res.send(comment);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Get all comments
app.get('/comment', async (req, res) => {
    try {
        let comments = await Comment.find();
        res.send(comments);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Delete comment
app.delete('/comment/:id', async (req, res) => {
    try {
        await Comment.deleteOne({
            _id: req.params.id
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Update comment
app.put('/comment/:id', async (req, res) => {
    try {
        let comment = await Comment.findOne({
            _id: req.params.id
        });
        comment.name = req.body.name;
        comment.comment = req.body.comment;
        await comment.save();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Listen to port 3000
app.listen(3000, () => console.log('Server listening on port 3000!'));

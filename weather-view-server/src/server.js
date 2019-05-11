const express = require('express');
const mongoose = require('mongoose');

const todoRouter = require('./routers/todos.js');
const errorHandler = require('./middleware/error-handler.js');

const app = express();

app.use(express.static('build'));
app.use('/api/todos', todoRouter);
app.get('/*', (req, res) => res.redirect('/'));
app.use(errorHandler);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}...`);
});


// Connect to mongo
mongoose.connect('mongodb+srv://Adam:FeUkt8AxcsMRZVsE@cluster0-hkucr.mongodb.net/weather-view?retryWrites=true', {
    useNewUrlParser: true
})
db = mongoose.connection;

db.on('error', error => {
    console.log(error)
});

db.once('open', () => {
    console.log('MongoDB connected!');
});


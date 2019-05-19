const express = require('express');
const mongoose = require('mongoose');

const todoRouter = require('./routers/todos.js');
const projectRouter = require('./routers/projects.js');
const errorHandler = require('./middleware/error-handler.js');

const app = express();

// Develop mongodb URL
// const DB_URL = <MLAB_MONGODB_URL>

// Staging mongodb URL
const DB_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER_NAME}-hkucr.mongodb.net/${process.env.DB_DATABASE_NAME}?retryWrites=true`;

app.use(express.static('public', {
    setHeaders: (res, path, stat) => {
        res.set('Cache-Control', 'public, s-maxage=86400');
    }
}));
app.use('/api/todos', todoRouter);
app.use('/api/projects', projectRouter);
app.get('/*', (req, res) => res.redirect('/'));
app.use(errorHandler);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}...`);
});


// Connect to mongo
mongoose.connect(DB_URL, {
    useNewUrlParser: true
})
db = mongoose.connection;

db.on('error', error => {
    console.log(error)
});

db.once('open', () => {
    console.log('MongoDB connected!');
});


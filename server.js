const express = require('express');
const fs = require('fs-extra');
const ejs = require('ejs');

const pageRouter = require('./src/routes/pageRouter.js');
const apiRouter = require('./src/routes/apiRouter.js');

const connectToDb = require('./src/database/dbConnect.js');
const dbConfigObj = require('./knexfile.js');

const app = express();
const appDb = connectToDb(dbConfigObj.development);
app.locals.db = appDb;

// CONFIGURE ejs
app.engine('ejs', ejs.renderFile);
app.set('views engine', 'ejs');
app.set('views', `${__dirname}/src/views`);

const PATH = `${__dirname}/src/views/home.html`;

app.use('/', pageRouter);
app.use('/api/v1', apiRouter);
app.use(express.static(__dirname + '/public'));

// Create 404 route
app.use((req, res) => {
  res.render('404.ejs');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

console.log(`App listening on port ${PORT}`)

});

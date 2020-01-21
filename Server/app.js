const express = require("express");
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const chalk = require('chalk');
const songsRouter = require('./routers/songsRouter');
const playlistRouter = require('./routers/playlistRouter');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

const morganMiddleware = morgan(function (tokens, req, res) {
    return [
        chalk.hex('#34ace0').bold(tokens.method(req, res)),
        chalk.hex('#ffb142').bold(tokens.status(req, res)),
        chalk.hex('#ff5252').bold(tokens.url(req, res)),
        chalk.hex('#2ed573').bold(tokens['response-time'](req, res) + ' ms'),
        '\n',
    ].join(' ');
});

app.use(morganMiddleware);

app.use('/playlist',playlistRouter);
app.use('/songs',songsRouter);

app.all('*', (req, res) => {
    res.status(404).send('Page Not Found!');
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500);
    res.send("Error Occured!\nPlease try again later");
});

module.exports = app;
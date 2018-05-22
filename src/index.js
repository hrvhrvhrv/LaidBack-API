import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import config from './config';
import routes from './routes';


let app = express();
app.server = http.createServer(app);

// middleware
app.use(bodyParser.json({
    limit: config.bodyLimit
}));

app.use(bodyParser.urlencoded({
    extended: false
}));

// headers defined to allow for CORS
// required to use with front end app or errors occur
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});


// api routes v1
app.use('/v1', routes);


app.server.listen(process.env.MONGODB_URI || config.port);

console.log(`Started on port ${app.server.address().port} `);

export default app;

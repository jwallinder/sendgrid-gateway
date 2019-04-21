require('dotenv').config()
import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import middleware from './middleware';
import sendgrid from './sendgrid';
import basicAuth from 'express-basic-auth';
import config from './config.json';



let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

const corsOptions = {
	origin: process.env.CORS_HEADER,
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// 3rd party middleware
app.use(cors(corsOptions));

app.use(bodyParser.json({
	limit: config.bodyLimit
}));

const users = {}
users[process.env.AUTH_USER] = process.env.AUTH_PASS


app.use(basicAuth({users: users}))

app.get('/', (req, res) => {
	res.json({ 'version': '0.0.1' });
});
// internal middleware
app.use(middleware({ config}));


// send mail router
app.use('/send', sendgrid({ config}));


app.server.listen(process.env.PORT || config.port, () => {
	console.log(`Started on port ${app.server.address().port}`);
});

export default app;

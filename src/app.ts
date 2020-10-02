import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import api from './api';
import * as path from 'path';
import * as admin from 'firebase-admin';
const serviceAccount = require('./config/serviceAccount.json');

const app = express();

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/api', api);

export default app;

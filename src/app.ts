import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import api from './api';
import * as path from 'path';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/api', api);

export default app;

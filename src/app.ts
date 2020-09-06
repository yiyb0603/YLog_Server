import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import api from './api';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', api);

export default app;

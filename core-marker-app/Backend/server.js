const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require("cors");
const mongoSanitize = require('express-mongo-sanitize');

const mongoDB_ConnectionString = 'mongodb+srv://Maker424:CS179K-Project-Legend@core-marker-database.lsbe7.mongodb.net/?retryWrites=true&w=majority&appName=Core-Marker-Database';

mongoose.connect(mongoDB_ConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to Core-Marker MongoDB'))
    .catch(error => console.error('Could not connect to MongoDB:', error))

const app = express();
const port = 8080;

app.use(cors());

app.use(
    mongoSanitize({
      onSanitize: ({ req, key }) => {
        console.warn(`This request[${key}] is sanitized`, req);
      },
    }),
);

// CSS stylesheet routes
app.use(express.static(path.join(__dirname, "public")));
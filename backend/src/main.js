const express = require('express');
const cors = require("cors");
const tasksRouter = require('./tasks.js');

const port = 3000
const app = express();

app.use(cors("*"))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(tasksRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;

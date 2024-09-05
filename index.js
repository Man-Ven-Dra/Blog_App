const express = require('express')
const routes = require("./routes/blog.routes")
const connectDB = require('./Database/db_connect')
require('dotenv').config()

const PORT = process.env.PORT
const app = express();

app.use(express.json())
app.use('/api/v1', routes)
connectDB();

app.listen(PORT, () => {
    console.log('Server Started at: '+`http://localhost:${PORT}/`)
})

app.get('/', (req, res) => {
    res.send(`<h2>Hello! How are You?</h2>`)
})
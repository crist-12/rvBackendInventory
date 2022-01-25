const express = require('express')
const mysql = require('mysql2')
const myconn = require('express-myconnection')
require('dotenv').config()
const app = express()
const routes = require('./routes')

app.set('port', process.env.PORT || 9000)

//Middlewares
const dbOptions = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}

app.use(myconn(mysql, dbOptions, 'single'))
app.use(express.json())
app.get('/', (req, res)=> {
    console.log(process.env.DB_PASSWORD)
    res.send('Probando API')
})

app.use('/api', routes)

app.listen(app.get('port'), () => {
    console.log("Server is running on port ", app.get('port'));
})

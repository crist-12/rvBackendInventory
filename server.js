const express = require('express')
const mysql = require('mysql2')
const myconn = require('express-myconnection')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const cors = require('cors')
var morgan = require('morgan')
require('dotenv').config()
const app = express()

const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const swaggerOptions = {
    swaggerDefinition : {
        info: {
            title: "Inventory API",
            description: "APIs de Sistema de Control de Inventario",
            contact: {
                name: "RV"
            },
            servers: ["http://localhost:9000/"]
        }
    },
    apis: ['routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
console.log(swaggerDocs)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(morgan("dev"))


const CityRouter = require('./routes/cityRoutes')
const AreaRouter = require('./routes/areaRoutes')
const CategoryRouter = require('./routes/categoryRoutes')
const EmployeeRouter = require('./routes/employeeRoutes')
const MachinesRouter = require('./routes/machinesRoutes')
const SurcursalesRouter = require('./routes/sucursalesRoutes')
const MaintenanceRouter = require('./routes/maintenanceRoutes')
const BitacoraRouter = require('./routes/bitacoraRoutes')
const AssignmentRouter = require('./routes/assigmentsRoutes')
const AuthRouter = require('./routes/authRoutes')

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


app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));



app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    key: "session-key",
    secret: "secret",
    resave: true,
    saveUninitialized: false,
    cookie: {
       expires: 60 * 30
    }
}))

app.use('/city', CityRouter)
app.use('/area', AreaRouter)
app.use('/category', CategoryRouter)
app.use('/employee', EmployeeRouter)
app.use('/bitacora', BitacoraRouter)
app.use('/machines', MachinesRouter)
app.use('/sucursales', SurcursalesRouter)
app.use('/maintenance', MaintenanceRouter)
app.use('/assignment', AssignmentRouter)
app.use('/auth', AuthRouter)

app.get('/', (req, res)=> {
    var arr = [
        {
            nombre: "Hola",
            id: 1
        },
        {
            nombre: "Hola",
            id: 2
        },
        {
            nombre: "Hola",
            id: 3
        }
    ]
   // console.log(process.env.DB_PASSWORD)
    res.json(arr)
})



app.listen(app.get('port'), () => {
    console.log("Server is running on port ", app.get('port'));
})

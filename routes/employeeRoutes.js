const express = require('express')
const routes = express.Router()

/**
 * @swagger
 * /employee:
 *   get:
 *     description: Obtiene el listado de empleados registrados en el sistema
 *     tags: [Empleados]
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query("SELECT * FROM empleados AS A JOIN areas AS B ON A.IdArea = B.IdArea JOIN sucursales AS C ON A.IdSucursal = C.IdSucursal JOIN ciudades AS D ON C.IdCiudad = D.IdCiudad", (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

/**
 * @swagger
 * /employee/details:
 *   get:
 *     description: Obtiene los registros de manera más detallada de los empleados, su área, ciudad y sucursal
 *     tags: [Empleados]
 *     responses:
 *       200:
 *         description: Success
 * 
 */

routes.get('/details', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query("SELECT A.IdEmpleado, A.NombreEmpleado, B.DescripcionArea, C.NombreSucursal, D.NombreCiudad FROM empleados AS A JOIN areas AS B ON A.IdArea = B.IdArea JOIN sucursales AS C ON C.IdSucursal = A.IdSucursal JOIN ciudades AS D ON C.IdCiudad = D.IdCiudad WHERE A.EstadoEmpleado = 1", (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

/**
 * @swagger
 * /employee/changestatus/{id}:
 *   put:
 *     description: Cambia el estado del empleado, de activo a inactivo o viceversa
 *     tags: [Empleados]
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Código del Empleado
 *        type: integer
 *     responses:
 *       200:
 *         description: Success
 * 
 */

routes.put('/changestatus/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE empleados SET EstadoEmpleado = IF(EstadoEmpleado = 1, 0, 1) WHERE IdEmpleado = ?',[req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
        
    })
})

/**
 * @swagger
 * /employee/{id}:
 *   get:
 *     description: Obtiene los datos de un empleado en específico
 *     tags: [Empleados]
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Código del Empleado
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.get('/:id', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)
        conn.query("SELECT * FROM empleados WHERE IdEmpleado = ?", [req.params.id], (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

/**
 * @swagger
 * /employee:
 *   post:
 *     description: Inserta un nuevo empleado
 *     tags: [Empleados]
 *     parameters:
 *      - name: NombreEmpleado
 *        description: Nombre del empleado a insertar
 *        in: formData
 *        required: true
 *        type: string
 *      - name: Email
 *        description: Correo electrónico del empleado a insertar
 *        in: formData
 *        required: true
 *        type: string
 *      - name: IdArea
 *        description: Código del área al que pertenece el empleado
 *        in: formData
 *        required: true
 *        type: integer
 *      - name: IdSucursal
 *        description: Código de la sucursal a la que pertenece el empleado
 *        in: formData
 *        required: true
 *        type: string
 *      - name: EstadoEmpleado
 *        description: Estado del empleado Activo / Inactivo
 *        in: formData
 *        required: true
 *        type: boolean
 *     responses:
 *       201:
 *         description: Created
 */
routes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO empleados (NombreEmpleado, Email, IdArea, IdSucursal, EstadoEmpleado) VALUES(?,?,?,?,?)',
        [req.body.NombreEmpleado, req.body.Email, req.body.IdArea, req.body.IdSucursal, 1], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
        
    })
})

routes.delete('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM empleados WHERE IdEmpleado = ?',[req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
        
    })
})

/**
 * @swagger
 * /employee/{id}:
 *   put:
 *     description: Actualiza los datos de un empleado en específico
 *     tags: [Empleados]
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Código del Empleado a actualizar
 *        type: integer
 *      - name: NombreEmpleado
 *        in: FormData
 *        description: Nombre del Empleado a actualizar
 *        type: string
 *      - name: Email
 *        in: FormData
 *        description: Correo electrónico del Empleado a actualizar
 *        type: string
 *     responses:
 *       200:
 *         description: Success
 * 
 */

routes.put('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE empleados SET NombreEmpleado = ?, Email = ?, IdArea = ?, IdSucursal = ?, EstadoEmpleado = ? WHERE IdEmpleado = ?',[req.body.NombreEmpleado, req.body.Email, req.body.IdArea, req.body.IdSucursal, req.body.EstadoEmpleado, req.params.id], (err, rows)=>{
            if(err) return res.send(err)
            console.log(req.body)
            console.log(req.params.id)
            res.json(rows);
        })
        
    })
})

module.exports = routes
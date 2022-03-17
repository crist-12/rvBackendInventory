const express = require('express')
const routes = express.Router()

/**
 * @swagger
 * /assignment/assignment:
 *   get:
 *     description: Obtiene todas las áreas de la empresa
 *     tags: [Asignaciones]
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.get('/assignment', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query("SELECT GROUP_CONCAT(IF(b.CaracteristicaTipo = 4, c.OpcionDescripcion, a.Respuesta) SEPARATOR ' ') AS 'Equipo', " +
            "E.NombreEmpleado, D.DetalleAsignacion, DATE_FORMAT(D.FechaAsignacion, '%d/%m/%y') AS 'FechaAsignacion', D.IncluyeMochila, " +
            "D.IncluyeMouse, D.IncluyeCargador, D.IncluyeTeclado, D.IncluyeWebCam, " +
            "F.DescripcionArea, H.NombreCiudad, G.NombreSucursal  FROM caracteristicarespuesta AS A " +
            "INNER JOIN caracteristica AS B ON A.IdCategoria = B.IdCategoria AND A.IdCaracteristica = B.IdCaracteristica " +
            "LEFT JOIN caracteristicaopcion AS C ON A.Respuesta = C.IdOpcion AND A.IdCategoria = C.IdCategoria AND A.IdCaracteristica = C.IdCaracteristica " +
            "JOIN asignaciones AS D ON A.IdEquipoIngresado = D.IdEquipo " +
            "JOIN empleados AS E ON D.IdEmpleado = E.IdEmpleado " +
            "JOIN areas AS F ON F.IdArea = E.IdArea " +
            "JOIN sucursales AS G ON G.IdSucursal = E.IdSucursal " +
            "JOIN ciudades AS H ON G.IdCiudad = H.IdCiudad " +
            "WHERE A.IdCaracteristica IN(1, 3, 6) AND A.IdCategoria = 1 " +
            "GROUP BY A.FechaIngreso", (err, rows) => {
                if (err) return res.send(err)

                res.json(rows)
            })
    })
})

/**
 * @swagger
 * /assignment/history:
 *   get:
 *     description: Obtiene el historial de asignaciones de la empresa 
 *     tags: [Asignaciones]
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.get('/history', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query("SELECT GROUP_CONCAT(IF(b.CaracteristicaTipo = 4, c.OpcionDescripcion, a.Respuesta) SEPARATOR ' ') AS 'Equipo', " +
            "E.NombreEmpleado, D.DetalleAsignacion, DATE_FORMAT(D.FechaAsignacion, '%d/%m/%y %h:%i:%s %p') AS 'FechaAsignacion', D.IncluyeMochila, " +
            "D.IncluyeMouse, D.IncluyeCargador, D.IncluyeTeclado, D.IncluyeWebCam, " +
            "F.DescripcionArea, H.NombreCiudad, G.NombreSucursal, DATE_FORMAT(D.FechaRemocion, '%d/%m/%y %h:%i:%s %p') AS 'FechaRemocion'  FROM caracteristicarespuesta AS A " +
            "INNER JOIN caracteristica AS B ON A.IdCategoria = B.IdCategoria AND A.IdCaracteristica = B.IdCaracteristica " +
            "LEFT JOIN caracteristicaopcion AS C ON A.Respuesta = C.IdOpcion AND A.IdCategoria = C.IdCategoria AND A.IdCaracteristica = C.IdCaracteristica " +
            "JOIN asignacioneshistorico AS D ON A.IdEquipoIngresado = D.IdEquipo " +
            "JOIN empleados AS E ON D.IdEmpleado = E.IdEmpleado " +
            "JOIN areas AS F ON F.IdArea = E.IdArea " +
            "JOIN sucursales AS G ON G.IdSucursal = E.IdSucursal " +
            "JOIN ciudades AS H ON G.IdCiudad = H.IdCiudad " +
            "WHERE A.IdCaracteristica IN(1, 3, 6) AND A.IdCategoria = 1 " +
            "GROUP BY A.FechaIngreso, D.FechaRemocion", (err, rows) => {
                if (err) return res.send(err)

                res.json(rows)
            })
    })
})

/**
 * @swagger
 * /assignment/{id}:
 *   get:
 *     description: Obtiene los datos de una asignacion en especifico
 *     tags: [Asignaciones]
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Id de la asignacion
 *        required: true
 *        type: integer
 *     responses:
 *       200:
 *         description: Success
 */
routes.get('/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query("SELECT * FROM asignaciones WHERE IdAsignacion = ?", [req.params.id], (err, rows) => {
            if (err) return res.send(err)

            res.json(rows)
        })
    })
})

/**
 * @swagger
 * /asignment/details/{id}:
 *   get:
 *     description: Obtiene los datos de una asignacion en especifico
 *     tags: [Asignaciones]
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Id de la asignacion
 *        required: true
 *        type: integer
 *     responses:
 *       200:
 *         description: Success
 */
routes.get('/details/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query("SELECT * FROM asignaciones WHERE IdAsignacion = ?", [req.params.id], (err, rows) => {
            if (err) return res.send(err)

            res.json(rows)
        })
    })
})

/**
 * @swagger
 * /assignment/status/{id}:
 *   get:
 *     description: Obtiene el estado de un equipo a partir de su Id
 *     tags: [Asignaciones]
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Id de la asignacion
 *        required: true
 *        type: integer
 *     responses:
 *       200:
 *         description: Success
 */
routes.get('/status/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query("SELECT * FROM equiposestado WHERE IdEquipo = ?", [req.params.id], (err, rows) => {
            if (err) return res.send(err)

            res.json(rows)
        })
    })
})

/**
 * @swagger
 * /assignment:
 *   post:
 *     description: Inserta una nueva area
 *     tags: [Asignaciones]
 *     parameters:
 *      - name: IdEmpleado
 *        description: Codigo del Empleado al que se asignara el equipo
 *        in: formData
 *        required: true
 *        type: int
 *      - name: IdEquipo
 *        description: Codigo del Equipo que se asignara
 *        in: formData
 *        required: true
 *        type: int
 *      - name: DetalleAsignacion
 *        description: Explicacion del porque de la asignacion
 *        in: formData
 *        required: true
 *        type: string
 *      - name: IncluyeMochila
 *        description: Incluye/No incluye una mochila
 *        in: formData
 *        required: true
 *        type: boolean
 *      - name: IncluyeMouse
 *        description: Incluye/No incluye un mouse
 *        in: formData
 *        required: true
 *        type: boolean
 *      - name: IncluyeCargador
 *        description: Incluye/No incluye un cargador
 *        in: formData
 *        required: true
 *        type: boolean
 *      - name: IncluyeTeclado
 *        description: Incluye/No incluye un teclado
 *        in: formData
 *        required: true
 *        type: boolean
 *      - name: IncluyeWebCam
 *        description: Incluye/No incluye una webcam
 *        in: formData
 *        required: true
 *        type: boolean
 *      - name: UsuarioAsigna
 *        description: Incluye/No incluye una mochila
 *        in: formData
 *        required: true
 *        type: string
 *     responses:
 *       201:
 *         description: Created
 */
routes.post('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('INSERT INTO asignaciones(IdEmpleado, IdEquipo, DetalleAsignacion, IncluyeMochila, IncluyeMouse, IncluyeCargador, IncluyeTeclado, IncluyeWebCam, UsuarioAsigna) VALUES (?,?,?,?,?,?,?,?,?)', [req.body.IdEmpleado, req.body.IdEquipo, req.body.DetalleAsignacion, req.body.IncluyeMochila, req.body.IncluyeMouse, req.body.IncluyeCargador, req.body.IncluyeTeclado, req.body.IncluyeWebCam, req.body.UsuarioAsigna], (err, rows) => {
            if (err) return res.send(err)

            res.json(rows);
        })

    })
})

/**
 * @swagger
 * /assignment/remove/{id}:
 *   put:
 *     description: Cuando se remueve un equipo se actualiza el estado del equipo a 'Removido' y se registra la fecha de remocion, se dispara un trigger que guarda dicho registro en asignacioneshistorico
 *     tags: [Asignaciones]
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Id del equipo a remover
 *     responses:
 *       200:
 *         description: Success
 * 
 */

routes.put('/remove/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('UPDATE asignaciones SET FechaRemocion = NOW() WHERE IdEquipo = ? AND FechaRemocion IS NULL', [req.params.id], (err, rows) => {
            if (err) return res.send(err)

            res.json(rows);
        })

    })
})

/**
 * @swagger
 * /assignment/receive/{id}:
 *   put:
 *     description: Cuando se recibe un equipo de mantenimiento, se registra la factura y la fecha en la que se recibe el equipo.
 *     tags: [Asignaciones]
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Id del equipo a remover
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.put('/receive/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('UPDATE mantenimientos SET FacturaMantenimiento = ?, FechaRecibida = NOW() WHERE IdEquipo = ? ORDER BY IdMantenimiento DESC LIMIT 1', [req.body.FacturaMantenimiento, req.params.id], (err, rows) => {
            if (err) return res.send(err)

            res.json(rows);
        })

    })
})


module.exports = routes
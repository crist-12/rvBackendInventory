const express = require('express')
const routes = express.Router()


/**
 * @swagger
 * /machines/types:
 *   get:
 *     description: Obtiene un listado con todos los tipos de datos con los que puedes crear tu entidad.
 *     tags: [Equipos]
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.get('/types', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query("SELECT IdTipoCampo AS 'value', DisplayText AS 'label', DescripcionTipo FROM caracteristicatipo", (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

/**
 * @swagger
 * /machines/update/{id}:
 *   get:
 *     description: Cuando se quiere editar un equipo, se cargan todos los datos para mostrarse al usuario y pueda editarlos de una manera más amigable.
 *     tags: [Equipos]
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Código del equipo
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.get('/update/:id', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query("SELECT IdEquipoIngresado, A.IdCategoria, A.IdCaracteristica, Respuesta, CaracteristicaDescripcion, caracteristicatipo, Requerido, OpcionDescripcion FROM caracteristicarespuesta AS A JOIN caracteristica AS B ON A.IdCaracteristica = B.IdCaracteristica  LEFT JOIN caracteristicaopcion AS C ON C.IdOpcion = A.Respuesta WHERE A.IdCategoria = 1 AND A.IdEquipoIngresado = ? ORDER BY B.Nivel", [req.params.id], (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

/**
 * @swagger
 * /machines/{id}:
 *   get:
 *     description: Obtiene todos los datos de un equipo, incluyendo todas las características y las respuestas, especificado por el código del equipo.
 *     tags: [Equipos]
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Código del equipo
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.get('/:id', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)
        conn.query("SELECT a.CaracteristicaDescripcion, if(c.IdOpcion IS NOT NULL, c.OpcionDescripcion, b.Respuesta) AS Respuesta, b.IdEquipoIngresado, a.CaracteristicaTipo FROM caracteristica a INNER JOIN caracteristicarespuesta b  ON a.IdCategoria = b.IdCategoria AND a.IdCaracteristica = b.IdCaracteristica LEFT JOIN caracteristicaopcion c ON b.Respuesta = c.IdOpcion AND a.IdCategoria = c.IdCategoria AND a.IdCaracteristica = c.IdCaracteristica WHERE a.IdCategoria = 1 AND b.IdEquipoIngresado = ?", [req.params.id], (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

/**
 * @swagger
 * /machines/label/{id}:
 *   get:
 *     description: Obtiene la descripción de cada una de las opciones (de los campos que sean de tipo Selección)
 *     tags: [Equipos]
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Código del equipo
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.get('/label/:id', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)
        conn.query("SELECT OpcionDescripcion FROM caracteristicaopcion WHERE IdOpcion = ?", [req.params.id], (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})


routes.delete('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM equipos WHERE IdEquipo = ?',[req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
        
    })
})

routes.put('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE caracteristicarespuesta SET Respuesta = ? WHERE IdEquipoIngresado = ? AND IdCaracteristica = ?',[req.body.Respuesta, req.body.IdEquipoIngresado, req.params.id], (err, rows)=>{
            if(err) return res.send(err)
            res.json(rows);
            console.log(rows)
        })
        
    })
})

/**
 * @swagger
 * /machines/status/{id}:
 *   put:
 *     description: Cambia el estado de un equipo especificado por el código del equipo y el estado al que se desea cambiar 1 - Sin asignar  2 - Asignado  3 - En Mantenimiento  4 - No disponible
 *     tags: [Equipos]
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Código del equipo
 *      - name: TipoEstado
 *        in: FormData
 *        description: Tipo de Estado
 *        required: true
 *        type: integer
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.put('/status/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE equiposestado SET TipoEstado = ? WHERE IdEquipo = ?',[req.body.TipoEstado, req.params.id], (err, rows)=>{
            if(err) return res.send(err)
            res.json(rows);
        })
        
    })
})


/**
 * @swagger
 * /machines/receivedcheck/{id}:
 *   put:
 *     description: Cuando un equipo se recibe de mantenimiento, esta API busca en la tabla de asignaciones si está asignada, en ese caso, le coloca que está asignada, caso contrario la recibe y la coloca como Sin asignar
 *     tags: [Equipos]
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Código del equipo
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.put('/receivedcheck/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query("UPDATE equiposestado SET TipoEstado = IF((SELECT COUNT(DISTINCT A.IdEquipo) AS 'Bandera' FROM asignaciones AS A WHERE A.IdEquipo = ?) = 1, 1, 2) WHERE IdEquipo = ?",[req.body.TipoEstado, req.params.id], (err, rows)=>{
            if(err) return res.send(err)
            res.json(rows);
        })
        
    })
})

module.exports = routes
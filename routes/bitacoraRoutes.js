const express = require('express')
const routes = express.Router()

/**
 * @swagger
 * /bitacora:
 *   get:
 *     description: Obtiene los registros de la bitacora, contiene las acciones mas destacadas realizadas por el usuario
 *     tags: [Bitácora]
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query("SELECT Accion, Modulo, DATE_FORMAT(Fecha, '%d/%m/%y %h:%i %p') AS 'FechaF' FROM bitacora ORDER BY Fecha DESC", (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

/**
 * @swagger
 * /bitacora:
 *   post:
 *     description: Inserta un nuevo registro en la bitacora
 *     tags: [Bitácora]
 *     parameters:
 *      - name: Accion
 *        description: Acción realizada a ser insertada en la bitacora
 *        in: formData
 *        required: true
 *        type: string
 *      - name: Modulo
 *        description: Modulo en el que fue ejecutada la acción
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
        console.log(req.body)
        conn.query('INSERT INTO bitacora (Accion, Modulo) VALUES(?,?)', [req.body.Accion, req.body.Modulo], (err, rows) => {
            if (err) return res.send(err)
            res.json(rows);
        })
    })
})

/**
 * @swagger
 * /bitacora/{id}:
 *   get:
 *     description: Obtiene un registro especifico de la bitacora
 *     tags: [Bitácora]
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.get('/:id', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)
        conn.query("SELECT * FROM bitacora WHERE IdBitacora = ?", [req.params.id], (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

module.exports = routes
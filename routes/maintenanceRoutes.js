const express = require('express')
const routes = express.Router()


/**
 * @swagger
 * /maintenance:
 *   get:
 *     description: Obtiene el registro de los mantenimientos que se han hecho.
 *     tags: [Mantenimientos]
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)
        conn.query("SELECT D.IdMantenimiento, A.IdEquipoIngresado, GROUP_CONCAT(IF(C.CaracteristicaTipo = 4, B.OpcionDescripcion, A.Respuesta) SEPARATOR ' ') AS 'Equipo', "+
        "DATE_FORMAT(D.FechaMantenimiento, '%d/%m/%y %h:%i:%s %p') AS 'FechaMantenimiento', E.DescripcionTipoMantenimiento, DATE_FORMAT(D.FechaRecibida, '%d/%m/%y %h:%i:%s %p') AS 'FechaRecibida', D.FacturaMantenimiento FROM caracteristicarespuesta AS A "+
        "LEFT JOIN caracteristicaopcion AS B "+
        "ON A.IdCaracteristica = B.IdCaracteristica AND B.IdOpcion = A.Respuesta "+
        "LEFT JOIN caracteristica AS C "+
        "ON C.IdCaracteristica = A.IdCaracteristica "+
        "JOIN mantenimientos AS D "+
        "ON A.IdEquipoIngresado = D.IdEquipo "+
        "LEFT JOIN tiposmantenimiento AS E "+
        "ON E.IdTipoMantenimiento = D.IdTipoMantenimiento "+
        "WHERE A.IdCategoria = 1 AND (A.IdCaracteristica) IN (1,3,6) "+
        "GROUP BY A.IdEquipoIngresado, D.FechaMantenimiento", (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

/**
 * @swagger
 * /maintenance/{id}:
 *   get:
 *     description: Obtiene los datos de un mantenimiento específico.
 *     tags: [Mantenimientos]
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Código del Mantenimiento
 *     responses:
 *       200:
 *         description: Success
 * 
 */

routes.get('/:id', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)
        conn.query("SELECT * FROM mantenimientos WHERE IdMantenimiento = ?", [req.params.id], (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

/**
 * @swagger
 * /maintenance:
 *   post:
 *     description: Inserta un nuevo mantenimiento
 *     tags: [Mantenimientos]
 *     parameters:
 *      - name: ObservacionesMantenimiento
 *        description: Una pequeña observacion del porqué se realizó el mantenimiento
 *        in: formData
 *        required: true
 *        type: string
 *      - name: IdEquipo
 *        description: Código del equipo que se realizó el mantenimiento
 *        in: formData
 *        required: true
 *        type: integer
 *      - name: IdTipoMantenimiento
 *        description: Código del tipo de mantenimiento que se realizó, puede ser predictivo, preventivo o correctivo
 *        in: formData
 *        required: true
 *        type: string
 *     responses:
 *       201:
 *         description: Created
 */
routes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO mantenimientos (ObservacionesMantenimiento, IdEquipo, IdTipoMantenimiento) VALUES (?,?,?)',[req.body.ObservacionesMantenimiento, req.body.IdEquipo, req.body.IdTipoMantenimiento], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
    })
})


module.exports = routes
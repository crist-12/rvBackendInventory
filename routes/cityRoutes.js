const express = require('express')
const routes = express.Router()

/**
 * @swagger
 * /city:
 *   get:
 *     description: Obtiene todas las ciudades registradas
 *     tags: [Ciudades]
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query("SELECT * FROM ciudades", (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

/**
 * @swagger
 * /city/{id}:
 *   get:
 *     description: Obtiene el registro de una ciudad en específico
 *     tags: [Ciudades]
 *     parameters:
 *      - name: id
 *        in: path
 *        description: id de la ciudad
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.get('/:id', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)
        conn.query("SELECT * FROM ciudades WHERE IdCiudad = ?", [req.params.id], (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

/**
 * @swagger
 * /city:
 *   post:
 *     description: Inserta una nueva ciudad
 *     tags: [Ciudades]
 *     parameters:
 *      - name: NombreCiudad
 *        description: Nombre de la ciudad a insertar
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
        conn.query('INSERT INTO ciudades(NombreCiudad) VALUES (?)',[req.body.NombreCiudad], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
        
    })
})

/**
 * @swagger
 * /city/{id}:
 *   put:
 *     description: Actualiza el nombre de una ciudad
 *     tags: [Ciudades]
 *     parameters:
 *      - name: id
 *        in: path
 *        description: id del area
 *      - name: NombreCiudad
 *        in: formData
 *        description: Nombre de la ciudad a actualizar  a insertar
 *     responses:
 *       200:
 *         description: Success
 * 
 */

routes.put('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE ciudades SET NombreCiudad = ? WHERE IdCiudad = ?',[req.body.NombreCiudad, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
        
    })
})

module.exports = routes
const express = require('express')
const routes = express.Router()


/**
 * @swagger
 * /area:
 *   get:
 *     description: Obtiene todas las áreas de la empresa
 *     tags: [Area]
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query("SELECT * FROM areas", (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

/**
 * @swagger
 * /area/{id}:
 *   get:
 *     description: Obtiene todas las áreas de la empresa
 *     tags: [Area]
 *     parameters:
 *      - name: id
 *        in: path
 *        description: id del area
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.get('/:id', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)
        conn.query("SELECT * FROM areas WHERE IdArea = ?", [req.params.id], (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

/**
 * @swagger
 * /area:
 *   post:
 *     description: Inserta una nueva área
 *     tags: [Area]
 *     parameters:
 *      - name: DescripcionArea
 *        description: Nombre del área que se está insertando
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
        conn.query('INSERT INTO areas(DescripcionArea) VALUES (?)',[req.body.DescripcionArea], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
        
    })
})

/**
 * @swagger
 * /area/{id}:
 *   put:
 *     description: Actualiza el nombre del area
 *     tags: [Area]
 *     parameters:
 *      - name: id
 *        in: path
 *        description: id del area
 *      - name: DescripcionArea
 *        in: formData
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.put('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE areas SET DescripcionArea = ? WHERE IdArea = ?',[req.body.DescripcionArea, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
        
    })
})

module.exports = routes
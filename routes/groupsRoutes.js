const express = require('express')
const routes = express.Router()

/**
 * @swagger
 * /groups:
 *   get:
 *     description: Obtiene los registros de los grupos
 *     tags: [Grupos]
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)
        conn.query("SELECT * FROM grupos", (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

/**
 * @swagger
 * /groups/{id}:
 *   get:
 *     description: Obtiene la información de un grupo en específico
 *     tags: [Grupos]
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Código del grupo
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.get('/:id', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)
        conn.query("SELECT * FROM grupos WHERE IdGrupo = ?", [req.params.id], (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

/**
 * @swagger
 * /groups:
 *   post:
 *     description: Inserta un nuevo grupo
 *     tags: [Grupos]
 *     parameters:
 *      - name: DescripcionArea
 *        description: Nombre del area a insertar
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
        conn.query('INSERT INTO grupos (DescripcionGrupo) VALUES (?)',[req.body.DescripcionGrupo], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
        
    })
})

routes.delete('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM grupos WHERE IdGrupo = ?',[req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
        
    })
})

/**
 * @swagger
 * /groups/{id}:
 *   put:
 *     description: Actualiza el nombre del grupo
 *     tags: [Grupos]
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Código del grupo
 *      - name: DescripcionGrupo
 *        in: formData
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.put('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE grupos SET DescripcionGrupo = ? WHERE IdGrupo = ?',[req.body.DescripcionGrupo, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
        
    })
})

module.exports = routes
const express = require('express')
const routes = express.Router()

/**
 * @swagger
 * /sucursales:
 *   get:
 *     description: Obtiene datos específicos de todas las sucursales
 *     tags: [Sucursales]
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query("SELECT A.IdSucursal, A.NombreSucursal, B.NombreCiudad, B.IdCiudad FROM sucursales AS A JOIN ciudades AS B ON A.IdCiudad = B.IdCiudad", (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

/**
 * @swagger
 * /sucursales/all:
 *   get:
 *     description: Obtiene datos de las sucursales
 *     tags: [Sucursales]
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.get('/all', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query("SELECT * FROM sucursales", (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

/**
 * @swagger
 * /sucursales/{id}:
 *   get:
 *     description: Obtiene todas las áreas de la empresa
 *     tags: [Sucursales]
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
        conn.query("SELECT * FROM sucursales WHERE IdCiudad = ?", [req.params.id], (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

/**
 * @swagger
 * /sucursales:
 *   post:
 *     description: Inserta una nueva sucursal
 *     tags: [Sucursales]
 *     parameters:
 *      - name: NombreSucursal
 *        description: Nombre de la sucursal a insertar
 *        in: formData
 *        required: true
 *        type: string
 *      - name: IdCiudad
 *        description: Código de la ciudad en la que está ubicada la sucursal
 *        in: formData
 *        required: true
 *        type: integer
 *     responses:
 *       201:
 *         description: Created
 */
routes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO sucursales (NombreSucursal, IdCiudad) VALUES (?, ?)',[req.body.NombreSucursal, req.body.IdCiudad], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
        
    })
})

routes.delete('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM sucursales WHERE IdSucursal = ?',[req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
        
    })
})

/**
 * @swagger
 * /sucursales/{id}:
 *   put:
 *     description: Actualiza el registro de una sucursal dado el código de la misma
 *     tags: [Sucursales]
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Código de la sucursal a actualizar
 *      - name: NombreSucursal
 *        in: formData
 *        description: Nombre de la sucursal a actualizar
 *        type: string
 *      - name: IdCiudad
 *        in: formData
 *        description: Código de la ciudad en la que está ubicada la sucursal (actualizado)
 *        type: integer
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.put('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE sucursales SET NombreSucursal =?, IdCiudad = ?  WHERE IdSucursal = ?',[req.body.NombreSucursal, req.body.IdCiudad, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
        
    })
})

module.exports = routes
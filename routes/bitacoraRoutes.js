const express = require('express')
const routes = express.Router()


routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query("SELECT * FROM bitacora", (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        console.log(req.body)
        conn.query('INSERT INTO bitacora (IdCategoria, CaracteristicaDescripcion, Estado, Nivel, Requerido, Placeholder, Tooltip, UsuarioCreo, CaracteristicaTipo ) VALUES (?,?,?,?,?,?,?,?,?)', [req.body.IdCategoria, req.body.CaracteristicaDescripcion, 1, req.body.Nivel, req.body.Requerido, req.body.Placeholder, req.body.Tooltip, req.body.UsuarioCreo, req.body.CaracteristicaTipo], (err, rows) => {
            if (err) return res.send(err)

            res.json({ "message": rows.insertId });
        })
    })
})

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
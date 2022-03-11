const express = require('express')
const routes = express.Router()


routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query("SELECT Accion, Modulo, DATE_FORMAT(Fecha, '%d/%m/%y %h:%i %p') AS 'Fecha' FROM bitacora", (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

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
const express = require('express')
const routes = express.Router()


routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query("SELECT * FROM asignaciones", (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/:id', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)
        conn.query("SELECT * FROM asignaciones WHERE IdAsignacion = ?", [req.params.id], (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/details/:id', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)
        conn.query("SELECT * FROM asignaciones WHERE IdAsignacion = ?", [req.params.id], (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})


routes.get('/status/:id', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)
        conn.query("SELECT * FROM equiposestado WHERE IdEquipo = ?", [req.params.id], (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO asignaciones(IdEmpleado, IdEquipo, DetalleAsignacion, IncluyeMochila, IncluyeMouse, IncluyeCargador, IncluyeTeclado) VALUES (?,?,?,?,?,?,?)',[req.body.IdEmpleado, req.body.IdEquipo, req.body.DetalleAsignacion, req.body.IncluyeMochila, req.body.IncluyeMouse, req.body.IncluyeCargador, req.body.IncluyeTeclado], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
        
    })
})

routes.delete('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM asignaciones WHERE IdAsignacion = ?',[req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
        
    })
})

routes.put('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE asignaciones SET  ? WHERE IdAsignacion = ?',[req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
        
    })
})

module.exports = routes
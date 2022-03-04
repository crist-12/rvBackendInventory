const express = require('express')
const routes = express.Router()


routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query("SELECT * FROM equipos", (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/:id', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)
        conn.query("SELECT a.CaracteristicaDescripcion, if(c.IdOpcion IS NOT NULL, c.OpcionDescripcion, b.Respuesta) AS Respuesta, b.IdEquipoIngresado, a.CaracteristicaTipo FROM caracteristica a INNER JOIN caracteristicarespuesta b  ON a.IdCategoria = b.IdCategoria AND a.IdCaracteristica = b.IdCaracteristica LEFT JOIN caracteristicaopcion c ON b.Respuesta = c.IdOpcion AND a.IdCategoria = c.IdCategoria AND a.IdCaracteristica = c.IdCaracteristica WHERE a.IdCategoria = 1 AND b.IdEquipoIngresado = ?", [req.params.id], (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO equipos SET ?',[req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows);
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
        conn.query('UPDATE equipos SET  ? WHERE IdEquipo = ?',[req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)
            res.json(rows);
        })
        
    })
})

routes.put('/status/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE equiposestado SET TipoEstado = ? WHERE IdEquipo = ?',[req.body.TipoEstado, req.params.id], (err, rows)=>{
            if(err) return res.send(err)
            res.json(rows);
        })
        
    })
})

module.exports = routes
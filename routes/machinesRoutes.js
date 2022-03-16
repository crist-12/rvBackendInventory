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

routes.get('/types', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query("SELECT IdTipoCampo AS 'value', DisplayText AS 'label', DescripcionTipo FROM caracteristicatipo", (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/update/:id', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query("SELECT IdEquipoIngresado, A.IdCategoria, A.IdCaracteristica, Respuesta, CaracteristicaDescripcion, caracteristicatipo, Requerido, OpcionDescripcion FROM caracteristicarespuesta AS A JOIN caracteristica AS B ON A.IdCaracteristica = B.IdCaracteristica  LEFT JOIN caracteristicaopcion AS C ON C.IdOpcion = A.Respuesta WHERE A.IdCategoria = 1 AND A.IdEquipoIngresado = ? ORDER BY B.Nivel", [req.params.id], (err, rows) => {
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

routes.get('/label/:id', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)
        conn.query("SELECT OpcionDescripcion FROM caracteristicaopcion WHERE IdOpcion = ?", [req.params.id], (err, rows) => {
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
        conn.query('UPDATE caracteristicarespuesta SET Respuesta = ? WHERE IdEquipoIngresado = ? AND IdCaracteristica = ?',[req.body.Respuesta, req.body.IdEquipoIngresado, req.params.id], (err, rows)=>{
            if(err) return res.send(err)
            res.json(rows);
            console.log(rows)
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

routes.put('/receivedcheck/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query("UPDATE equiposestado SET TipoEstado = IF((SELECT COUNT(DISTINCT A.IdEquipo) AS 'Bandera' FROM asignaciones AS A WHERE A.IdEquipo = ?) = 1, 1, 2) WHERE IdEquipo = ?",[req.body.TipoEstado, req.params.id], (err, rows)=>{
            if(err) return res.send(err)
            res.json(rows);
        })
        
    })
})

module.exports = routes
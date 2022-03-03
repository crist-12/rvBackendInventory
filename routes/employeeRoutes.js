const express = require('express')
const routes = express.Router()


routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query("SELECT A.IdEmpleado, A.NombreEmpleado, B.DescripcionArea FROM empleados AS A JOIN areas AS B ON A.IdArea = B.IdArea", (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/details', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query("SELECT A.IdEmpleado, A.NombreEmpleado, B.DescripcionArea, C.NombreSucursal, D.NombreCiudad FROM empleados AS A JOIN areas AS B ON A.IdArea = B.IdArea JOIN sucursales AS C ON C.IdSucursal = A.IdSucursal JOIN ciudades AS D ON C.IdCiudad = D.IdCiudad WHERE A.EstadoEmpleado = 1", (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/:id', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)
        conn.query("SELECT * FROM empleados WHERE IdEmpleado = ?", [req.params.id], (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO empleados (NombreEmpleado, EstadoEmpleado, IdArea) VALUES(?,?,?)',[req.body.NombreEmpleado, req.body.EstadoEmpleado, req.body.IdArea], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
        
    })
})

routes.delete('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM empleados WHERE IdEmpleado = ?',[req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
        
    })
})

routes.put('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE empleados SET  ? WHERE IdEmpleado = ?',[req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
        
    })
})

module.exports = routes
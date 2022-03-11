const express = require('express')
const routes = express.Router()


routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query("SELECT * FROM empleados AS A JOIN areas AS B ON A.IdArea = B.IdArea JOIN sucursales AS C ON A.IdSucursal = C.IdSucursal JOIN ciudades AS D ON C.IdCiudad = D.IdCiudad", (err, rows) => {
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

routes.put('/changestatus/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE empleados SET EstadoEmpleado = IF(EstadoEmpleado = 1, 0, 1) WHERE IdEmpleado = ?',[req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows);
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
        conn.query('INSERT INTO empleados (NombreEmpleado, Email, IdArea, IdSucursal, EstadoEmpleado) VALUES(?,?,?,?,?)',
        [req.body.NombreEmpleado, req.body.Email, req.body.IdArea, req.body.IdSucursal, 1], (err, rows)=>{
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
        conn.query('UPDATE empleados SET NombreEmpleado = ?, Email = ?, IdArea = ?, IdSucursal = ?, EstadoEmpleado = ? WHERE IdEmpleado = ?',[req.body.NombreEmpleado, req.body.Email, req.body.IdArea, req.body.IdSucursal, req.body.EstadoEmpleado, req.params.id], (err, rows)=>{
            if(err) return res.send(err)
            console.log(req.body)
            console.log(req.params.id)
            res.json(rows);
        })
        
    })
})

module.exports = routes
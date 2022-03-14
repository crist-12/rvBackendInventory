const express = require('express')
const routes = express.Router()


routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query("SELECT GROUP_CONCAT(IF(b.CaracteristicaTipo = 4, c.OpcionDescripcion, a.Respuesta) SEPARATOR ' ') AS 'Equipo', "+
        "E.NombreEmpleado, D.DetalleAsignacion, DATE_FORMAT(D.FechaAsignacion, '%d/%m/%y') AS 'FechaAsignacion', D.IncluyeMochila, "+
        "D.IncluyeMouse, D.IncluyeCargador, D.IncluyeTeclado, D.IncluyeWebCam, "+
        "F.DescripcionArea, H.NombreCiudad, G.NombreSucursal  FROM caracteristicarespuesta AS A "+
        "INNER JOIN caracteristica AS B ON A.IdCategoria = B.IdCategoria AND A.IdCaracteristica = B.IdCaracteristica "+
        "LEFT JOIN caracteristicaopcion AS C ON A.Respuesta = C.IdOpcion AND A.IdCategoria = C.IdCategoria AND A.IdCaracteristica = C.IdCaracteristica "+
        "JOIN asignaciones AS D ON A.IdEquipoIngresado = D.IdEquipo "+
        "JOIN empleados AS E ON D.IdEmpleado = E.IdEmpleado "+
        "JOIN areas AS F ON F.IdArea = E.IdArea "+
        "JOIN sucursales AS G ON G.IdSucursal = E.IdSucursal "+
        "JOIN ciudades AS H ON G.IdCiudad = H.IdCiudad "+
        "WHERE A.IdCaracteristica IN(1, 3, 6) AND A.IdCategoria = 1 "+
        "GROUP BY A.FechaIngreso", (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/history', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query("SELECT GROUP_CONCAT(IF(b.CaracteristicaTipo = 4, c.OpcionDescripcion, a.Respuesta) SEPARATOR ' ') AS 'Equipo', "+
        "E.NombreEmpleado, D.DetalleAsignacion, DATE_FORMAT(D.FechaAsignacion, '%d/%m/%y %h:%i:%s %p') AS 'FechaAsignacion', D.IncluyeMochila, "+
        "D.IncluyeMouse, D.IncluyeCargador, D.IncluyeTeclado, D.IncluyeWebCam, "+
        "F.DescripcionArea, H.NombreCiudad, G.NombreSucursal, DATE_FORMAT(D.FechaRemocion, '%d/%m/%y %h:%i:%s %p') AS 'FechaRemocion'  FROM caracteristicarespuesta AS A "+
        "INNER JOIN caracteristica AS B ON A.IdCategoria = B.IdCategoria AND A.IdCaracteristica = B.IdCaracteristica "+
        "LEFT JOIN caracteristicaopcion AS C ON A.Respuesta = C.IdOpcion AND A.IdCategoria = C.IdCategoria AND A.IdCaracteristica = C.IdCaracteristica "+
        "JOIN asignacioneshistorico AS D ON A.IdEquipoIngresado = D.IdEquipo "+
        "JOIN empleados AS E ON D.IdEmpleado = E.IdEmpleado "+
        "JOIN areas AS F ON F.IdArea = E.IdArea "+
        "JOIN sucursales AS G ON G.IdSucursal = E.IdSucursal "+
        "JOIN ciudades AS H ON G.IdCiudad = H.IdCiudad "+
        "WHERE A.IdCaracteristica IN(1, 3, 6) AND A.IdCategoria = 1 "+
        "GROUP BY A.FechaIngreso, D.FechaRemocion", (err, rows) => {
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
        conn.query('INSERT INTO asignaciones(IdEmpleado, IdEquipo, DetalleAsignacion, IncluyeMochila, IncluyeMouse, IncluyeCargador, IncluyeTeclado, IncluyeWebCam, UsuarioAsigna) VALUES (?,?,?,?,?,?,?,?,?)',[req.body.IdEmpleado, req.body.IdEquipo, req.body.DetalleAsignacion, req.body.IncluyeMochila, req.body.IncluyeMouse, req.body.IncluyeCargador, req.body.IncluyeTeclado, req.body.IncluyeWebCam, req.body.UsuarioAsigna], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
        
    })
})

routes.delete('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM asignaciones WHERE IdEquipo = ?',[req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
        
    })
})

routes.put('/remove/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE asignaciones SET FechaRemocion = NOW() WHERE IdEquipo = ? AND FechaRemocion IS NULL',[req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
        
    })
})

routes.put('/receive/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE mantenimientos SET FacturaMantenimiento = ?, FechaRecibida = NOW() WHERE IdEquipo = ? ORDER BY IdMantenimiento DESC LIMIT 1',[req.body.FacturaMantenimiento,req.params.id ], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
        
    })
})


module.exports = routes
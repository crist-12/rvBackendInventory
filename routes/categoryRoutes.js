const express = require('express')
const routes = express.Router()


routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query("SELECT * FROM categorias WHERE EstadoCategoria = 1", (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/table', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query("SELECT A.IdCategoria, A.DescripcionCategoria, IF(A.EstadoCategoria = 1, 'Activo', 'Inactivo') AS 'EstadoCategoria', DATE_FORMAT(A.FechaCreacion, '%d/%m/%Y') AS 'FechaCreacion', B.DescripcionGrupo, A.UsuarioCreo FROM categorias AS A JOIN grupos AS B ON A.IdGrupo = B.IdGrupo", (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/:id', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)
        conn.query("SELECT * FROM categorias WHERE IdCategoria = ?", [req.params.id], (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/update/:id', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)
        conn.query("SELECT *, IF(IdTipoCampo = 4,GROUP_CONCAT(C.OpcionDescripcion SEPARATOR '|') , '') AS 'Campos', A.IdCaracteristica AS 'Code' FROM caracteristica AS A JOIN caracteristicatipo AS B ON A.CaracteristicaTipo = B.IdTipoCampo LEFT JOIN caracteristicaopcion AS C ON A.IdCategoria = C.IdCategoria AND A.IdCaracteristica = C.IdCaracteristica WHERE A.IdCategoria = ? GROUP BY A.IdCaracteristica", [req.params.id], (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/items/:id', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)
        conn.query("SELECT *, (SELECT MAX(Nivel) FROM caracteristicaopcion WHERE IdCaracteristica = A.IdCaracteristica) AS 'MaxNivel' FROM caracteristicaopcion AS A WHERE IdCategoria = ?", [req.params.id], (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO categorias (DescripcionCategoria, EstadoCategoria, UsuarioCreo, IdGrupo) VALUES (?, ?, ?, ?)',[req.body.DescripcionCategoria, req.body.EstadoCategoria, req.body.UsuarioCreo, req.body.IdGrupo], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
        
    })
})

routes.post('/items', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO caracteristicaopcion (IdCategoria, IdCaracteristica, OpcionDescripcion, Nivel, Estado) VALUES (?, ?, ?, ?, ?)',[req.body.IdCategoria, req.body.IdCaracteristica, req.body.OpcionDescripcion, req.body.Nivel, 1], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
        
    })
})



routes.delete('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM categorias WHERE IdCategoria = ?',[req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
        
    })
})

routes.put('/changestatus/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE categorias SET EstadoCategoria = IF(EstadoCategoria = 1, 0, 1) WHERE IdCategoria = ?',[req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
        
    })
})

routes.put('/update/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE caracteristica SET CaracteristicaDescripcion = ?, Placeholder = ?, Requerido = ? WHERE IdCaracteristica = ? AND IdCategoria = ?',[req.body.CaracteristicaDescripcion, req.body.Placeholder, req.body.Requerido, req.body.IdCaracteristica, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
        
    })
})

routes.put('/updateitems', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE caracteristicaopcion SET Estado = ?, OpcionDescripcion = ? WHERE IdCategoria = ? AND IdCaracteristica = ? AND IdOpcion = ?',[req.body.Estado, req.body.OpcionDescripcion, req.body.IdCategoria, req.body.IdCaracteristica, req.body.IdOpcion], (err, rows)=>{
            if(err) return res.send(err)
            console.log(rows)
            res.json(rows);
        })
        
    })
})

routes.put('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE categorias SET  ? WHERE IdCategoria = ?',[req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
        
    })
})

module.exports = routes
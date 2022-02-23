const express = require('express')
const routes = express.Router()


routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query("SELECT A.DescripcionCategoria, B.CaracteristicaDescripcion, C.DescripcionTipo, B.Requerido, B.Nivel FROM categorias AS A JOIN caracteristica AS B ON A.IdCategoria = B.IdCategoria JOIN caracteristicatipo AS C ON B.CaracteristicaTipo = C.IdTipoCampo WHERE A.IdCategoria = 4", (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/types', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query("SELECT * FROM caracteristicatipo", (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/:id', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)
        conn.query("SELECT * FROM caracteristica WHERE IdCategoria = ?", 4, (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        console.log(req.body)
        conn.query('INSERT INTO caracteristica (IdCategoria, CaracteristicaDescripcion, Estado, Nivel, Requerido, Placeholder, Tooltip, UsuarioCreo, CaracteristicaTipo ) VALUES (?,?,?,?,?,?,?,?,?)',[req.body.IdCategoria, req.body.CaracteristicaDescripcion, 1, req.body.Nivel, req.body.Requerido, req.body.Placeholder, req.body.Tooltip, req.body.UsuarioCreo, req.body.CaracteristicaTipo], (err, rows)=>{
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
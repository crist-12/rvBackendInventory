const express = require('express')
const routes = express.Router()


routes.get('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query("SELECT A.DescripcionCategoria, B.CaracteristicaDescripcion, C.DescripcionTipo, B.Requerido, B.Nivel FROM categorias AS A JOIN caracteristica AS B ON A.IdCategoria = B.IdCategoria JOIN caracteristicatipo AS C ON B.CaracteristicaTipo = C.IdTipoCampo WHERE A.IdCategoria = 4", (err, rows) => {
            if (err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/types', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query("SELECT * FROM caracteristicatipo", (err, rows) => {
            if (err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/key', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query("SELECT IFNULL(MAX(IdEquipoIngresado), 0) +1 AS 'Key' FROM caracteristicarespuesta", (err, rows) => {
            if (err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/headers/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query("SELECT IdCategoria, IdCaracteristica, CaracteristicaDescripcion FROM caracteristica  WHERE IdCategoria = ? ORDER BY Nivel ASC", [req.params.id], (err, rows) => {
            if (err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/rows/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query("SELECT b.IdEquipoIngresado, b.IdCaracteristica, if(c.IdOpcion IS NOT NULL, c.OpcionDescripcion, b.Respuesta) AS Respuesta FROM caracteristica a INNER JOIN caracteristicarespuesta b  ON a.IdCategoria = b.IdCategoria AND a.IdCaracteristica = b.IdCaracteristica LEFT JOIN caracteristicaopcion c ON b.Respuesta = c.IdOpcion AND a.IdCategoria = c.IdCategoria AND a.IdCaracteristica = c.IdCaracteristica WHERE a.IdCategoria = ? ORDER BY b.IdEquipoIngresado ASC, a.Nivel ASC", [req.params.id], (err, rows) => {
            if (err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/equipos', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query("SELECT GROUP_CONCAT(IF(b.CaracteristicaTipo = 4, c.OpcionDescripcion, a.Respuesta) SEPARATOR ' ') AS 'Equipo', e.DescripcionEstado, D.IdEquipo FROM caracteristicarespuesta AS A "+
        "INNER JOIN caracteristica AS B ON A.IdCategoria = B.IdCategoria AND A.IdCaracteristica = B.IdCaracteristica "+ 
        "LEFT JOIN caracteristicaopcion AS C ON A.Respuesta = C.IdOpcion AND A.IdCategoria = C.IdCategoria AND A.IdCaracteristica = C.IdCaracteristica "+
        "JOIN equiposestado AS D ON A.IdEquipoIngresado = D.IdEquipo "+
        "JOIN estados E ON D.TipoEstado = E.IdEstado "+
        "WHERE A.IdCaracteristica IN(1, 3, 6) AND A.IdCategoria = 1 "+
        "GROUP BY A.FechaIngreso"
        , (err, rows) => {
                if (err) return res.send(err)
                res.json(rows)
            })
    })
})

routes.get('/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query("SELECT * FROM caracteristica WHERE IdCategoria = ?", 4, (err, rows) => {
            if (err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/filter/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query("SELECT A.*, B.DescripcionTipo FROM caracteristica AS A JOIN caracteristicatipo AS B ON A.CaracteristicaTipo = B.IdTipoCampo WHERE A.IdCategoria = ? ORDER BY A.Nivel ASC", req.params.id, (err, rows) => {
            if (err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/lastlevel/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query("SELECT MAX(Nivel) AS 'LastNivel' FROM caracteristica WHERE IdCategoria = ?", req.params.id, (err, rows) => {
            if (err) return res.send(err)

            res.json(rows)
        })
    })
})


routes.get('/options/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query("SELECT IdOpcion, IdCaracteristica, OpcionDescripcion FROM caracteristicaopcion WHERE IdCategoria = ? AND Estado = 1 ORDER BY IdCaracteristica ASC, Nivel ASC", req.params.id, (err, rows) => {
            if (err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        console.log(req.body)
        conn.query('INSERT INTO caracteristica (IdCategoria, CaracteristicaDescripcion, Estado, Nivel, Requerido, Placeholder, Tooltip, UsuarioCreo, CaracteristicaTipo ) VALUES (?,?,?,?,?,?,?,?,?)', [req.body.IdCategoria, req.body.CaracteristicaDescripcion, 1, req.body.Nivel, req.body.Requerido, req.body.Placeholder, req.body.Tooltip, req.body.UsuarioCreo, req.body.CaracteristicaTipo], (err, rows) => {
            if (err) return res.send(err)

            res.json({ "message": rows.insertId });
        })
    })
})

routes.post('/detail', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        // if(req.body.CaracteristicaTipo == 4){
        conn.query('INSERT INTO caracteristicaopcion (IdCategoria, IdCaracteristica, OpcionDescripcion, Nivel, Estado) VALUES(?,?,?,?,?)', [req.body.IdCategoria, req.body.IdCaracteristica, req.body.Valores, req.body.Nivel, 1], (err2, rows) => {
            if (err2) return res.send(err2)
            // console.log(index)
            res.json(rows);
        })
        //}
    })
})

routes.post('/state', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        // if(req.body.CaracteristicaTipo == 4){
        conn.query('INSERT INTO equiposestado (IdEquipo, TipoEstado) VALUES(?,?)', [req.body.IdEquipo, 1], (err2, rows) => {
            if (err2) return res.send(err2)
            // console.log(index)
            res.json(rows);
        })
        //}
    })
})

routes.post('/entries', (req, res) => {

    
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        console.log(req.body)
        conn.query('INSERT INTO caracteristicarespuesta (IdEquipoIngresado, IdCategoria, IdCaracteristica, Respuesta, UsuarioCreo) VALUES(?,?,?,?,?)', [req.body.IdEquipoIngresado, req.body.IdCategoria, req.body.IdCaracteristica, req.body.Respuesta, req.body.UsuarioCreo], (err2, rows) => {
            if (err2) return res.send(err2)
            //console.log(rows)
            res.json(rows);
            
        })
        //}
    })
})

routes.post('/entry', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        // if(req.body.CaracteristicaTipo == 4){
        conn.query('INSERT INTO caracteristicarespuesta (IdCategoria, IdCaracteristica, Respuesta, UsuarioCreo) VALUES(?,?,?,?)', [req.body.IdCategoria, req.body.IdCaracteristica, req.body.Respuesta, req.body.UsuarioCreo], (err2, rows) => {
            if (err2) return res.send(err2)
            // console.log(index)
            res.json(rows);
        })
        //}
    })
})

routes.delete('/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('DELETE FROM categorias WHERE IdCategoria = ?', [req.params.id], (err, rows) => {
            if (err) return res.send(err)

            res.json(rows);
        })

    })
})

routes.put('/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('UPDATE categorias SET  ? WHERE IdCategoria = ?', [req.body, req.params.id], (err, rows) => {
            if (err) return res.send(err)

            res.json(rows);
        })

    })
})

module.exports = routes
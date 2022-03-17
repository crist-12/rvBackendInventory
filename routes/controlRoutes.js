const express = require('express')
const routes = express.Router()

/**
 * @swagger
 * /control:
 *   get:
 *     description: Obtiene registros de los controles registrados
 *     tags: [Controles]
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.get('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query("SELECT A.DescripcionCategoria, B.CaracteristicaDescripcion, C.DescripcionTipo, B.Requerido, B.Nivel FROM categorias AS A JOIN caracteristica AS B ON A.IdCategoria = B.IdCategoria JOIN caracteristicatipo AS C ON B.CaracteristicaTipo = C.IdTipoCampo WHERE A.IdCategoria = 4", (err, rows) => {
            if (err) return res.send(err)

            res.json(rows)
        })
    })
})

/**
 * @swagger
 * /control/types:
 *   get:
 *     description: Obtiene todos los tipos de datos existentes
 *     tags: [Controles]
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.get('/types', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query("SELECT * FROM caracteristicatipo", (err, rows) => {
            if (err) return res.send(err)

            res.json(rows)
        })
    })
})

/**
 * @swagger
 * /control/key:
 *   get:
 *     description: Obtiene el último equipos ingresado, esto para llevar un "correlativo" con los equipos ingresados
 *     tags: [Controles]
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.get('/key', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query("SELECT IFNULL(MAX(IdEquipoIngresado), 0) +1 AS 'Key' FROM caracteristicarespuesta", (err, rows) => {
            if (err) return res.send(err)

            res.json(rows)
        })
    })
})

/**
 * @swagger
 * /control/headers/{id}:	
 *   get:
 *     description: Obtiene todas las cabeceras (los campos que definimos por cada entidad/producto) listas para desplegarse en una tabla
 *     tags: [Controles]
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Código de la entidad/producto
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.get('/headers/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query("SELECT IdCategoria, IdCaracteristica, CaracteristicaDescripcion FROM caracteristica  WHERE IdCategoria = ? ORDER BY Nivel ASC", [req.params.id], (err, rows) => {
            if (err) return res.send(err)

            res.json(rows)
        })
    })
})

/**
 * @swagger
 * /control/rows/{id}:	
 *   get:
 *     description: Obtiene un listado de todas las entidades/productos registrados (listos para mostrarse en una tabla), se aplica pivote en frontend
 *     tags: [Controles]
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Código de la entidad/producto
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.get('/rows/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query("SELECT b.IdEquipoIngresado, b.IdCaracteristica, if(c.IdOpcion IS NOT NULL, c.OpcionDescripcion, b.Respuesta) AS Respuesta FROM caracteristica a INNER JOIN caracteristicarespuesta b  ON a.IdCategoria = b.IdCategoria AND a.IdCaracteristica = b.IdCaracteristica LEFT JOIN caracteristicaopcion c ON b.Respuesta = c.IdOpcion AND a.IdCategoria = c.IdCategoria AND a.IdCaracteristica = c.IdCaracteristica WHERE a.IdCategoria = ? ORDER BY b.IdEquipoIngresado ASC, a.Nivel ASC", [req.params.id], (err, rows) => {
            if (err) return res.send(err)

            res.json(rows)
        })
    })
})

/**
 * @swagger
 * /control/equipos:
 *   get:
 *     description: Obtiene un registro de todas las COMPUTADORAS registradas
 *     tags: [Controles]
 *     responses:
 *       200:
 *         description: Success
 * 
 */
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
/**
 * @swagger
 * /control/rows/{id}:	
 *   get:
 *     description: Obtiene un listado de las características que pertenezcan a la categoría de la entidad/producto
 *     tags: [Controles]
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Código de la entidad/producto
 *     responses:
 *       200:
 *         description: Success
 * 
 */

routes.get('/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query("SELECT * FROM caracteristica WHERE IdCategoria = ?", 4, (err, rows) => {
            if (err) return res.send(err)

            res.json(rows)
        })
    })
})

/**
 * @swagger
 * /control/filter/{id}:	
 *   get:
 *     description: Obtiene un registro de un determinado equipo dado su código
 *     tags: [Controles]
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Código de la categoría
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.get('/filter/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query("SELECT A.*, B.DescripcionTipo FROM caracteristica AS A JOIN caracteristicatipo AS B ON A.CaracteristicaTipo = B.IdTipoCampo WHERE A.IdCategoria = ? ORDER BY A.Nivel ASC", req.params.id, (err, rows) => {
            if (err) return res.send(err)

            res.json(rows)
        })
    })
})

/**
 * @swagger
 * /control/lastlevel/{id}:	
 *   get:
 *     description: Obtiene un registro del último nivel ingresado, este para cuando vaya a ingresar un nuevo registro, tome el puesto que le corresponde.
 *     tags: [Controles]
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Código de la categoría
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.get('/lastlevel/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query("SELECT MAX(Nivel) AS 'LastNivel' FROM caracteristica WHERE IdCategoria = ?", req.params.id, (err, rows) => {
            if (err) return res.send(err)

            res.json(rows)
        })
    })
})

/**
 * @swagger
 * /control/options/{id}:	
 *   get:
 *     description: Obtiene un listado de las opciones, esto aplica para campos de tipo Selección.
 *     tags: [Controles]
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Código de la entidad/producto
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.get('/options/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query("SELECT IdOpcion, IdCaracteristica, OpcionDescripcion FROM caracteristicaopcion WHERE IdCategoria = ? AND Estado = 1 ORDER BY IdCaracteristica ASC, Nivel ASC", req.params.id, (err, rows) => {
            if (err) return res.send(err)

            res.json(rows)
        })
    })
})

/**
 * @swagger
 * /control:
 *   post:
 *     description: Inserta una nueva característica
 *     tags: [Controles]
 *     parameters:
 *      - name: IdCategoría
 *        description: Código de la categoría a insertar 
 *        in: formData
 *        required: true
 *        type: integer
 *      - name: CaracteristicaDescripcion
 *        description: Nombre de la característica
 *        in: formData
 *        required: true
 *        type: string
 *      - name: Estado
 *        description: Estado Activo/Inactivo
 *        in: formData
 *        required: true
 *        type: boolean
 *      - name: Nivel
 *        description: Posición u el orden en que se deben mostrar las características
 *        in: formData
 *        required: true
 *        type: integer
 *      - name: Requerido
 *        description: Si el campo debe ser obligatorio o no
 *        in: formData
 *        required: true
 *        type: boolean
 *      - name: Placeholder
 *        description: https://developer.mozilla.org/es/docs/Web/CSS/::placeholder
 *        in: formData
 *        required: true
 *        type: string
 *      - name: Tooltip
 *        description: Mensaje que se despliega al ubicar el cursor sobre el elemento
 *        in: formData
 *        required: true
 *        type: string
 *      - name: UsuarioCreo
 *        description: Usuario que creó la característica
 *        in: formData
 *        required: true
 *        type: string
 *     responses:
 *       201:
 *         description: Created
 */
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

/**
 * @swagger
 * /control/detail:
 *   post:
 *     description: Inserta las opciones si existe un campo de Selección mientras se crea la nueva entidad
 *     tags: [Controles]
 *     parameters:
 *      - name: IdCategoria
 *        description: Código de la categoría con la que se está tratando
 *        in: formData
 *        required: true
 *        type: integer
 *      - name: IdCaracteristica
 *        description: Código de la característica con la que se está tratando
 *        in: formData
 *        required: true
 *        type: integer
 *      - name: OpcionDescripcion
 *        description: Nombre de la opción que se está insertando
 *        in: formData
 *        required: true
 *        type: string
 *      - name: Nivel
 *        description: Posicion u orden en el que se deben mostrar las opciones
 *        in: formData
 *        required: true
 *        type: integer
 *      - name: Estado
 *        description: Estado de la opción Activo/Inactivo
 *        in: formData
 *        required: true
 *        type: boolean
 *     responses:
 *       201:
 *         description: Created
 */
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

/**
 * @swagger
 * /control/state:
 *   post:
 *     description: Inserta un registro cada vez que se ingresa un nuevo equipo al sistema, por defecto lo asigna como activo y no asignado
 *     tags: [Controles]
 *     parameters:
 *      - name: IdEquipo
 *        description: Código del equipo
 *        in: formData
 *        required: true
 *        type: integer
 *      - name: TipoEstado
 *        description: Por defecto toma el valor 1, NO ASIGNADO
 *        in: formData
 *        required: true
 *        type: integer

 *     responses:
 *       201:
 *         description: Created
 */
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

/**
 * @swagger
 * /control/entries:
 *   post:
 *     description: Inserta un nuevo registro cuando quiere ingresar un nuevo equipo al sistema
 *     tags: [Controles]
 *     parameters:
 *      - name: IdEquipoIngresado
 *        description: Código del equipo
 *        in: formData
 *        required: true
 *        type: integer
 *      - name: IdCategoria
 *        description: Código de la categoría a la que pertenece el producto ingresado
 *        in: formData
 *        required: true
 *        type: integer
 *      - name: IdCaracterística
 *        description: Código que representa la característica o la pregunta que está respondiendo el usuario
 *        in: formData
 *        required: true
 *        type: integer
 *      - name: Respuesta
 *        description: Respuesta a la pregunta
 *        in: formData
 *        required: true
 *        type: string
 *      - name: UsuarioCreo
 *        description: Usuario que ingresa la respuesta
 *        in: formData
 *        required: true
 *        type: string
 *     responses:
 *       201:
 *         description: Created
 */
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

/**
 * @swagger
 * /control/entry:
 *   post:
 *     description: Inserta un nuevo registro cuando quiere ingresar un nuevo equipo al sistema
 *     tags: [Controles]
 *     parameters:
 *      - name: IdCategoria
 *        description: Código de la categoría a la que pertenece el producto ingresado
 *        in: formData
 *        required: true
 *        type: integer
 *      - name: IdCaracterística
 *        description: Código que representa la característica o la pregunta que está respondiendo el usuario
 *        in: formData
 *        required: true
 *        type: integer
 *      - name: Respuesta
 *        description: Respuesta a la pregunta
 *        in: formData
 *        required: true
 *        type: string
 *      - name: UsuarioCreo
 *        description: Usuario que ingresa la respuesta
 *        in: formData
 *        required: true
 *        type: string
 *     responses:
 *       201:
 *         description: Created
 */
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
/**
 * @swagger
 * /{id}:
 *   delete:
 *     description: Elimina un categoría del sistema
 *     tags: [Controles]
 *     parameters:
 *      - name: IdCategoria
 *        description: Código de la categoria
 *        in: path
 *        required: true
 *        type: integer
 *     responses:
 *       201:
 *         description: Created
 */
routes.delete('/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('DELETE FROM categorias WHERE IdCategoria = ?', [req.params.id], (err, rows) => {
            if (err) return res.send(err)

            res.json(rows);
        })

    })
})

module.exports = routes
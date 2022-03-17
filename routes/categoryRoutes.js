const express = require('express')
const routes = express.Router()

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     description: Obtiene todas las categorias activas
 *     tags: [Categorías]
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query("SELECT * FROM categorias WHERE EstadoCategoria = 1", (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

/**
 * @swagger
 * /category/table/{id}:
 *   get:
 *     description: Obtiene todas los registros de la tabla a mostrar en la tabla de categorias
 *     tags: [Categorías]
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.get('/table', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query("SELECT A.IdCategoria, A.DescripcionCategoria, IF(A.EstadoCategoria = 1, 'Activo', 'Inactivo') AS 'EstadoCategoria', DATE_FORMAT(A.FechaCreacion, '%d/%m/%Y') AS 'FechaCreacion', B.DescripcionGrupo, A.UsuarioCreo FROM categorias AS A JOIN grupos AS B ON A.IdGrupo = B.IdGrupo", (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     description: Obtiene una categoría en específico
 *     tags: [Categorías]
 *     responses:
 *       200:
 *         description: Success
 * 
 */

routes.get('/:id', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)
        conn.query("SELECT * FROM categorias WHERE IdCategoria = ?", [req.params.id], (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

/**
 * @swagger
 * /category/update/{id}:
 *   get:
 *     description: Obtiene un listado de los datos que serán utilizados para mostrar en el modal que le permitirá actualizar una categoría
 *     tags: [Categorías]
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.get('/update/:id', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)
        conn.query("SELECT *, IF(IdTipoCampo = 4,GROUP_CONCAT(C.OpcionDescripcion SEPARATOR '|') , '') AS 'Campos', A.IdCaracteristica AS 'Code' FROM caracteristica AS A JOIN caracteristicatipo AS B ON A.CaracteristicaTipo = B.IdTipoCampo LEFT JOIN caracteristicaopcion AS C ON A.IdCategoria = C.IdCategoria AND A.IdCaracteristica = C.IdCaracteristica WHERE A.IdCategoria = ? GROUP BY A.IdCaracteristica", [req.params.id], (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

/**
 * @swagger
 * /category/items/{id}:
 *   get:
 *     description: Obtiene un listado de los items del campo de tipo Seleccion que el usuario quiera editar
 *     tags: [Categorías]
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.get('/items/:id', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)
        conn.query("SELECT *, (SELECT MAX(Nivel) FROM caracteristicaopcion WHERE IdCaracteristica = A.IdCaracteristica) AS 'MaxNivel' FROM caracteristicaopcion AS A WHERE IdCategoria = ?", [req.params.id], (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

/**
 * @swagger
 * /category:
 *   post:
 *     description: Inserta un nuevo registro de la categoría
 *     tags: [Categorías]
 *     parameters:
 *      - name: DescripcionCategoria
 *        description: Nombre de la categoría/entidad que se desea registrar
 *        in: formData
 *        required: true
 *        type: string
 *      - name: EstadoCategoria
 *        description: Estado activo/inactivo de la categoría
 *        in: formData
 *        required: true
 *        type: boolean
 *      - name: UsuarioCreo
 *        description: Nombre de usuario que creó el registro
 *        in: formData
 *        required: true
 *        type: string
 *      - name: IdGrupo
 *        description: Codigo de identificacion del grupo al que pertenece la categoría
 *        in: formData
 *        required: true
 *        type: int
 *     responses:
 *       201:
 *         description: Created
 */
routes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO categorias (DescripcionCategoria, EstadoCategoria, UsuarioCreo, IdGrupo) VALUES (?, ?, ?, ?)',[req.body.DescripcionCategoria, req.body.EstadoCategoria, req.body.UsuarioCreo, req.body.IdGrupo], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
        
    })
})

/**
 * @swagger
 * /category/items:
 *   post:
 *     description: Cuando se inserta un campo de tipo Seleccion, se debe insertar en la table caracteristicaopcion
 *     tags: [Categorías]
 *     parameters:
 *      - name: IdCategoria
 *        description: Codigo de la categoria que tiene esta caracteristica de tipo Seleccion
 *        in: formData
 *        required: true
 *        type: int
 *      - name: IdCaracteristica
 *        description: Código de la caracteristica que posee estas opciones
 *        in: formData
 *        required: true
 *        type: int
 *      - name: OpcionDescripcion
 *        description: Descripcion de la opcion
 *        in: formData
 *        required: true
 *        type: string
 *      - name: Nivel
 *        description: Orden que siguen las opciones al ser desplegadas
 *        in: formData
 *        required: true
 *        type: int
 *      - name: Estado
 *        description: Estado Activo/Inactivo de la opción
 *        in: formData
 *        required: true
 *        type: boolean
 *     responses:
 *       201:
 *         description: Created
 */
routes.post('/items', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO caracteristicaopcion (IdCategoria, IdCaracteristica, OpcionDescripcion, Nivel, Estado) VALUES (?, ?, ?, ?, ?)',[req.body.IdCategoria, req.body.IdCaracteristica, req.body.OpcionDescripcion, req.body.Nivel, 1], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
        
    })
})

/**
 * @swagger
 * /category/changestatus/{id}:
 *   put:
 *     description: Cambia el estado de una categoría, si está activa se desactiva y viceversa
 *     tags: [Categorías]
 *     parameters:
 *      - name: id
 *        in: path
 *        description: id de la categoría a desactivar
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.put('/changestatus/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE categorias SET EstadoCategoria = IF(EstadoCategoria = 1, 0, 1) WHERE IdCategoria = ?',[req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
        
    })
})


/**
 * @swagger
 * /category/update/{id}:
 *   put:
 *     description: Actualiza los datos de la categoría
 *     tags: [Categorías]
 *     parameters:
 *      - name: IdCategoria
 *        in: path
 *        description: Código de la categoría/entidad que se desea actualizar
 *      - name: CaracteristicaDescripcion
 *        in: formData
 *        description: Nombre de la categoría/entidad que se desea actualizar
 *        type: string
 *      - name: Placeholder
 *        in: formData
 *        description: https://developer.mozilla.org/es/docs/Web/CSS/::placeholder
 *        type: string
 *      - name: Requerido
 *        in: formData
 *        description: Si debe ser obligatorio o no el campo cuando se esté creando uno en la pantalla de creación de una nuevo equipo
 *        type: boolean
 *      - name: IdCaracteristica
 *        in: formData
 *        description: Si debe ser obligatorio o no el campo
 *        type: boolean
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.put('/update/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE caracteristica SET CaracteristicaDescripcion = ?, Placeholder = ?, Requerido = ? WHERE IdCaracteristica = ? AND IdCategoria = ?',[req.body.CaracteristicaDescripcion, req.body.Placeholder, req.body.Requerido, req.body.IdCaracteristica, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
        
    })
})

/**
 * @swagger
 * /category/udpateitems/{id}:
 *   put:
 *     description: Actualiza los items de un campo Seleccion de la categoría
 *     tags: [Categorías]
 *     parameters:
 *      - name: Estado
 *        in: formData
 *        description: Estado de la opcion Activo/Inactivo
 *        type: boolean
 *        required: true
 *      - name: OpcionDescripcion
 *        in: formData
 *        description: Nombre de la opcion del campo de tipo Seleccion que se desea actualizar
 *        type: string
 *      - name: IdCategoria
 *        in: formData
 *        description: Código de la categoría que tiene esta caracteristica de tipo Seleccion
 *        type: int
 *      - name: IdCaracteristica
 *        in: formData
 *        description: Código de la caracteristica que posee estas opciones
 *        type: int
 *      - name: IdOpcion
 *        in: formData
 *        description: Código de la opción a ser modificada
 *        type: boolean
 *     responses:
 *       200:
 *         description: Success
 * 
 */
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


module.exports = routes
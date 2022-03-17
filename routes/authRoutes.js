const express = require('express')
const routes = express.Router()
const bcrypt = require("bcrypt");
const saltRounds = 10;

/**
 * @swagger
 * /auth/register:
 *   post:
 *     description: Registrar un nuevo usuario
 *     tags: [Autenticacion]
 *     parameters:
 *      - name: NombreUsuario
 *        description: Nombre de usuario utilizado al ingresar al sistema
 *        in: formData
 *        required: true
 *        type: string
 *      - name: ContraseniaUsuario
 *        description: Contraseña encriptada utilizada al ingresar al sistema
 *        in: formData
 *        required: true
 *        type: string
 *     responses:
 *       201:
 *         description: Created
 */
routes.post('/register', (req, res) => {

    const username = req.body.NombreUsuario;
    const password = req.body.ContraseniaUsuario;

    bcrypt.hash(password, saltRounds, (err, hash) => {

        req.getConnection((err, conn) => {
            if (err) return res.send(err)
            conn.query('INSERT INTO usuarios (NombreUsuario, ContraseniaUsuario) VALUES (?, ?)', [username, hash], (err, rows) => {
                if (err) return res.send(err)

                res.json(rows);
            })

        })
    })
})

/**
 * @swagger
 * /auth/update/{id}:
 *   put:
 *     description: Cuando se remueve un equipo se actualiza el estado del equipo a 'Removido' y se registra la fecha de remocion, se dispara un trigger que guarda dicho registro en asignacioneshistorico
 *     tags: [Autenticacion]
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Id del equipo a remover
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.put('/update/:id', (req, res) => {
    const password = req.body.ContraseniaUsuario;
    bcrypt.hash(password, saltRounds, (err, hash) => {
        req.getConnection((err, conn) => {
            if (err) return res.send(err)
            conn.query('UPDATE usuarios SET ContraseniaUsuario = ?  WHERE NombreUsuario = ?', [hash, req.params.id], (err, rows) => {
                if (err) return res.send(err)
                res.json(rows);
            })
        })
    })
})

/**
 * @swagger
 * /auth/login:
 *   post:
 *     description: Loguearse en el sistema
 *     tags: [Autenticacion]
 *     parameters:
 *      - name: NombreUsuario
 *        description: Nombre de usuario utilizado al ingresar al sistema
 *        in: formData
 *        required: true
 *        type: string
 *      - name: ContraseniaUsuario
 *        description: Contraseña encriptada utilizada al ingresar al sistema
 *        in: formData
 *        required: true
 *        type: string
 *     responses:
 *       201:
 *         description: Created
 */
routes.post('/login', (req, res) => {
    const username = req.body.NombreUsuario;
    const password = req.body.ContraseniaUsuario;
    req.getConnection((err, conn) => {

        if (err) return res.send(err)
        conn.query('SELECT * FROM usuarios WHERE NombreUsuario = ?', [username], (err, rows) => {
            if (err) return res.send({ message: err })

            if (rows.length > 0) {
                bcrypt.compare(password, rows[0].ContraseniaUsuario, (error, response) => {
                    if (response) {
                        req.session.user = rows;
                        console.log(req.session.user);
                        res.send(rows);
                    } else {
                        res.send({ message: "Nombre de usuario / contraseña inválidos" });
                    }
                })
            } else {
                res.send({ message: "Ningún usuario registrado" });
            }
        })

    })

})

/**
 * @swagger
 * /auth/login:
 *   get:
 *     description: Obtiene datos sobre la cookie de sesion del usuario
 *     tags: [Autenticacion]
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.get('/login', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        if (req.session.user) {
            res.send({ loggedIn: true, user: req.session.user })
        } else {
            res.send({ loggedIn: false })
        }
    })
})

/**
 * @swagger
 * /auth/sessions/{username}:
 *   get:
 *     description: Obtiene los registros de los ultimos veinte inicios de sesion
 *     tags: [Autenticacion]
 *     parameters:
 *      - name: username
 *        in: path
 *        description: Nombre de usuario a obtener registros
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.get('/sessions/:username', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query("SELECT IdBitacora, Accion, DATE_FORMAT(Fecha, '%d/%m/%y %h:%i:%s %p') AS 'FechaF' FROM bitacora WHERE Accion LIKE CONCAT('%',?,'%') AND Accion LIKE '%sistema' ORDER BY Fecha DESC LIMIT 20", [req.params.username], (err, rows) => {
            if (err) return res.send(err)
            console.log(req.params.username);
            res.json(rows)
        })
    })
})

/**
 * @swagger
 * /auth/color/{username}:
 *   get:
 *     description: Obtiene datos sobre la preferencia del color del usuario
 *     tags: [Autenticacion]
 *     parameters:
 *      - name: username
 *        in: path
 *        description: Nombre de usuario a obtener registro
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.get('/color/:username', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query("SELECT Color FROM preferencias WHERE IdUsuario = ?", [req.params.username], (err, rows) => {
            if (err) return res.send(err)
            console.log(req.params.username);
            res.json(rows)
        })
    })
})

/**
 * @swagger
 * /auth/color/{username}:
 *   put:
 *     description: Actualiza la preferencia del color del usuario
 *     tags: [Autenticacion]
 *     parameters:
 *      - name: username
 *        in: path
 *        description: Nombre del usuario al que se le actualizara la preferencia del color
 *     responses:
 *       200:
 *         description: Success
 * 
 */
routes.put('/color/:username', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query("UPDATE preferencias SET Color = ? WHERE IdUsuario = ?", [req.body.Color, req.params.username], (err, rows) => {
            if (err) return res.send(err)
            console.log(req.params.username);
            res.json(rows)
        })
    })
})

module.exports = routes
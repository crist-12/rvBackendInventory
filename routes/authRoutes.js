const express = require('express')
const routes = express.Router()
const bcrypt = require("bcrypt");
const saltRounds = 10;

routes.post('/register', (req, res)=>{

    const username = req.body.NombreUsuario;
    const password = req.body.ContraseniaUsuario;

    bcrypt.hash(password, saltRounds, (err, hash)=>{

        req.getConnection((err, conn)=>{
            if(err) return res.send(err)
            conn.query('INSERT INTO usuarios (NombreUsuario, ContraseniaUsuario) VALUES (?, ?)',[username, hash], (err, rows)=>{
                if(err) return res.send(err)
    
                res.json(rows);
            })
            
        })
    })
})

routes.post('/login', (req, res) => {
    const username = req.body.NombreUsuario;
    const password = req.body.ContraseniaUsuario;

        req.getConnection((err, conn)=>{

            if(err) return res.send(err)
            conn.query('SELECT * FROM usuarios WHERE NombreUsuario = ?',[username], (err, rows)=>{
                if(err) return res.send({message: err})
                
                if(rows.length > 0){
                    bcrypt.compare(password, rows[0].ContraseniaUsuario, (error, response)=> {
                        if(response){
                            req.session.user = rows;
                            console.log(req.session.user);
                            res.send(rows);
                        }else{
                            res.send({ message: "Nombre de usuario / contraseña inválidos"});
                        }
                    })
                }else{
                    res.send({message: "Ningún usuario registrado"});
                }
            })
            
        })

})

routes.get('/login', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)
        if(req.session.user){
            res.send({ loggedIn: true, user: req.session.user})
        }else{
            res.send({ loggedIn: false })
        }
    })
})

module.exports = routes
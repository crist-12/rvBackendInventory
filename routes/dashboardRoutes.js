const express = require('express')
const routes = express.Router()


/**
 * @swagger
 * /dashboard:
 *   get:
 *     description: Obtiene los registros que se utilizarán para la elaboración del gráfico y el dashboard
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Success
 * 
 */

routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=> {
        if(err) return res.send(err)

        conn.query("CALL spDashboardData", (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})


module.exports = routes
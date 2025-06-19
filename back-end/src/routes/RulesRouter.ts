import express from 'express'
import db from "../db";

const rulesRouter = express.Router()

rulesRouter.get('/', (req, res) => {
    const newApiRule = db.prepare('SELECT * FROM api_rules')
    try {
        const query = newApiRule.all()
        res.status(200).json(query)
    }catch(err){
        res.status(500).send("Something went wrong")
    }

})

rulesRouter.post('/', (req, res) => {

    try {
        const {code, method, pathWithId, response, body} = req.body
        const newApiRule = db.prepare('INSERT INTO api_rules (path, method, code, response, body) VALUES (?, ? ,?, ?, ?)')
        const parsedResponse = Object.keys(response).length === 0 ? null : JSON.stringify(response)
        const parsedBody = Object.keys(body).length === 0 ? null : JSON.stringify(body)

        const query = newApiRule.run(pathWithId, method, code, parsedResponse, parsedBody)
        res.status(200).send(query.lastInsertRowid)

    } catch (err) {
        res.status(500).send("Something went wrong")
    }


})


export default rulesRouter
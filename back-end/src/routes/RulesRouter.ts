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

    const {code, method, path, responseJson: response} = req.body
    const newApiRule = db.prepare('INSERT INTO api_rules (path, method, code, response) VALUES (?, ? ,?, ?)')
    const emptyResponse = Object.keys(response).length === 0 ? null : response
    try {
        const query = newApiRule.run(path, method, code, emptyResponse)
        res.status(200).send(query.lastInsertRowid)

    } catch (err) {
        res.status(500).send("Something went wrong")
    }


})


export default rulesRouter
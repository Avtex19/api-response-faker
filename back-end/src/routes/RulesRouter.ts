import express from 'express'

const rulesRouter = express.Router()

rulesRouter.get('/all', (req, res) => {
    console.log("req")
})



export default rulesRouter
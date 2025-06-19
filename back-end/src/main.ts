import express from 'express'
import rulesRouter from "./routes/RulesRouter";
import cors from 'cors'
import db from "./db";

const app = express()
app.use(express.json());
app.use(cors())
app.use('/rules', rulesRouter)
const PORT = 3000;


app.all('*url', (req, res, next) => {

    if (['/rules'].includes(req.path)) {
        return next()
    }

    const parsedBody = Object.keys(req.body).length === 0 ? null : JSON.stringify(req.body)

    try {
        const queryForRule = db.prepare('SELECT * from api_rules WHERE method = ? AND path = ? AND body = ?')
        const data = queryForRule.all(req.method, req.path, parsedBody)
        if (data.length === 0) {
            res.status(404).send('Not Found')
        }

        res.status(200).send(data)
    } catch (err) {
        res.status(500).send(err)
    }


})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
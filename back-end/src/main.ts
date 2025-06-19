import express from 'express'
import rulesRouter from "./routes/RulesRouter";
import cors from 'cors'
import db from "./db";
import {IFakerRuleForm} from "./models/FakeRule";

const app = express()
app.use(express.json());
app.use(cors())
app.use('/rules', rulesRouter)
const PORT = 3000;


app.all('*url', (req, res, next) => {

    if (['/rules'].includes(req.path)) {
        return next()
    }
    try {
        const body = req.body || {}
        const parsedBody = Object.keys(body).length === 0 ? null : JSON.stringify(body)
        const queryForRuleWithoutBody = db.prepare('SELECT * from api_rules WHERE method = ? AND path = ?')

        const queryForRule = db.prepare('SELECT * from api_rules WHERE method = ? AND path = ? AND body = ?')
        let data: IFakerRuleForm[];
        if(parsedBody) {
            data = queryForRule.all(req.method, req.path, parsedBody) as IFakerRuleForm[]
        }else{
            data = queryForRuleWithoutBody.all(req.method, req.path) as IFakerRuleForm[]
        }
        if (data.length === 0) {
            res.status(404).send('Not Found')
        } else {
            res.status(200).send(data)
        }
    } catch (err) {
        res.status(500).send(err)
    }


})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
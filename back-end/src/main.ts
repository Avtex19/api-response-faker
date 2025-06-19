import express from 'express'
import rulesRouter from "./routes/RulesRouter";


const app = express()
app.use(express.json())

app.use('/rules', rulesRouter)
const PORT = 3000;


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
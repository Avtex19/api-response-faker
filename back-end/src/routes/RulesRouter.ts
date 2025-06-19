import express from 'express';
import { getAllRules, createRule } from '../controllers/RulesController';

const rulesRouter = express.Router();

rulesRouter.get('/', getAllRules);
rulesRouter.post('/', createRule);

export default rulesRouter;

import { Request, Response } from 'express';
import db from '../db';

export const getAllRules = (req: Request, res: Response) => {
    try {
        const stmt = db.prepare('SELECT * FROM api_rules');
        const rules = stmt.all();
        res.status(200).json(rules);
    } catch (err) {
        console.error('Error getting rules:', err);
        res.status(500).send('Something went wrong');
    }
};

export const createRule = (req: Request, res: Response) => {
    try {
        const { code, method, pathWithId, response, body } = req.body;

        const parsedResponse =
            response && Object.keys(response).length > 0
                ? JSON.stringify(response)
                : '';
        const parsedBody =
            body && Object.keys(body).length > 0
                ? JSON.stringify(body)
                : '';

        const checkStmt = db.prepare(
            "SELECT * FROM api_rules WHERE path = ? AND method = ? AND code = ? AND IFNULL(response, '') = ? AND IFNULL(body, '') = ?"
        );

        const existing = checkStmt.get(pathWithId, method, code, parsedResponse, parsedBody);

        if (existing) {
            return res.status(409).json({ error: 'Rule already exists' });
        }

        const insertStmt = db.prepare(
            'INSERT INTO api_rules (path, method, code, response, body) VALUES (?, ?, ?, ?, ?)'
        );

        const result = insertStmt.run(pathWithId, method, code, parsedResponse, parsedBody);

        res.status(200).send({ id: result.lastInsertRowid });
    } catch (err) {
        console.error('Error creating rule:', err);
        res.status(500).send('Something went wrong');
    }
};

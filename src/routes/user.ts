import * as express from 'express';

const base = '/user';

const loginUser = (req: express.Request, res: express.Response) => {
    res.status(500).json({
        message: 'not inplemented !'
    });
};

const getUser = (req: express.Request, res: express.Response) => {
    res.status(500).json({
        message: 'not implemented'
    });
};

const welcome = (req: express.Request, res: express.Response) => {
    res.json({
        message: 'Welcome to the jungle !'
    });
};

export const init = (router: express.Router) => {
    router.get(`${base}`, getUser);
    router.get(`${base}/welcome`, welcome);
    router.post(`${base}/login`, loginUser);
};
import * as express from 'express'
import * as fs from 'fs'
import * as path from 'path'
import * as _ from 'lodash'

export const requestLoggingMW = (logger) => {
    return (req: express.Request, res: express.Response, next) => {
        logger(JSON.stringify(_.pick(req, [ 
            'path',
            'protocol',
            'method'
        ])))

        next()
    }
}

export const initialize = (): express.Router => {
    let router = express.Router()
    
    for (let file of fs.readdirSync(__dirname)) {
        let filePath = path.join(__dirname, file)
    if (__filename !== filePath && fs.statSync(filePath).isFile() && /.*\.(js|ts)$/.test(file))
        require(`./${file}`).init(router)
    }

    return router
}
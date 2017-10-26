import * as express from 'express'
import * as configManager from './config'

console.log('test')

let app = express()

const PORT = configManager.getConfig('app.port') || '3000'

app.listen(PORT, (err: Error) => {
    if (err)
        console.error(`error occured while starting server: ${err.message}`)
    else
        console.log(`server listening to port: ${PORT}`)
})
import * as express from 'express';
import * as helmet from 'helmet';
import * as configManager from './config';
import * as routes from './routes';

// import * as playground from './playground'
// playground.init()

let app = express();
configManager.initialize();
const PORT = configManager.getConfig('app.port') || process.env.GND_PORT || '3000';

let router =  routes.initialize();

app.use(helmet());
app.use('/', routes.requestLoggingMW(console.log));
app.use('/', router);

app.listen(PORT, (err: Error) => {
    if (err)
        console.error(`error occured while starting server: ${err.message}`);
    else
        console.log(`server listening to port: ${PORT}`);
});
import * as fs from 'fs';
import * as path from 'path';
import * as _ from 'lodash';

const DEFAULT_CONFIG_ROOT = '../config';

let configStore = {};

export const initialize = (options: any = null): boolean => {
    try {
        let relativeConfigPath = _.isNull(options) ? DEFAULT_CONFIG_ROOT : (options.port || DEFAULT_CONFIG_ROOT);
        let configPath = path.join(__dirname, relativeConfigPath);
        for (let file of fs.readdirSync(configPath)) {
            if (fs.statSync(path.join(configPath, file)).isFile() && /^[^.]+\.config\.json$/.test(file))
                configStore[file.replace('.config.json', '')] = require(`${relativeConfigPath}/${file}`);
        }

        return true;
    } catch(err) {
        return false;
    }
};

export const getConfig = (configPath: string = null):any => {
    if (_.isNull(configPath)) {
        return configStore;
    } else {
        return _.get(configStore, configPath);
    }
};
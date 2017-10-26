import * as fs from 'fs'
import * as path from 'path'
import * as _ from 'lodash'

const DEFAULT_CONFIG_ROOT = '../config'


export const getConfig = (configPath: string):any => {
    let pathArr = configPath.split('.')
    let filename = pathArr.shift()
    let configRoot = process.env['CONFIG_ROOT'] || DEFAULT_CONFIG_ROOT
    let config = require(path.join(configRoot, `${filename}.config.json`))

    return _.get(config, pathArr)
    
}
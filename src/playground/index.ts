import * as fs from 'fs'
import * as _ from 'lodash'
import * as Promise from 'bluebird'

import {PromisePipeline} from '../common/promisePipeline' 

let genReadFile = (s) => {
    // return fs.readFile()
    let promise = Promise.promisify(fs.readFile)

    return promise(s.filePath)
    .then((data) => {
        s.data = data.toString()
        return s
    })
}

let genCapitalizeData = (s) => {
    return new Promise((resolve, reject) => {
        try {
            s.data = s.data.toUpperCase()
            resolve(s)
        } catch (err) {
            reject(err)
        }
    })
}

let genSaveFile = (s) => {
    let promise = Promise.promisify(fs.writeFile)

    return promise(s.filePath, s.data)
    .then(() => {
        return s
    })
}

export const init = () => {
    let pp = new PromisePipeline([genReadFile, genCapitalizeData, genSaveFile], {
        filePath: 'data/testfile.txt'
    })
    
    pp.run()
    .then(s => console.log(JSON.stringify(s)))
    .catch(err => console.log(err.message))
}

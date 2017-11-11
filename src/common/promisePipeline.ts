import * as Promise from 'bluebird'
import * as _ from 'lodash'

export class PromisePipeline {
    generators: any[]
    scpObject: Object
    constructor (generators: any[], scpObject: Object) {
        this.generators = generators
        this.scpObject = scpObject
    }

    run(callback?: any): Promise<any> {
        
        if (_.isFunction(callback)) { // when a callback is supplied, rather than returning a promise object, callback is called on completion
            this.run().asCallback(callback)
        }

        if (this.generators.length === 0) { // this case will never happen if a valid generators array is provided
            throw new Error('PromisePipeline: Generators array is empty !')
        } else if (this.generators.length === 1) { // this is the limit case where it runs the very first generator promise
            let generator = this.generators[0]
            return generator(this.scpObject)
        } else { // This is the recursive chain. decorated scope is passed down the chain
            let lastGenerator = this.generators.pop()
            return this.run()
            .then(s => {
                return lastGenerator(s)
            })
        }
    }

}
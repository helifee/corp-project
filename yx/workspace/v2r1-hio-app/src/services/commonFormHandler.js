
import xhr from './xhrWrapper'
import locale from '../locale/locale'

let l=locale.$t

export default {
    rules:{
        requiredInput(name){
            return [

                { required: true, message: l('{g.pleaseInput}'+name), trigger: 'blur' },
                { min: 1, max: 100, message: l('{g.form.inputFieldLen}',1,100), trigger: 'blur' }
            ]
        }
    }
}
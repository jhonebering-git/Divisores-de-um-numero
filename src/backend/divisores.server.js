const encontraDivisoresPrimos = require('./api/encontraDivisoresPrimos')
const encontraDivisores = require('./api/encontraDivisores')
const response = require('./http-response')

const express = require('express')
const api = express.Router()

api.get('/', (req, res) => {
    res.redirect("/docs")
})

api.get('/divisores/:num', (req, res) => {
/*
  #swagger.description = 'Calcula todos os divisores que compõem o número.'
  #swagger.parameters['num'] = {
	description: 'Número real que será calculado os divisores',
    type: 'integer',
    required: true,
    in: 'path',
    example: 45,
  }

*/
    const num = parseInt(req.params.num)

    if(num === 1){
        return response(res, 200, [1])
    }

    if(num <= 0){
        return response(res, 400)
    }

    const divisoresPrimos = encontraDivisoresPrimos(num)
    const divisores = encontraDivisores(num, divisoresPrimos)

    if(!divisores.length) {
        return response(res, 403)
    }

    response(res, 200, divisores.sort((a,b) => a - b))
})

api.get('/primos/:num', (req, res) => {
/*
  #swagger.description = 'Calcula todos os divisores primos que compõem o número.'
  #swagger.parameters['num'] = {
	description: 'Número real que será calculado os divisores',
    type: 'integer',
    required: true,
    in: 'path',
    example: 45,
  }

*/
    const num = parseInt(req.params.num)

    if(num === 1){
        return response(res, 200, [1])
    }

    if(num <= 0){
        return response(res, 400)
    }

    const divisoresPrimos = encontraDivisoresPrimos(num)

    if(!divisoresPrimos.length) {
        return response(res, 403)
    }

    divisoresPrimos.push(1)

    response(res, 200, divisoresPrimos.sort((a,b) => a - b))
})

// api.get('*', (req, res) => {
//     return response(res, 404)
// })


module.exports = api
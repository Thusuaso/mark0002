const middleware = {}

middleware['authControl'] = require('..\\middleware\\authControl.js')
middleware['authControl'] = middleware['authControl'].default || middleware['authControl']

middleware['authority'] = require('..\\middleware\\authority.js')
middleware['authority'] = middleware['authority'].default || middleware['authority']

middleware['selectionCustomer'] = require('..\\middleware\\selectionCustomer.js')
middleware['selectionCustomer'] = middleware['selectionCustomer'].default || middleware['selectionCustomer']

middleware['sessionControl'] = require('..\\middleware\\sessionControl.js')
middleware['sessionControl'] = middleware['sessionControl'].default || middleware['sessionControl']

export default middleware

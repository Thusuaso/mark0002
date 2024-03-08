const middleware = {}

middleware['authControl'] = require('..\\middleware\\authControl.js')
middleware['authControl'] = middleware['authControl'].default || middleware['authControl']

middleware['sessionControl'] = require('..\\middleware\\sessionControl.js')
middleware['sessionControl'] = middleware['sessionControl'].default || middleware['sessionControl']

export default middleware

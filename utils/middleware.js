const morgan = require('morgan')

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

const morganMiddleware = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.body(req,res)
  ].join(' ')
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

const tokenExtractor = (req, res, next) => {
  const token = getTokenFrom(req)
  req.token = token
  next()
}

module.exports = {
  morganMiddleware,
  tokenExtractor
}
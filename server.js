const express = require('express')
const next = require('next')
const sslRedirect = require('heroku-ssl-redirect')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000
const app = next({ dir: '.', dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()
  server.use(sslRedirect(['production']))

  server.get('/jobs', (req, res) => {
    return app.render(req, res, '/jobs', req.query)
  })

  server.get('/indique', (req, res) => {
    return app.render(req, res, '/indique', req.query)
  })

  server.get('/logout', (req, res) => {
    return app.render(req, res, '/auth/logout', req.query)
  })

  server.get('/login', (req, res) => {
    return app.render(req, res, '/auth/login', req.query)
  })

  server.get('/signup', (req, res) => {
    return app.render(req, res, '/auth/signup', req.query)
  })

  server.get('/confirmar_cadastro/:token', (req, res) => {
    app.render(req, res, '/auth/confirm', req.query)
  })

  server.get('/imoveis', (req, res) => {
    const actualPage = '/listings/index'
    app.render(req, res, actualPage, req.query)
  })

  server.get('/imoveis/adicionar', (req, res) => {
    const actualPage = '/listings/new'
    app.render(req, res, actualPage)
  })

  server.get('/imoveis/:id', (req, res) => {
    const actualPage = '/listings/show'
    const queryParams = { id: req.params.id }
    app.render(req, res, actualPage, queryParams)
  })

  server.get('/imoveis/:id/editar', (req, res) => {
    const actualPage = '/listings/edit'
    const queryParams = { id: req.params.id }
    app.render(req, res, actualPage, queryParams)
  })

  server.get('/imoveis/:listingId/imagens', (req, res) => {
    const actualPage = '/listings/images'
    const queryParams = { listingId: req.params.listingId }
    app.render(req, res, actualPage, queryParams)
  })

  server.get('/user/:id', (req, res) => {
    const actualPage = '/user'
    const queryParams = { id: req.params.id }
    app.render(req, res, actualPage, queryParams)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})


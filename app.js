'use strict'

const bodyParser = require('body-parser')
const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const path = require('path')
const webhook = require('express-github-webhook');
const http = require('http')


const app = express()
const port = process.env.PORT || 3000
const server = http.createServer(app)

let io = require('socket.io')(server)


// Parse application/x-www-form-urlencoded.
app.use(bodyParser.urlencoded({ extended: true }))
// Support JSON 
app.use(bodyParser.json())

// setup webhook handler
const webhookHandler = webhook({ path: '/', secret: 'VerySecretStuff' });
app.use(webhookHandler)

// setup session
const sessionOptions = {
  name: 'snippetsapp',
  secret: 'humptydumpty',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    // secure: true, // for HTTPS connection
    maxAge: 1000 * 60 * 60, // 60 minutes
    sameSite: 'lax'
  }
}

app.use(session(sessionOptions))

// Configure rendering engine, with change extension to .hbs
app.engine('hbs', exphbs({
  extname: '.hbs',
  defaultLayout: path.join(__dirname, 'views', 'layouts', 'main'),
  partialsLayout: path.join(__dirname, 'views', 'partials')
}))

// Setup view engine.
app.set('view engine', 'hbs')

// Serve static files.
app.use(express.static(path.join(__dirname, 'public')))

// Setup flash messages.
app.use((req, res, next) => {
  res.locals.flash = req.session.flash
  delete req.session.flash
  next()
})



io.on('connection', (socket) => {
  console.log('connected');
  
  webhookHandler.on('issues', function (repo, data) {
    //console.log('issues')
    //console.log(data)
    socket.emit('issue', data)
  })
  webhookHandler.on('push', function (repo, data) {
    //console.log('push')
    //console.log(data)
    socket.emit('push', data)
  })
})

// routes
app.use('/', require('./routes/home.js'))

// catch 404
app.use((req, res, next) => {
  res.status(404)
  res.render(path.join(__dirname, 'views', 'errors/404.hbs'))
})

// custom error handling
app.use((err, req, res, next) => {
  // dev print err
  console.log(err)

  // 401 - lacks valid authentication
  if (err.statusCode === 401) {
    console.log('401 err')
    return res.status(401).render(path.join(__dirname, 'views', 'errors/401.hbs'))
  }

  // 403 - not authorized
  if (err.statusCode === 403) {
    console.log('403 err')
    return res.status(403).render(path.join(__dirname, 'views', 'errors/403.hbs'))
  }

  // 404 - not found
  if (err.statusCode === 404) {
    console.log('404 err')
    console.log(err)
    return res.status(404).render(path.join(__dirname, 'views', 'errors/404.hbs'))
  }

  // 500 - server error
  console.log('server err')
  res.status(err.status || 500).render(path.join(__dirname, 'views', 'errors/500.hbs'))
})

// Start listening.
server.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

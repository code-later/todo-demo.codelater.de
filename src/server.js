const express = require('express')
const { Pool } = require('pg')
const bodyParser = require('body-parser')

// Read the database connection from ENV instead hard coding
const connectionString = process.env.DATABASE_URL
const dbPool = new Pool({
  connectionString: connectionString
})

// Read the port from ENV instead of hard coding
const port = process.env.PORT || 3000

const app = express()
// Automatically parse JSON body
app.use(bodyParser.json({type: 'application/json'}))

// GET /todos - List all Todo records in the database
app.get('/todos', (req, res) => {
  console.log('GET /todos')

  dbPool.query('SELECT * FROM todos')
    .then(dbRes => res.json(dbRes.rows))
    .catch(e => setImmediate(() => { res.status(500).json({ message: e.message }) }))
})

// POST /todos - Create a new todo record, returning ID of newly created record
app.post('/todos', (req, res) => {
  console.log(`POST /todos params=${JSON.stringify(req.body)}`)

  const insertTodo = 'INSERT INTO todos(title, notes, due_date, created_at) VALUES($1, $2, $3, NOW()) RETURNING *'

  let parsedDueDate
  if (req.body.due_date) {
    parsedDueDate = new Date(req.body.due_date)
  }

  dbPool
    .query(insertTodo, [ req.body.title, req.body.notes, parsedDueDate ])
    .then(dbRes => {
      res.status(201).json({ id: dbRes.rows[0].id })
    })
    .catch(e => setImmediate(() => { res.status(500).json({ message: e.message }) }))
})

// GET /todos/:id - Get a single Todo record from database, return 404 if no record was found for given ID
app.get('/todos/:id', (req, res) => {
  console.log(`GET /todos/${req.params.id}`)

  const selectTodo = 'SELECT * FROM todos WHERE id = $1'

  dbPool.query(selectTodo, [ req.params.id ])
    .then(dbRes => {
      if (dbRes.rows[0]) {
        res.json(dbRes.rows[0])
      } else {
        res.status(404).json({ error: `Todo with ID=${req.params.id} not found.` })
      }
    })
    .catch(e => setImmediate(() => { res.status(500).json({ message: e.message }) }))
})

// PATCH /todos/:id - Update a single record identified by ID, return 404 if no record was found for given ID
app.patch('/todos/:id', (req, res) => {
  console.log(`PATCH /todos/${req.params.id} params=${JSON.stringify(req.body)}`)

  const updateTodo = 'UPDATE todos SET title = $1, notes = $2, due_date = $3 WHERE id = $4 RETURNING *'

  let parsedDueDate
  if (req.body.due_date) {
    parsedDueDate = new Date(req.body.due_date)
  }

  dbPool.query(updateTodo, [ req.body.title, req.body.notes, parsedDueDate, req.params.id ])
    .then(dbRes => {
      if (dbRes.rows[0]) {
        res.json(dbRes.rows[0])
      } else {
        res.status(404).json({ error: `Todo with ID=${req.params.id} not found.` })
      }
    })
    .catch(e => setImmediate(() => { res.status(500).json({ message: e.message }) }))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// Require the application itself
const app = require('./app')

// Read the port from ENV instead of hard coding
const port = process.env.PORT || 3000

// Listen for incoming connections
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

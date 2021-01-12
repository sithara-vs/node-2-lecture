const usersCtrl = require('./usersController')
const express = require('express')

const app = express()

app.use(express.json()) //Top Level Middleware

app.get('/api/users', usersCtrl.getUsers)

app.get('/api/users/:id', usersCtrl.getUser)

app.put('/api/users/:id', usersCtrl.editUser)

app.post('/api/users', (req, res, next) => {
    next()
}, (req, res, next) => {
    next()
}, usersCtrl.addUser)

app.delete('/api/users/:id', usersCtrl.deleteUser)

app.get('*', (req, res) => {
    res.status(404).send('Oopsie doopsie, this page does not exist!')
})

const PORT = 4420
app.listen(PORT, () => {
    console.log('Running on port:', PORT)
})


//axios.post('/api/users', {email: 'ryan@gmail.com', name: 'Ryan'})
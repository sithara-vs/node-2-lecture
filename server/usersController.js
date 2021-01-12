const data = require('../data.json')
let id = data.length + 1

module.exports = {
    getUsers: (req, res, next) => {
        const { email } = req.query
        let users = [...data]
    
        if(email) {
            let filteredUsers = users.filter(e => {
                return e.email.includes(email)
            })
    
            if(filteredUsers && filteredUsers.length) {
                res.status(200).send(filteredUsers)
            } else {
                res.sendStatus(404)
            }
        }
    
        res.status(200).send(users)
    },
    getUser: (req, res, next) => {
        const {id} = req.params
        let users = [...data]

        if(id) {
           let user = users.find(e => e.id === +id)

           if(user) {
            res.status(200).send(user)
           }

           res.sendStatus(404)           
        }
    },
    addUser: (req, res, next) => {
        console.log(req.body)
        let { name, email } = req.body

        let user = {name, email, id}

        data.push(user)
        id++

        res.status(200).send(data)
    },
    editUser: (req, res, next) => {
        const {id} = req.params
        console.log(req.params)
        const {email, name} = req.body

        let index = data.findIndex(e => e.id === +id)

        if(index === -1) {
            res.status(404).send('User does not exist.')
        }

        let updatedUser = {
            id: data[index].id,
            email: email || data[index].name,
            name: name || data[index].name
        }

        data[index] = updatedUser
        res.status(200).send(data)
    },
    deleteUser: (req, res, next) => {
        const {id} = req.params

        let index = data.findIndex(e => e.id === +id)

        if(index === -1) {
            res.status(404).send('User not found')
        }

        data.splice(index, 1)
        res.status(200).send(data)
    }
}
const express = require('express')
const cors = require('cors')
const {graphqlHTTP} = require('express-graphql')

const schema = require('./schema')

const PORT = process.env.PORT || 5000

const app = express()

const users = [
    {id: 1, username: 'Pavel', age: 24}
]

const createUser = (input) => {
    const id = Date.now()
    return {
        id, ...input
    }
}

const root = {
    getAllUsers: () => {
        return users
    },
    getUser: ({id}) => {
        return users.find(user => user.id === id)
    },
    createUser: ({input}) => {
        const user = createUser(input)
        users.push(user)
        return user
    }
}

app.use(cors())
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root
}))

app.listen(PORT, () => {
    console.log('Server started on PORT:' + PORT)
})


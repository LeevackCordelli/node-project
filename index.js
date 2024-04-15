const express = require("express")
const port = 3000
const app = express()
const uuid = require("uuid")
app.use(express.json())




const users = []

const checkId = (request, response, next) => {
    const { id } = request.params
    const index = users.findIndex(user => user.id === id)
    if (index < 0) {
        return response.status(404).json({ message: "user not found" })
    }

    request.userIndex = index
    request.userId = id
    next()
}


app.get("/users", (request, response) => {

    return response.json(users)

})

app.post("/users", (request, response) => {

    const { name, age } = request.body
    const user = { id: uuid.v4(), name, age, }

    users.push(user)
    return response.status(201).json(user)

})




app.put("/users/:id", checkId, (request, response) => {

    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId
    const upduser = { id, name, age }


    users[index] = upduser
    return response.json(upduser)

})






app.delete("/users/:id", checkId, (request, response) => {


    const index = request.userIndex

    users.splice(index, 1)

    return response.status(204).json()

})







app.listen(port, () => {
    console.log(`ta rodando na porta ${port}`)
})








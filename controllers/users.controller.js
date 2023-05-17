const { insertUser, validateUser, listUsers } = require('../models/users.model')

async function addNewUser(request, response) {
    try {
        const { username, password } = request.body
        await insertUser(username, password)
        response.json({ success: true, msg: 'New User have been added!'})
    } catch (error) {
        response.json({success: false, error: error.message})
    }
}

async function getUsers(request, response) {
    try {
        const users = await listUsers()
        response.json({ success: true, users: users})
    } catch (error) {
        response.status(400).json({success: false, msg: 'bad request'})
    }
}

async function loginUser(request, response) {
    try {
        const { username, password } = request.body
        const result = await validateUser(username, password)
        console.log(result)
        if(result) {
            response.json({ success: true, result: result})
        } else {
            response.json({ success: false, msg: 'User does not exist!'})
        }
        
    } catch (error) {
        response.json({success: false, error: error.message})
    }
}

module.exports = { addNewUser, loginUser, getUsers }
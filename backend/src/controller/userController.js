const connection = require('../database/connection')
const generateId = require('../utils/generateId')

async function index(request, response) {
  const users = await connection('users').select('*')

  return response.json(users)
}

async function create(request, response) {
  const { name, email, password, confirmPassword } = request.body

  var errors

  if (password.length < 8) { errors = { password: 'Password too short' } }
  else if (password !== confirmPassword) { errors = { password: 'Confirm password not equals password' } }

  if (errors) {
    return response.status(401).json(errors)
  }

  var id = generateId()

  await connection('users')
    .insert({
      id,
      name,
      email,
      password
    })

  return response.status(201).json({ id })
}

async function enter(request, response) {
  const { email, password } = request.body

  const user = await connection('users')
    .where('email', '=', email)
    .first()

  if (user)
    if (user.password === password)
      return response.status(200).json(user.id)
    else
      return response.status(401).json({ error: 'Incorret password' })
  else
    return response.status(404).json({ error: 'User not found' })

}

module.exports = {
  index,
  create,
  enter
}
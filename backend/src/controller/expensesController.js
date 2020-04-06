const connection = require('../database/connection')
const dateFormat = require('../utils/dateFormat')

async function index(request, response) {
  const userId = request.headers.authorization

  const expenses = await connection('tables')
    .where('type', '=', 'expense')
    .where('userId', '=', userId)
    .select('*')

  response.status(200).json(expenses)
}

async function create(request, response) {
  const { title, description, value, date } = request.body
  const userId = request.headers.authorization

  var dateSQL = dateFormat(date)

  if (dateSQL.error)
    return response.status(400).json(dateSQL)

  const [id] = await connection('tables')
    .insert({
      title,
      description,
      value,
      type: 'expense',
      date: dateSQL,
      userId
    })

  if (id)
    return response.status(201).json({ id })
  else
    return response.status(400).json({ error: 'Error to insert this expense' })
}

async function del(request, response) {
  const { id } = request.params
  const userId = request.headers.authorization

  const expense = await connection('tables')
    .where('id', '=', id)
    .first()

  if (expense) {
    if (expense.userId !== userId)
      return response.status(403).json({ error: 'Unauthorizated' })
  } else {
    return response.status(404).json({ error: 'Expense not found' })
  }

  await connection('tables')
    .delete()
    .where('id', '=', id)

  return response.status(204).send()
}

async function update(request, response) {
  const { id } = request.params
  const { title, description, value, date } = request.body
  const userId = request.headers.authorization

  const expense = await connection('tables')
    .where('id', '=', id)
    .select('*')
    .first()

  var dateSQL = dateFormat(date)

  if (dateSQL.error)
    return response.status(400).json(dateSQL)

  if (expense) {
    if (expense.userId !== userId)
      return response.status(403).json({ error: 'Unauthorizated' })
  } else {
    return response.status(404).json({ error: 'Expense not found' })
  }

  await connection('tables')
    .update({
      ...expense,
      title,
      description,
      value,
      date: dateSQL
    })
    .where('id', '=', id)

  return response.status(204).send()
}

module.exports = {
  index,
  create,
  del,
  update
}
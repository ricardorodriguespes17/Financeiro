const connection = require('../database/connection')
const dateFormat = require('../utils/dateFormat')

async function index(request, response) {
  const userId = request.headers.authorization

  const revenues = await connection('tables')
    .where('type', '=', 'revenue')
    .where('userId', '=', userId)
    .select('*')

  response.status(200).json(revenues)
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
      type: 'revenue',
      date: dateSQL,
      userId
    })

  if (id)
    return response.status(201).json({ id })
  else
    return response.status(400).json({ error: 'Error to insert this revenue' })
}

async function del(request, response) {
  const { id } = request.params
  const userId = request.headers.authorization

  const revenue = await connection('tables')
    .where('id', '=', id)
    .first()

  if (revenue) {
    if (revenue.userId !== userId)
      return response.status(403).json({ error: 'Unauthorizated' })
  } else {
    return response.status(404).json({ error: 'Revenue not found' })
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

  const revenue = await connection('tables')
    .where('id', '=', id)
    .select('*')
    .first()

  var dateSQL = dateFormat(date)

  if (dateSQL.error)
    return response.status(400).json(dateSQL)

  if (revenue) {
    if (revenue.userId !== userId)
      return response.status(403).json({ error: 'Unauthorizated' })
  } else {
    return response.status(404).json({ error: 'Revenue not found' })
  }

  await connection('tables')
    .update({
      ...revenue,
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
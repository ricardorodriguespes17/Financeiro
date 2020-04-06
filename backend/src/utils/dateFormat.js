module.exports = function dateFormat(date) {
  try {
    return date.split('T')[0]
  } catch (error) {
    return { error: 'Invalid date' }
  }
}
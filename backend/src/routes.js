//Importando o express
const express = require('express')
//Importando as funcoes para as rotas
const expensesController = require('./controller/expensesController')
const receiptsController = require('./controller/receiptsController')
const revenuesController = require('./controller/revenuesController')
const userController = require('./controller/userController')


//Inicialziando as rotas
const routes = express.Router()

//Rotas de usuario
routes.post('/signup', userController.create)
routes.post('/login', userController.enter)
//Teste para ver os usuarios cadastrados
routes.get('/users', userController.index)

//Rotas da tabela de saldo (revenues)
routes.get('/revenues', revenuesController.index)
routes.post('/revenues', revenuesController.create)
routes.delete('/revenue/:id', revenuesController.del)
routes.put('/revenue/:id', revenuesController.update)

//Rotas da tabela de recebimentos (receipts)
routes.get('/receipts', receiptsController.index)
routes.post('/receipts', receiptsController.create)
routes.delete('/receipt/:id', receiptsController.del)
routes.put('/receipt/:id', receiptsController.update)

//Rotas da tabela de dispesas (expenses)
routes.get('/expenses', expensesController.index)
routes.post('/expenses', expensesController.create)
routes.delete('/expense/:id', expensesController.del)
routes.put('/expense/:id', expensesController.update)

//Exportando as rotas
module.exports = routes
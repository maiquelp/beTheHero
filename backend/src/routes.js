const express = require('express');

const ongController = require('./controllers/ongController.js')
const incidentController = require('./controllers/incidentController.js')
const profileController = require('./controllers/profileController.js')
const sessionController = require('./controllers/sessionController.js')

const routes = express.Router();

/* Métodos HTTP: GET(pegar), POST(adicionar), PUT(alterar), DELETE(apagar) 
** Tipos de parâmetros: query(nomeados e enviados após "?" Ex: /users/?name=maiquel&pagina=2)
**                      route(para identificação de recursos)
**                      body(requisição em JSON para criar ou alterar recursos)
*/
routes.get('/ong', ongController.index);
routes.post('/ong', ongController.create);

routes.get('/incident', incidentController.index);
routes.post('/incident', incidentController.create);
routes.delete('/incident/:id', incidentController.delete);

routes.get('/profile', profileController.index);

routes.post('/session', sessionController.create);

module.exports = routes;
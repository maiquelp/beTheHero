const express = require('express');

const { celebrate, Segments, Joi } = require('celebrate');

const auth = require('./middlewares/auth');

const userController = require('./controllers/userController.js');
const assetController = require('./controllers/assetController.js');
const profileController = require('./controllers/profileController.js');
const sessionController = require('./controllers/sessionController.js');
const recoverController = require('./controllers/recoverController.js');
const resetController = require('./controllers/resetController.js');
const verifyController = require('./controllers/verifyController.js');

const routes = express.Router();

//routes.use(auth);

/* Métodos HTTP: GET(pegar), POST(adicionar), PUT(alterar), DELETE(apagar) 
** Tipos de parâmetros: query(nomeados e enviados após "?" Ex: /users/?name=maiquel&pagina=2)
**                      route(para identificação de recursos)
**                      body(requisição em JSON para criar ou alterar recursos)
*/
routes.get('/user', userController.index);

routes.post('/user', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })
}), userController.create);

routes.post('/session', celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required()
    })
}), sessionController.create);

routes.put('/recover', celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required()
    })
}), recoverController.update);

routes.put('/reset', celebrate({
    [Segments.BODY]: Joi.object().keys({
        password: Joi.string().required()
    }),
    [Segments.QUERY]: Joi.object().keys({
        token: Joi.string().required(),
        id: Joi.string().required()
    })
}), resetController.update);

routes.put('/verify', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        token: Joi.string().required(),
        id: Joi.string().required()
    })
}), verifyController.update);

routes.get('/mobileasset/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required()
  })  
}), assetController.indexmobile); // for mobile app with no auth

routes.use(auth); // Make routes bellow pass through authentication

routes.post('/asset', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        value: Joi.number().precision(2).positive().required()
    }),
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), assetController.create);

routes.get('/asset', celebrate({
  [Segments.QUERY]: Joi.object().keys({
      page: Joi.number()
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()    
}), assetController.index);

routes.put('/asset/:id', celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    value: Joi.number().precision(2).positive().required()
  }),
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()    
}), assetController.update);

routes.delete('/asset/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), assetController.delete);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()    
}), profileController.index);

module.exports = routes;
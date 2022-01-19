const express = require('express');
const Route = express.Router();
const healthRoute = require('../modules/health_check/api_handler')
const userApiHandler = require('../modules/users/api_handler');
const storageApiHandler = require('../modules/storage/api_handler');
const jwtAuth = require('../auth/jwt_auth_helper');
const route = require('../configs/route_config')

Route
  //HEALTH CHECK
  .get('/health', healthRoute.checkHealthCheck)
  .get('/test-server', (req, res) => {
    res.send({
      message: 'Server running well!!',
      timestamp: new Date()
    });
  })

  // USER
  .post(`${route['globalUrl']}/${route['user']['mainUrl']}/register`, userApiHandler.registerUser)
  .post(`${route['globalUrl']}/${route['user']['mainUrl']}/login`, userApiHandler.loginUser)
  .get(`${route['globalUrl']}/${route['user']['mainUrl']}/detail`, jwtAuth.verifyToken, userApiHandler.detailUser)

  // STORAGE
  .get(`${route['globalUrl']}/${route['storage']['mainUrl']}/list`, jwtAuth.verifyToken, storageApiHandler.listStorage)
  .get(`${route['globalUrl']}/${route['storage']['mainUrl']}/summary`, jwtAuth.verifyToken, storageApiHandler.sumamryStorage)
  .get(`${route['globalUrl']}/${route['storage']['mainUrl']}/currency/update`, jwtAuth.verifyToken, storageApiHandler.updateCurrency)


module.exports = Route;
'use strict';

let router = module.exports = exports = {};
router.routes = {};
let methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD'];

methods.forEach((method) => {
  router.routes[method] = {};
  router[method] = function(pathname, callback) {
    router.routes[method][pathname] = callback;
  };
});

router.couldNotFind = function(req, res) {
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.write('could not find page');
  res.end();
};
(
  function() {
      "use strict";
      let express = require('express');
      let app = express();
      let path = require('path');
      app.use(express.static(path.join(__dirname, '/')));
      app.get('/', function(req, res) {
         res.sendfile(path.join(__dirname + '/index.html'));
      });
      let server = app.listen(1500, function () {
          console.log('Express server listening on port ' + server.address().port);
      });
      module.exports = app;
  }()
);
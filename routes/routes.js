'use strict';
module.exports = function(app) {

  const { TuneStreaming } = require('../controllers/streamingCtrl');
  const { TuneUpload } = require('../controllers/uploadCtrl');

  // todoList Routes
  app.route('/bitTuneApi/upload')
    .post(TuneUpload);



  app.route('/musica/:tuneName')
    .get(TuneStreaming)
};
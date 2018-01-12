exports.TuneUpload = function(req, res){
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
  let sampleFile = req.files.tune;
  sampleFile.mv('./tune/' + req.files.tune.name, function(err) {
    if (err)
      return res.status(500).send(err);
 
    res.send('File uploaded!');
  });
}
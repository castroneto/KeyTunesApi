var fs = require('fs')
const highWaterMark =  2;
exports.TuneStreaming  = function(req, res){
   const { tuneName } = req.params;
   const Music = `./tune/${tuneName}`;
   fs.stat(Music, (err, stats) => {
     if (err) {
       console.log(err);
       return res.status(404).end('<h1>Tune Not found</h1>');
     }
     // Variáveis necessárias para montar o chunk header corretamente
     const { range } = req.headers;
     const { size } = stats;
     const start = Number((range || '').replace(/bytes=/, '').split('-')[0]);
     const end = size - 1;
     const chunkSize = (end - start) + 1;
     // Definindo headers de chunk
     res.set({
       'Content-Range': `bytes ${start}-${end}/${size}`,
       'Accept-Ranges': 'bytes',
       'Content-Length': chunkSize,
       'Content-Type': 'audio/ogg'
     });
     // É importante usar status 206 - Partial Content para o streaming funcionar
     res.status(206);
     // Utilizando ReadStream do Node.js
     // Ele vai ler um arquivo e enviá-lo em partes via stream.pipe()
     const stream = fs.createReadStream(Music, { start, end });
     stream.on('open', () => stream.pipe(res));
     stream.on('error', (streamErr) => res.end(streamErr));
   });
}

const router = require('express').Router()


router.route('/resume').get((req,res) => {
    const file = `./Resume.pdf`;
    res.download(file); // Set disposition and send it.
    console.log(req.ip);
  //   var file = fs.createWriteStream(dest);
  //     var request = http.get(url, function(response) {
  //   response.pipe(file);
  //   file.on('finish', function() {
  //     file.close(cb);  // close() is async, call cb after close completes.
  //   });
  // }).on('error', function(err) { // Handle errors
  //   fs.unlink(dest); // Delete the file async. (But we don't check the result)
  //   if (cb) cb(err.message);
  // });
})

router.route('/background').get((req,res) => {
    let imgId = Math.floor(Math.random() * 6);
    let img = 0
    if(imgId === 0){
      img = 'https://i.imgur.com/azyrfe5.jpg'
    }
    else if(imgId === 1){
        img = 'https://i.imgur.com/C2ne3y9.jpg'
    }
    else if(imgId === 2){
        img = 'https://i.imgur.com/JQj1u6W.jpg'
    }
    else if(imgId === 3){
        img = 'https://i.imgur.com/3644Z9K.jpg'
    }
    else if(imgId === 4){
        img = 'https://i.imgur.com/PY65NHo.jpg'
    }
    else if(imgId === 5){
        img = 'https://i.imgur.com/80736Xu.jpg'
    }
    res.send(img)
})
module.exports = router

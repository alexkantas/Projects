// Libraries 
const Jimp = require("jimp");

let image = "https://scotch.io/wp-content/uploads/2014/11/node-express-sendfile.png";
let path = `${__dirname}/files/images/hi.jpg`;

image = 'https://cdn.scotch.io/46045/qFzec3EHTTW7w7FUJrAs_fetch2.jpg';
path = `${__dirname}/files/images/fetch.jpg`;

Jimp.read(image).then(img => {
    img.resize(535, Jimp.AUTO).write(path);
})
    .catch(err => console.log(err))
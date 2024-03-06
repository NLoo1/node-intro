const ax = require('axios');
const fs = require('node:fs');

function webCat(path){

    try{
        const url = new URL(path)
        ax.get(path)
        .then((data) => {
            console.log(data.data)
        })
        .catch((err) => {
            console.log(err.cause)
        })
    }
    catch(TypeError){
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return
            }
            console.log(data)
        })
    }
    
}

webCat(process.argv[2])
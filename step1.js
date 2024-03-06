const fs = require('node:fs');

function cat(path){

    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return
        }
        console.log(data)
    })
}

cat(process.argv[2])
const ax = require('axios');
const fs = require('node:fs');


// If run with flag --out, outputs file content to a new file
function outputFile(path){
    try{
        // Attempts to make a URL from the given file path.
        const url = new URL(path[4])
        ax.get(path[4])
        .then((data) => {

            // Write contents of path[4] to path[3]
            fs.writeFile(path[3], data.data, (e) => {
                if (e != null) console.error(e)
            })
        })
        // If it is a URL, but there is no response/bad URL
        .catch((err) => {
            fs.writeFile(path[3], err.cause.code, (e) => {
                if (e != null) console.error(e) 
            })
        })
    } 

    // If instantiating a URL object fails, the file path is local.
    catch{
        // Read local file
        fs.readFile(path[4], 'utf8', (err, data) => {
            if (err) {

                // If any errors occur while finding file, log code
                console.log(err.code)

                // Write that error as output
                fs.writeFile(path[3], err.code, (e) => {
                    if(e) console.error(e)
                })
                return
            }

            // Otherwise, write to path[3]
            fs.writeFile(path[3], data, (e) => {
                if(e) console.error(e)
            })
        })
    }
}

// If user does not want output --> read only
function logFile(path){

    // This is a URL
    try{
        const url = new URL(path[2])
        ax.get(path[2])
        .then((data) => {
            console.log(data.data)
        })
        .catch((err) => {
            console.log(err.cause)
        })
    }

    // This is a file.
    catch(TypeError){
        fs.readFile(path[2], 'utf8', (err, data) => {
            if (err) {
                console.log(err)
                return
            }
            console.log(data)
        })
    }
}

function webCat(path){
    if(path[2].includes('--out')){
        outputFile(path)
    } else{ 
        logFile(path)
    }
    
}

webCat(process.argv)


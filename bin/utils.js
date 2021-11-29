module.exports = { 
    showHelp: showHelp,
    getLog: getLog,
    writeOutput: writeOutput,
    convertToJson: convertToJson
};
const fs = require('fs')

function getLog(path){
    try {
        const data = fs.readFileSync(path, 'utf8');
        return data
    } catch(err){
        console.log(err);
    }
}

function writeOutput(extension, data, path){
    try {
        path = path.split(".")
        fs.writeFileSync(`${path[0]}.${extension}`, data)
        return true
      } catch (err) {
        console.log(err)
        return false
      }

}
function showHelp() {                                                            
    console.log('\nOptions:\r')  
    console.log('\t--version\t      ' + 'Show version number.' + '\t\t' + '[boolean]\r')  
    console.log('    -t, --type\t' + '      ' + 'define convert type' + '\t\t' + '[text]\r')  
    console.log('    -o, --output\t' + '      ' + 'define output path' + '\t\t' + '[text]\r')  

    console.log('\t--help\t\t      ' + 'Show help.' + '\t\t\t' + '[boolean]\n')  
}

function convertToJson(data){
    array = data.split("\n")
    var dataArray = [];
    for(var i=0; i<array.length; i++){
        if(array[i] == ''){continue}
        let tempArray = []
        tempArray = array[i].split(",");
        dataArray.push(tempArray)
    };

    json = {};
    var c = 1;
    dataArray.forEach( (e1) =>{
    isdate = true;
    var tempjson = {};
    e1.forEach( (e2) =>{
        var key;
        if(isdate)  {
            key = 'date';
            tempjson[key] = e2;
            isdate = false;
        }
        else if(e2.includes("batteryCurrent")){
            key = "batteryCurrent";
            tempjson[key]= e2.split("batteryCurrent=")[1]
        }
        else{
            var arr = e2.split("=");
            key  = arr[0].trim();
            tempjson[key] = arr[1];
        }
    })
    json[c] = tempjson;
    c++
    });

    return json
}
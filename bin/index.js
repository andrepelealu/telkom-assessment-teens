#! /usr/bin/env node

const yargs = require("yargs");
const utils = require('./utils.js')

const usage = "\nUsage: cli <file_path> -t json to convert file to json format\n cli <file_path> -t text to convert file to text format\n use -o to define output path";
const options = yargs  
      .usage(usage)  
      .option("t", {
            alias:"type", 
            describe: "convert type", 
            type: "text", 
            demandOption: false 
            }
        )   
    .option("o",{
                alias:"output path",
                describe: "output path", 
                type: "text", 
                demandOption: false 
            }
        )                                                                                                   
      .help(true)  
      .argv;

    // Validate input
    if(yargs.argv._[0] == null && yargs.argv._[1] == null){  
        utils.showHelp();  
        return;  
    }
    
    if (!yargs.argv.o) {
        console.log("-o flag is missing: please define output path using -o flag") 
        return;
    }

    // Check data type
    extension = ""
    // Get value string
    data = utils.getLog(yargs.argv._[0])
    validateFlag = false
 
    if (yargs.argv.t && yargs.argv.t == "text") validateFlag = true
    if (yargs.argv.t && yargs.argv.t == "json") validateFlag = true

    if(!validateFlag){
        console.log("invalid data type: data type must be text or json");
        return;
    }

    switch(yargs.argv.t) {
        case "text":
            extension = "txt"
          break;
        case "json":
            extension = "json"
            data = JSON.stringify(utils.convertToJson(data)) 
          break;
        default:
            extension = "txt"

      }
    
    output_path = yargs.argv.o
    write = utils.writeOutput(extension, data, output_path)
    if (write) {
      console.log("convert success");
    }else{
      console.log("convert failed");
    }
  


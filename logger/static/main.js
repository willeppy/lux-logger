define([
    'base/js/namespace',
    'jquery',
    'log4js'
  ], function (Jupyter,$,log4js) {
    "use strict";
    function load_ipython_extension() {
      console.log("Loaded Logger")
      // var log4js = require("../../node_modules/log4js");
      // var log4js = require("log4js");
      var logger = log4js.getLogger();
      // logger.debug("Some debug messages");
      // const logger = winston.createLogger({
      //   level: 'info',
      //   format: winston.format.json(),
      //   defaultMeta: { service: 'user-service' },
      //   transports: [
      //     //
      //     // - Write all logs with level `error` and below to `error.log`
      //     // - Write all logs with level `info` and below to `combined.log`
      //     //
      //     new winston.transports.File({ filename: 'error.log', level: 'error' }),
      //     new winston.transports.File({ filename: 'combined.log' }),
      //   ],
      // });
       
      document.addEventListener("LOG", function(evnt){
          console.log("captured event:",evnt);
      });
      Jupyter.notebook.events.on("execute.CodeCell", function(evt, data) {
        const code = data.cell.get_text();
        // get cell id
        const id = data.cell.cell_id;
        const idx = Jupyter.notebook.find_cell_index(data.cell);
        const time = new Date();
        const type = "execution";
        console.log({
            type,
            code,
            id,
            idx,
            time
        })
      });
  
      // Jupyter.notebook.events.on("finished_execute.CodeCell", function(evt, data) {
      //   const type = "completion";
      //   const id = data.cell.cell_id;
      //   const time = new Date();
      //   console.log({
      //     type,
      //     id,
      //     time
      //   });
      // });
    }

    return {
      load_ipython_extension: load_ipython_extension
    };

 });
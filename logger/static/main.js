// define([
//   'base/js/namespace'
// ], function (Jupyter) {
define([
    'require',
    'base/js/namespace',
    'jquery',
    './loglevel'
  ], function (requirejs,Jupyter,jQuery, log) {
    "use strict";
    function load_ipython_extension() {
      console.log("Loaded Logger")
      // var logger = log.getLogger("lux")
      // logger.info("test")
      // './log4js/types/log4js'
      // log.warn("dangerously convenient");
      // var log4js = require("../../node_modules/log4js");
      // var log4js = require("log4js");
      // var logger = log4js.getLogger();
      // logger.debug("Some debug messages");
      // var winston = requirejs('winston');
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

      let lastSaved = null;

      function addLogEntry(newItem) {
        if (Jupyter.notebook.metadata.hasOwnProperty('history')) {
          Jupyter.notebook.metadata.history.push(newItem);
        } else {
          Jupyter.notebook.metadata.history = [newItem];
        }
        // only save every 1 min
        if (((lastSaved) && ((Date.now() - lastSaved) > 60000)) || (!lastSaved)) {
          Jupyter.notebook.save_notebook();
          lastSaved = Date.now();
        }
      }
      // Logging UI interaction events
      document.addEventListener("LOG", function(event){
          console.log("captured event:",event);
          const type = "interaction";
          const eventMsg = event.detail;
          var execution_count = event.currentTarget.activeElement.getElementsByClassName("prompt input_prompt")[0].innerHTML.match(/\[[0-9]+\]/)[0].replace(/[^0-9]/g,'')
          if (execution_count!=""){ execution_count = parseInt(execution_count)}
          addLogEntry({
              type,
              time,
              eventMsg,
              execution_count,
          })
      });
      Jupyter.notebook.events.on("execute.CodeCell", function(event, data) {
        const code = data.cell.get_text();
        // get cell id
        const id = data.cell.cell_id;
        const order_count = Jupyter.notebook.find_cell_index(data.cell);
        const time = new Date();
        const type = "runCodeCell";
        addLogEntry({
            type,
            time,
            code,
            id,
            order_count
        })
      });

      Jupyter.notebook.events.on("kernel_restarting.Kernel", function(event, data) {
        const time = new Date();
        const type = "kernelRestart";
        addLogEntry({
            type,
            time
        })
      });

      Jupyter.notebook.events.on("delete.CodeCell", function(event, data) {
        const code = data.cell.get_text();
        // get cell id
        const id = data.cell.cell_id;
        const order_count = Jupyter.notebook.find_cell_index(data.cell);
        const time = new Date();
        const type = "deleteCodeCell";
        addLogEntry({
            type,
            time,
            code,
            id,
            order_count
        })
      });
  
      window.onbeforeunload = function() {
        Jupyter.notebook.save_notebook(); // force save notebook before page/tab close
        const time = new Date();
        const type = "pageClose";
        addLogEntry({
            type,
            time
        })
      }
      Jupyter.notebook.events.on("finished_execute.CodeCell", function(event, data) {
        const type = "completion";
        const id = data.cell.cell_id;
        const time = new Date();
        var renderHTMLoutput = data.cell.output_area.selector[0].getElementsByClassName("output_subarea output_html rendered_html")
        var isPrintDataFrame = false
        if (renderHTMLoutput.length>0){
          isPrintDataFrame = renderHTMLoutput[0].getElementsByClassName("dataframe").length>0
        }
        addLogEntry({
          type,
          time,
          id,
          isPrintDataFrame
        });
      });
    }

    return {
      load_ipython_extension: load_ipython_extension
    };

 });
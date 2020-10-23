define([
    'base/js/namespace',
    'jquery'
  ], function (Jupyter,$) {
    "use strict";

    function load_ipython_extension() {
    
      var log = [];
      var loggingEnabled = false;
      console.log("Loaded Logger")
      var log = [];
      var logID = '_' + Math.random().toString(36).substr(2, 9);

      let lastSaved = null;
      function sendLog() {
        // make JSON
        var data = {"history": log};
        var jsonData = JSON.stringify(data, null, 2);

        // Send data
        var xhr = new XMLHttpRequest(); 
        var url = 'https://freddie.millennium.berkeley.edu:8900';
        xhr.open("POST", url); 
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("ID", logID);
        xhr.send(jsonData);
        console.log(jsonData);
        log = [];
      }
      function addLogEntry(newItem) {
        if (loggingEnabled) {
          console.log("addLogEntry:",newItem)
          log.push(newItem);
          if (!lastSaved || (Date.now() - lastSaved) > 6000) { 
            sendLog();
            lastSaved = Date.now();
          }
        }
      }
      // Logging UI interaction events
      document.addEventListener("LOG", function(event){
          const type = event.detail.action;
          const param = event.detail.param;
          // var execution_count = ""
          // var outputField =   event.currentTarget.activeElement.parentElement.parentNode.parentNode.getElementsByClassName("prompt output_prompt")
          // var inputField=  event.currentTarget.activeElement.getElementsByClassName("prompt input_prompt")
          // var InOutField = "";
          // if (inputField.length>0){
          //   InOutField = inputField[0].innerHTML
          // }else if (outputField.length>0){
          //   InOutField = outputField[0].innerHTML
          // }
          // if (InOutField!=""){ 
          //   InOutField = InOutField.match(/\[[0-9]+\]/)[0].replace(/[^0-9]/g,'')
          //   execution_count = parseInt(InOutField)
          // }          
          const time = new Date();
          addLogEntry({
              type,
              time,
              param
          })
          // execution_count
      });
      
      // "command_mode.Cell"
      Jupyter.notebook.events.on('select.Cell', function(event, data) {
        const code = data.cell.get_text();
        const id = data.cell.cell_id;
        const order_count = Jupyter.notebook.find_cell_index(data.cell);
        const time = new Date();
        if (data.cell.cell_type == "markdown"){
          var cellType = "selectMarkdownCell";
        }else if (data.cell.cell_type == "code"){
          var cellType = "selectCodeCell";
        }
        const type = cellType

        addLogEntry({
            type,
            time,
            code,
            id,
            order_count
        })
      });
      Jupyter.notebook.events.on("edit_mode.Cell", function(event, data) {
        const code = data.cell.get_text();
        const id = data.cell.cell_id;
        const order_count = Jupyter.notebook.find_cell_index(data.cell);
        const time = new Date();
        if (data.cell.cell_type == "markdown"){
          var cellType = "editMarkdownCell";
        }else if (data.cell.cell_type == "code"){
          var cellType = "editCodeCell";
        }
        const type = cellType

        addLogEntry({
            type,
            time,
            code,
            id,
            order_count
        })
      });
      // Code cell executed
      Jupyter.notebook.events.on("execute.CodeCell", function(event, data) {
        const code = data.cell.get_text();

        // Code to enable or disable logger
        // TODO: ultimately need to perhaps display some output showing logging is enable/disabled
        var lines = code.split(/\r?\n/);
        var line;
        for (line in lines) {
          var cleaned = lines[line].split("#")[0];
          cleaned = cleaned.replace(/\s+/g, '');
          cleaned = cleaned.toLowerCase();
          console.log(cleaned);
          if (cleaned.includes("logging=true")) {
            loggingEnabled = true;
            console.log("BOOLEAN = TRUE");
          }
          if (cleaned.includes("logging=false")) {
            loggingEnabled = false;
            console.log("BOOLEAN = FALSE");
          }
        }
        // get cell id
        const id = data.cell.cell_id;
        const order_count = Jupyter.notebook.find_cell_index(data.cell);
        const time = new Date();
        const type = "executeCodeCell";
        addLogEntry({
            type,
            time,
            code,
            id,
            order_count
        })
      });
      // Code cell execution completed
      // 
      Jupyter.notebook.events.on("finished_execute.CodeCell", function(event, data) {
        // Jupyter.notebook.events.on("finished_iopub.Kernel", function(event2, data2) {
        const type = "completeCodeCell";
        const code = data.cell.get_text();
        const id = data.cell.cell_id;
        const order_count = Jupyter.notebook.find_cell_index(data.cell);
        const time = new Date();
        
        var renderHTMLoutput = data.cell.output_area.selector[0].getElementsByClassName("output_subarea jupyter-widgets-view")
        var isPrintPandasDf = false
        var isPrintLuxDf = false
        if (renderHTMLoutput.length>0){
          // isPrintLuxDf = renderHTMLoutput[0].getElementsByTagName("#widgetContainer").length>0
          isPrintLuxDf = renderHTMLoutput.length==3 // Heuristic: Not completed rendering yet
        }
        var renderHTMLoutput = data.cell.output_area.selector[0].getElementsByClassName("output_subarea output_html rendered_html")
        if (renderHTMLoutput.length>0){
          isPrintPandasDf = renderHTMLoutput[0].getElementsByClassName("dataframe").length>0
        }
        // While Vis and Vis Collections are rendered as LuxWidget, this is not rendered until after event is over, unlike the widget only case when df is printed
        // So the detection needs to be done separately.
        var isPrintVis = false
        var isPrintVisCollection = false
        var renderTEXToutput = data.cell.output_area.selector[0].getElementsByClassName("output_subarea output_text output_result")
        if (renderTEXToutput.length>0){
          isPrintVis = renderTEXToutput[0].innerText.indexOf("Vis ")>-1
          isPrintVisCollection = renderTEXToutput[0].innerText.indexOf("VisList ")>-1
        }
        addLogEntry({
          type,
          time,
          code,
          id,
          isPrintPandasDf,
          isPrintLuxDf,
          isPrintVis,
          isPrintVisCollection,
          order_count
        });
        // })
      });
      // Detect Kernel started event
      Jupyter.notebook.events.on("kernel_ready.Kernel", function(event, data) {
        const time = new Date();
        const type = "kernelReady";
        addLogEntry({
            type,
            time
        })
      });
      // Detect Kernel restarted event
      Jupyter.notebook.events.on("kernel_restarting.Kernel", function(event, data) {
        const time = new Date();
        const type = "kernelRestart";
        addLogEntry({
            type,
            time
        })
      });
      // Deletion of any cell
      Jupyter.notebook.events.on("delete.Cell", function(event, data) {
        const code = data.cell.get_text();
        // get cell id
        const id = data.cell.cell_id;
        const order_count = Jupyter.notebook.find_cell_index(data.cell);
        const time = new Date();
        if (data.cell.cell_type == "markdown"){
          var cellType = "deleteMarkdownCell";
        }else if (data.cell.cell_type == "code"){
          var cellType = "deleteCodeCell";
        }
        const type = cellType
        addLogEntry({
            type,
            time,
            code,
            id,
            order_count
        })
      });
      
      // Force save notebook before page/tab close
      window.onbeforeunload = function() {
        Jupyter.notebook.save_notebook(); 
        const time = new Date();
        const type = "pageClose";
        addLogEntry({
            type,
            time
        })
      }

      // Force save notebook before kernel killed either via kernel or session
      Jupyter.notebook.events.on("kernel_killed.Kernel", function(event, data) {
        Jupyter.notebook.save_notebook(); 
        const time = new Date();
        const type = "kernelKilled";
        addLogEntry({
            type,
            time
        })
      });
      Jupyter.notebook.events.on("kernel_killed.Session", function(event, data) {
        Jupyter.notebook.save_notebook(); 
        const time = new Date();
        const type = "kernelKilled";
        addLogEntry({
            type,
            time
        })
      });
    }

    return {
      load_ipython_extension: load_ipython_extension
    };

 });

# Information about Logging Codes

The logger captures two different classes of events. One is UI events from Lux, another is events from the Jupyter notebook environment. The logger is only enabled after the detection of `lux.logger=True` and it can be disabled with `lux.logger=False`.

### UI Events

The logged [CustomEvents](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent) are dispatched from the [Lux Jupyter widget](https://github.com/lux-org/lux-widget) frontend. This logger extension contains a listener that detects these LOG events. These LOG event contain a JSON in the field `detail` with two subfields: 
- `action`: string name of the event action
- `param`: Other relevant parameters

The events captured in Lux widget includes:
- `initWidget`: initialize widget (corresponds to when the widget is triggered and toggled[TODO:need verification])
    - `param`: None
- `exportBtnClick` : Export Button is clicked
    - `param`: `this.state._exportedVisIdxs`, dictionary of selected visualization index, keyed by the tab name. Example: `{'Vis List': [0, 2]}`
- `switchTab`: Click on tab to switch to a different tab
    - `param`: Title of tab that user has switched to (i.e., name of the action)
- `clickVis`/`unclickVis`: Selecting or de-selecting a single visualization through clicking
    - `param`: 
        - `index` of the visualization selected or de-selected (starting from 0), 
        - `tableTitle`: Title of tab that user is currently on
        - `title`: Vega-Lite specification of title, will not be present if no title 
        - `mark`: Vega-Lite specification of mark
        - `encoding`: Vega-Lite specification of encoding
    - Note that the `exportBtnClick` can access the `clickVis`/`unclickVis` vis information.
- `startScroll/stopScroll` : Start and stop events for scrolling through the recommendation chart gallery
    - `param`: Title of tab that user is scrolling through (i.e., name of the action)
- `toggleBtnClick`: Toggle Button for switching between Pandas/Lux is clicked
    - `param`: Display type that user is switching to.
- `deleteBtnClick`: Delete Button for removing visualizations from the widget display
    - `param`: `this.state._exportedVisIdxs`, dictionary of selected visualization index, keyed by the tab name. Example: `{'Vis List': [0, 2]}`
- `closeExportInfo`: Close the pop up that explains what export does
- `openWarning`: Open warning panel
    - `param`: Display warning message
- `closeWarning`: Close warning panel
    - `param`: Display warning message
### Jupyter Events

A list of all Javascript events from Jupyter is listed [here](https://jupyter.readthedocs.io/en/latest/development_guide/js_events.html), it can also be accessed via `IPython.events`.

- `editMarkdownCell`/`editCodeCell`: Records when user edits a cell, via the event `edit_mode.Cell`.
- `selectMarkdownCell`/`selectCodeCell`: Records when user selected or is interacting with a Cell, via the event `command_mode.Cell`.
- `deleteMarkdownCell`/`deleteCodeCell`: Records when the user deletes a code or markdown cell, via the event `delete.Cell`.
- `executeCodeCell`: Records when user executes a code cell, via the event `execute.CodeCell`.
- `completeCodeCell`: Records when the executed code cell is finished with execution, via the event `finished_execute.CodeCell`.
    - `isPrintPandasDf`/`isPrintLuxDf`: captures whether the printed dataframe is displayed as Pandas or a Lux widget or neither.
    - `isPrintVis`/`isPrintVisCollection`: captures whether a Vis or Vis List is printed.
- `kernelReady`: Records when the IPython kernel is ready, usually indicating the start of a new session (either opening a new session or reopening of the page), via the `kernel_ready.Kernel` event.
- `kernelRestart`: Records when the IPython kernel restarts, via the `kernel_restarting.Kernel` event.
- `kernelKilled`: Records when the IPython kernel is killed, via the `kernel_killed.Session` and `kernel_killed.Kernel` event.

Not yet added:
- Toggle between Lux and Pandas view
- BUG: initWidget triggered twice when rendering widget

# Information about Logging Codes

The logged [CustomEvents](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent) are dispatched from the [Lux Jupyter widget](https://github.com/lux-org/lux-widget) frontend. This logger extension contains a listener that detects these LOG events. These LOG event contain a JSON in the field `detail` with two subfields: 
- `action`: string name of the event action
- `param`: Other relevant parameters

The events captured in Lux widget includes:
- `initWidget`: initialize widget (corresponds to when the widget is triggered and toggled[TODO:need verification])
    - `param`: None
- `exportBtnClick` : Export Button is clicked
    - `param`: `this.state._exportedVisIdxs`, dictionary of selected visualization index, keyed by the tab name. Example: `{'View Collection': [0, 2]}`
- `switchTab`: Click on tab to switch to a different tab
    - `param`: Title of tab that user has switched to (i.e., name of the action)
- `clickVis`/`unclickVis`: Selecting or de-selecting a single visualization through clicking
    - `param`: Index of the visualization selected or de-selected (starting from 0)

Not yet added:
- Toggle between Lux and Pandas view
- BUG: initWidget triggered twice when rendering widget

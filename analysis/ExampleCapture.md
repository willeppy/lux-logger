capture high-level user actions
capture provenance of all events
intermediate user actions
critical that each time a query is logged, it is possible to unambiguously recover this origination or application context info


Ground Truth

- Execute linearly until Cell 4
- Cell 4: 
    - Toggle to Lux
    - Click on different tabs
    - Stayed on Category tab
    - Go back to Correlation Tab, scroll through
- Deleted two cells 
- Cell 6: 
    - Toggle to Lux
    - Toggle back to Pandas
- Deleted two cells 
- Rexecute Cell 7~8
- Edit change `df.set_context([lux.Spec(attribute = "Origin")])` to `df.set_context([lux.Spec(attribute = "Cylinders")])`
- Exported Origin v.s. Displacement bar chart 
- Typed `df.get_exported()` in subsequent cell to print it out
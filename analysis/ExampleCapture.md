capture high-level user actions
capture provenance of all events
intermediate user actions
critical that each time a query is logged, it is possible to unambiguously recover this origination or application context info


Ground Truth (CarsDemo.ipynb)

- Execute linearly until Cell 4
- Cell 4: 
    - Toggle to Lux
    - Click on different tabs
    - Stayed on Category tab
    - Go back to Correlation Tab, scroll through (scrolling about 10 seconds)
    - Go back to Distribution Tab, scroll through (scrolling about 3 seconds)
- Cell 5: set default display as Lux
- Cell 6: 
    - display `df` Lux view
- Cell 7: 
    - default Lux view
    - Click on Filter, Generalize
    - Scroll through Enhance (about 10 seconds)
    - Toggle back to Pandas
    - then Toggle back to Lux again
- Click on: 
    - Click on two vis : color by Origin, color by Cyclinders
    - unclick color by Cylinders
    - exported a single viz
- Cell 9: 
    - Print out single View
- Re-execute Cell 10~11
- Edit change `df.set_context([lux.Spec(attribute = "Cylinders")])` to `df.set_context([lux.Spec(attribute = "Origin")])` (edit time about 10 seconds)
- Click on:
    - Origin v.s. Displacement bar chart 
    - Origin v.s. Horsepower bar chart 
    - Export Button
- Typed `df.get_exported()` in subsequent cell to print out ViewCollection
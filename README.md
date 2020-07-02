## Lux Logger

Jupyter extension used for frontend logging of UI events in Lux and other Jupyter notebook actions. 
The extension logs all UI interactions from Lux, as well as events in Jupyter, such as cell execution, kernel ready and restart, cell deletion. The logging codes are listed in [INFO.md](INFO.md). The logged events are stored inside `.metadata.history`. The extension is largely modeled after [yifanwu](https://github.com/yifanwu/)'s [notetaker](https://github.com/yifanwu/notetaker).

*WARNING:* Note that as a side effect of using the logger, your Jupyter notebook will be auto-saved when you close the notebook and every 60 seconds alongside an event.

## Installation

To install the logger, run the following command at the root level:

```bash
pip install .
jupyter nbextension install --symlink logger
jupyter nbextension enable logger/static/main
```

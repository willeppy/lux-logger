## Lux Logger

Jupyter extension used for frontend logging of UI events in Lux and other Jupyter notebook actions. 
The extension logs all UI interactions from Lux (as listed in [INFO.md](INFO.md)), as well as events in Jupyter (start and end of code cell execution, kernel restart, code cell deletion). The logged events are stored inside `.metadata.history`. The extension is largely modeled after [yifanwu](https://github.com/yifanwu/)'s [notetaker](https://github.com/yifanwu/notetaker).

## Installation

To install the logger, run the following command at the root level:

```bash
pip install .
jupyter nbextension install --symlink logger
jupyter nbextension enable logger/static/main
```

## Lux Logger

Jupyter extension used for frontend logging of UI events in Lux and other Jupyter notebook actions. 
The extension logs all UI interactions from Lux, as well as events in Jupyter, such as cell execution, kernel ready and restart, cell deletion. The logging codes are listed in [INFO.md](INFO.md). The logged events are stored inside `.metadata.history`. The extension is largely modeled after [yifanwu](https://github.com/yifanwu/)'s [notetaker](https://github.com/yifanwu/notetaker).


## Installation

To install the logger, run the following command:

```bash
git clone https://github.com/lux-org/logger.git
cd logger
pip install .
jupyter nbextension install --symlink logger
jupyter nbextension enable logger/static/main
```
If you are using virtual environments, note that you should do this in the virtual environment where you will be using Lux.

After the installation has completed you should see a green OK to indicate that the nbextension is activated

<img src="https://i.imgur.com/fyGzG6M.png" width="450"/>

To uninstall the logger, run the following commands: 

```bash
jupyter nbextension uninstall logger
jupyter nbextension disable logger/static/main
```




from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import subprocess
import time

class RestartHandler(FileSystemEventHandler):
    def __init__(self, command):
        self.command = command
        self.process = None
        self.start_process()

    def start_process(self):
        if self.process:
            self.process.terminate()
        self.process = subprocess.Popen(self.command, shell=True)

    def on_modified(self, event):
        if event.src_path.endswith('.py'):
            print(f"File changed: {event.src_path}. Restarting...")
            self.start_process()

if __name__ == "__main__":
    cmd = "python -u main.py"
    event_handler = RestartHandler(cmd)
    observer = Observer()
    observer.schedule(event_handler, path='.', recursive=True)
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()

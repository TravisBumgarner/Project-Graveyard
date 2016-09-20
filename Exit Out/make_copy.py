import os
import shutil
folder_path = os.path.abspath("to_copy.py")
shutil.copy(folder_path, "./output")
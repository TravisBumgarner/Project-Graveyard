def gdrive_running():
	import os
	import psutil
	google_drive_found = False
	for pid in psutil.pids():
		p = psutil.Process(pid)
		if p.name() == "googledrivesync.exe":
			google_drive_found = True
	if(google_drive_found == True):
		ign = input("Close Google Drive and then press enter. (Type 'ign' if you've already closed it.")
		if(ign == "ign"):
			os.startfile("C:\Program Files\Adobe\Adobe Lightroom\lightroom.exe")
		else:
			gdrive_running()
	else:
		os.startfile("C:\Program Files\Adobe\Adobe Lightroom\lightroom.exe")

gdrive_running()
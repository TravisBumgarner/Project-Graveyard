import os
import shutil
import datetime

"""
Instructions: Place:
	new .pdf files in ./new_pdf
	current pdf file structure in ./uploads 
	.py file in .
"""

# Find and replace spaces with -
def remove_spaces():
	new_files_folder_path = input("Enter Path for new files Folder: ")
	#Set to folder with new pdfs
	parent_folder = os.path.abspath(new_files_folder_path)
	print("Renaming files in " + parent_folder + " for WordPress")

	#Walk the folder/file structure of pdf_new
	for foldername, subfolders, filenames in os.walk(parent_folder):
		filenames_to_not_rename = []

		print("\nFiles renamed:")
		for filename in filenames:
			#keeps track if file was modified at all
			#If any character of a filename is changed => changes +=1
			changes = 0 
			
			#Generate new filename
			filename_without_spaces = ""

			for current_letter in filename:
				#If current letter is a space, replace it with - which is
				# what Wordpress does. For ( and ) Wordpress strips them completely
				if(current_letter == " "):
					filename_without_spaces += "-"
					changes += 1
				elif(current_letter == ")" or current_letter == "("):
					changes+= 1
				else:
					filename_without_spaces += current_letter

			if(changes>0): #If any - were added, ( or ) removed, print new filename
				print('Renaming "%s" to "%s"...' % (filename,filename_without_spaces),end="")
				
				#Generate absolute path for old and new file name
				filename_path = os.path.join(foldername,filename)
				filename_without_spaces_path = os.path.join(foldername,filename_without_spaces)
				
				#Override old filename with new filename
				shutil.move(filename_path, filename_without_spaces_path)
				
				print('done')
			
			else:
				#The above if statement returns the filename if it is chanaged.
				#This else statement will save all unedited filenames to be printed in a
				#Separate list at the end
				filenames_to_not_rename.append(filename)
		
		print("\nFiles not renamed:") 
		for filename_not_renamed in filenames_to_not_rename:
			print(filename_not_renamed)

def replace_files():
	pdf_folder_new = input("\nEnter Path for new files Folder: ")
	pdf_folder_current = input("Enter Path for current files Folder: ")
	#Compare new PDF files in the pdf_new directory with the WordPress uploads directory and move
	#PDFs to wherever their old version is located in the uploads directory
	pdf_folder_new = os.path.abspath(pdf_folder_new)
	pdf_folder_current = os.path.abspath(pdf_folder_current)
	print("\nMoving Files from \n%s => \n%s" % (pdf_folder_new,pdf_folder_current))
	print("\nFiles moved:")
	for foldername_new, subfolders_new, filenames_new in os.walk(pdf_folder_new):
		for filename_new in filenames_new:
			file_found = False #Once the file is found, set this to true to break out of the next for loop
			for foldername_current, subfolders_current, filenames_current in os.walk(pdf_folder_current):
				if(file_found == True):
					break
				filenames_current_length = len(filenames_current)
				file_counter = 0
				for filename_current in filenames_current:
					print("Checking %s to %s" % (filename_new, filename_current))
					if (filename_new == filename_current):
						file_found = True #This line is needed to break out of the larger for loop.
						print('Moving "%s" to "./uploads"...' % (filename_new),end="")
						filename_new_path = os.path.join(pdf_folder_new,filename_new)
						filename_current_path = os.path.join(foldername_current,filename_current)	
						shutil.move(filename_new_path, filename_current_path)
						print('done')
						break
					if(file_counter == filenames_current_length): 
						print("No Match! for %s" % filename_new)
					file_counter += 1
					#print("checking %s of %s" % (file_counter, len(filenames_current)))
					#If all files have been searched through without returning printing break
				continue

start = datetime.datetime.now()
remove_spaces()
replace_files()
end = datetime.datetime.now()
print("Total runtime: %s" % (end - start))
"""

pdf_folder_new = os.path.abspath('./new')
for path, subdirs, files in os.walk(pdf_folder_new):
    for name in files:
        print (os.path.join(path, name))
        """
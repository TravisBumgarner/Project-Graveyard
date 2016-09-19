import os
import shutil

"""
Instructions: Place:
	new .pdf files in ./new_pdf
	current pdf file structure in ./uploads 
	.py file in .
"""

# Find and replace spaces with -
def remove_spaces():
	#Set to folder with new pdfs
	parent_folder = os.path.abspath('./pdf_new')
	print("Fixing files in " + parent_folder)

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
	#Compare new PDF files in the pdf_new directory with the WordPress uploads directory and move
	#PDFs to wherever their old version is located in the uploads directory
	pdf_folder_new = os.path.abspath('./pdf_new')
	pdf_folder_current = os.path.abspath('./uploads')
	for foldername_new, subfolders_new, filenames_new in os.walk(pdf_folder_new):
		for filename_new in filenames_new:
			for foldername_current, subfolders_current, filenames_current in os.walk(pdf_folder_current):
				filenames_current_length = len(filenames_current)
				file_counter = 0
				for filename_current in filenames_current:
					if (filename_new == filename_current):
						print("Match!")
						break
					if(file_counter == filenames_current_length): 
						print("No Match! for %s" % filename_new)
					file_counter += 1
					#print("checking %s of %s" % (file_counter, len(filenames_current)))
					#If all files have been searched through without returning printing break

remove_spaces()
replace_files()


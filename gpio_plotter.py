import matplotlib.pyplot as plt
#Notes
"""
Steppers require 5V line and at least 1A of power to the RaspPi

Resources:
https://learn.adafruit.com/adafruits-raspberry-pi-lesson-10-stepper-motors/overview
"""

#import RPi.GPIO as GPIO
#import time
#GPIO.setmode(GPIO.BCM) #BCM follows the Pi Wedge numbering

#Setup Pins and Outputs/Inputs
enable_pin = 18
coil_A_1_pin = 4
coil_A_2_pin = 17
coil_B_1_pin = 23
coil_B_2_pin = 24

#GPIO.setup(enable_pin, GPIO.OUT)
#GPIO.setup(coil_A_1_pin, GPIO.OUT)
#GPIO.setup(coil_A_2_pin, GPIO.OUT)
#GPIO.setup(coil_B_1_pin, GPIO.OUT)
#GPIO.setup(coil_B_2_pin, GPIO.OUT)

#GPIO.output(enable_pin, 1)

def step_cw(delay, steps):
	for i in range(0, steps):
		setStep(1, 0, 1, 0)
		time.sleep(delay)
		setStep(0, 1, 1, 0)
		time.sleep(delay)
		setStep(0, 1, 0, 1)
		time.sleep(delay)
		setStep(1, 0, 0, 1)
		time.sleep(delay)

def step_ccw(delay, steps):
	for i in range(0, steps):
		setStep(1, 0, 0, 1)
		time.sleep(delay)
		setStep(0, 1, 0, 1)
		time.sleep(delay)
		setStep(0, 1, 1, 0)
		time.sleep(delay)
		setStep(1, 0, 1, 0)
		time.sleep(delay)



def interpolate_two_points(interpolated_path,start_point, end_point):
	try:
		#Try to calculate the slope unless there is no slope, in which case m = 0
		m = (end_point[1]-start_point[1])/(end_point[0]-start_point[0])
	except ZeroDivisionError:
		m = 0
	b = start_point[1] - m  * start_point[0]
	if(start_point[0] == end_point[0]):
		#If there is infinite slope, increase y by 1 per
		increment = 1 if start_point[1] < end_point[1] else -1
		for y in range(start_point[1],end_point[1]+1,increment):
			x = start_point[0]
			interpolated_path[0].append(x)
			interpolated_path[1].append(y)
	else:
		#Otherwise, increase x by 1 per
		increment = 1 if start_point[0] < end_point[0] else -1
		for x in range(start_point[0],end_point[0]+1, increment):
			y = round(m*x + b,1)
			interpolated_path[0].append(x)
			interpolated_path[1].append(y)
	return interpolated_path

def interpolate_path(path):
	current_path_interpolated = [ [],[] ]
	for point in range(0,len(path)-1):
		start_point = path[point]
		end_point = path[point + 1]
		current_path_interpolated = interpolate_two_points(current_path_interpolated, start_point, end_point)
	return current_path_interpolated

def plot_path(path):
	plt.plot(path[0],path[1],'ro')
	border = 5
	plt.axis([min(path[0]) - border, max(path[0]) + border, min(path[1]) - border, max(path[1]) + border])
	plt.show()


#test_path = [[(0, 0, 0), [(0,0),(0,10),(10,10),(10,0),(10,-10),(5,-5),(0,-10),(-5,-5)]]]
#plot_path(interpolate_path(test_path[0][1]))


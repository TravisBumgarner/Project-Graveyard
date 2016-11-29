import pygame

#User Settings
paint_brush_radius = 10
window_width = 500
window_height = 500
paint_values = [
	["Red"   , (255,  0,  0)],
	["Yellow", (255,255,  0)],
	["Blue"  , (  0,  0,255)],
	["White" , (255,255,255)],
	["Black" , (  0,  0,  0)]
]
def generate_2d_plot(paint_brush_radius, window_width, window_height, paint_values):
	class Paint_Color():
		"""
		Add a description for each color
		"""
		def __init__(self, rgb, gui_x_pos, gui_y_pos, length_of_side):
			self.value = rgb
			self.x1 = gui_x_pos
			self.x2 = gui_x_pos + length_of_side
			self.y1 = gui_y_pos
			self.y2 = gui_y_pos + length_of_side

	#Computer Settings
	draw_enabled = False
	last_pointer_position = (0,0)
	paint_color = (0,0,0)
	palette_height = 40

	# Create screen
	screen = pygame.display.set_mode((window_width,window_height +palette_height))


	pygame.draw.rect(screen, (255, 255, 255), (0, 0, window_width, window_height))

	# Add Palette background
	pygame.draw.rect(screen, (120,120,120), (0,window_height, window_width, palette_height))

	#Add Colors and Palette
	paint_palette = {}
	y_start_position = window_height + palette_height/4
	x_start_position = palette_height/4
	size = 20
	spacing = 10
	# This for loop generates objects for each color with its dimensions, rgb value, and location on the screen
	# It also draws the palette on the screen
	for color in paint_values:
		paint_palette[color[0]] = Paint_Color(color[1], x_start_position, y_start_position, size)
		pygame.draw.rect(screen, color[1], (x_start_position, y_start_position, size, size))
		x_start_position += (size + spacing)
		print((x_start_position, y_start_position, size, size))
	pygame.display.flip()

	def paint_line(window_area, paint_color, start, end, radius):
		#Draw a line with the current color in the specified area
		dx = end[0] - start[0]
		dy = end[1] - start[1]
		distance = max(abs(dx),abs(dy))
		for i in range(distance):
			x = int(start[0] + float(i) / distance * dx)
			y = int(start[1] + float(i) / distance * dy)
			pygame.draw.circle(window_area, paint_color, (x,y), radius)

	def change_color(current_color, dict_of_colors, mouse_position):
		#Based on the screen location of the mouse, change the color or keep the same color.
		for color in dict_of_colors:
			if (
				mouse_position.pos[0] > dict_of_colors[color].x1 and
				mouse_position.pos[0] < dict_of_colors[color].x2 and
				mouse_position.pos[1] > dict_of_colors[color].y1 and
				mouse_position.pos[1] < dict_of_colors[color].y2
			):
				return dict_of_colors[color].value
		return current_color

	try:
		while True:
			#wait until an event happens
			pygame_event = pygame.event.wait()
			#print(pygame_event)
			if pygame_event.type == pygame.QUIT:
				#If the event type is to X out of the window, stop
				raise StopIteration
			if pygame_event.type == pygame.MOUSEBUTTONDOWN:
				if pygame_event.pos[1] < (window_height - paint_brush_radius):
					pygame.draw.circle(screen,paint_color, pygame_event.pos, paint_brush_radius)
					draw_enabled = True
				else:
					paint_color = change_color(paint_color, paint_palette, pygame_event)
			if pygame_event.type == pygame.MOUSEBUTTONUP:
				draw_enabled = False
			if pygame_event.type == pygame.MOUSEMOTION:
				# only draw inside the canvas area
				if draw_enabled and pygame_event.pos[1]<(window_height - paint_brush_radius):
					pygame.draw.circle(screen,paint_color, pygame_event.pos, paint_brush_radius)
					paint_line(screen, paint_color, pygame_event.pos, last_pointer_position, paint_brush_radius)
					print(pygame_event.pos)
				last_pointer_position = pygame_event.pos
			pygame.display.flip()

	except StopIteration:
		pass

	pygame.quit()

generate_2d_plot(paint_brush_radius, window_width, window_height, paint_values)
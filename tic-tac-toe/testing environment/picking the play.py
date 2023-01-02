pointValues = [
    [0, [0, 2]],
    [15, [1, 2]],
    [0, [2, 0]],
    [0, [2, 0]],
    [14, [2, 0]],
    [-5, [2, 0]],
    [16, [2, 0]],
    ]
playToMake = [-1,[-1,-1]]
for pointValue in pointValues:
    if pointValue[0] > playToMake[0]:
        playToMake = pointValue
print(playToMake)
    
    


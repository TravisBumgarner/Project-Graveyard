'''positions = [
                    ["o","o"," "],
                    [" "," "," "],
                    [" "," "," "]
                ]

transposePositions = [list(x) for x in zip(*positions)]
'''
pointValuesColumn = [[5, [0, 0]], [0, [1, 2]], [5, [2, 2]]]
'''
for indexColumn, column in enumerate(pointValuesColumn):
    #Since positions has been transposed, [row,column] values are backwards, this flips them around
    pointValuesColumn[indexColumn][1] = [column[1],column[0]]
print(pointValuesColumn)
'''

for indexCol, eachCol in enumerate(pointValuesColumn):
    print(indexCol)
    print(eachCol)
    pointValuesColumn[indexCol][1] = [eachCol[1][1],eachCol[1][0]]

print(pointValuesColumn)

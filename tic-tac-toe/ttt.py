import random
import time
from ai import mediumAI

def easyAI(positions, spacesLeft, playerMarker = "o"):
    while True:
        randNumberRow = random.randint(0,2)
        randNumberCol = random.randint(0,2)
        if positions[randNumberRow][randNumberCol] == " ":
            positions[randNumberRow][randNumberCol] = playerMarker
            return positions
        elif spacesLeft == 0:
            return None
        else:
            continue
            



def intro():
    print("The positions are shown below as 1 to 9.")
    print("When it's you're turn, pick a position and")
    print("type it in when prompted.")
    print(   "1|2|3\n" +
             "-+-+-\n" +
             "4|5|6\n" +
             "-+-+-\n" +
             "7|8|9\n")

    #Initial positions are all single whitespaces
    global positions
    positions = [
                    [" "," "," "],
                    [" "," "," "],
                    [" "," "," "]
                ]
    #Board layout with spaces.
    global board
    board = [positions[0][0]  + "|" + positions[0][1]  + "|" + positions[0][2],
            "-"           + "+" + "-" + "+"     + "-"              ,  
            positions[1][0]  + "|" + positions[1][1]  + "|" + positions[1][2],  
            "-"           + "+" + "-" + "+"     + "-"              ,  
            positions[2][0] + "|" + positions[2][1]  + "|" + positions[2][2]]

def checkRowAndColDictionary(location):
    rowAndColDictionary = {
        1: [0,0], 2: [0,1], 3: [0,2],
        4: [1,0], 5: [1,1], 6: [1,2],
        7: [2,0], 8: [2,1], 9: [2,2]    
    }
    return rowAndColDictionary[location]

def checkWinner(gameBoard):
    for i in [0,1,2]:
        if ((gameBoard[i][0] == "o" and gameBoard [i][1] == "o" and gameBoard [i][2] == "o") or
            (gameBoard[0][i] == "o" and gameBoard [1][i] == "o" and gameBoard [2][i] == "o")):
            print("o wins!")
            return True        
        elif ((gameBoard[i][0] == "x" and gameBoard [i][1] == "x" and gameBoard [i][2] == "x") or
              (gameBoard[0][i] == "x" and gameBoard [1][i] == "x" and gameBoard [2][i] == "x")):
            print("x wins!")
            return True
    if ((gameBoard[0][0] == "o" and gameBoard [1][1] == "o" and gameBoard [2][2] == "o") or
        (gameBoard[0][2] == "o" and gameBoard [1][1] == "o" and gameBoard [2][0] == "o")):
            print("o wins!")
            return True

    if ((gameBoard[0][0] == "x" and gameBoard [1][1] == "x" and gameBoard [2][2] == "x") or
        (gameBoard[0][2] == "x" and gameBoard [1][1] == "x" and gameBoard [2][0] == "x")):
            print("x wins!")
            return True


def playGame():
    currentTurnLetter = "x"
    spacesLeft = 9
    while True:   
        if spacesLeft == 0:
             print("Game tied.")
             break
        elif currentTurnLetter == "x":
            try:
                print("It is " + currentTurnLetter + "'s turn. Where would you like to go? ")
                location = int(input("Which spot?"))
                row, col = checkRowAndColDictionary(location)
                if (row >=0 and row <=2) and (col >=0 and col <=2) and positions[row][col] == " ":
                    positions[row][col] = currentTurnLetter
                elif positions[row][col] != " ":
                    print("Current space is already taken. Please select another location")
                    continue
            except (ValueError,KeyError,IndexError):
                print("Please enter a valid location")
                continue
        elif currentTurnLetter == "o":
            print("The computer is going.")
            #time.sleep(2)
            mediumAI(positions,spacesLeft)
            
        if currentTurnLetter == "x": currentTurnLetter = "o"
        elif currentTurnLetter == "o": currentTurnLetter = "x"
        spacesLeft -= 1
        board = [positions[0][0]  + "|" + positions[0][1]  + "|" + positions[0][2],
                "-"           + "+" + "-" + "+"     + "-"              ,  
                positions[1][0]  + "|" + positions[1][1]  + "|" + positions[1][2],  
                "-"           + "+" + "-" + "+"     + "-"              ,  
                positions[2][0] + "|" + positions[2][1]  + "|" + positions[2][2]]
        for row in board:
             print(row)
        if checkWinner(positions) == True:
            return None

def main():
    intro()
    playGame()
    while True:
        playAgain = input("Play again? y or n?")
        if playAgain == "y":
            main()
        elif playAgain == "n":
            return None
        else:
            print("Not a valid answer.")
            
        

main()

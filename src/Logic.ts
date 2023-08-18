export default class Logic {
    masculineArray = [
        ["bEl", "---", "bCa", "---", "bWe", "---", "bWe", "---", "bCa", "---", "bEl"],
        ["bRk", "bMo", "bTa", "bGi", 'bVi', "bKa", "bAd", "bGi", "bTa", "bMo", "bRk"],
        ["bpR", "bpM", "bpT", "bpG", "bpV", "bpK", "bpA", "bpE", "bpC", "bpW", "bp0"],
        ["---", "---", "---", "---", "---", "---", "---", "---", "---", "---", "---"],
        ["---", "---", "---", "---", "---", "---", "---", "---", "---", "---", "---"],
        ["---", "---", "---", "---", "---", "---", "---", "---", "---", "---", "---"],
        ["---", "---", "---", "---", "---", "---", "---", "---", "---", "---", "---"],
        ["wp0", "wpW", "wpC", "wpE", "wpA", "wpK", "wpV", "wpG", "wpT", "wpM", "wpR"],
        ["wRk", "wMo", "wTa", "wGi", 'wAd', "wKa", "wVi", "wGi", "wTa", "wMo", "wRk"],
        ["wEl", "---", "wCa", "---", "wWe", "---", "wWe", "---", "wCa", "---", "wEl"]
      ]
    isMoveValid(px: number, py: number, x: number, y: number, type: string){
        console.log("Checking move...")
        return true
    }
    getPossibleMoves(){}
    getValidMoves(){}


/**
    getPawnMoves(r,c,moves):
    global whiteToMove
    if whiteToMove:
        if c -1  >= 0:
            if board[c-1][r] == "---":#move 1
                _move = Move((c,r), (c-1,r), board)
                appendMoves(moves, _move)
            if r - 1 >= 0:#capture left
                if board[c-1][r-1][0] == "b":
                    _move = (Move((c,r),(c-1,r-1),board))
                    appendMoves(moves, _move)
            if r+1 <= 10: #capture right
                if board[c-1][r+1][0] == "b":
                    _move = (Move((c,r),(c-1,r+1),board))
                    appendMoves(moves, _move)
    else: #black to move
        if c + 1 <= 9:
            if board[c+1][r] == "---":#move 1
                _move = Move((c,r), (c+1,r), board)
                appendMoves(moves, _move)
            if r - 1 >= 0:#capture left
                if board[c+1][r-1][0] == "w":
                    _move = (Move((c,r),(c+1,r-1),board))
                    appendMoves(moves, _move)
            if r+1 <= 10: #capture right
                if board[c+1][r+1][0] == "w":
                    _move = (Move((c,r),(c+1,r+1),board))
                    appendMoves(moves, _move)
/**
def getRookMoves(r,c,moves):
    global whiteToMove
    allyColor = "w"
    enemyColor = "b"
    if not whiteToMove:
        enemyColor = "w"
        allyColor = "b"
    spaceUp = c
    spaceDown = -((c - 10) +1)
    spaceLeft = r
    spaceRight = -((r - 9)+1)+2
    for spaces in range(spaceUp):
        newc=(c-spaces)-1
        _move = Move((c,r),(newc,r),board)
        if (board[_move.endCol][_move.endRow]) == "---":
            appendMoves(moves, _move)
        if (board[_move.endCol][_move.endRow][0]) == enemyColor:
            appendMoves(moves, _move)
            break
        if (board[_move.endCol][_move.endRow][0]) == allyColor:
            break
    for spaces in range(spaceDown):
        newc = c + spaces+1
        _move = Move((c,r),(newc,r),board)
        if (board[_move.endCol][_move.endRow]) == "---":
            appendMoves(moves, _move)
        if (board[_move.endCol][_move.endRow][0]) == enemyColor:
            appendMoves(moves, _move)
            break
        if (board[_move.endCol][_move.endRow][0]) == allyColor:
            break
    for spaces in range(spaceLeft):
        newr = r - spaces - 1
        _move = Move((c,r),(c,newr),board)
        if (board[_move.endCol][_move.endRow]) == "---":
            appendMoves(moves, _move)
        if (board[_move.endCol][_move.endRow][0]) == enemyColor:
            appendMoves(moves, _move)
            break
        if (board[_move.endCol][_move.endRow][0]) == allyColor:
            break
    for spaces in range(spaceRight):
        newr = r + spaces + 1
        _move = Move((c,r),(c,newr),board)
        if (board[_move.endCol][_move.endRow]) == "---":
            appendMoves(moves, _move)
        if (board[_move.endCol][_move.endRow][0]) == enemyColor:
            appendMoves(moves, _move)
            break
        if (board[_move.endCol][_move.endRow][0]) == allyColor:
            break

def getKhanMoves(r,c,moves):
    global whiteToMove
    allyColor = "w" if whiteToMove else "b"
    _move = []
    if(c-1 >= 0):
        if(board[c-1][r][0] != allyColor):#up 
            _move = Move((c,r),(c-1,r),board)
            appendMoves(moves, _move)
    if( c+1 <= 9):
        if(board[c+1][r][0] != allyColor):#down
            _move = Move((c,r),(c+1,r),board)
            appendMoves(moves, _move)
    if( r-1 >= 0):
        if(board[c][r-1][0] != allyColor):#left
            _move = Move((c,r),(c,r-1),board)
            appendMoves(moves, _move)
    if(r+1 <= 10):
        if(board[c][r+1][0] != allyColor):#right
            _move = Move((c,r),(c,r+1),board)
            appendMoves(moves, _move)
    if(c-1 >=0 and r-1 >= 0):
        if(board[c-1][r-1][0] != allyColor ):#up + left
            _move = Move((c,r),(c-1,r-1),board)
            appendMoves(moves, _move)
    if(c+1 <= 9  and r-1 >= 0):
        if(board[c+1][r-1][0] != allyColor):#down + left
            _move = Move((c,r),(c+1,r-1),board)
            appendMoves(moves, _move)
    if(c-1 >= 0  and r+1 <= 10):
        if(board[c-1][r+1][0] != allyColor):#up + right
            _move = Move((c,r),(c-1,r+1),board)
            appendMoves(moves, _move)
    if(c+1 <= 9  and r+1 <= 10):
        if(board[c+1][r+1][0] != allyColor):#down + right
            _move = Move((c,r),(c+1,r+1),board)
            appendMoves(moves, _move)

def getAdminMoves(r,c,moves):
    global whiteToMove
    allyColor = "w" if whiteToMove else "b"
    _move = []
    if(c-1 >=0 and r-1 >= 0):
        if(board[c-1][r-1][0] != allyColor ):#up + left
            _move = Move((c,r),(c-1,r-1),board)
            appendMoves(moves, _move)
    if(c+1 <= 9  and r-1 >= 0):
        if(board[c+1][r-1][0] != allyColor):#down + left
            _move = Move((c,r),(c+1,r-1),board)
            appendMoves(moves, _move)
    if(c-1 >= 0  and r+1 <= 10):
        if(board[c-1][r+1][0] != allyColor):#up + right
            _move = Move((c,r),(c-1,r+1),board)
            appendMoves(moves, _move)
    if(c+1 <= 9  and r+1 <= 10):
        if(board[c+1][r+1][0] != allyColor):#down + right
            _move = Move((c,r),(c+1,r+1),board)
            appendMoves(moves, _move)

def getVizierMoves(r,c,moves):
    global whiteToMove
    allyColor = "w" if whiteToMove else "b"
    _move = []
    if(c-1 >= 0):
        if(board[c-1][r][0] != allyColor):#up 
            _move = Move((c,r),(c-1,r),board)
            appendMoves(moves, _move)
    if( c+1 <= 9):
        if(board[c+1][r][0] != allyColor):#down
            _move = Move((c,r),(c+1,r),board)
            appendMoves(moves, _move)
    if( r-1 >= 0):
        if(board[c][r-1][0] != allyColor):#left
            _move = Move((c,r),(c,r-1),board)
            appendMoves(moves, _move)
    if(r+1 <= 10):
        if(board[c][r+1][0] != allyColor):#right
            _move = Move((c,r),(c,r+1),board)
            appendMoves(moves, _move)

def getElephantMoves(r,c,moves):
    global whiteToMove
    allyColor = "w" if whiteToMove else "b"
    _move = []
    if(c-2 >=0 and r-2 >= 0):
        if(board[c-2][r-2][0] != allyColor ):#up + left
            _move = Move((c,r),(c-2,r-2),board)
            appendMoves(moves, _move)
    if(c+2 <= 9  and r-2 >= 0):
        if(board[c+2][r-2][0] != allyColor):#down + left
            _move = Move((c,r),(c+2,r-2),board)
            appendMoves(moves, _move)
    if(c-2 >=0  and r+2 <= 10):
        if(board[c-2][r+2][0] != allyColor):#up + right
            _move = Move((c,r),(c-2,r+2),board)
            appendMoves(moves, _move)
    if(c+2 <= 9  and r+2 <= 10):
        if(board[c+2][r+2][0] != allyColor):#down + right
            _move = Move((c,r),(c+2,r+2),board)
            appendMoves(moves, _move)

def getWarEngineMoves(r,c,moves):
    global whiteToMove
    allyColor = "w" if whiteToMove else "b"
    _move = []
    if(c-2 >= 0):
        if(board[c-2][r][0] != allyColor):#up 
            _move = Move((c,r),(c-2,r),board)
            appendMoves(moves, _move)
    if(c+2 <= 9):
        if(board[c+2][r][0] != allyColor):#down
            _move = Move((c,r),(c+2,r),board)
            appendMoves(moves, _move)
    if( r-2 >= 0):
        if(board[c][r-2][0] != allyColor):#left
            _move = Move((c,r),(c,r-2),board)
            appendMoves(moves, _move)
    if(r+2 <= 10):
        if(board[c][r+2][0] != allyColor):#right
            _move = Move((c,r),(c,r+2),board)
            appendMoves(moves, _move)

def getMongolMoves(r,c,moves):
    global whiteToMove
    allyColor = "w" if whiteToMove else "b"
    _move = []
    if(c-2 >= 0 and r+1 <= 10):
        if(board[c-2][r+1][0] != allyColor):#up 
            _move = Move((c,r),(c-2,r+1),board)
            appendMoves(moves, _move)
    if(c-2 >= 0 and r-1 >= 0):
        if(board[c-2][r-1][0] != allyColor):#up 
            _move = Move((c,r),(c-2,r-1),board)
            appendMoves(moves, _move)
    if(c+2 <= 9 and r+1 <= 10):
        if(board[c+2][r+1][0] != allyColor):#down
            _move = Move((c,r),(c+2,r+1),board)
            appendMoves(moves, _move)
    if(c+2 <= 9 and r-1 >= 0):
        if(board[c+2][r-1][0] != allyColor):#down
            _move = Move((c,r),(c+2,r-1),board)
            appendMoves(moves, _move)
    if( r-2 >= 0 and c-1 >= 0):
        if(board[c-1][r-2][0] != allyColor):#left
            _move = Move((c,r),(c-1,r-2),board)
            appendMoves(moves, _move)
    if( r-2 >= 0 and c+1<= 9):
        if(board[c+1][r-2][0] != allyColor):#left
            _move = Move((c,r),(c+1,r-2),board)
            appendMoves(moves, _move)
    if(r+2 <= 10 and c-1 >= 0):
        if(board[c-1][r+2][0] != allyColor):#right
            _move = Move((c,r),(c-1,r+2),board)
            appendMoves(moves, _move)
    if(r+2 <= 10 and c+1 <= 9):
        if(board[c+1][r+2][0] != allyColor):#right
            _move = Move((c,r),(c+1,r+2),board)
            appendMoves(moves, _move)

def getCamelMoves(r,c,moves):
    global whiteToMove
    allyColor = "w" if whiteToMove else "b"
    _move = []
    if(c-3 >= 0 and r+1 <= 10):
        if(board[c-3][r+1][0] != allyColor):#up 
            _move = Move((c,r),(c-3,r+1),board)
            appendMoves(moves, _move)
    if(c-3 >= 0 and r-1 >= 0):
        if(board[c-3][r-1][0] != allyColor):#up 
            _move = Move((c,r),(c-3,r-1),board)
            appendMoves(moves, _move)
    if(c+3 <= 9 and r+1 <= 10):
        if(board[c+3][r+1][0] != allyColor):#down
            _move = Move((c,r),(c+3,r+1),board)
            appendMoves(moves, _move)
    if(c+3 <= 9 and r-1 >= 0):
        if(board[c+3][r-1][0] != allyColor):#down
            _move = Move((c,r),(c+3,r-1),board)
            appendMoves(moves, _move)
    if( r-3 >= 0 and c-1 >= 0):
        if(board[c-1][r-3][0] != allyColor):#left
            _move = Move((c,r),(c-1,r-3),board)
            appendMoves(moves, _move)
    if( r-3 >= 0 and c+1<= 9):
        if(board[c+1][r-3][0] != allyColor):#left
            _move = Move((c,r),(c+1,r-3),board)
            appendMoves(moves, _move)
    if(r+3 <= 10 and c-1 >= 0):
        if(board[c-1][r+3][0] != allyColor):#right
            _move = Move((c,r),(c-1,r+3),board)
            appendMoves(moves, _move)
    if(r+3 <= 10 and c+1 <= 9):
        if(board[c+1][r+3][0] != allyColor):#right
            _move = Move((c,r),(c+1,r+3),board)
            appendMoves(moves, _move)

def getPicketMoves(r,c,moves):
    global whiteToMove
    enemyColor = "b" if whiteToMove else "w"
    allyColor = "w" if whiteToMove else "b"
    _move = []
    for i in range(1,10):
        if(c-i >= 0 and r-i >= 0):
            if(board[c-i][r-i][0] == allyColor):
                break
            if (board[c-1][r-1][0]) == enemyColor:
                break
            _move = Move((c,r),(c-i,r-i),board)
            if(_move.endCol,_move.endRow) == (c-1,r-1):
                if(board[c-1][r-1] == "---"):
                    pass
                else:
                    break
            elif(_move.endCol,_move.endRow) != (c-1,r-1):
                if (board[_move.endCol][_move.endRow]) == "---":
                    appendMoves(moves, _move)
                if (board[_move.endCol][_move.endRow][0]) == enemyColor:
                    appendMoves(moves, _move)
                    break
    for i in range(1,10):
        if(c-i >= 0 and r+i <= 10):
            if(board[c-i][r+i][0] == allyColor):
                break
            if (board[c-1][r+1][0]) == enemyColor:
                break
            _move = Move((c,r),(c-i,r+i),board)
            if(_move.endCol,_move.endRow) == (c-1,r+1):
                if(board[c-1][r+1] == "---"):
                    pass
                else:
                    break
            elif(_move.endCol,_move.endRow) != (c-1,r+1):
                if (board[_move.endCol][_move.endRow]) == "---":
                    appendMoves(moves, _move)
                if (board[_move.endCol][_move.endRow][0]) == enemyColor:
                    appendMoves(moves, _move)
                    break
    for i in range(1,10):
        if(c+i <= 9 and r+i <= 10):
            if(board[c+i][r+i][0] == allyColor):
                break
            if (board[c+1][r+1][0]) == enemyColor:
                break
            _move = Move((c,r),(c+i,r+i),board)
            if(_move.endCol,_move.endRow) == (c+1,r+1):
                if(board[c+1][r+1] == "---"):
                    pass
                else:
                    break
            elif(_move.endCol,_move.endRow) != (c+1,r+1):
                if (board[_move.endCol][_move.endRow]) == "---":
                    appendMoves(moves, _move)
                if (board[_move.endCol][_move.endRow][0]) == enemyColor:
                    appendMoves(moves, _move)
                    break
    for i in range(1,10):
        if(c+i <= 9 and r-i >= 0):
            if(board[c+i][r-i][0] == allyColor):
                break
            if (board[c+1][r-1][0]) == enemyColor:
                break
            _move = Move((c,r),(c+i,r-i),board)
            if(_move.endCol,_move.endRow) == (c-1,r-1):
                if(board[c+1][r-1] == "---"):
                    pass
                else:
                    break
            elif(_move.endCol,_move.endRow) != (c+1,r-1):
                if (board[_move.endCol][_move.endRow]) == "---":
                    appendMoves(moves, _move)
                if (board[_move.endCol][_move.endRow][0]) == enemyColor:
                    appendMoves(moves, _move)
                    break
 
def getGiraffeMoves(r,c,moves):
    global whiteToMove
    #tracking for spaces is very important because the giraffe will be blocked by other pieces
    #this is handled by a universal giraffe function
    calculateGiraffePaths(c,r,c-1,r-1,(-1),(0),  moves)
    calculateGiraffePaths(c,r,c-1,r-1,(0),(-1),  moves)
    calculateGiraffePaths(c,r,c+1,r-1,(1),(0),  moves)
    calculateGiraffePaths(c,r,c+1,r-1,(0),(-1),  moves)
    calculateGiraffePaths(c,r,c-1,r+1,(-1),(0),  moves)
    calculateGiraffePaths(c,r,c-1,r+1,(0),(1),  moves)
    calculateGiraffePaths(c,r,c+1,r+1,(1),(0),  moves)
    calculateGiraffePaths(c,r,c+1,r+1,(0),(1),  moves)

def calculateGiraffePaths(c,r,startc,startr,cmod,rmod,moves):
    global whiteToMove
    allyColor = "w"
    enemyColor = "b"
    if not whiteToMove:
        enemyColor = "w"
        allyColor = "b"
    newc = startc
    newr = startr
    ticker = 1
    for i in range(10):
        if(newc >=0 and newc <= 9 and newr >= 0 and newr <= 10):
            if(ticker < 3):
                if(board[newc][newr] == "---"):
                    ticker=ticker+1
                if(board[newc][newr][0] == allyColor):
                    break
                if(board[newc][newr][0] == enemyColor):
                    break
            elif(newc >=0 and newc <= 9 and newr >= 0 and newr <= 10):
                _move = Move((c,r),(newc,newr),board)
                if(board[newc][newr] == "---"):
                    appendMoves(moves,_move)
                if(board[newc][newr][0] == enemyColor):
                    appendMoves(moves,_move)  
                    break 
                if(board[newc][newr][0] == allyColor):
                    break
            
        else:break
        newc=newc+cmod
        newr=newr+rmod

def checkPromotion():
    global whiteToMove, whiteRoyalty, blackRoyalty, pawnXB, pawnXW
    for i in range(len(board[0])):
        if board[0][i]== "wpR":
            board[0][i] = "wRk"
        if board[0][i]== "wpA":
            board[0][i] = "wAd"
        if board[0][i]== "wpV":
            board[0][i] = "wVi"
        if board[0][i]== "wpG":
            board[0][i] = "wGi"
        if board[0][i]== "wpM":
            board[0][i] = "wMo"
        if board[0][i]== "wpT":
            board[0][i] = "wTa"
        if board[0][i]== "wpE":
            board[0][i] = "wEl"
        if board[0][i]== "wpW":
            board[0][i] = "wWe"
        if board[0][i]== "wpC":
            board[0][i] = "wCa"
        if board[0][i]== "wp0":
            board[0][i] = "---"
            board[0][0] = "wpx"
            pawnXW = True
        if board[0][i]== "wp1":
            board[0][i] = "wK0"
            whiteRoyalty += 1
        if board[0][i]== "wpK":
            board[0][i] = "wK1"
            whiteRoyalty += 1
    for i in range(len(board[9])):
        if board[9][i]== "bpR":
            board[9][i] = "bRk"
        if board[9][i]== "bpA":
            board[9][i] = "bAd"
        if board[9][i]== "bpV":
            board[9][i] = "bVi"
        if board[9][i]== "bpG":
            board[9][i] = "bGi"
        if board[9][i]== "bpM":
            board[9][i] = "bMo"
        if board[9][i]== "bpT":
            board[9][i] = "bTa"
        if board[9][i]== "bpE":
            board[9][i] = "bEl"
        if board[9][i]== "bpW":
            board[9][i] = "bWe"
        if board[9][i]== "bpC":
            board[9][i] = "bCa"
        if board[9][i]== "bp0":
            board[9][i] = "---"
            board[9][10] = "bpx"
            pawnXB = True
        if board[9][i]== "bp1":
            board[9][i] = "bK0"
            blackRoyalty += 1
        if board[9][i]== "bpK":
            board[9][i] = "bK1"
            blackRoyalty += 1

def checkPawnForks():
    global whiteToMove, pawnXW, pawnXB
    running = True
    if whiteToMove:
        for c in range(len(board)) :
            for r in range((len(board[c]))):
                if r+2 <= 10 and board[c][r][0] == "b" and board[c][r+2][0] == "b" and board[0][0] == "wpx" and running: 
                    if(c+1 <= 9 and board[c+1][r+1][1] != "K"):
                        board[0][0] = "---"
                        board[c+1][r+1] = "wp1"
                        running = False
    else:
        for c in range(len(board)):
            for r in range((len(board[c]))):
                if r+2 <= 10 and board[c][r][0] == "w" and board[c][r+2][0] == "w" and board[9][10] == "bpx" and running: 
                    if(c-1 > 0 and board[c-1][r+1][1] != "K"):
                        board[9][10] = "---"
                        board[c-1][r+1] = "bp1"
                        running = false

**/




}
export default class Logic {
    masculineArray1 = [
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

    testBoard = [
        ["---", "---", "---", "---", "---", "---", "---", "---", "---", "---", "---"],    
        ["---", "---", "---", "---", "---", "---", "---", "---", "---", "---", "---"],
        ["---", "---", "---", "---", "---", "---", "---", "---", "---", "---", "---"],
        ["---", "bKa", "---", "---", "---", "---", "---", "---", "---", "wKa", "---"],
        ["---", "---", "---", "---", "---", "---", "---", "---", "---", "---", "---"],
        ["---", "---", "---", "wAd", "---", "---", "---", "---", "---", "---", "---"],
        ["---", "---", "---", "---", "---", "---", "---", "---", "bRk", "---", "---"],
        ["---", "---", "---", "---", "---", "---", "---", "---", "---", "---", "---"],
        ["---", "---", "---", "---", "---", "---", "---", "---", "---", "---", "---"],
        ["---", "---", "---", "---", "---", "---", "---", "---", "---", "---", "---"]
    ]

    masculineArray = this.testBoard

    getAllPossibleMoves(board:any, turn: number){
        let player: string = turn % 2 === 1 ? "w" : "b"
        let masterList = []
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board[i].length; j++){
                let arr:Array<any> | undefined=this.getPossibleMoves(i, j, board[i][j], board, turn)
                if (board[i][j][0] === player && arr) {
                    masterList.push(...arr);
                }
            }
        }
        return masterList
    }

    getValidMovesForPiece(x:number, y:number,board:any, turn: number, piece:string){
        let player: string = turn % 2 === 1 ? "w" : "b";                  
    
        let pieceMoves: Array<any> | undefined = this.getPossibleMoves(x,y,piece,board,turn);
        if (!pieceMoves){ return null }
    
        let validMoveList = pieceMoves.filter((move:any) => {
            let testBoard = JSON.parse(JSON.stringify(board));  //Create a copy of the current board
    
            let pieceToMove = testBoard[y][x]; //Save piece from current position
            console.log( move)
            testBoard[move[0]][move[1]] = pieceToMove; //Move piece to the new position 
            testBoard[y][x] = "---"; //Clear out the original location
            console.log(this.isKingInCheck(testBoard, player, turn))
            return !this.isKingInCheck(testBoard, player, turn); //If this move would result in the player's own king being in check, then it's an invalid move
        });              
    
        return validMoveList;
    }

    getPossibleMoves(x: number, y: number, type: string, board:any, turn: number){
        if(type[1] === "p") {
            return this.getPawnMoves(x,y,board,turn) 
        }
        if(type[1] === "R") {
            return this.getRookMoves(x,y,board,turn) 
        }
        if(type[1] === "C") {
            return this.getCamelMoves(x,y,board,turn) 
        }
        if(type[1] === "W") {
            return this.getWarEngineMoves(x,y,board,turn)
        }
        if(type[1] === "E") {
            return this.getElephantMoves(x,y,board,turn)
        }
        if(type[1] === "M") {
            return this.getMongolMoves(x,y,board,turn)
        }
        if(type[1] === "T") {
            return this.getPicketMoves(x,y,board,turn)
        }
        if(type[1] === "G") {
            return this.getGiraffeMoves(x,y,board,turn)
        }
        if(type[1] === "A") {
            return this.getAdminMoves(x,y,board,turn)
        }
        if(type[1] === "K") {
            return this.getKhanMoves(x,y,board,turn)
        }
        if(type[1] === "V") {
            return this.getVizierMoves(x,y,board,turn)
        }
    }

    getPawnMoves(x: number,y: number, board: any, turn:number){
        //white moves on odd turns (1,3,5... ect.)
        let whiteToMove: boolean = turn % 2 == 1
        let moveList: Array<any> = []
        if(whiteToMove) {
            if(y -1  >= 0 ){
                if(board[y-1][x] == "---"){//move 1
                    moveList.push([y-1,x])
                }
                if(x - 1 >= 0){//capture left
                    if(board[y-1][x-1][0] == "b"){
                        moveList.push([y-1,x-1])
                    }
                }
                if(x+1 <= 10){ //capture right
                    if(board[y-1][x+1][0] == "b"){
                        moveList.push([y-1,x+1])
                    }
                }
            }
        } else { //black to move
            if(y + 1 <= 9){
                if(board[y+1][x] == "---"){//move 1
                    moveList.push([y+1,x])
                }
                if(x - 1 >= 0){//capture left
                    if(board[y+1][x-1][0] == "w"){
                        moveList.push([y+1,x-1])
                    }
                }
                if(x+1 <= 10){ //capture right
                    if(board[y+1][x+1][0] == "w"){
                        moveList.push([y+1,x+1])
                    }
                }
            }
        }
        return moveList
    }

    getRookMoves(x: number,y: number, board: any, turn:number){
        let whiteToMove: boolean = turn % 2 == 1
        let enemyColor: string = whiteToMove ? "b" : "w"
        let allyColor: string = whiteToMove ? "w" : "b"
        let moveList: Array<any> = []
        let spaceUp = y
        let spaceDown = -((y - 10) +1)
        let spaceLeft = x
        let spaceRight = -((x - 9)+1)+2
        for(let spaces = 0; spaces < spaceUp; spaces++){
            let newy=(y-spaces)-1
            if (board[newy][x] === "---"){
                moveList.push([newy,x])
            }
            if (board[newy][x][0] === enemyColor){
                moveList.push([newy,x])
                break
            }
            if (board[newy][x][0] === allyColor){
                break
            }
        }
        for(let spaces = 0; spaces < spaceDown; spaces++){
            let newy=(y+spaces)+1
            if (board[newy][x] === "---"){
                moveList.push([newy,x])
            }
            if (board[newy][x][0] === enemyColor){
                moveList.push([newy,x])
                break
            }
            if (board[newy][x][0] === allyColor){
                break
            }
        }
        for(let spaces = 0; spaces < spaceLeft; spaces++){
            let newx=(x-spaces)-1
            if (board[y][newx] === "---"){
                moveList.push([y,newx])
            }
            if (board[y][newx][0] === enemyColor){
                moveList.push([y,newx])
                break
            }
            if (board[y][newx][0] === allyColor){
                break
            }
        }
        for(let spaces = 0; spaces < spaceRight; spaces++){
            let newx=(x+spaces)+1
            if (board[y][newx] === "---"){
                moveList.push([y,newx])
            }
            if (board[y][newx][0] === enemyColor){
                moveList.push([y,newx])
                break
            }
            if (board[y][newx][0] === allyColor){
                break
            }
        }
        return moveList
    }

    getKhanMoves(x: number,y: number, board: any, turn:number){
        let whiteToMove: boolean = turn % 2 == 1
        let allyColor: string = whiteToMove ? "w" : "b"
        let moveList: Array<any> = []
        if(x-1 >=0 && x-1 >= 0){
            if(board[y-1][x-1][0] != allyColor ){//up + left
                moveList.push([y-1,x-1 ])
            }
        }
        if(y+1 <= 9  && x-1 >= 0){
            if(board[y+1][x-1][0] != allyColor){//down + left
                moveList.push([y+1,x-1 ])
            }
        }
        if(y-1 >= 0  && x+1 <= 10){
            if(board[y-1][x+1][0] != allyColor){//up + right
                moveList.push([y-1,x+1 ])
            }
        }
        if(y+1 <= 9  && x+1 <= 10){
            if(board[y+1][x+1][0] != allyColor){//down + right
                moveList.push([y+1,x+1 ])
            }
        }if(y-1 >=0){
            if(board[y-1][x][0] !== allyColor ){//up + left
                moveList.push([y-1,x])
            }
        }
        if(y+1 <= 9){
            if(board[y+1][x][0] !== allyColor){//down + left
                moveList.push([y+1,x])
            }
        }
        if(x+1 <= 10){
            if(board[y][x+1][0] !== allyColor){//up + right
                moveList.push([y,x+1])
            }
        }
        if(x-1 >=0){
            if(board[y][x-1][0] !== allyColor){//down + right
                moveList.push([y,x-1])
            }
        }
        return moveList
    }
    
    getAdminMoves(x: number,y: number, board: any, turn:number){
        let whiteToMove: boolean = turn % 2 == 1
        let allyColor: string = whiteToMove ? "w" : "b"
        let moveList: Array<any> = []
        if(x-1 >=0 && x-1 >= 0){
            if(board[y-1][x-1][0] != allyColor ){//up + left
                moveList.push([y-1,x-1 ])
            }
        }
        if(y+1 <= 9  && x-1 >= 0){
            if(board[y+1][x-1][0] != allyColor){//down + left
                moveList.push([y+1,x-1 ])
            }
        }
        if(y-1 >= 0  && x+1 <= 10){
            if(board[y-1][x+1][0] != allyColor){//up + right
                moveList.push([y-1,x+1 ])
            }
        }
        if(y+1 <= 9  && x+1 <= 10){
            if(board[y+1][x+1][0] != allyColor){//down + right
                moveList.push([y+1,x+1 ])
            }
        }
        return moveList
    }
    
    getVizierMoves(x: number,y: number, board: any, turn:number){
        let whiteToMove: boolean = turn % 2 == 1
        let allyColor: string = whiteToMove ? "w" : "b"
        let moveList: Array<any> = []
        if(y-1 >=0){
            if(board[y-1][x][0] !== allyColor ){//up + left
                moveList.push([y-1,x])
            }
        }
        if(y+1 <= 9){
            if(board[y+1][x][0] !== allyColor){//down + left
                moveList.push([y+1,x])
            }
        }
        if(x+1 <= 10){
            if(board[y][x+1][0] !== allyColor){//up + right
                moveList.push([y,x+1])
            }
        }
        if(x-1 >=0){
            if(board[y][x-1][0] !== allyColor){//down + right
                moveList.push([y,x-1])
            }
        }
        return moveList
    }

    getElephantMoves(x: number,y: number, board: any, turn:number){
        let whiteToMove: boolean = turn % 2 == 1
        let allyColor: string = whiteToMove ? "w" : "b"
        let moveList: Array<any> = []
        if(y-2 >=0 && x-2 >= 0){
            if(board[y-2][x-2][0] != allyColor ){//up + left
                moveList.push([y-2,x-2])
            }
        }
        if(y+2 <= 9 && x-2 >= 0){
            if(board[y+2][x-2][0] != allyColor){//down + left
                moveList.push([y+2,x-2])
            }
        }
        if(y-2 >=0 && x+2 <= 10){
            if(board[y-2][x+2][0] != allyColor){//up + right
                moveList.push([y-2,x+2])
            }
        }
        if(y+2 <= 9 && x+2 <= 10){
            if(board[y+2][x+2][0] != allyColor){//down + right
                moveList.push([y+2,x+2])
            }
        }
        return moveList
    }

    getWarEngineMoves(x: number, y: number, board: any, turn:number){
        let whiteToMove: boolean = turn % 2 == 1
        let allyColor: string = whiteToMove ? "w" : "b"
        let moveList: Array<any> = []
        if(y-2 >= 0){
            if(board[y-2][x][0] != allyColor){//up 
                moveList.push([y-2,x])
            }
        }
        if(y+2 <= 9){
            if(board[y+2][x][0] != allyColor){//down
                moveList.push([y+2,x])
            }
        }
        if(x-2 >= 0){
            if(board[y][x-2][0] != allyColor){//left
                moveList.push([y,x-2])
            }
        }
        if(x+2 <= 10){
            if(board[y][x+2][0] != allyColor){//right
                moveList.push([y,x+2])
            }
        }
        return moveList
    }

    getMongolMoves(x: number, y: number, board: any, turn:number){
        let whiteToMove: boolean = turn % 2 == 1
        let allyColor: string = whiteToMove ? "w" : "b"
        let moveList: Array<any> = []
        if(y-2 >= 0 && x+1 <= 10){
            if(board[y-2][x+1][0] !== allyColor){//up 
                moveList.push([y-2,x+1])
            }
        }
        if(y-2 >= 0 && x-1 >= 0){
            if(board[y-2][x-1][0] !== allyColor){//up 
                moveList.push([y-2,x-1])
            }
        }
        if(y+2 <= 9 && x+1 <= 10){
            if(board[y+2][x+1][0] !== allyColor){//down
                moveList.push([y+2,x+1])
            }
        }
        if(y+2 <= 9 && x-1 >= 0){
            if(board[y+2][x-1][0] !== allyColor){//down
                moveList.push([y+2,x-1])
            }
        }
        if( x-2 >= 0 && y-1 >= 0){
            if(board[y-1][x-2][0] !== allyColor){//left
                moveList.push([y-1,x-2])
            }
        }
        if( x-2 >= 0 && y+1<= 9){
            if(board[y+1][x-2][0] !== allyColor){//left
                moveList.push([y+1,x-2])
            }
        }
        if(x+2 <= 10 && y-1 >= 0){
            if(board[y-1][x+2][0] !== allyColor){//right
                moveList.push([y-1,x+2])
            }
        }
        if(x+2 <= 10 && y+1 <= 9){
            if(board[y+1][x+2][0] !== allyColor){//right
                moveList.push([y+1,x+2])
            }
        }
        return moveList
    }

    getCamelMoves(x: number, y: number, board: any, turn:number){
        let whiteToMove: boolean = turn % 2 == 1
        let allyColor: string = whiteToMove ? "w" : "b"
        let moveList: Array<any> = []
        if(y-3 >= 0 && x+1 <= 10){
            if(board[y-3][x+1][0] != allyColor){//up 
                moveList.push([y-3,x+1])
            }
        }
        if(y-3 >= 0 && x-1 >= 0){
            if(board[y-3][x-1][0] != allyColor){//up 
                moveList.push([y-3,x-1])
            }
        }
        if(y+3 <= 9 && x+1 <= 10){
            if(board[y+3][x+1][0] != allyColor){//down
                moveList.push([y+3,x+1])
            }
        }
        if(y+3 <= 9 && x-1 >= 0){
            if(board[y+3][x-1][0] != allyColor){//down
                moveList.push([y+3,x-1])
            }
        }
        if( x-3 >= 0 && y-1 >= 0){
            if(board[y-1][x-3][0] != allyColor){//left
                moveList.push([y-1,x-3])
            }
        }
        if( x-3 >= 0 && y+1<= 9){
            if(board[y+1][x-3][0] != allyColor){//left
                moveList.push([y+1,x-3])
            }
        }
        if(x+3 <= 10 && y-1 >= 0){
            if(board[y-1][x+3][0] != allyColor){//right
                moveList.push([y-1,x+3])
            }
        }
        if(x+3 <= 10 && y+1 <= 9){
            if(board[y+1][x+3][0] != allyColor){//right
                moveList.push([y+1,x+3])
            }
        }
        return moveList
    }

    getPicketMoves(x: number, y: number, board: any, turn:number){
        let whiteToMove: boolean = turn % 2 == 1
        let allyColor: string = whiteToMove ? "w" : "b"
        let enemyColor: string = whiteToMove ? "b" : "w"
        let moveList: Array<any> = []
        //up and to the right
        for(let i = 2; i <= 10; i++){
            if(board[y-1][x-1] !== "---"){
                break
            }
            if(y-i >= 0 && x-i >= 0){
                if(board[y-i][x-i][0] === allyColor){
                    break
                }
                if(board[y-i][x-i][0] === enemyColor){
                    moveList.push([y-i,x-i])
                    break
                }
                if(board[y-i][x-i] === "---"){
                    moveList.push([y-i,x-i])
                }
                else{
                    break
                }
            }
        }
        //up and to the right
        for(let i = 2; i <= 10; i++){
            if(board[y-1][x+1] !== "---"){
                break
            }
            if(y-i >= 0 && x+i <= 10){
                if(board[y-i][x+i][0] === allyColor){
                    break
                }
                if(board[y-i][x+i][0] === enemyColor){
                    moveList.push([y-i,x+i])
                    break
                }
                if(board[y-i][x+i] === "---"){
                    moveList.push([y-i,x+i])
                }
                else{
                    break
                }
            }
        }
        //down and to the right
        for(let i = 2; i <= 10; i++){
            if(board[y+1][x+1] !== "---"){
                break
            }
            if(y+i <= 9 && x+i <= 10){
                if(board[y+i][x+i][0] === allyColor){
                }
                if(board[y+i][x+i][0] === enemyColor){
                    moveList.push([y+i,x+i])
                    break
                }
                if(board[y+i][x+i] === "---"){
                    moveList.push([y+i,x+i])
                }
                else{
                    break
                }
            }
        }
        //down and to the left
        for(let i = 2; i <= 10; i++){
            if(board[y+1][x-1] !== "---"){
                break
            }
            if(y+i <= 9 && x-i >= 0){
                if(board[y+i][x-i][0] === allyColor){
                    break
                }
                if(board[y+i][x-i][0] === enemyColor){
                    moveList.push([y+i,x-i])
                    break
                }
                if(board[y+i][x-i] === "---"){
                    moveList.push([y+i,x-i])
                }
                else{
                    break
                }
            }
        }
        return moveList
    }

    getGiraffeMoves(x: number, y: number, board: any, turn:number){
        let moveList: Array<any> = []
        //tracking for spaces is very important because the giraffe will be blocked by other pieces
        //this is handled by a universal giraffe function
        
        moveList.push(...this.calculateGiraffePaths(y-1,x-1,(-1),(0),board, turn))
        moveList.push(...this.calculateGiraffePaths(y-1,x-1,(0),(-1),board, turn))
        moveList.push(...this.calculateGiraffePaths(y+1,x-1,(1),(0),board, turn))
        moveList.push(...this.calculateGiraffePaths(y+1,x-1,(0),(-1),board, turn))
        moveList.push(...this.calculateGiraffePaths(y-1,x+1,(-1),(0),board, turn))
        moveList.push(...this.calculateGiraffePaths(y-1,x+1,(0),(1),board, turn))
        moveList.push(...this.calculateGiraffePaths(y+1,x+1,(1),(0),board, turn))
        moveList.push(...this.calculateGiraffePaths(y+1,x+1,(0),(1),board, turn))
        return moveList
    }
        
    calculateGiraffePaths(startc:number,startr:number,cmod:number,rmod:number,board:any,turn:number){
        let whiteToMove: boolean = turn % 2 == 1
        let allyColor: string = whiteToMove ? "w" : "b"
        let enemyColor: string = whiteToMove ? "b" : "w"
        let moveList: Array<any> = []
        let newc = startc
        let newr = startr
        for(let i = 1; i <= 10; i++){
            if(newc >= 0 && newc <= 9 && newr >= 0 && newr <= 10){
                if(i < 3){
                    if(board[newc][newr][0] === allyColor || board[newc][newr][0] === enemyColor){
                        break
                    }
                }
                else if(newc >=0 && newc <= 9 && newr >= 0 && newr <= 10){
                    if(board[newc][newr] === "---"){
                        moveList.push([newc,newr])
                    }
                    if(board[newc][newr][0] === enemyColor){
                        moveList.push([newc,newr])
                        break 
                    }
                    if(board[newc][newr][0] === allyColor){
                        break
                    }
                } else {
                    break
                }
            
            newc=newc+cmod
            newr=newr+rmod
            }
        }
        return moveList
    }

    isKingInCheck(board:any, side:string, turn:number) {
        let kingLoc = this.findKing(board, side)
        let _turn; // declare _turn, will initialize it later

        // Determine the _turn based on the side of the king instead of the current turn
        if (side === 'w') {
            _turn = (turn % 2 === 0) ? turn : turn+1 ; // If white's king, make sure _turn is even
        } else {
            _turn = (turn % 2 === 1) ? turn : turn+1 ; // If black's king, make sure _turn is odd
        }

        if(kingLoc){
            return this.isUnderAttack(kingLoc[0], kingLoc[1], board, _turn)
        }
    }

    isUnderAttack(x: number, y: number, board:any, turn:number){
        //if checking while white's turn, the target must be a black piece
        //to target a white piece during white's turn, just increment the turn number by 1
        let moveList = this.getAllPossibleMoves(board, turn)
        for(let i = 0; i < moveList.length; i++) {
            if(moveList[i][0] == y && moveList[i][1] == x) {
                return true
            }
        }
        return false
    }
      
    findKing(board:any, side:string){
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board[i].length; j++){
                if(board[i][j][1] === "K"){
                    if(board[i][j][0] === "w" && side === "w"){
                        return([i,j])
                    }
                    if(board[i][j][0] === "b" && side === "b") {
                        return([i,j])
                    }
                }
            }
        }
    }

/**
def getKhanMoves(r,c,moves){
    global whiteToMove
    allyColor = "w" if whiteToMove else "b"
    _move = []
    if(c-1 >= 0){
        if(board[c-1][r][0] != allyColor){//up 
            _move = Move((c,r),(c-1,r),board)
            appendMoves(moves, _move)
    if( c+1 <= 9){
        if(board[c+1][r][0] != allyColor){//down
            _move = Move((c,r),(c+1,r),board)
            appendMoves(moves, _move)
    if( r-1 >= 0){
        if(board[c][r-1][0] != allyColor){//left
            _move = Move((c,r),(c,r-1),board)
            appendMoves(moves, _move)
    if(r+1 <= 10){
        if(board[c][r+1][0] != allyColor){//right
            _move = Move((c,r),(c,r+1),board)
            appendMoves(moves, _move)
    if(c-1 >=0 and r-1 >= 0){
        if(board[c-1][r-1][0] != allyColor ){//up + left
            _move = Move((c,r),(c-1,r-1),board)
            appendMoves(moves, _move)
    if(c+1 <= 9  and r-1 >= 0){
        if(board[c+1][r-1][0] != allyColor){//down + left
            _move = Move((c,r),(c+1,r-1),board)
            appendMoves(moves, _move)
    if(c-1 >= 0  and r+1 <= 10){
        if(board[c-1][r+1][0] != allyColor){//up + right
            _move = Move((c,r),(c-1,r+1),board)
            appendMoves(moves, _move)
    if(c+1 <= 9  and r+1 <= 10){
        if(board[c+1][r+1][0] != allyColor){//down + right
            _move = Move((c,r),(c+1,r+1),board)
            appendMoves(moves, _move)


def checkPromotion(){
    global whiteToMove, whiteRoyalty, blackRoyalty, pawnXB, pawnXW
    for i in range(len(board[0])){
        if board[0][i]== "wpR"{
            board[0][i] = "wRk"
        if board[0][i]== "wpA"{
            board[0][i] = "wAd"
        if board[0][i]== "wpV"{
            board[0][i] = "wVi"
        if board[0][i]== "wpG"{
            board[0][i] = "wGi"
        if board[0][i]== "wpM"{
            board[0][i] = "wMo"
        if board[0][i]== "wpT"{
            board[0][i] = "wTa"
        if board[0][i]== "wpE"{
            board[0][i] = "wEl"
        if board[0][i]== "wpW"{
            board[0][i] = "wWe"
        if board[0][i]== "wpC"{
            board[0][i] = "wCa"
        if board[0][i]== "wp0"{
            board[0][i] = "---"
            board[0][0] = "wpx"
            pawnXW = True
        if board[0][i]== "wp1"{
            board[0][i] = "wK0"
            whiteRoyalty += 1
        if board[0][i]== "wpK"{
            board[0][i] = "wK1"
            whiteRoyalty += 1
    for i in range(len(board[9])){
        if board[9][i]== "bpR"{
            board[9][i] = "bRk"
        if board[9][i]== "bpA"{
            board[9][i] = "bAd"
        if board[9][i]== "bpV"{
            board[9][i] = "bVi"
        if board[9][i]== "bpG"{
            board[9][i] = "bGi"
        if board[9][i]== "bpM"{
            board[9][i] = "bMo"
        if board[9][i]== "bpT"{
            board[9][i] = "bTa"
        if board[9][i]== "bpE"{
            board[9][i] = "bEl"
        if board[9][i]== "bpW"{
            board[9][i] = "bWe"
        if board[9][i]== "bpC"{
            board[9][i] = "bCa"
        if board[9][i]== "bp0"{
            board[9][i] = "---"
            board[9][10] = "bpx"
            pawnXB = True
        if board[9][i]== "bp1"{
            board[9][i] = "bK0"
            blackRoyalty += 1
        if board[9][i]== "bpK"{
            board[9][i] = "bK1"
            blackRoyalty += 1

def checkPawnForks(){
    global whiteToMove, pawnXW, pawnXB
    running = True
    if whiteToMove{
        for c in range(len(board)) {
            for r in range((len(board[c]))){
                if r+2 <= 10 and board[c][r][0] == "b" and board[c][r+2][0] == "b" and board[0][0] == "wpx" and running{ 
                    if(c+1 <= 9 and board[c+1][r+1][1] != "K"){
                        board[0][0] = "---"
                        board[c+1][r+1] = "wp1"
                        running = False
    else{
        for c in range(len(board)){
            for r in range((len(board[c]))){
                if r+2 <= 10 and board[c][r][0] == "w" and board[c][r+2][0] == "w" and board[9][10] == "bpx" and running{ 
                    if(c-1 > 0 and board[c-1][r+1][1] != "K"){
                        board[9][10] = "---"
                        board[c-1][r+1] = "bp1"
                        running = false

**/




}
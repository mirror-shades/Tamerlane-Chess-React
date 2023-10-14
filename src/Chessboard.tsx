import { useRef, useState } from 'react'
import './App.css'
import Tile from "./Tile"
import Logic from "./Logic"

interface Move {
  initialX: number
  initialY: number
  endX: number
  endY: number
  piece: string
  pieceTaken: string | undefined
}

let boardState: Array<Array<string>> = []
let moveLog:any = []
let moveList:any = []

const logic = new Logic()

function Chessboard() {
  const[init, setInit] = useState(false)
  const[turn, setTurn] = useState(1)
  const[update, setUpdate] = useState(0)
  const[activePiece, setActivePiece] : any = useState(undefined)
  const[endY, setEndY] : any = useState(undefined)
  const[endX, setendX] : any = useState(undefined)
  const[initialX, setInitialX] : any = useState(undefined)
  const[initialY, setInitialY] : any = useState(undefined)
  const chessboardRef = useRef<HTMLDivElement>(null)

  let board:Array<any> = []

  // function grabPiece(e: React.MouseEvent) {
  //   const chessboard = chessboardRef.current
  //   const element = e.target as HTMLElement;
  //   let whiteToMove: boolean = turn % 2 == 1
  //   //sets the initial coordinates which are used when changing boardState
  //   if(element.classList.contains("chess-piece") && chessboard) {
  //     const x = e.clientX - chessboard.offsetLeft
  //     const y = e.clientY - chessboard.offsetTop
  //     let _initialY: number|undefined = undefined
  //     let _initialX: number|undefined = undefined
  //     for(let i = 11; i >= 0; i--) {
  //       if(i*75 <= x && (i+1)*75>=x){
  //         _initialX = i
  //       }
  //     }
  //     for(let i = 10; i >= 0; i--) {
  //       if(i*75 <= y && (i+1)*75>=y){
  //         _initialY = i
  //       }
  //     }
  //     if(_initialX !== undefined && _initialY !== undefined){
  //       if((whiteToMove && boardState[_initialY][_initialX][0] == "w")||(!whiteToMove &&boardState[_initialY][_initialX][0] == "b")){
  //         initialX = _initialX
  //         initialY = _initialY
  //         let _moves: any = logic.getPossibleMoves(initialX,initialY,boardState[initialY][initialX],boardState,turn)
  //         moveList = _moves
  //         setUpdate(update+1)
  //         activePiece = element;
  //       }
  //     }
  //   }
  // }

  // function dragPiece(e: React.MouseEvent) {
  //   const chessboard = chessboardRef.current
  //   if(activePiece && chessboard){
  //     const minX = chessboard.offsetLeft -15
  //     const minY = chessboard.offsetTop -15
  //     const maxX = chessboard.offsetLeft + chessboard.clientWidth -60
  //     const maxY = chessboard.offsetTop + chessboard.clientHeight -60
  //     const x = e.clientX-35
  //     const y = e.clientY-35
  //     activePiece.style.position = "absolute"

  //     if(x<minX){
  //       activePiece.style.left = `${minX}px`
  //     }else if(x>maxX){
  //       activePiece.style.left = `${maxX}px`
  //     }else{
  //       activePiece.style.left = `${x}px`
  //     }      
      
  //     if(y<minY){
  //       activePiece.style.top = `${minY}px`
  //     }else if(y>maxY){
  //       activePiece.style.top = `${maxY}px`
  //     }else{
  //       activePiece.style.top = `${y}px`
  //     }
      
  //   }

  // }

  // function dropPiece(e: React.MouseEvent) {
  //   const chessboard = chessboardRef.current
  //   if(activePiece && chessboard) {
  //     const x = e.clientX - chessboard.offsetLeft
  //     const y = e.clientY - chessboard.offsetTop
  //     let xPos = undefined
  //     let yPos = undefined
  //     let xRaw = undefined
  //     let yRaw = undefined
  //     for(let i = 0; i < 11; i++) {
  //       if(i*75 <= x && (i+1)*75>=x){
  //         xRaw = i
  //         xPos = (i * 75)  + chessboard.offsetLeft
  //       }
  //     }
  //     for(let i = 0; i < 10; i++) {
  //       if(i*75 <= y && (i+1)*75>=y){
  //         yRaw = i
  //         yPos = (i * 75)  + chessboard.offsetTop
  //       }
  //     }
      
  //     if(yRaw != undefined && xRaw != undefined && yPos != undefined && xPos != undefined && initialX != undefined && initialY != undefined ){
  //       if([xRaw,yRaw]){
  //         activePiece.style.left = `${xPos}px`
  //         activePiece.style.top = `${yPos}px`
  //         let taken = undefined
  //         if(boardState[yRaw][xRaw] != "---"){
  //           taken = boardState[yRaw][xRaw]
  //         }
  //         let _piece = boardState[initialY][initialX]
  //         boardState[initialY][initialX] = "---"
  //         boardState[yRaw][xRaw] = _piece
  //         let _move: Move = {
  //           initialX: initialX,
  //           initialY: initialY,
  //           endX: xRaw,
  //           endY: yRaw,
  //           piece: _piece,
  //           pieceTaken: taken
  //         }
  //         moveLog.push(_move)
  //         setTurn(turn+1)
  //       }
  //     }
  //     //moveList=[]
  //     initialX = undefined
  //     initialY = undefined
  //     activePiece = undefined
  //   }
  // }

  function findSquare(e: React.MouseEvent) {
    const chessboard: any = chessboardRef.current
    const x = e.clientX - chessboard.offsetLeft
    const y = e.clientY - chessboard.offsetTop
    let xTrans: number = 0
    let yTrans: number = 0
    for(let i = 11; i >= 0; i--) {
      if(i*75 <= x && (i+1)*75>=x){
        xTrans = i
      }
    }
    for(let i = 10; i >= 0; i--) {
      if(i*75 <= y && (i+1)*75>=y){
        yTrans = i
      }
    }
    return([xTrans,yTrans])
  }


  function click(e: React.MouseEvent) {   
    if(initialX === undefined && initialY === undefined){
      click1(e)
    }
    else if(endX === undefined && endY === undefined){
      click2(e)
    }
    console.log(findSquare(e))
  }

  function click1(e: React.MouseEvent) {
    const chessboard = chessboardRef.current
    const element = e.target as HTMLElement;
    let whiteToMove: boolean = turn % 2 == 1
    //sets the initial coordinates which are used when changing boardState
    if(element.classList.contains("chess-piece") && chessboard) {
      const x = e.clientX - chessboard.offsetLeft
      const y = e.clientY - chessboard.offsetTop
      let init = findSquare(e)
      let _initialY: number = init[1]
      let _initialX: number = init[0]
      for(let i = 11; i >= 0; i--) {
        if(i*75 <= x && (i+1)*75>=x){
          _initialX = i
        }
      }
      for(let i = 10; i >= 0; i--) {
        if(i*75 <= y && (i+1)*75>=y){
          _initialY = i
        }
      }
      if(_initialX !== undefined && _initialY !== undefined){
        if((whiteToMove && boardState[_initialY][_initialX][0] == "w")||(!whiteToMove &&boardState[_initialY][_initialX][0] == "b")){
          setInitialX(_initialX)
          setInitialY(_initialY)
          let _moves: any = logic.getValidMovesForPiece(_initialX,_initialY,boardState,turn,boardState[_initialY][_initialX])
          moveList = _moves
          console.log(logic.getValidMovesForPiece(_initialX,_initialY,boardState,turn,boardState[_initialY][_initialX]))
          setUpdate(update+1)
          setActivePiece(element);
        }
      }
    }
  }

  function click2(e: React.MouseEvent) {
    const chessboard = chessboardRef.current
    if(activePiece && chessboard) {
      const x = e.clientX - chessboard.offsetLeft
      const y = e.clientY - chessboard.offsetTop
      let xPos = undefined
      let yPos = undefined
      let xRaw = undefined
      let yRaw = undefined
      for(let i = 0; i < 11; i++) {
        if(i*75 <= x && (i+1)*75>=x){
          xRaw = i
          xPos = (i * 75)  + chessboard.offsetLeft
        }
      }
      for(let i = 0; i < 10; i++) {
        if(i*75 <= y && (i+1)*75>=y){
          yRaw = i
          yPos = (i * 75)  + chessboard.offsetTop
        }
      }
      
      if(yRaw != undefined && xRaw != undefined && yPos != undefined && xPos != undefined && initialX != undefined && initialY != undefined ){
        if(verifyMove([yRaw,xRaw])){
          activePiece.style.left = `${xPos}px`
          activePiece.style.top = `${yPos}px`
          let taken = undefined
          if(boardState[yRaw][xRaw] != "---"){
            taken = boardState[yRaw][xRaw]
          }
          let _piece = boardState[initialY][initialX]
          boardState[initialY][initialX] = "---"
          boardState[yRaw][xRaw] = _piece
          let _move: Move = {
            initialX: initialX,
            initialY: initialY,
            endX: xRaw,
            endY: yRaw,
            piece: _piece,
            pieceTaken: taken
          }
          moveLog.push(_move)
          setTurn(turn+1)
        }
      }
      moveList=[]
      setInitialX(undefined)
      setInitialY(undefined)
      setActivePiece(undefined)
    }
  }

  function verifyMove(move: Array<number>) {
    for(let i = 0; i < moveList.length; i++){
      if(moveList[i][0] === move[0] && moveList[i][1] === move[1]){
        return(true)
      }
    }
    return(false)
  }

  function drawBoard(moveList: Array<any>) {
    board = []
    for(let v = 0; v < 10; v++){
      for(let h = 0; h < 11; h++){
        let imagePath = undefined      
        let coordSum = v+h;
        let highlight = false
        if(boardState[v][h] != "---"){
          imagePath = `assets/images/${boardState[v][h]}.png`
        }
        for(let move = 0; move < moveList.length; move++){
          if(moveList[move][0] === v && moveList[move][1] === h) {
            highlight=true
          }
        }
        board.push(<Tile key={`${v},${h}`} number={coordSum} image={imagePath} highlight={highlight}/>)
      }
    }
  }

  if(init == false) {
    boardState = logic.masculineArray
    setInit(true)
  }

  drawBoard(moveList)
  
/*onMouseUp={e => dropPiece(e)} */
/*onMouseMove={e => movePiece(e)} */
  return (
          <div 
          onMouseDown={e => click(e)} 
          id="chessboard"
          ref={chessboardRef}>
            {board}
          </div>
  )
}
export default Chessboard

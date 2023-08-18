import { useRef, useState } from 'react'
import './App.css'
import Tile from "./Tile"
import Logic from "./Logic"

interface Move {
  initialX: number
  initialY: number
  endX: number
  endY: number
  piece: String
  pieceTaken: String | null
}

let boardState: Array<Array<String>> = []
let moveList:any = []

const logic = new Logic()

function Chessboard() {
  const[init, setInit] = useState(false)
  const[turns, setTurns] = useState(0)
  const chessboardRef = useRef<HTMLDivElement>(null)

  let board:Array<any> = []

  let activePiece: HTMLElement | null = null    
  let initialX: number|null = null
  let initialY: number|null = null

  function grabPiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current
    const element = e.target as HTMLElement;
    //sets the initial coordinates which are used when changing boardState
    if(element.classList.contains("chess-piece") && chessboard) {
      const x = e.clientX - chessboard.offsetLeft
      const y = e.clientY - chessboard.offsetTop
      for(let i = 11; i >= 0; i--) {
        if(i*75 <= x && (i+1)*75>=x){
          initialX = i
        }
      }
      for(let i = 10; i >= 0; i--) {
        if(i*75 <= y && (i+1)*75>=y){
          initialY = i
        }
      }
      activePiece = element;
    }
  }

  function movePiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current
    if(activePiece && chessboard){
      const minX = chessboard.offsetLeft -15
      const minY = chessboard.offsetTop -15
      const maxX = chessboard.offsetLeft + chessboard.clientWidth -60
      const maxY = chessboard.offsetTop + chessboard.clientHeight -60
      const x = e.clientX-35
      const y = e.clientY-35
      activePiece.style.position = "absolute"

      if(x<minX){
        activePiece.style.left = `${minX}px`
      }else if(x>maxX){
        activePiece.style.left = `${maxX}px`
      }else{
        activePiece.style.left = `${x}px`
      }      
      
      if(y<minY){
        activePiece.style.top = `${minY}px`
      }else if(y>maxY){
        activePiece.style.top = `${maxY}px`
      }else{
        activePiece.style.top = `${y}px`
      }
      
    }

  }

  function dropPiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current
    if(activePiece && chessboard) {
      const x = e.clientX - chessboard.offsetLeft
      const y = e.clientY - chessboard.offsetTop
      let xPos = null
      let yPos = null
      let xRaw = null
      let yRaw = null
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
        let isValid = logic.isMoveValid(xPos,yPos,xPos,yPos,"wpK")
        if(isValid){
          activePiece.style.left = `${xPos}px`
          activePiece.style.top = `${yPos}px`
          let taken = null
          if(boardState[yRaw][xRaw] != "---"){
            taken = boardState[yRaw][xRaw]
          }
          let _piece = boardState[initialY][initialX]
          boardState[initialY][initialX] = "---"
          boardState[yRaw][xRaw] = _piece
          drawBoard()
          let _move: Move = {
            initialX: initialX,
            initialY: initialY,
            endX: xRaw,
            endY: yRaw,
            piece: _piece,
            pieceTaken: taken
          }
          moveList.push(_move)
          setTurns(turns+1)
        }
      }
      drawBoard()
      initialX = null
      initialY = null
      activePiece = null
    }
  }

  function drawBoard() {
    board = []
    for(let v = 0; v < 10; v++){
      for(let h = 0; h < 11; h++){
        let imagePath = undefined      
        let coordSum = v+h;
        if(boardState[v][h] != "---"){
          imagePath = `assets/images/${boardState[v][h]}.png`
        }
        board.push(<Tile key={`${v},${h}`} number={coordSum} image={imagePath}/>)
      }
    }
  }

  if(init == false) {
    boardState = logic.masculineArray
    setInit(true)
  }


  drawBoard()
  return (
          <div 
          onMouseUp={e => dropPiece(e)} 
          onMouseMove={e => movePiece(e)} 
          onMouseDown={e => grabPiece(e)} 
          id="chessboard"
          ref={chessboardRef}>
            {board}
          </div>
  )
}
export default Chessboard

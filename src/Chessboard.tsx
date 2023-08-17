import { useRef, useState } from 'react'
import './App.css'
import Tile from "./Tile"
import Logic from "./Logic"

const vAxis = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] 
const hAxis = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"] 

interface Piece {
  type: string
  image: string
  x: number
  y: number
}

let pieceList = ["bKa", "wKa", "bK0", "wK0", "bK1", "wK1", "bAd", "wAd", "bVi", "wVi", "bGi", "wGi", "bTa", "wTa", "bMo", "wMo", "bRk", "wRk", "bEl", "wEl", "bCa", "wCa", "bWe", "wWe",
"wp0","wp1","wpx", "wpK", "wpA", "wpV", "wpG", "wpT", "wpM", "wpR", "wpE", "wpC", "wpW", "bp0","bp1","bpx", "bpK", "bpA", "bpV", "bpG", "bpT", "bpM", "bpR", "bpE", "bpC", "bpW"]

const pieces: Piece[] = []

const logic = new Logic()

const setupMasculineArray = () => {
  //white pawns
  pieces.push({type: "wpx", image: "assets/images/wpx.png", x:2,y:0})
  pieces.push({type: "wpW", image: "assets/images/wpW.png", x:2,y:1})
  pieces.push({type: "wpC", image: "assets/images/wpC.png", x:2,y:2})
  pieces.push({type: "wpE", image: "assets/images/wpE.png", x:2,y:3})
  pieces.push({type: "wpA", image: "assets/images/wpA.png", x:2,y:4})
  pieces.push({type: "wpK", image: "assets/images/wpK.png", x:2,y:5})
  pieces.push({type: "wpV", image: "assets/images/wpV.png", x:2,y:6})
  pieces.push({type: "wpG", image: "assets/images/wpG.png", x:2,y:7})
  pieces.push({type: "wpT", image: "assets/images/wpT.png", x:2,y:8})
  pieces.push({type: "wpM", image: "assets/images/wpM.png", x:2,y:9})
  pieces.push({type: "wpR", image: "assets/images/wpR.png", x:2,y:10})
  //white pieces
  pieces.push({type: "wRk", image: "assets/images/wRk.png", x:1,y:0})
  pieces.push({type: "wMo", image: "assets/images/wMo.png", x:1,y:1})
  pieces.push({type: "wTa", image: "assets/images/wTa.png", x:1,y:2})
  pieces.push({type: "wGi", image: "assets/images/wGi.png", x:1,y:3})
  pieces.push({type: "wAd", image: "assets/images/wAd.png", x:1,y:4})
  pieces.push({type: "wKa", image: "assets/images/wKa.png", x:1,y:5})
  pieces.push({type: "wVi", image: "assets/images/wVi.png", x:1,y:6})
  pieces.push({type: "wGi", image: "assets/images/wGi.png", x:1,y:7})
  pieces.push({type: "wTa", image: "assets/images/wTa.png", x:1,y:8})
  pieces.push({type: "wMo", image: "assets/images/wMo.png", x:1,y:9})
  pieces.push({type: "wRk", image: "assets/images/wRk.png", x:1,y:10})

  pieces.push({type: "wEl", image: "assets/images/wEl.png", x:0,y:0})
  pieces.push({type: "wCa", image: "assets/images/wCa.png", x:0,y:2})
  pieces.push({type: "wWe", image: "assets/images/wWe.png", x:0,y:4})
  pieces.push({type: "wWe", image: "assets/images/wWe.png", x:0,y:6})
  pieces.push({type: "wCa", image: "assets/images/wCa.png", x:0,y:8})
  pieces.push({type: "wEl", image: "assets/images/wEl.png", x:0,y:10})

  //black pawns
  pieces.push({type: "bpx", image: "assets/images/bpx.png", x:7,y:0})
  pieces.push({type: "bpW", image: "assets/images/bpW.png", x:7,y:1})
  pieces.push({type: "bpC", image: "assets/images/bpC.png", x:7,y:2})
  pieces.push({type: "bpE", image: "assets/images/bpE.png", x:7,y:3})
  pieces.push({type: "bpA", image: "assets/images/bpA.png", x:7,y:4})
  pieces.push({type: "bpK", image: "assets/images/bpK.png", x:7,y:5})
  pieces.push({type: "bpV", image: "assets/images/bpV.png", x:7,y:6})
  pieces.push({type: "bpG", image: "assets/images/bpG.png", x:7,y:7})
  pieces.push({type: "bpT", image: "assets/images/bpT.png", x:7,y:8})
  pieces.push({type: "bpM", image: "assets/images/bpM.png", x:7,y:9})
  pieces.push({type: "bpR", image: "assets/images/bpR.png", x:7,y:10})
  //black pieces
  pieces.push({type: "bRk", image: "assets/images/bRk.png", x:8,y:0})
  pieces.push({type: "bMo", image: "assets/images/bMo.png", x:8,y:1})
  pieces.push({type: "bTa", image: "assets/images/bTa.png", x:8,y:2})
  pieces.push({type: "bGi", image: "assets/images/bGi.png", x:8,y:3})
  pieces.push({type: "bAd", image: "assets/images/bAd.png", x:8,y:4})
  pieces.push({type: "bKa", image: "assets/images/bKa.png", x:8,y:5})
  pieces.push({type: "bVi", image: "assets/images/bVi.png", x:8,y:6})
  pieces.push({type: "bGi", image: "assets/images/bGi.png", x:8,y:7})
  pieces.push({type: "bTa", image: "assets/images/bTa.png", x:8,y:8})
  pieces.push({type: "bMo", image: "assets/images/bMo.png", x:8,y:9})
  pieces.push({type: "bRk", image: "assets/images/bRk.png", x:8,y:10})

  pieces.push({type: "bEl", image: "assets/images/bEl.png", x:9,y:0})
  pieces.push({type: "bCa", image: "assets/images/bCa.png", x:9,y:2})
  pieces.push({type: "bWe", image: "assets/images/bWe.png", x:9,y:4})
  pieces.push({type: "bWe", image: "assets/images/bWe.png", x:9,y:6})
  pieces.push({type: "bCa", image: "assets/images/bCa.png", x:9,y:8})
  pieces.push({type: "bEl", image: "assets/images/bEl.png", x:9,y:10})
}

setupMasculineArray()

function Chessboard() {
  //const[pieces, setPieces] = useState<Piece[]>()
  const chessboardRef = useRef<HTMLDivElement>(null)

  let activePiece: HTMLElement | null = null

  function grabPiece(e: React.MouseEvent) {
    const element = e.target as HTMLElement;
    if(element.classList.contains("chess-piece")) {
      const x = e.clientX-35
      const y = e.clientY-35
      element.style.position = "absolute"
      element.style.left = `${x}px`
      element.style.top = `${y}px`

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
      for(let i = 11; i >= 0; i--) {
        if(i*75 <= x && (i+1)*75>=x){
          xRaw = i
          xPos = (i * 75)  + chessboard.offsetLeft
        }
      }
      for(let i = 10; i >= 0; i--) {
        if(i*75 <= y && (i+1)*75>=y){
          yRaw = i
          yPos = (i * 75)  + chessboard.offsetTop
        }
      }
      console.log(xPos,yPos)
      if(yPos && xPos && yRaw && xRaw){
        findPiece(xRaw,yRaw)
        let isValid = logic.isMoveValid(xPos,yPos,xPos,yPos,"wpK")
        if(isValid){
          activePiece.style.left = `${xPos}px`
          activePiece.style.top = `${yPos}px`
        }
      }
      activePiece = null
    }
  }

  function findPiece(y: number,x: number) {
    pieces.forEach(p => {
      if(p.x == x && p.y == y){
        console.log(p.type)
      }
    })
  }

  let board = []
  for(let v = vAxis.length-1; v >= 0; v--){
    for(let h = 0; h < hAxis.length; h++){
      let coordSum = v+h;
      let piecePath = undefined
      pieces.forEach(p => {
        if(p.x===v && p.y===h){
          piecePath = p.image
        }
      })
      board.push(<Tile key={`${v},${h}`} number={coordSum} image={piecePath}/>)
    }
  }
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

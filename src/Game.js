import React, {useState, useEffect} from 'react';

function makeBoard(n){
  return Array(n*n).fill(null);
}

function SVGX(){ return (
  <svg viewBox="0 0 100 100" aria-hidden><line x1="15" y1="15" x2="85" y2="85" stroke="black" strokeWidth="12" strokeLinecap="round"/><line x1="85" y1="15" x2="15" y2="85" stroke="black" strokeWidth="12" strokeLinecap="round"/></svg>
)}
function SVGO(){ return (
  <svg viewBox="0 0 100 100" aria-hidden><circle cx="50" cy="50" r="32" stroke="black" strokeWidth="12" fill="none"/></svg>
)}

export default function Game({onShowEaster}){
  const [size, setSize] = useState(3);
  const [board, setBoard] = useState(makeBoard(3));
  const [xIsNext, setXIsNext] = useState(true);
  const [useImages, setUseImages] = useState(true);
  const [winner, setWinner] = useState(null);

  useEffect(()=>{ resetBoard(size); }, [size]);

  function resetBoard(n){
    setBoard(makeBoard(n));
    setWinner(null);
    setXIsNext(true);
  }

  function handleClick(i){
    if(winner) return;
    if(board[i]) return;
    const boardCopy = board.slice();
    boardCopy[i] = xIsNext ? 'X' : 'O';
    setBoard(boardCopy);
    setXIsNext(!xIsNext);
    const win = calculateWinner(boardCopy, size);
    if(win) setWinner(win);
  }

  function renderSquare(i){
    const val = board[i];
    return (
      <button className="square" onClick={()=>handleClick(i)} key={i} aria-label={`square-${i}`}>
        {val ? (useImages ? (val==='X' ? <SVGX/> : <SVGO/>) : val) : null}
      </button>
    );
  }

  function toggleImages(){ setUseImages(!useImages); }

  function statusText(){
    if(winner){
      return winner === 'Draw' ? 'Empate' : `Ganador: ${winner}`;
    }
    return `Siguiente: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div>
      <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:10}}>
        <div className="select" style={{padding:6}}>
          Tablero:
          <select value={size} onChange={e=>setSize(Number(e.target.value))} style={{marginLeft:8}} className="select">
            {[3,4,5,6].map(n=> <option key={n} value={n}>{n}x{n}</option>)}
          </select>
        </div>
        <button className="btn" onClick={()=>resetBoard(size)}>Reiniciar</button>
        <button className="btn" onClick={toggleImages}>{useImages ? 'Usar letras' : 'Usar imágenes'}</button>
        <button className="btn btn-red" onClick={()=>{ if(onShowEaster) onShowEaster(); }}>Sorpresa</button>
      </div>

      <div className="info">{statusText()}</div>

      <div className="board" style={{
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        maxWidth: size * 86 + 'px'
      }}>
        {board.map((_,i)=> renderSquare(i))}
      </div>
    </div>
  )
}

function calculateWinner(board, n){
  for(let r=0;r<n;r++){
    const first = board[r*n];
    if(!first) continue;
    let ok = true;
    for(let c=1;c<n;c++){
      if(board[r*n + c] !== first){ ok = false; break; }
    }
    if(ok) return first;
  }
  for(let c=0;c<n;c++){
    const first = board[c];
    if(!first) continue;
    let ok = true;
    for(let r=1;r<n;r++){
      if(board[r*n + c] !== first){ ok = false; break; }
    }
    if(ok) return first;
  }
  const first = board[0];
  if(first){
    let ok = true;
    for(let k=1;k<n;k++){
      if(board[k*(n+1)] !== first){ ok=false; break; }
    }
    if(ok) return first;
  }
  const first2 = board[n-1];
  if(first2){
    let ok = true;
    for(let k=1;k<n;k++){
      if(board[k*(n-1)] !== first2){ ok=false; break; }
    }
    if(ok) return first2;
  }
  if(board.every(Boolean)) return 'Draw';
  return null;
}

import React, {useState, useEffect, useRef} from 'react';
import Game from './Game';

export default function App() {
  const [showEaster, setShowEaster] = useState(false);
  const clickRef = useRef(0);
  useEffect(()=>{
    let timer;
    function onKey(e) {
      if(e.key.toLowerCase()==='k') {
        clickRef.current++;
        if(clickRef.current>=5) setShowEaster(true);
        clearTimeout(timer);
        timer = setTimeout(()=>clickRef.current=0,1200);
      }
    }
    window.addEventListener('keydown', onKey);
    return ()=> window.removeEventListener('keydown', onKey);
  },[]);

  return (
    <div className="app">
      <div className="container">
        <div className="panel" style={{minWidth:320}}>
          <div className="header">
            <div className="logo" id="logo" title="click 7 veces para sorpresa" onClick={()=>{
              clickRef.current++;
              if(clickRef.current>=7) setShowEaster(true);
              setTimeout(()=> clickRef.current=0, 1500);
            }}>
              <h3>T3</h3>
            </div>
            <div style={{flex:1}}>
              <h2 style={{margin:'0 0 4px 0'}}>Tic-Tac-Toe — Kevin</h2>
              <div className="small">Aprende React — variante mejorada</div>
            </div>
          </div>

          <Game onShowEaster={()=>setShowEaster(true)} />
          <div style={{marginTop:12}} className="footer">Tema: blanco · negro · rojo</div>
        </div>

        <div className="panel" style={{width:300}}>
          <div style={{fontWeight:700, marginBottom:8}}>Instrucciones rápidas</div>
          <div className="small">Elige tamaño del tablero, alterna imágenes para X/O y prueba el easter egg.</div>
          <div style={{height:18}} />
          <div style={{fontSize:13,color:'#333'}}>Despliegue:</div>
          <ol style={{margin:'6px 0 0 18px',padding:0}}>
            <li className="small">Configurar `homepage` en package.json</li>
            <li className="small">`npm install`</li>
            <li className="small">`npm run deploy`</li>
          </ol>
        </div>
      </div>

      <div className={showEaster? 'easter show-easter':'easter'} role="dialog" aria-hidden={!showEaster}>
        <div style={{fontWeight:800}}>Tarjeta del alumno</div>
        <div style={{marginTop:6}}>Nombre: <strong>Kevin Javier Ruiz Tillit</strong></div>
        <div>Matricula: <strong>64134</strong></div>
        <div style={{marginTop:8,fontSize:13}}><button className="btn" onClick={()=>setShowEaster(false)}>Cerrar</button></div>
      </div>
    </div>
  );
}

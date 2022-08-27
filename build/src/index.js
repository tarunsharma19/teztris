import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log("func call");
  const script = document.createElement("script");

  script.src = "assets/main.js";
  script.async = true;

  document.body.appendChild(script);
root.render(
  <>
  <div id="container">
        <div className="info"></div>
        <canvas id="tetris" width="240" height="400"></canvas>
        <canvas id="tetris-next" width="108" height="380"></canvas>
      </div>
      <div className="game-over">
        <button>Play again?</button>
      </div>
      <div className="help">
        <div className="help-inner">
          <p className="bold">Controls</p>
          <p>Move: arrow keys</p>
          <p>Rotate: up arrow or a or s keys</p>
          <p>Hard Drop: Space</p>
        </div>
      </div>
      <button className="help-show">?</button>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

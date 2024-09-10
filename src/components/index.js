import { useEffect, useRef } from 'react';
import DinoGame from './game/DinoGame'; 

const DinoGameComponent = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Ajustar resolución para pantallas de alta densidad de píxeles (Retina, etc.)
    const scale = window.devicePixelRatio || 1;
    canvas.width = Math.floor(window.innerWidth * scale);
    canvas.height = Math.floor(window.innerHeight * 0.8 * scale);
    ctx.scale(scale, scale);

    // Inicializa el juego usando el canvas ya existente
    const game = new DinoGame(canvas, window.innerWidth, window.innerHeight * 0.8);
    game.start().catch(console.error);

    const keycodes = {
      JUMP: { 38: 1, 32: 1 },
      DUCK: { 40: 1 },
    };

    const handleKeyDown = (event) => {
      if (keycodes.JUMP[event.keyCode]) {
        game.onInput('jump');
      } else if (keycodes.DUCK[event.keyCode]) {
        game.onInput('duck');
      }
    };

    const handleKeyUp = (event) => {
      if (keycodes.DUCK[event.keyCode]) {
        game.onInput('stop-duck');
      }
    };

    // Añadir los event listeners de acuerdo al tipo de dispositivo
    window.addEventListener('keydown', handleKeyDown); // Escuchar eventos de teclado en 'window'
    window.addEventListener('keyup', handleKeyUp);

    // Cleanup cuando el componente se desmonte
    return () => {
      window.removeEventListener('keydown', handleKeyDown); // Remover eventos de teclado en 'window'
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '80%' }} />
    </div>
  );
};

export default DinoGameComponent;

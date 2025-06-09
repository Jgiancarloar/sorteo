// App.jsx
import React, { useState } from 'react';
import Card from './components/Card';

const App = () => {
  const premios = [
    { id: 1, name: '100', color: 'bg-yellow-400' },
    { id: 2, name: '50', color: 'bg-blue-400' },
    { id: 3, name: '50', color: 'bg-blue-400' },
    { id: 4, name: '20', color: 'bg-green-400' },
    { id: 5, name: '20', color: 'bg-green-400' },
    { id: 6, name: '10', color: 'bg-red-400' },
    { id: 7, name: '10', color: 'bg-red-400' },
  ];

  const generateInitialPlayers = () => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      name: 'Libre',
      hits: 0,
      prize: null,
      colorChoice: null, // <-- nuevo: para almacenar el color personalizado
    }));
  };

  const [playerProgress, setPlayerProgress] = useState(generateInitialPlayers());
  const [prizeIndex, setPrizeIndex] = useState(0);
  const [lastNumber, setLastNumber] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [selectedColor, setSelectedColor] = useState(null); // color elegido en el modal

  const handleClick = () => {
    let count = 0;
    const interval = setInterval(() => {
      const randomTemp = Math.floor(Math.random() * 15) + 1;
      setLastNumber(randomTemp);
      count++;

      if (count >= 15) {
        clearInterval(interval);
        const finalNumber = Math.floor(Math.random() * 15) + 1;
        setLastNumber(finalNumber);

        const updatedPlayers = [...playerProgress];
        let newPrizeIndex = prizeIndex;

        const playerIndex = updatedPlayers.findIndex(p => p.id === finalNumber);

        if (playerIndex !== -1) {
          const player = updatedPlayers[playerIndex];

          if (player.hits < 5) {
            const newHits = player.hits + 1;
            let assignedPrize = player.prize;

            if (newHits === 5 && !player.prize && newPrizeIndex < premios.length) {
              assignedPrize = premios[newPrizeIndex];
              newPrizeIndex++;
            }

            updatedPlayers[playerIndex] = {
              ...player,
              hits: newHits,
              prize: assignedPrize
            };
          }
        }

        setPlayerProgress(updatedPlayers);
        setPrizeIndex(newPrizeIndex);
      }
    }, 25);
  };

  const handleReset = () => {
    setPlayerProgress(generateInitialPlayers());
    setPrizeIndex(0);
    setLastNumber(null);
  };

  const handleCardClick = (player) => {
    setSelectedPlayer(player);
    setEditedName(player.name);
    setSelectedColor(player.colorChoice || null); // cargar color actual en modal
  };

  const handleSaveName = () => {
    setPlayerProgress(prev =>
      prev.map(p =>
        p.id === selectedPlayer.id
          ? { ...p, name: editedName, colorChoice: selectedColor }
          : p
      )
    );
    setSelectedPlayer(null);
    setSelectedColor(null);
  };

  // Función para cambiar color seleccionado en modal
  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className='bg-slate-800 min-h-screen text-gray-100 px-4 py-10 flex flex-col items-center w-full'>
      <h1 className='font-black text-2xl uppercase'>Goleas con "20so"</h1>
      <h2 className='mb-2'>PERÚ VS ECUADOR</h2>

      <div className='mb-2 flex justify-around w-full'>
        {premios.map(premio => (
          <div
            key={premio.id}
            className={`border px-2 font-bold py-2 text-xs rounded-lg ${premio.color}`}
          >
            +{premio.name}
          </div>
        ))}
      </div>

      <p className='mb-2 font-semibold text-xl'>#N36#502#580</p>

      <div className='gap-3 grid grid-cols-3 w-full mb-5'>
        {playerProgress.map(player => (
          <Card
            key={player.id}
            player={player}
            onClick={() => handleCardClick(player)}
          />
        ))}
      </div>

      <div className='flex flex-col items-center gap-4'>
        <button
          onClick={handleClick}
          className='bg-gray-100 text-slate-800 h-20 w-20 rounded-full flex items-center justify-center font-bold text-3xl shadow-lg'
        >
          {lastNumber || '🎯'}
        </button>

        <button
          onClick={handleReset}
          className='bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow'
        >
          Reiniciar
        </button>
      </div>

      {/* Modal */}
      {selectedPlayer && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className='bg-white text-slate-800 p-6 rounded-lg w-72 shadow-xl flex flex-col gap-4'>
            <h2 className='font-bold text-lg'>Editar Nombre</h2>
            <input
              className='border rounded px-2 py-1'
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />

            {/* Botones de color */}
            <div className='flex gap-4 mt-4'>
              {/* Botón blanco */}
              <button
                onClick={() => handleColorSelect('white')}
                className={`w-8 h-8 border rounded ${selectedColor === 'white' ? 'border-gray-800' : 'border-gray-300'}`}
              >
                {/* Cuadrado blanco */}
              </button>

              {/* Botón morado */}
              <button
                onClick={() => handleColorSelect('purple')}
                className={`w-8 h-8 border rounded ${selectedColor === 'purple' ? 'border-gray-800' : 'border-gray-300'} bg-purple-600`}
              >
                {/* Cuadrado morado */}
              </button>
            </div>

            <div className='flex justify-end gap-2 mt-6'>
              <button
                onClick={() => setSelectedPlayer(null)}
                className='text-sm px-3 py-1 rounded bg-gray-300 hover:bg-gray-400'
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveName}
                className='text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700'
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

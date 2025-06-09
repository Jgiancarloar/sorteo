// components/Card.jsx
import React from 'react';
import { Circle } from 'lucide-react';

const prizeColors = {
  '100': 'bg-yellow-300',
  '50': 'bg-blue-300',
  '20': 'bg-green-300',
  '10': 'bg-pink-300',
};

const Card = ({ player, onClick }) => {
  const colorClass = player.prize ? prizeColors[player.prize.name] : 'bg-gray-300';

  // Solo cambiar borde según elección; texto siempre slate-800
  const borderColor = player.colorChoice === 'purple' ? 'border-purple-600' : player.colorChoice === 'white' ? 'border-slate-800' : 'border-transparent';

  return (
    <div
      className={`${colorClass} flex flex-col gap-1 p-2 rounded-lg cursor-pointer border-2 ${borderColor} text-slate-800`}
      onClick={onClick}
    >
      <div className='flex items-center gap-1'>
        <p className='text-sm font-semibold'>{player.id}</p>
        <p className='text-xs truncate w-full text-left'>{player.name}</p>
      </div>
      <div className='flex gap-2'>
        {[...Array(5)].map((_, i) => (
          <Circle key={i} size={12} fill={i < player.hits ? 'green' : 'transparent'} />
        ))}
      </div>
    </div>
  );
};

export default Card;

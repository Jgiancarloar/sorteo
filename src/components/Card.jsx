import React from 'react';
import { Shield, Sparkle, Star, Coins, Gift } from 'lucide-react';

const Card = ({ data, setOpenModal, setSelectedCard }) => {
  const { id, nombre, pago, estrellas, premio } = data;

  return (
    <button
      className="border-6 border-blue-100 cursor-pointer relative"
      onClick={() => {
        setSelectedCard(data);
        setOpenModal(true);
      }}
    >
      <div className="border-[3px] border-blue-950/80">
        <div className={`${pago ? 'bg-yellow-400/50' : 'bg-blue-950/80'} flex h-12 justify-center relative w-full`}>
          {/* ⭐ Estrellas */}
          <div className='absolute flex flex-col z-10 left-0 px-1'>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={9}
                className={i < estrellas ? 'fill-yellow-500 text-transparent' : 'text-transparent'}
              />
            ))}
          </div>

          {/* 🛡 Número */}
          <div className="h-9 text-blue-200 relative w-9">
            <Shield className='fill-blue-900 h-full w-full' strokeWidth={1} />
            <span className='absolute inset-0 z-10 flex items-center justify-center font-pirataone text-white text-lg'>
              {id}
            </span>
          </div>
        </div>
      </div>

      {/* ✨ o 💰 según pago */}
      {pago ? (
        <>
          <Coins className='absolute left-1/6 rotate-45 text-yellow-500 top-1/2 -translate-y-1/2' size={14} strokeWidth={2} />
          <Coins className='absolute right-1/6 rotate-45 text-yellow-500 top-1/2 -translate-y-1/2' size={14} strokeWidth={2} />
        </>
      ) : (
        <>
          <Sparkle className='absolute fill-blue-200 left-1/6 rotate-45 text-blue-200 top-1/2 -translate-y-1/2' size={10} strokeWidth={2} />
          <Sparkle className='absolute fill-blue-200 right-1/6 rotate-45 text-blue-200 top-1/2 -translate-y-1/2' size={10} strokeWidth={2} />
        </>
      )}

      {/* 🎁 Premio si tiene */}
      {premio !== null && (
        <Gift
        className={`absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 -rotate-45 z-30 ${
          premio >= 100
            ? 'text-yellow-500'
            : premio >= 50
            ? 'text-red-500'
            : premio >= 40
            ? 'text-green-500'
            : premio >= 30
            ? 'text-violet-500'
            : 'text-gray-400'
        }`}
        size={40}
        strokeWidth={1.5}
        color="currentColor"
      />
      
      )}

      {/* 🧍‍♂️ Nombre */}
      <div className='bg-blue-900 absolute border border-blue-100 -bottom-[6px] h-[18px] left-1/2 -translate-x-1/2 w-16 overflow-hidden whitespace-nowrap px-1'>
        <p className="text-center text-[12px] text-white truncate font-pirataone">
          {nombre || 'Libre'}
        </p>
      </div>
    </button>
  );
};

export default Card;

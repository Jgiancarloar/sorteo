import React, { useEffect, useState } from 'react';
import Card from './components/Card';
import backgroundImg from './assets/background.webp';
import ModalCard from './components/ModalCard';
import { Gift, Dice5, RefreshCcw, Tickets } from 'lucide-react';

const weightedRandom = (items, weightFn) => {
  const weights = items.map(weightFn);
  const total = weights.reduce((acc, w) => acc + w, 0);
  const r = Math.random() * total;
  let acc = 0;
  for (let i = 0; i < items.length; i++) {
    acc += weights[i];
    if (r < acc) return items[i].id;
  }
};

const App = () => {
  const premios = [100, 50, 50, 50, 50, 40, 30, 30];

  const [cards, setCards] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [bolilla, setBolilla] = useState(null);
  const [historialBolilla, setHistorialBolilla] = useState([]);
  const [animating, setAnimating] = useState(false);
  const [animatedDice, setAnimatedDice] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('bingo_cards');
    if (stored) {
      setCards(JSON.parse(stored));
    } else {
      const defaultCards = Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        nombre: '',
        pago: false,
        estrellas: 0,
        premio: null,
      }));
      setCards(defaultCards);
      localStorage.setItem('bingo_cards', JSON.stringify(defaultCards));
    }
  }, []);

  useEffect(() => {
    if (cards.length > 0) {
      localStorage.setItem('bingo_cards', JSON.stringify(cards));
    }
  }, [cards]);

  const sortearNumero = () => {
    const tarjetasDisponibles = cards.filter(c => c.estrellas < 5);
    const ganadores = cards.filter(c => c.estrellas >= 5);

    if (ganadores.length >= 8) {
      alert('¡Ya salieron los 8 ganadores!');
      return;
    }

    if (tarjetasDisponibles.length === 0) {
      alert('¡No hay más tarjetas disponibles para sortear!');
      return;
    }

    const ultimos = historialBolilla.slice(-2);
    const candidatos = tarjetasDisponibles
      .filter(card => !ultimos.includes(card.id))
      .map(card => ({ id: card.id, peso: Math.max(1, 6 - card.estrellas) }));

    const pool = candidatos.length > 0
      ? candidatos
      : tarjetasDisponibles.map(c => ({ id: c.id, peso: 1 }));

    const elegido = weightedRandom(pool, c => c.peso);

    // Animación de conteo rápido
    setAnimating(true);
    let counter = 0;
    const interval = setInterval(() => {
      const random = Math.floor(Math.random() * 15) + 1;
      setBolilla(random);
      counter++;
      if (counter >= 20) {
        clearInterval(interval);
        setBolilla(elegido);
        setAnimating(false);
        setHistorialBolilla(prev => [...prev.slice(-4), elegido]);

        setCards(prevCards => {
          const actualizadas = [...prevCards];
          const idx = actualizadas.findIndex(c => c.id === elegido);

          if (idx !== -1) {
            const card = actualizadas[idx];
            const nuevasEstrellas = Math.min(card.estrellas + 1, 5);
            const yaGano = nuevasEstrellas === 5;
            const premiados = actualizadas.filter(c => c.premio !== null).length;

            actualizadas[idx] = {
              ...card,
              estrellas: nuevasEstrellas,
              premio: yaGano && card.premio === null && premiados < premios.length
                ? premios[premiados]
                : card.premio,
            };
          }

          return actualizadas;
        });
      }
    }, 20);
  };

  const handleDice = () => {
    setAnimatedDice(true);
    setTimeout(() => {
      setAnimatedDice(false);
    }, 20); // 0.2 segundo
  };

  return (
    <div className='font-pirataone min-h-screen relative'>
      <img src={backgroundImg} alt="" className='absolute h-full object-cover object-right w-full' />
      <div className='bg-black/60 h-full w-full absolute'></div>
      <div className='max-w-xl mx-auto px-5 py-10 relative z-20'>
        <div className='flex gap-5 items-center mb-5 text-white'>
          <div className='flex-1'>
            <h1 className='text-5xl'>BINGOMANIA</h1>
            <p className='font-bold font-outfit text-xl'>#N72#022$177--&gt;PL1N</p>
          </div>
          <div className='h-20 relative w-20'>
            <Tickets className='h-full w-full' strokeWidth={1} />
            <span className='absolute inset-0 flex items-center justify-center mt-4 ml-3 text-xl'>30so</span>
          </div>
        </div>

        <div className='flex justify-around mb-5'>
          {premios.map((premio, index) => (
            <div key={index} className='flex flex-col items-center'>
              <div
                className={`h-8 w-8 ${premio >= 100
                  ? 'text-yellow-500'
                  : premio >= 50
                    ? 'text-red-500'
                    : premio >= 40
                      ? 'text-green-500'
                      : premio >= 30
                        ? 'text-violet-500'
                        : 'text-gray-400'
                  }`}
              >
                <Gift className='h-full w-full' color="currentColor" />
              </div>
              <p className='text-white text-xl'>+{premio}</p>
            </div>
          ))}
        </div>

        <div className='gap-1 grid grid-cols-3 mb-5 relative'>
          {cards.map(card => (
            <Card
              key={card.id}
              data={card}
              openModal={openModal}
              setOpenModal={setOpenModal}
              setSelectedCard={setSelectedCard}
            />
          ))}
        </div>

        <div className='flex gap-5 items-center justify-center'>
          <div className="bg-[radial-gradient(circle,_rgba(30,64,175,1)_0%,_rgba(2,6,23,1)_80%)] flex h-20 w-20 items-center justify-center rounded-full">
            <span className="font-black text-white text-5xl">
              {bolilla !== null ? bolilla : '-'}
            </span>
          </div>
          <button
            className={` h-14 p-2 rounded-xl w-14 ${animatedDice ? 'bg-blue-900' : 'bg-blue-950'}`}
            onClick={() => {
              sortearNumero(),
                handleDice()
            }}
            disabled={animating}
          >
            <Dice5 className='h-full text-white w-full' strokeWidth={1.5} />
          </button>
          <button
            className='bg-blue-950 h-14 p-2 rounded-xl w-14'
            onClick={() => {
              localStorage.removeItem('bingo_cards');
              window.location.reload();
            }}
          >
            <RefreshCcw className='h-full text-white w-full' strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {openModal && selectedCard && (
        <ModalCard
          setOpenModal={setOpenModal}
          selectedCard={selectedCard}
          setCards={setCards}
        />
      )}
    </div>
  );
};

export default App;
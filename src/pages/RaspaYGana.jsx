import React, { useState, useEffect } from "react";
import { Bookmark, Gift, Tickets, RefreshCcw } from "lucide-react";
import backgroundImg from '../assets/background.webp'
import logo from '../assets/logo.webp'
import jorgesuspenso from '../assets/jorgesuspenso.png'
import jorgetriste from '../assets/jorgetriste.png'
import jorgitoganador from '../assets/jorgitoganador.png'

const generateRandomCards = () => {
    const numbers = Array.from({ length: 9 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
    const giftColors = ["#EF4444", "#3B82F6", "#3B82F6", "#3B82F6", "#22C55E"];
    const giftIndexes = [];

    while (giftIndexes.length < 5) {
        const index = Math.floor(Math.random() * 9);
        if (!giftIndexes.includes(index)) giftIndexes.push(index);
    }

    return numbers.map((number, i) => ({
        number,
        flipped: false,
        gift: giftIndexes.includes(i) ? giftColors[giftIndexes.indexOf(i)] : null,
    }));
};

const RaspaYGana = () => {
    const [cards, setCards] = useState(() => {
        const saved = localStorage.getItem("cards");
        return saved ? JSON.parse(saved) : generateRandomCards();
    });

    const [bookmarks, setBookmarks] = useState(() => {
        const saved = localStorage.getItem("bookmarks");
        return saved
            ? JSON.parse(saved)
            : Array(9).fill({ name: "", paid: false });
    });

    const [modalIndex, setModalIndex] = useState(null);
    const [nameInput, setNameInput] = useState("");
    const [paidInput, setPaidInput] = useState(false);

    useEffect(() => {
        localStorage.setItem("cards", JSON.stringify(cards));
    }, [cards]);

    useEffect(() => {
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }, [bookmarks]);

    const flipCard = (i) => {
        if (cards[i].flipped) return;
        const updated = [...cards];
        updated[i].flipped = true;
        setCards(updated);
    };

    const handleBookmarkClick = (i) => {
        setModalIndex(i);
        setNameInput(bookmarks[i].name);
        setPaidInput(bookmarks[i].paid);
    };

    const handleSave = () => {
        const updated = [...bookmarks];
        updated[modalIndex] = { name: nameInput, paid: paidInput };
        setBookmarks(updated);
        setModalIndex(null);
    };

    const resetAll = () => {
        // Paso 1: quitar flipped visualmente
        const hiddenCards = cards.map(card => ({ ...card, flipped: false }));
        setCards(hiddenCards);

        // Paso 2: esperar el fin de la animación (500ms o lo que uses)
        setTimeout(() => {
            setCards(generateRandomCards());
            setBookmarks(Array(9).fill({ name: "", paid: false }));
            localStorage.removeItem("cards");
            localStorage.removeItem("bookmarks");
        }, 600); // asegúrate que este número sea mayor que la duración de la animación (por seguridad)
    };


    return (
        <div className='font-pirataone min-h-screen relative'>
            <img src={backgroundImg} alt="" className='absolute h-full object-cover object-right w-full' />
            <div className='bg-black/60 h-full w-full absolute'></div>
            <div className="text-white flex flex-col items-center justify-center relative px-4 pt-10 z-40">
                <div className="flex items-center justify-center gap-5 mb-5">

                    <span className='font-san text-4xl'>10so</span>
                    <button
                        onClick={resetAll}
                        className="bg-red-700 cursor-pointer px-4 py-2 rounded hover:bg-red-700 transition"
                    >
                        <RefreshCcw />
                    </button>

                </div>
                <div className="flex gap-1 flex-wrap mb-5 justify-center">
                    {bookmarks.map((bookmark, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center  w-16 cursor-pointer"
                            onClick={() => handleBookmarkClick(i)}
                        >
                            <div
                                className={`relative h-12 w-12 `}
                            >
                                <Bookmark className={`h-full w-full ${bookmark.paid ? "text-green-600 fill-green-500" : "text-yellow-600 fill-yellow-500"
                                    }`} strokeWidth={1} />
                                <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-black z-10">
                                    {i + 1}
                                </span>
                            </div>
                            <span className="text-sm truncate w-20 text-center">
                                {bookmark.name || "Libre"}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="flex gap-5 justify-center mb-5 p-2 bg-black/40 rounded-lg">
                    <div className="flex flex-col items-center gap-2">
                        <Gift className="h-8 w-8" color="#EF4444" />
                        <span className="text-xl">+30</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Gift className="h-8 w-8" color="#22C55E" />
                        <span className="text-xl">+20</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Gift className="h-8 w-8" color="#3B82F6" />
                        <span className="text-xl">+10</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Gift className="h-8 w-8" color="#3B82F6" />
                        <span className="text-xl">+10</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Gift className="h-8 w-8" color="#3B82F6" />
                        <span className="text-xl">+10</span>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-6">
                    {cards.map((card, i) => (
                        <div
                            key={i}
                            onClick={() => flipCard(i)}
                            className="w-24 h-24 relative cursor-pointer"
                            style={{ perspective: "1000px" }}
                        >
                            <div
                                className={`absolute inset-0 transition-transform duration-[1000ms] ease-in-out transform-style-preserve-3d ${card.flipped ? "rotate-y-180" : ""
                                    }`}
                            >
                                {/* Cara trasera (lo visible al inicio) */}
                                <div className="absolute inset-0 bg-[#FEF6D6] rounded-lg backface-hidden flex items-center justify-center overflow-hidden">
                                    <img src={jorgesuspenso} alt="" className="w-5/6 mt-auto" />
                                </div>

                                {/* Cara frontal (número y gift) */}
                                <div
                                    className={`absolute inset-0 rounded-lg transform rotate-y-180 backface-hidden overflow-hidden`}
                                >
                                    {/* Capa de fondo con opacidad */}
                                    {card.gift && (
                                        <div
                                            className="absolute inset-0"
                                            style={{
                                                backgroundColor: card.gift,
                                                opacity: 0.4,
                                            }}
                                        />
                                    )}

                                    {/* Imagen + número encima */}
                                    <div
                                        className={`absolute inset-0 flex items-start justify-end p-2 text-4xl font-bold text-white ${card.gift ? '' : 'bg-black/40 filter grayscale'}`}
                                        style={{
                                            backgroundImage: `url(${card.gift ? jorgitoganador : jorgetriste})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                    >
                                        {card.number}
                                    </div>
                                </div>


                            </div>
                        </div>
                    ))}
                </div>


                {/* Modal */}
                {modalIndex !== null && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                        <div className="bg-white text-black p-6 rounded-lg w-80">
                            <h2 className="text-xl font-bold mb-4">Editar jugador</h2>
                            <input
                                type="text"
                                value={nameInput}
                                onChange={(e) => setNameInput(e.target.value)}
                                className="w-full p-2 border mb-4"
                                placeholder="Nombre"
                            />
                            <label className="flex items-center mb-4 gap-2">
                                <input
                                    type="checkbox"
                                    checked={paidInput}
                                    onChange={(e) => setPaidInput(e.target.checked)}
                                />
                                Cerrado
                            </label>
                            <div className="flex justify-end gap-2">
                                <button onClick={() => setModalIndex(null)}>Cancelar</button>
                                <button
                                    onClick={handleSave}
                                    className="bg-blue-600 px-3 py-1 rounded text-white"
                                >
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Estilos para backface */}
                <style>{`
        .backface-hidden {
          backface-visibility: hidden;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
            </div>
        </div>
    );
};

export default RaspaYGana;

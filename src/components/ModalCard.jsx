import React, { useState } from 'react'
import { Sparkle, Shield, Coins, CircleCheck, CircleX } from 'lucide-react'

const ModalCard = ({ setOpenModal, selectedCard, setCards }) => {

    const [nombre, setNombre] = useState(selectedCard?.nombre)
    const [pago, setPago] = useState(selectedCard?.pago);

    const handleSave = () => {
        setCards(prevCards => {
            const updatedCards = prevCards.map(card =>
                card.id === selectedCard.id
                    ? { ...card, nombre, pago }
                    : card
            );
            localStorage.setItem('bingo_cards', JSON.stringify(updatedCards));
            return updatedCards;
        });
        setOpenModal(false);
    };

    return (
        <div className='absolute backdrop-blur-xs flex flex-col gap-5 h-screen inset-0 items-center justify-center p-14 z-50'>
            <div
                className="border-6 border-blue-100 cursor-pointer relative w-full"
            >
                <div className="border-[3px] border-blue-950/80">
                    <div className='bg-blue-950/80 flex h-28 justify-center w-full'>
                        <div className="h-22 text-blue-200 relative w-22">
                            <Shield className='fill-blue-900 h-full w-full' strokeWidth={1} />
                            <span className='absolute inset-0 z-10 flex items-center justify-center font-pirataone text-white text-4xl'>
                                {selectedCard?.id}
                            </span>
                        </div>
                    </div>
                </div>
                <button
                    className={`absolute border-2 h-8 left-1/6 p-1 rotate-45 rounded-full ${pago ? 'text-blue-100' : 'text-yellow-500'} top-1/2 -translate-y-1/2 w-8`}
                    onClick={() => {
                        setPago(false)
                    }}
                >
                    <Sparkle className='h-full w-full' />
                </button>
                <button
                    className={`absolute border-2 h-8 right-1/6 p-1 rounded-full ${pago ? 'text-yellow-500' : 'text-blue-100'}  top-1/2 -translate-y-1/2 w-8`}
                    onClick={() => {
                        setPago(true)
                    }}
                >
                    <Coins className='h-full w-full' />
                </button>
                <div className='bg-blue-900 absolute border border-blue-100 -bottom-[6px] flex items-center justify-center h-8 left-1/2 -translate-x-1/2 w-32 overflow-hidden px-1'>
                    <input
                        type="text"
                        className="bg-transparent font-pirataone text-center text-2xl text-white w-full outline-none"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Nombre"
                    />
                </div>
            </div>
            <div className='flex gap-5'>
                <button
                    className='bg-blue-950 px-4 py-2 rounded-md'
                    onClick={() => {
                        setOpenModal(false)
                    }}
                >
                    <CircleX className='bg-red-900/40 text-red-600 rounded-full' size={30} />
                </button>
                <button
                    className='bg-blue-950 px-4 py-2 rounded-md'
                    onClick={handleSave}
                >
                    <CircleCheck className='bg-green-900/40 text-green-600 rounded-full' size={30} />
                </button>
            </div>
        </div>
    )
}

export default ModalCard
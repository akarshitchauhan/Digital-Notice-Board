import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaTrash } from 'react-icons/fa';

Modal.setAppElement('#root');

const TIL = () => {
    const [notes, setNotes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentNote, setCurrentNote] = useState('');
    const [isNewNote, setIsNewNote] = useState(true);

    useEffect(() => {
        const storedNotes = localStorage.getItem('notes');
        if (storedNotes) {
            setNotes(JSON.parse(storedNotes));
        }
    }, []);

    const openModal = (note = '') => {
        setCurrentNote(note);
        setIsNewNote(!note);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentNote('');
    };

    const handleInputChange = (e) => {
        setCurrentNote(e.target.value);
    };

    const saveNote = () => {
        const updatedNotes = isNewNote 
            ? [...notes, currentNote] 
            : notes.map(note => note === currentNote ? currentNote : note);
        
        setNotes(updatedNotes);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
        closeModal();
    };

    const deleteNote = (e, note) => {
        e.stopPropagation();
        const updatedNotes = notes.filter(n => n !== note);
        setNotes(updatedNotes);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
    };

    return (
        <div className="p-4 bg-white rounded-3xl shadow-lg mt-6 h-52 w-96">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl text-black">Today I learnt</h2>
                <button
                    className="bg-blue-500 text-white text-xl p-2 w-12 rounded-3xl shadow-2xl"
                    onClick={() => openModal()}
                >
                    +
                </button>
            </div>
            <div className="flex overflow-x-auto space-x-4">
                {notes.map((note, index) => (
                    <div key={index} className="relative bg-gray-200 p-4 rounded-xl shadow w-40 cursor-pointer" onClick={() => openModal(note)}>
                        <p className="text-gray-600">{note.substring(0, 30)}...</p>
                        <FaTrash
                            className="absolute top-2 right-2 text-red-500 cursor-pointer"
                            onClick={(e) => deleteNote(e, note)}
                        />
                    </div>
                ))}
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Note Modal"
                className="bg-white p-8 rounded-3xl shadow-2xl max-w-md mx-auto my-8"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                <h2 className="text-2xl text-black font-semibold mb-4">{isNewNote ? 'New Learning' : 'Edit Learning'}</h2>
                <textarea
                    value={currentNote}
                    onChange={handleInputChange}
                    placeholder="What did you learn today?"
                    rows="5"
                    className="w-full bg-white text-black p-2 mb-4 border rounded-3xl"
                />
                <button
                    className="bg-green-500 text-white p-2 rounded-3xl shadow-xl mr-2"
                    onClick={saveNote}
                >
                    Save
                </button>
                <button
                    className="bg-red-500 text-white p-2 rounded-3xl shadow-xl"
                    onClick={closeModal}
                >
                    Cancel
                </button>
            </Modal>
        </div>
    );
};

export default TIL;

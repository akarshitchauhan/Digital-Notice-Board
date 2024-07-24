import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaTrash } from 'react-icons/fa'; // Import the trash icon

Modal.setAppElement('#root'); // Set the app element for accessibility

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentNote, setCurrentNote] = useState({ title: '', content: '' });
    const [isNewNote, setIsNewNote] = useState(true);

    const openModal = (note = { title: '', content: '' }) => {
        setCurrentNote(note);
        setIsNewNote(!note.title);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentNote({ title: '', content: '' });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentNote({
            ...currentNote,
            [name]: value
        });
    };

    const saveNote = () => {
        if (isNewNote) {
            setNotes([...notes, currentNote]);
        } else {
            setNotes(notes.map(note => note.title === currentNote.title ? currentNote : note));
        }
        closeModal();
    };

    const deleteNote = (e, title) => {
        e.stopPropagation(); // Prevent the click event from propagating to the parent
        setNotes(notes.filter(note => note.title !== title));
    };

    return (
        <div className="fixed bottom-28 right-4 p-4 bg-white rounded-lg shadow-lg h-44 w-96">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl text-black">Notes</h2>
                <button
                    className="bg-blue-500 text-white text-xl p-2 w-12 rounded-3xl shadow-2xl"
                    onClick={() => openModal()}
                >
                    +
                </button>
            </div>
            <div className="flex overflow-x-auto space-x-4">
                {notes.map((note, index) => (
                    <div key={index} className="relative bg-gray-200 p-4 rounded shadow min-w-[100px] cursor-pointer" onClick={() => openModal(note)}>
                        <h3 className="text-xl text-black font-bold">{note.title}</h3>
                        <p className="text-gray-600">{note.content.substring(0, 50)}...</p>
                        <FaTrash
                            className="absolute top-2 right-2 text-red-500 cursor-pointer"
                            onClick={(e) => deleteNote(e, note.title)}
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
                <h2 className="text-2xl text-black font-semibold mb-4">{isNewNote ? 'New Note' : 'Edit Note'}</h2>
                <input
                    type="text"
                    name="title"
                    value={currentNote.title}
                    onChange={handleInputChange}
                    placeholder="  Title"
                    className="w-full bg-white text-black p-2 mb-4 border rounded-3xl"
                />
                <textarea
                    name="content"
                    value={currentNote.content}
                    onChange={handleInputChange}
                    placeholder="  Content"
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

export default Notes;

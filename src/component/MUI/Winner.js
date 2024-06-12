import React, { useState, useEffect } from 'react';
import ReactConfetti from 'react-confetti';
import Modal from 'react-modal'; // Import Modal component (e.g., from 'react-modal')

const Winner = () => {
  const [isConfettiRunning, setIsConfettiRunning] = useState(true);
  const [showModal, setShowModal] = useState(true); // Add state for modal visibility

  useEffect(() => {
    if (isConfettiRunning) {
      const timeoutId = setTimeout(() => {
        setIsConfettiRunning(false);
      }, 5000); // Set duration to 5 seconds (5000 milliseconds)

      return () => clearTimeout(timeoutId); // Cleanup function to prevent memory leaks
    }
  }, [isConfettiRunning]);

  const handleCloseModal = () => {
    setShowModal(false); // Hide the modal
  };

  return (
    <div>
      {isConfettiRunning && <ReactConfetti />}

      <Modal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
          content: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '300px',
            height: '200px',
            backgroundColor: 'white',
            borderRadius: '5px',
            padding: '20px',
          },
        }}
      >
        <h2>Congratulations!</h2>
        <p>You have won!</p>
        <button onClick={handleCloseModal}>Close</button>
      </Modal>
    </div>
  );
};

export default Winner;

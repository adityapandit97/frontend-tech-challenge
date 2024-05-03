import React, { useState } from 'react';
import FeedDetailsModal from './FeedDetailsModal';

const FeedDetails: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div>
            <button onClick={openModal}>View Details</button>
            {isModalOpen && <FeedDetailsModal onClose={closeModal} />}
        </div>
    );
};

export default FeedDetails;

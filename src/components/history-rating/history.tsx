import React from 'react';
import History from './components/History'; // Adjust the path as needed

const App: React.FC = () => {

    const events = [
        { timestamp: new Date('2024-05-01'), user: 'User 1', description: 'User logged in' },
        { timestamp: new Date('2024-05-05'), user: 'User 2', description: 'Added new item' },
        { timestamp: new Date('2024-05-10'), user: 'User 3', description: 'Updated profile' },

    ];

    return (
        <div>
            <h1>My Application</h1>
            <History events={events} />
        </div>
    );
};

export default App;
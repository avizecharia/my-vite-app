import { useEffect, useState } from 'react';


function App() {
  const [message, setMessage] = useState<string>('');
  

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await fetch('http://class-app:3000', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          setMessage(`Successfully connected to server`);
          // Optionally, update the list of dogs after adding a new one
        } else {
          setMessage('Failed to connect the server');
        }
      } catch (error) {
        console.error('Error fetching dogs:', error);
      }
    };

    fetchDogs();
  }, []);

  const handleAddDog = async () => {
      try {
        const response = await fetch('http://class-app:3000/add-dog', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          setMessage(`Successfully added a new dog`);
          // Optionally, update the list of dogs after adding a new one
        } else {
          setMessage('Failed to add dog');
        }
      } catch (error) {
        console.error('Error adding dog:', error);
        setMessage('Failed to add dog');
      }
    
  };

  return (
    <div className="App">
      <div>
        <button onClick={handleAddDog}>Add Dog</button>
      </div>

      {message && <p>{message}</p>}
    </div>
  );
}

export default App;

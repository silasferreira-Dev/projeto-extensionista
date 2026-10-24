import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [statusApi, setStatusApi] = useState('A carregar...');

  useEffect(() => {
    fetch('http://localhost:3000/api/health')
      .then((res) => res.json())
      .then((data) => setStatusApi(data.message))
      .catch((err) => setStatusApi('Erro ao conectar com a API'));
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' }}>
      <h1>Projeto Integrador Extensionista II</h1>
      <p>Status do Backend:</p>
      <div style={{ padding: '15px', background: '#e0f7fa', display: 'inline-block', borderRadius: '8px', fontWeight: 'bold', color: '#00796b' }}>
        {statusApi}
      </div>
    </div>
  )
}

export default App

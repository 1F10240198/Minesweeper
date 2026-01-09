import './App.css'

function App() {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center'
  }
  return (
    <div className='App'>
      <h2>Minesweeper</h2>
      <div style={containerStyle}></div>
    </div>
  )
}

export default App

import './App.css';
import Timer from './components/Timer';
import Todo from './components/Todo';

function App() {
  return (
    <div className="App">
      <div className="TodoSession">
        <Todo/>
      </div>
      <Timer hours={1} minutes={30}/>
    </div>
  );
}

export default App;

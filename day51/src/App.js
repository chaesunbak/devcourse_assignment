import "./App.css";
import Todolist from "./Todolist.tsx";
import Timer from "./Timer.tsx";

function App() {
  return (
    <div className="contianer">
      <Todolist />
      <Timer />
    </div>
  );
}

export default App;

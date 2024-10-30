import "./App.css";

/* 주석은 이렇게 작성합니다. */

function App() {
  let name = "리액트";
  return (
    <div className="contianer">
      <h1 className="test">
        Hello,
        {name === "리액트" ? <h2>YES</h2> : <h2>NO</h2>}!!
      </h1>
      <p>반갑습니다.</p>
    </div>
  );
}

export default App;

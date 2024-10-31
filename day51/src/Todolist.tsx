import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

const initialTodos: Todo[] = [
  { id: 1, text: "아침 먹기", done: false },
  { id: 2, text: "점심 먹기", done: false },
  { id: 3, text: "저녁 먹기", done: false },
];

const Todolist: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const newTodo = useRef<HTMLInputElement>(null);

  const title: string = "오늘 할일";

  const handleCheck = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };
  const handleAdd = () => {
    if (!newTodo.current?.value.trim()) return;
    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: prevTodos.length + 1,
        text: newTodo.current?.value || "",
        done: false,
      },
    ]);
    newTodo.current!.value = "";
  };

  const handleDelete = (id: number) => () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };
  return (
    <div className="container">
      <h1>{title}</h1>
      <p></p>
      <div className="board">
        <div>
          <input type="text" placeholder="할일을 입력하세요" ref={newTodo} />
          <Button variant="primary" onClick={handleAdd}>
            추가
          </Button>
        </div>
        <p></p>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => handleCheck(todo.id)}
              />
              {todo.done ? <del>{todo.text}</del> : <span>{todo.text}</span>}
              <button onClick={handleDelete(todo.id)}>삭제</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todolist;

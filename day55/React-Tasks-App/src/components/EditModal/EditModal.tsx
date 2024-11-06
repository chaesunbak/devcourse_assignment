import { FC, useState } from "react";
import { FiX } from "react-icons/fi";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import {
  updateTask,
  deleteTask,
  setModalActive,
} from "../../store/slices/boardsSlice";
import { addLog } from "../../store/slices/loggerSlice";
import { v4 as uuidv4 } from "uuid";
import {
  buttons,
  closeButton,
  deleteButton,
  header,
  input,
  modalWindow,
  title,
  updateButton,
  wrapper,
} from "./EditModal.css";

const EditModal: FC = () => {
  const editingState = useTypedSelector((state) => state.modal);

  const [data, setData] = useState(editingState);

  const dispatch = useTypedDispatch();

  const handleCloseButton = () => {
    dispatch(setModalActive(false));
  };

  const handleNameChagne = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      task: {
        ...data.task,
        taskName: e.target.value,
      },
    });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      task: {
        ...data.task,
        taskDescription: e.target.value,
      },
    });
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      task: {
        ...data.task,
        taskOwner: e.target.value,
      },
    });
  };

  const handleUpdate = () => {
    dispatch(
      updateTask({
        boardId: editingState.boardId,
        listId: editingState.listId,
        task: data.task,
      })
    );

    dispatch(
      addLog({
        logId: uuidv4(),
        logMessage: `일 수정하기 ${data.task.taskName}`,
        logAuthor: "User",
        logTimeStamp: String(Date.now()),
      })
    );

    dispatch(setModalActive(false));
  };

  const handleDelete = () => {
    dispatch(
      deleteTask({
        boardId: editingState.boardId,
        listId: editingState.listId,
        taskId: editingState.task.taskId,
      })
    );

    dispatch(
      addLog({
        logId: uuidv4(),
        logMessage: `일 삭제하기 ${data.task.taskName}`,
        logAuthor: "User",
        logTimeStamp: String(Date.now()),
      })
    );

    dispatch(setModalActive(false));
  };

  return (
    <div className={wrapper}>
      <div className={modalWindow}>
        <div className={header}>
          <div className={title}>{editingState.task.taskName}</div>
          <FiX onClick={handleCloseButton} className={closeButton} />
        </div>
        <div className={title}>제목</div>
        <input
          type="text"
          value={data.task.taskName}
          onChange={handleNameChagne}
          className={input}
        />
        <div className={title}>설명</div>
        <input
          type="text"
          value={data.task.taskDescription}
          onChange={handleDescriptionChange}
          className={input}
        />
        <div className={title}>생성한 사람</div>
        <input
          type="text"
          value={data.task.taskOwner}
          onChange={handleAuthorChange}
          className={input}
        />
        <div className={buttons}>
          <button onClick={handleUpdate} className={updateButton}>
            일 수정하기
          </button>
          <button onClick={handleDelete} className={deleteButton}>
            일 삭제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;

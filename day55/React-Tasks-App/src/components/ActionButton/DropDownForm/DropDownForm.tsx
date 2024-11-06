import { FC, Dispatch, SetStateAction, useRef } from "react";
import { FiX } from "react-icons/fi";
import { useTypedDispatch } from "../../../hooks/redux";
import { addList, addTask } from "../../../store/slices/boardsSlice";
import { addLog } from "../../../store/slices/loggerSlice";
import { v4 as uuidv4 } from "uuid";
import {
  taskForm,
  listForm,
  input,
  button,
  buttons,
  close,
} from "./DropDownForm.css";

type TDropDownFormProps = {
  setIsFormOpen: Dispatch<SetStateAction<boolean>>;
  list?: boolean;
  boardId: string;
  listId: string;
};

const DropDownForm: FC<TDropDownFormProps> = ({
  boardId,
  list,
  listId,
  setIsFormOpen,
}) => {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useTypedDispatch();

  const formplaceholder = list
    ? "리스트의 제목을 입력하세요"
    : "일의 제목을 입력하세요";

  const buttonTitle = list ? "리스트 추가하기" : "일 추가하기";

  const handleButtonClick = () => {
    if (textRef.current?.value) {
      const text = textRef.current.value;

      if (list) {
        dispatch(
          addList({
            boardId,
            list: { listId: uuidv4(), listName: text, tasks: [] },
          })
        );

        dispatch(
          addLog({
            logId: uuidv4(),
            logMessage: `리스트 추가하기: ${text}`,
            logAuthor: "User",
            logTimeStamp: String(Date.now()),
          })
        );
      } else {
        dispatch(
          addTask({
            boardId,
            listId,
            task: {
              taskId: uuidv4(),
              taskName: text,
              taskDescription: "",
              taskOwner: "User",
            },
          })
        );

        dispatch(
          addLog({
            logId: uuidv4(),
            logMessage: `일 추가하기: ${text}`,
            logAuthor: "User",
            logTimeStamp: String(Date.now()),
          })
        );
      }
    }
  };

  return (
    <div className={list ? listForm : taskForm}>
      <textarea
        className={input}
        ref={textRef}
        autoFocus
        placeholder={formplaceholder}
        onBlur={() => setIsFormOpen(false)}
      />
      <div className={buttons}>
        <button onMouseDown={handleButtonClick} className={button}>
          {buttonTitle}
        </button>
        <FiX className={close} />
      </div>
    </div>
  );
};

export default DropDownForm;

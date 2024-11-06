import { FC, useRef, Dispatch, SetStateAction } from "react";
import { FiCheck } from "react-icons/fi";
import { icon, input, sideForm } from "./SideForm.css";
import { useTypedDispatch } from "../../../hooks/redux";
import { addBoard } from "../../../store/slices/boardsSlice";
import { v4 as uuidv4 } from "uuid";
import { addLog } from "../../../store/slices/loggerSlice";

type TSideFomProps = {
  setIsFormOpen: Dispatch<SetStateAction<boolean>>;
};

const SideFom: FC<TSideFomProps> = ({ setIsFormOpen }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useTypedDispatch();

  const handleOnBlur = () => {
    setIsFormOpen(false);
  };

  const handleClick = () => {
    if (inputRef.current?.value) {
      dispatch(
        addBoard({
          board: {
            boardId: uuidv4(),
            boardName: inputRef.current.value,
            lists: [],
          },
        })
      );

      dispatch(
        addLog({
          logId: uuidv4(),
          logMessage: `게시판 등록 ${inputRef.current.value}`,
          logAuthor: "Uuser",
          logTimeStamp: String(Date.now()),
        })
      );
    }
  };

  return (
    <div className={sideForm}>
      <input
        className={input}
        autoFocus
        ref={inputRef}
        type="text"
        placeholder="새로운 게시판 등록하기"
        onBlur={handleOnBlur}
      />
      <FiCheck className={icon} onMouseDown={handleClick} />
    </div>
  );
};

export default SideFom;

import React, { FC, useState } from "react";
import { useTypedSelector } from "../../hooks/redux";
import SideFom from "./SideForm/SideFom";
import { FiPlusCircle } from "react-icons/fi";
import {
  container,
  title,
  addSection,
  addButton,
  boardItem,
  boardItemActive,
} from "./BoardList.css";
import clsx from "clsx";

type TBoardListProps = {
  activeBoardId: string;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
};

const BoardList: FC<TBoardListProps> = ({
  activeBoardId,
  setActiveBoardId,
}) => {
  const { boardArray } = useTypedSelector((state) => state.boards);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  return (
    <div className={container}>
      <div className={title}>게시판:</div>
      {boardArray.map((board, index) => (
        <div
          key={board.boardId}
          className={clsx(
            boardArray.findIndex((b) => b.boardId === activeBoardId) === index
              ? boardItemActive
              : boardItem
          )}
          onClick={() => setActiveBoardId(board.boardId)}
        >
          <div>{board.boardName}</div>
        </div>
      ))}
      <div className={addSection}>
        {isFormOpen ? (
          <SideFom setIsFormOpen={setIsFormOpen} />
        ) : (
          <FiPlusCircle
            className={addButton}
            onClick={() => setIsFormOpen(!isFormOpen)}
          />
        )}
      </div>
    </div>
  );
};

export default BoardList;

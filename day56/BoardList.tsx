import React, { FC, useState } from "react";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import SideFom from "./SideForm/SideFom";
import { FiLogIn, FiPlusCircle } from "react-icons/fi";
import {
  container,
  title,
  addSection,
  addButton,
  boardItem,
  boardItemActive,
} from "./BoardList.css";
import clsx from "clsx";
import { GoSignOut } from "react-icons/go";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { setUser } from "../../store/slices/userSlice";
import { useAuth } from "../../hooks/useAuth";

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
  const dispatch = useTypedDispatch();
  const { isAuth } = useAuth();

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        dispatch(
          setUser({
            email: userCredential.user.email,
            id: userCredential.user.uid,
          })
        );
      })
      .catch((error) => console.log(error));
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(setUser({ email: "", id: "" }));
      })
      .catch((error) => console.log(error));
  };

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
        {isAuth ? (
          <GoSignOut className={addButton} onClick={handleSignOut} />
        ) : (
          <FiLogIn className={addButton} onClick={handleLogin} />
        )}
      </div>
    </div>
  );
};

export default BoardList;

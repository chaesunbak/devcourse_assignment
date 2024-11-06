import { FC } from "react";
import { IList } from "../../types";
import List from "../List/List";
import ActionButton from "../ActionButton/ActionButton";
import { listContainer } from "./ListContainer.css";

type TListsContainerProps = {
  boardId: string;
  lists: IList[];
};

const ListsContainer: FC<TListsContainerProps> = ({ boardId, lists }) => {
  return (
    <div className={listContainer}>
      {lists.map((list) => (
        <List key={list.listId} boardId={boardId} list={list} />
      ))}
      <ActionButton boardId={boardId} listId={""} list />
    </div>
  );
};

export default ListsContainer;

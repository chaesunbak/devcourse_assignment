import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBoard, IList, ITask } from "../../types";

type TBoardState = {
  modalActive: boolean;
  boardArray: IBoard[];
};

type TAddBoardAction = {
  board: IBoard;
};

type TAddListAction = {
  boardId: string;
  list: IList;
};

type TAddTaskAction = {
  boardId: string;
  listId: string;
  task: ITask;
};

type TDeleteListAction = {
  boardId: string;
  listId: string;
};

const initialState: TBoardState = {
  modalActive: false,
  boardArray: [
    {
      boardId: "board-0",
      boardName: "첫번째 게시물",
      lists: [
        {
          listId: "list-1",
          listName: "리스트 1",
          tasks: [
            {
              taskId: "task-1",
              taskName: "task 1",
              taskDescription: "task 1 description",
              taskOwner: "task 1 owner",
            },
            {
              taskId: "task-2",
              taskName: "task 2",
              taskDescription: "task 2 description",
              taskOwner: "task 2 owner",
            },
          ],
        },
        {
          listId: "list-2",
          listName: "리스트 2",
          tasks: [
            {
              taskId: "task-3",
              taskName: "task 3",
              taskDescription: "task 3 description",
              taskOwner: "task 3 owner",
            },
            {
              taskId: "task-4",
              taskName: "task 4",
              taskDescription: "task 4 description",
              taskOwner: "task 4 owner",
            },
          ],
        },
      ],
    },
  ],
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addBoard: (state, { payload }: PayloadAction<TAddBoardAction>) => {
      state.boardArray.push(payload.board);
    },

    addList: (state, { payload }: PayloadAction<TAddListAction>) => {
      const board = state.boardArray.find((b) => b.boardId === payload.boardId);
      if (board) {
        board.lists.push(payload.list);
      }
    },

    addTask: (state, { payload }: PayloadAction<TAddTaskAction>) => {
      const board = state.boardArray.find((b) => b.boardId === payload.boardId);
      if (board) {
        const list = board.lists.find((l) => l.listId === payload.listId);
        if (list) {
          list.tasks.push(payload.task);
        }
      }
    },

    deleteList: (state, { payload }: PayloadAction<TDeleteListAction>) => {
      const board = state.boardArray.find((b) => b.boardId === payload.boardId);
      if (board) {
        board.lists = board.lists.filter(
          (list) => list.listId !== payload.listId
        );
      }
    },

    setModalActive: (state, { payload }: PayloadAction<boolean>) => {
      state.modalActive = payload;
    },
  },
});
export const { addBoard, addList, addTask, deleteList, setModalActive } =
  boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;

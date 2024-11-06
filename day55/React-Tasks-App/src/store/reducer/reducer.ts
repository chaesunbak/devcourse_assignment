import { boardsReducer } from "../slices/boardsSlice";
import { loggerReducer } from "../slices/loggerSlice";
import { modalReducer } from "../slices/modalSlice";

const reducer = {
  boards: boardsReducer,
  logger: loggerReducer,
  modal: modalReducer,
};

export default reducer;

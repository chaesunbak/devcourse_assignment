import { FC, Dispatch, SetStateAction } from "react";
import { useTypedSelector } from "../../hooks/redux";
import { FiX } from "react-icons/fi";
import LogItem from "./LogItem/LogItem";
import {
  body,
  closeButton,
  header,
  modalwindow,
  title,
  wrapper,
} from "./LoggerModal.css";

type TLoggerModalProps = {
  setIsLoggerOpen: Dispatch<SetStateAction<boolean>>;
};

const LoggerModal: FC<TLoggerModalProps> = ({ setIsLoggerOpen }) => {
  const logs = useTypedSelector((state) => state.logger.logArray);
  return (
    <div className={wrapper}>
      <div className={modalwindow}>
        <div className={header}>
          <div className={title}>활동 기록</div>
          <FiX onClick={() => setIsLoggerOpen(false)} className={closeButton} />
        </div>
        <div className={body}>
          {logs.map((log) => (
            <LogItem key={log.logId} logItem={log} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoggerModal;

import toast from "react-hot-toast";
import { isPastDate } from "../lib/utils";

const useNotePermissions = () => {
  const isPossible = (date, messageType = {}) => {
    const message = messageType.message || "perform this action on";
    if (isPastDate(date)) {
      toast.error(`You cannot ${message} notes from previous days`, {
        duration: 1500,
      });
      return false;
    }
    return true;
  };

  const canCreate = (date) => {
    return isPossible(date, { message: "add" });
  };
  const canEdit = (date) => {
    return isPossible(date, { message: "edit" });
  };

  return { isPossible, canCreate, canEdit };
};

export default useNotePermissions;

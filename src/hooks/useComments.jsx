import { useContext } from "react";
import CommentsContext from "../context/CommentsProvider";

const useComments = () => {
    return useContext(CommentsContext);
}

export default useComments;
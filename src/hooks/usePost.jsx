import { useContext } from "react";
import PostContext from "../context/PostProvider";

const usePost = () => {
    return useContext(PostContext);
}

export default usePost;
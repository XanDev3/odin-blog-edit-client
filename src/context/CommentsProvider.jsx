import { createContext, useState } from "react";

const CommentsContext = createContext({});

export const CommentsProvider = ({ children }) => {
    const [comments, setComments] = useState([]);

    return (
        <CommentsContext.Provider value={{ comments, setComments }}>
            {children}
        </CommentsContext.Provider>
    )
}

export default CommentsContext;
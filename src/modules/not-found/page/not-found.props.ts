import { useState } from "react";

export const useNotFoundProps = () => {
    const [title, setTitle] = useState("title")


    return {
        title, setTitle,
    };
}
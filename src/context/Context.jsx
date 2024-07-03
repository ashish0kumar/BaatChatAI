import { createContext, useState, useEffect } from "react";
import DOMPurify from "dompurify";
import run from "../config/gemini";

export const Context = createContext();

const MAX_ENTRIES = 50;

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState(() => {
        const savedPrompts = localStorage.getItem("prevPrompts");
        return savedPrompts ? JSON.parse(savedPrompts) : [];
    });
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    useEffect(() => {
        const storedPrompts = JSON.parse(localStorage.getItem("prevPrompts")) || [];
        setPrevPrompts(storedPrompts);
    }, []);

    useEffect(() => {
        localStorage.setItem("prevPrompts", JSON.stringify(prevPrompts));
    }, [prevPrompts]);

    const sanitizeData = (data) => {
        return DOMPurify.sanitize(data);
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);

        let response;
        let sanitizedPrompt = prompt ? sanitizeData(prompt) : sanitizeData(input);

        if (prompt !== undefined) {
            response = await run(sanitizedPrompt);
            setRecentPrompt(sanitizedPrompt);
        } else {
            setPrevPrompts(prev => {
                const newPrompts = [...prev, sanitizedPrompt];
                if (newPrompts.length > MAX_ENTRIES) {
                    newPrompts.shift();
                }
                return newPrompts;
            });
            setRecentPrompt(sanitizedPrompt);
            response = await run(sanitizedPrompt);
        }

        let sanitizedResponse = sanitizeData(response);
        let responseArray = sanitizedResponse.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b style='font-weight: 600;'>" + responseArray[i] + "</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("<br />");
        
        setResultData(newResponse2);
        setLoading(false);
        setInput("");
    }

    const clearChatHistory = () => {
        localStorage.removeItem("prevPrompts");
        setPrevPrompts([]);
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        recentPrompt,
        setRecentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
        clearChatHistory
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;
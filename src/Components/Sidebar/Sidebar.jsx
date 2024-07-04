import { useContext, useState } from "react"
import "./Sidebar.css"
import { Context } from "../../context/Context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBars, faMessage, faGear, faClockRotateLeft, faQuestion, faTrash } from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
    const [extended, setExtended] = useState(false);
    const { onSent, prevPrompts, setRecentPrompt, newChat, clearChatHistory } = useContext(Context);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    }

    return (
        <div className="sidebar">
            <div className="top">
                <FontAwesomeIcon onClick={() => setExtended(prev => !prev)} className="menu" icon={faBars} />
                <div onClick={() => newChat()} className="new-chat">
                    <FontAwesomeIcon icon={faPlus} />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended
                    ? <div className="recent">
                        <div className="recent-title-container">
                            <FontAwesomeIcon icon={faClockRotateLeft} />
                            <p className="recent-title">Recent</p>
                        </div>
                        <div className="recent-container">
                            {prevPrompts.map((item, index) => {
                                return (
                                    <div onClick={() => loadPrompt(item)} className="recent-entry" key={index}>
                                        <FontAwesomeIcon className="icon" icon={faMessage} />
                                        <p>{item.slice(0, 18)}...</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    : null
                }
            </div>
            <div className="bottom">
                <div onClick={() => window.location.href = "https://github.com/ashish0kumar/BakChat"} className="bottom-item recent-entry">
                    <FontAwesomeIcon className="bottom-help-icon" icon={faQuestion} />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <FontAwesomeIcon className="bottom-icon" icon={faGear} />
                    {extended ? <p>Settings</p> : null}
                </div>
                <div onClick={() => { clearChatHistory(); newChat(); }} className="bottom-item recent-entry">
                    <FontAwesomeIcon className="bottom-icon" icon={faTrash} />
                    {extended ? <p>Clear chat</p> : null}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
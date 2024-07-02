import { useContext, useState } from "react"
import "./Sidebar.css"
import { Context } from "../../context/Context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBars, faMessage, faGear, faClockRotateLeft, faQuestion } from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
    const [extended, setExtended] = useState(false);
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

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
                        <p className="recent-title">Recent</p>
                        {prevPrompts.map((item, index) => {
                            return (
                                <div onClick={() => loadPrompt(item)} className="recent-entry" key={index}>
                                    <FontAwesomeIcon className="icon" icon={faMessage} />
                                    <p>{item.slice(0, 18)}...</p>
                                </div>
                            )
                        })}
                    </div>
                    : null
                }
            </div>
            {/* <div className="bottom">
                <div className="bottom-item recent-entry">
                    <FontAwesomeIcon className="icon" icon={faQuestion} />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <FontAwesomeIcon className="icon" icon={faClockRotateLeft} />
                    {extended ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <FontAwesomeIcon className="icon" icon={faGear} />
                    {extended ? <p>Settings</p> : null}
                </div>
            </div> */}
        </div>
    )
}

export default Sidebar
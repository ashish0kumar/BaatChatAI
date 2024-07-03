import { useContext } from "react"
import "./Main.css"
import { Context } from "../../context/Context"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faRobot, faPaperPlane } from "@fortawesome/free-solid-svg-icons"

function Main() {

    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            onSent();
        }
    }

    return (
        <div className="main">
            <div className="nav">
                <p>बातChatAI</p>
                <FontAwesomeIcon className="icon" icon={faUser} />
            </div>
            <div className="main-container">

                {!showResult
                    ? <>
                        <div className="greet">
                            <p><span>Namaste</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <div onClick={() => onSent("Suggest beautiful places to see on an upcoming road trip")} className="card">
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                            </div>
                            <div onClick={() => onSent("Briefly summarize this concept: urban planning")} className="card">
                                <p>Briefly summarize this concept: urban planning</p>                              
                            </div>
                            <div onClick={() => onSent("Brainstorm team bonding activities for our work retreat")} className="card">
                                <p>Brainstorm team bonding activities for our work retreat</p>
                            </div>
                            <div onClick={() => onSent("Improve the readability of the following code")} className="card">
                                <p>Improve the readability of the following code</p>
                            </div>
                        </div>
                    </>
                    : <div className="result">
                        <div className="result-title">
                            <FontAwesomeIcon className="icon" icon={faUser} />
                            <p>{recentPrompt}</p>
                        </div>
                        <hr className="result-divider" />
                        <div className="result-data">
                            <FontAwesomeIcon className="icon" icon={faRobot} />
                            {loading
                                ? <div className="loader">
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                                : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            }
                        </div>
                    </div>
                }

                <div className="main-bottom">
                    <div className="search-box">
                        <input onKeyDown={handleKeyDown} onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder="Ask my anything" />
                        <div>
                            {input ? <FontAwesomeIcon onClick={() => onSent()} icon={faPaperPlane} /> : null}
                        </div>
                    </div>
                    <p className="bottom-info">
                        बकChat may display inaccurate info.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main
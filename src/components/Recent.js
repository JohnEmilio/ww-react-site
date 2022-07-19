import { useState, useEffect } from "react"
import "./recent.css"

export default function Recent () {

    const [date, setDate] = useState("")
    const [showRecent, setShowRecent] = useState(false)

    function changeDate (event) {
        const inputDate = event.target.value 
       
        setDate(inputDate)
    }

    function toggleRecents (event) {
        console.log(event)
        const recentList = event.target.nextSibling
        // recentList.toggleAttribute("hidden")
        setShowRecent(prev => !prev)
    }



    // useEffect(() =>{
    //     const year = new Date().getUTCFullYear()
    //     const month = new Date().getUTCMonth() + 1
    //     const day = new Date().getUTCDate()

    //     const today = `${year}-${month < 10 ? `0${month}` : month}-${day}`

    //     setDate(today)
    // }, [])
    const logStyles = {
        display: showRecent ? "flex" : "none"
    }
    const btnStyles = {
        left: showRecent ? "0" : "",
        right: showRecent ? "" : "0"
    }

    return(
        <div className="recentContainer">
            <button className="recentToggle" onClick={(event) => toggleRecents(event)} style={btnStyles}>{showRecent ? ">" :"<"}</button> 
            <div className="logContainer" style={logStyles}>
                <span className="recentHeader">Select a date to see your workout</span>
                <input type="date" value={date} onChange={(event) => changeDate(event)} className="recentDateInput"/>
                <ul className="recentList">
                    {localStorage.getItem(date) && JSON.parse(localStorage.getItem(date)).map(exercise => {
                            return <li className="recentListItem">{exercise.name}</li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}
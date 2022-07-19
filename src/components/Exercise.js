import { useState, useEffect } from "react"
import { data } from "../data"
import { nanoid } from "nanoid"
import Recent from "./Recent"


export default function Exercises () {
    const [exercises, setExercises] = useState([])
    const [exerciseTarget, setExerciseTarget] = useState({
        targetMuscle: "",
        equipment: ""
    })
    const [currentWorkoutList, setCurrentWorkoutList] = useState([])
    const muscleTargetArr = ['Back', 'Cardio', 'Chest', 'Lower arms', 'Lower legs', 'Neck', 'Shoulders', 'Upper arms', 'Upper legs', 'Waist']

    useEffect(() => {
        console.log("fetching api data")
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
          }
        };
        // setExercises(data)
        fetch('https://exercisedb.p.rapidapi.com/exercises', options)
          .then(response => response.json())
          .then(response => {
            
            if(!localStorage.getItem("exercises")){
              localStorage.setItem("exercises", JSON.stringify([...response]));
              console.log(response)
            }
            setExercises(JSON.parse(localStorage.getItem("exercises"))); 
            
          })
          .catch(err => console.error(err));
        
      },[])
      
      function handleChange(event){
        const {name, value} = event.target
    
        setExerciseTarget(prevTarget => ({ 
          ...prevTarget,
          [name]: value
        }))
      }
    
      function toggleGif (event) {
        console.log(event)
        // event.target.parentElement.lastChild This is for when buttons are in main li
        event.target.parentElement.nextSibling.firstChild.toggleAttribute("hidden")
      }
    
      function addToWorkout (event) {
        console.log(event)
        // event.target.parentElement.childNodes[0].data This is when the buttons are in the main li
        
        const exerciseName = event.target.parentElement.parentElement.firstChild.data
        
        setCurrentWorkoutList(prevList => [...prevList, {name: exerciseName, id: nanoid()}])
      }
    
      function removeFromList (event, exerciseId) {
        setCurrentWorkoutList(prevList => prevList.filter(exercise => exercise.id !== exerciseId))
      }
    
      function logCurrentList () {
        const year = new Date().getUTCFullYear()
        const month = new Date().getUTCMonth() + 1
        const day = new Date().getUTCDate()
        const date = `${year}-${month < 10 ? `0${month}` : month}-${day}`

        localStorage.setItem(date, JSON.stringify(currentWorkoutList))

        setCurrentWorkoutList([])
      }

    return (
        <section className="exerciseContainer">
            <div className="exerciseDisplay">
              <div className="inputContainer">
                <h3>Use the selections below to search for exercises</h3>
                <select 
                  id="targetMuscle"
                  value={exerciseTarget.targetMuscle}
                  onChange={handleChange}
                  name="targetMuscle"
                >
                  <option value="">Select One</option>
                  {muscleTargetArr.map(muscle => <option key={nanoid()} value={muscle}>{muscle}</option>)}
                </select>

                <select 
                  id="equipment"
                  value={exerciseTarget.equipment}
                  onChange={handleChange}
                  name="equipment"
                >
                  <option value="">Select One</option>
                  <option value="assisted">Assisted</option>
                  <option value="band">Band</option>
                  <option value="barbell">Barbell</option>
                  <option value="body weight">Body weight</option>
                  <option value="bosu ball">Bosu ball</option>
                  <option value="cable">Cable</option>
                  <option value="dumbbell">Dumbbell</option>
                  <option value="elliptical machine">Elliptical machine</option>
                  <option value="ez barbell">Ez barbell</option>
                  <option value="hammer">Hammer</option>
                  <option value="kettlebell">Kettlebell</option>
                  <option value="leverage machine">Leverage machine</option>
                  <option value="medicine ball">Medicine ball</option>
                  <option value="olympic barbell">Olympic barbell</option>
                  <option value="resistance band">Resistance band</option>
                  <option value="roller">Roller</option>
                  <option value="rope">Rope</option>
                  <option value="skierg machine">Skierg machine</option>
                  <option value="sled machine">Sled machine</option>
                  <option value="smith machine">Smith machine</option>
                  <option value="stability ball">Stability ball</option>
                  <option value="stationary bike">Stationary bike</option>
                  <option value="stepmill machine">Stepmill machine</option>
                  <option value="tire">Tire</option>
                  <option value="trap bar">Trap bar</option>
                  <option value="upper body ergometer">Upper body ergometer</option>
                  <option value="weighted">Weighted</option>
                  <option value="wheel roller">Wheel roller</option>
                </select>
              </div>
              <ul className="exerciseData">
                {(exerciseTarget.targetMuscle && exerciseTarget.equipment) && exercises.filter(exercise => exercise.bodyPart === exerciseTarget.targetMuscle.toLowerCase() && exercise.equipment === exerciseTarget.equipment).map((exercise, ind) => {
                    return <li className="searchList exercisesList" key={ind}>
                      {exercise.name.toUpperCase()}
                      <div className="exerciseListBtnContainer">
                        <button className="exerciseBtn addToList" onClick={(event) => addToWorkout(event)}>Add to Workout</button>
                        <button className="exerciseBtn toggleGif"onClick={(event) => toggleGif(event)}>View Example</button>
                      </div>
                      <div className="gifContainer">
                        <img id="exerciseGif" src={exercise.gifUrl} alt={exercise.name} hidden />
                      </div>
                    </li>
                    })
                }
              </ul>                   
            </div>
            <div id="todaysExercises" className="listContainer">
              {currentWorkoutList.length > 0 && <h2 className="todayHeader">Today's Workout:</h2>}
                <ul id="todaysExerciseList">
                  {currentWorkoutList.map(exercise => {
                    return <li key={exercise.id} className="currentExercises exercisesList">
                        {exercise.name}
                        <button className="removeBtn exerciseBtn" onClick={(event) => removeFromList(event, exercise.id)}>Remove</button>
                      </li>
                  })}
                </ul>
                <div>
                  {currentWorkoutList.length > 0 && <button className="exerciseBtn logBtn" onClick={logCurrentList}>Log list</button>}
                  {currentWorkoutList.length > 0 && <button className="exerciseBtn logBtn" onClick={() => setCurrentWorkoutList([])}>Clear list</button>}
                </div>
            </div>
            <Recent />
        </section> 
    )
}
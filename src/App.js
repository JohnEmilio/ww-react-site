import Exercise from "./components/Exercise"
import Header from "./components/Header"
import Login from "./components/Login"
import Home from "./components/Home"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

console.log(process.env.REACT_APP_EXERCISE_KEY)

export default function App() {
  
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element ={<Exercise />} />
        <Route path="/login" element={<Login />}/>
      </Routes>
    </Router>
  );
}

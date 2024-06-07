import logo from './logo.svg';
import './App.css';
import { FaVideo } from "react-icons/fa";
import { FaClosedCaptioning } from "react-icons/fa";

function App() {
  return (
    <><div className="navbar">
      <ul className="nav_items">
        <li><a href="#"><FaVideo /></a></li>
        <li><a href="#"><FaClosedCaptioning /></a></li>
      </ul>
    </div><div className="content">
        <textarea className="text_area" placeholder="Enter input here"></textarea>
        <button className='generate_btn'>Generate</button>
      </div></>
  );
}

export default App;

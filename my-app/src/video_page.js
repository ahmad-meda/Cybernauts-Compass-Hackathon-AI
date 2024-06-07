import App from './App';
import './App.css';
import { FaVideo } from "react-icons/fa";
import { FaClosedCaptioning } from "react-icons/fa";

function VideoPage() {
  return (
    <>
      <App />
      <div className="content">
        <textarea className="text_area" placeholder="Enter input here"></textarea>
        <button className='generate_btn'>Generate</button>
      </div>
    </>
  );
}

export default VideoPage;
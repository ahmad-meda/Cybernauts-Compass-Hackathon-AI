import './caption.css';
import { MdOutlineFileUpload } from "react-icons/md";

function Caption() {

  return (
    <>
      <div className="content">
        <form className="uplaod_box" action="">
          <div className="icon"><MdOutlineFileUpload size={45} /></div>
          <label htmlFor='myFile' className='custom-upload'>Browse</label>
          <input className="upload" type="file" accept="video/*" id="myFile" name="filename" />
          <p className="text">Accepted file types: .mp4, .webm, .ogg</p>
          <input className="submit" type="submit" />
        </form>
      </div></>
  )
};

export default Caption;

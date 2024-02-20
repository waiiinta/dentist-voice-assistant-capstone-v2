import classes from './BridgeModal.module.css'
import { useState } from 'react'

function BridgeModal({
  q,
  i,
  handleSetInformation,
  setShow
}){
  const [i_end, setIndex] = useState()

  function handleClick(e) {
      e.preventDefault()
      // Code to handle login goes here
      if(i < i_end){
        for(let it = i; it <= i_end; it++){
          if(it == i_end || it == i){
            handleSetInformation(q,it,NaN,"Bridge",true,NaN,true)
          }else{
            handleSetInformation(q,it,NaN,"Bridge",true)
          }
        }
      }

      setShow(false)
  }

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setShow(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Bridge</h1>
        </div>
        <div className="body">
          <p>Select other teeth index</p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setShow(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleClick();
            }}
          >Submit</button>
        </div>
      </div>
    </div>
  );
}

export default BridgeModal
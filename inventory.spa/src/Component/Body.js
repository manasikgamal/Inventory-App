import React,{useState} from 'react'
import Login from "./Login";
import Modal from "react-modal";
import Register from "./Register";
import { useDispatch } from 'react-redux';
import { clearMessage } from './actions/message';

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function Body({onLogIn}) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const dispatch=useDispatch();
  const [choose, setChoose] = useState("");
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className='bodycontainer'>
        <div className='bodyimg'>
        <img src='main-img.jpg'/>
        </div>
        <div className='bodycolor'>
            <div className='bodytextbtn'>
            <div className='bodytext'>
            <h1>Welcome in Inventory Management System</h1>
            <p>Login or Register if you dont have account!</p>
            </div>
            <div className='bodybtn'>
                <button onClick={()=>{openModal();setChoose("login")}} >Login</button>
                <button onClick={()=>{openModal();setChoose("register");dispatch(clearMessage())}}>Register</button>
            </div>
            </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          ariaHideApp={false}
          style={customStyles}
        >
          <button onClick={closeModal}>X</button>
          {choose == "login" ? <Login onLogIn={onLogIn} />: <Register whichone={"user"} />}
        </Modal>
   </div>
  )
}

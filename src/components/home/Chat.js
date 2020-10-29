import React from "react";

const Chat = (props) => {
  const data = props.data;

  

  return (
    <div className="textarea">
        <ul className='mensagens'>        
      {
          data.map(e=>{
          return (
          <li key={e}>                  
          <h3 className="msg">{e[0]} </h3>
          <h5 className="name">{e[1]} : {e[4]}</h5>
          </li>       
          
          )
          })
  }
  </ul>
    </div>
  );
};

export default Chat;

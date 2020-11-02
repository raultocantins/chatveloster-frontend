import React from "react";

const Chat = (props) => {
  const data = props.data
  const name=props.name
 
  

  return (
    <div className="textarea">
        <ul className='mensagens'>        
      {
          data.map(e=>{
          return (
          <li key={e} className={e[1]===name?'chatProfile1':'chatProfile2'}>                  
          <h3 className="msg">{e[0]} </h3>
          <h5 className="name">Enviador por {e[1]}</h5>
          </li>       
          
          )
          })
  }
  </ul>
    </div>
  );
};

export default Chat;

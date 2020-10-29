import React from 'react'
import Rocket from '../../assets/launch.svg'

const Users=(props)=>{
    var data = Array.from(props.data);

return(

    <ul>  
      <strong>Usuários online</strong>
    {
      
data.map(e=>{
  return (
  <li key={e[0]}>  
  <img src={Rocket}alt="rocket" className="rocket"/>           
  <h5 className="users">{e}</h5>
  </li>       
  
  )
  })

    }
     

</ul>
)
}
export default Users;
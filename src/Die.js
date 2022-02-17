import React from 'react';
export default function Die(props){
   const stylesColor={
       backgroundColor: props.isClicked?'#59E391':'white'
   }
   
    return(
        <div className='dieComp' style={stylesColor}onClick={()=>{props.clicks(props.id)}}><h3>{props.value}</h3></div>
    
        )
} 
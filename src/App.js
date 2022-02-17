
import './App.css';
import React from 'react'
import Die from './Die.js'
import Confetti from 'react-confetti'
function App() {
  let[dieRandomNumber, setDieRandomNumber]= React.useState(allNewDice());
  let [tenzies,setTenzies] = React.useState(false);
  React.useEffect(() => {
   const firstValue = dieRandomNumber[0].number;
    const allHeld = dieRandomNumber.every(die => {if(die.clicked && die.number === firstValue){
        return true
    }else{return false}})
    
    if (allHeld) {
        setTenzies(true)
        console.log("You won!")
    }
}, [dieRandomNumber])
  function allNewDice(){ 
    let randomArr= new Array(10).fill(null);
    let newRandomArr = randomArr.map((e,i,j)=>{
      let randomNum = Math.ceil(6*Math.random());
      return {number:randomNum , clicked:false,key:i}
    })
    return newRandomArr;
  }
  
  function rollNewDice(){ 
    let randomArr= new Array(10).fill(null);
    let newRandomArr = randomArr.map((e,i,j)=>{
      let randomNum = Math.ceil(6*Math.random());
      if(dieRandomNumber[i].clicked){
        return dieRandomNumber[i]
      }else{return {number:randomNum , clicked:false,key:i}}
    })
    return newRandomArr;
  }
  
  function dieClick(key){
    setDieRandomNumber(prevState=>{
      return prevState.map(e=>{
        if(e.key===key){
          return {...e,clicked:!e.clicked}
        }else{return e}
      })
    })
  }
  
  let dieComponents = dieRandomNumber.map((e,i)=>{
    return <Die key={e.key} value={e.number} clicks={dieClick}id={e.key}isClicked={e.clicked}/>
  })
  return (
    <main className="App">
      {tenzies?<Confetti/>:<></>}
      <div className = 'insideContainer'>
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='dieCompContainer'>
        {dieComponents}
        </div>
        <button id='rollButton'onClick={()=>{ if(tenzies)
        { setTenzies(prevState=>{return !prevState})
          return setDieRandomNumber(allNewDice())
        } else {
          return setDieRandomNumber(rollNewDice())
        
          }
          
          }}>{tenzies?'New Game':'Roll'}</button>
      </div>
    </main>
  );
}

export default App;

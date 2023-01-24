import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [state, setState] = useState(Array(9).fill(' '));
  const [turn,setTurn]=useState('X');
  const [ws,setWS]=useState([0,0]);
  const [end ,setEnd]=useState(false);
  const isWin=()=>{

    const win_patterns= [ [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

    for (const win_pattern of win_patterns){

      const [x1,x2,x3]=win_pattern;
      const p1= state[x1];
      const p2=state[x2];
      const p3=state[x3];
      
      if((p1===p2 && p2===p3) && (p1==='X' || p2==='O') ){

        return p1;
      }

    }
    return null;
  }



  const isDraw=()=>{

    for(const el of state){

      if(el===' '){
        return false;
      }
    }
    return true;
  }

  const reset=()=>{

    setState(Array(9).fill(' '));
    setEnd(false);
    setTurn('X')
  }

  const handleRes=()=>{

    

    let w=isWin();
    // console.log(w)
    if(w!==null){
      alert("winner is "+ w);
      
      if(w==='X'){
        setWS([ws[0]+1,ws[1]])
      }else{
        setWS([ws[0],ws[1]+1])
      }
      // setState(Array(9).fill(' '))
      setEnd(true);
      return;
    }

    if(isDraw()===true){
      alert("match draw");
      setEnd(true);
      // setState(Array(9).fill(' '))
      
    }

  }

  useEffect(()=>{
      handleRes();
  },[state])
  

  const handleclick = (val) => {

    if( end ===true || state[val]!==' '){
      return ;
    }
    if(turn==='X'){
        const upstate=[...state];
        upstate[val]='X';
        setState(upstate);
        setTurn('O')

    }else{
      const upstate=[...state];
        upstate[val]='O';
        setState(upstate);
        setTurn('X')
    }


  }
  return (

    < section className='bg-gray-500 min-h-screen'>
      <h1 className='bg-black text-white text-center text-4xl'> Tic tac toe</h1>
      <div className=" px-6 py-2 border-2 text-black font-medium bg-yellow-200 text-3xlsleading-tight uppercase  focus:outline-none focus:ring-0 transition duration-150 ease-in-out align-items justify-center text-center">Scores<br/>player X: {ws[0]} || player O: {ws[1]}</div>
      <div className="flex items-center justify-center p-5">

        <div className='grid bg-gray-200 grid-cols-3 grid-gap-4 border-solid border-black border-4 p-4'>
          {
            state.map( (st,index)=>
            
            
            <p   key={index}   onClick={()=>{handleclick(index)} }className='p-8 bg-rose-100 font-bold border-solid border-black border-2'>{st}</p>
            
            )
          }
          <button onClick={reset}  className='p-3 m-2 col-span-3 bg-green-500 text-black text-2xl border-2 border-black'>reset</button>
          <h3 className="col-span-3 bg-yellow-300 text-black border-2 text-s rounded-full text-center py-2 border-blue-600"> current turn : player  {turn}</h3>
        </div> 
      </div>

      <p className="bg-black text-white text-center my-2">Game is developed by prajwal sable using react (prajsa99@gmail.com 7517780449)</p>
    </section>
  );

}

export default App;

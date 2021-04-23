import React,{useState, useEffect} from 'react'
import Users from './userDetails';
import Submit from './add'
import axios from 'axios';

function Server() {
    var person =[];
    const [value, setData] = useState(person);
    var dataaray=[];
    value.map((e)=> dataaray.push(e));
   
  useEffect(()=>{
    axios.get(`https://reqres.in/api/users?page=1`)
    .then(res=>{
       var persons=res.data.data
       var p=persons;
      setData(p);
    })
  },[]); 
    return (
      <div className="App">
          <Submit udata={dataaray} />
      </div>
    );

}
export default Server;
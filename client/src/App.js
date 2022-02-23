import './App.css';
import {useState} from 'react'
import Axios from 'axios'

function App() {

  const [name, setName] = useState('')
  const [age, setAge] = useState(0)
  const [country, setCountry] = useState('')
  const [position, setPosition] = useState('')
  const [wage, setWage] = useState(0)

  const [employeeList, setEmployeeList] = useState([])
  // const displayInfo = ()=>{
  //   console.log(name + age + country + position + wage);
  // }

  const addEmployee = ()=>{
    Axios.post('http://localhost:3001/create',{
      name: name, 
      age: age, 
      country: country, 
      position: position, 
      wage: wage}).then(()=>{
        console.log("success")
      }).then(()=>{
        setEmployeeList([...employeeList,
          {
          name: name, 
          age: age, 
          country: country, 
          position: position, 
          wage: wage
          }])
      })
  }

  const getEmployees = ()=>{
    Axios.get('http://localhost:3001/employees').then((response)=>{
      console.log(response)
      setEmployeeList(response.data)
    })
  }

  return (
    <div className="whole">
      <div className="information">
        <label>Name:</label>
        <input type="text" onChange={(event)=>{setName(event.target.value)}}></input>
        <label>Age:</label>
        <input type="number" onChange={(event)=>{setAge(event.target.value)}}></input>
        <label>Country:</label>
        <input type="text" onChange={(event)=>{setCountry(event.target.value)}}></input>
        <label>Position:</label>
        <input type="text" onChange={(event)=>{setPosition(event.target.value)}}></input>
        <label>Wage(k/year):</label>
        <input type="number" onChange={(event)=>{setWage(event.target.value)}}></input>
        <button type="button" onClick={addEmployee}>Add Employee</button>
      </div>

      <hr/>

      <div className="employees">
        <button type="button" onClick={getEmployees}>Show Employees</button>
        {employeeList.map((val, key)=>{
          return <div className="employee">
            <h3 className="detail">Name: {val.name}</h3>
            <h3 className="detail">Age: {val.age}</h3>
            <h3 className="detail">Country: {val.country}</h3>
            <h3 className="detail">Position: {val.position}</h3>
            <h3 className="detail">Wage(k/year): {val.wage}</h3>
            </div>
        })}
      </div>
    </div>
  );
}

export default App;

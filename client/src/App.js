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
        <input type="text" placeholder="Name (e.g. Joe John)" onChange={(event)=>{setName(event.target.value)}}></input>
        <label>Age:</label>
        <input type="number" placeholder="Age (e.g. 22)" onChange={(event)=>{setAge(event.target.value)}}></input>
        <label>Country:</label>
        <input type="text" placeholder="Country (e.g. UK)" onChange={(event)=>{setCountry(event.target.value)}}></input>
        <label>Position:</label>
        <input type="text" placeholder="Postion (e.g. UX Designer)" onChange={(event)=>{setPosition(event.target.value)}}></input>
        <label>Wage(year):</label>
        <input type="number" placeholder="Wage (e.g. £100000)" onChange={(event)=>{setWage(event.target.value)}}></input>
        <button type="button" className="bigBtn" onClick={addEmployee}>Add Employee</button>
      </div>

      <hr/>

      <div className="employees">
        <button type="button" className="bigBtn" onClick={getEmployees}>Show Employees</button>
        {employeeList.map((val, key)=>{
          return <div className="employee">
            <h3 className="detail">Name: {val.name}</h3>
            <h3 className="detail">Age: {val.age}</h3>
            <h3 className="detail">Country: {val.country}</h3>
            <h3 className="detail">Position: {val.position}</h3>
            <h3 className="detail">Wage(k/year): {val.wage}</h3>
            <input type="text" placeholder="update wage" className="update"></input>
            <button type="button" className="smBtn">Delete</button>
            </div>
        })}
      </div>
    </div>
  );
}

export default App;

import './App.css';
import {useState} from 'react'
import Axios from 'axios'

function App() {

  const [name, setName] = useState('')
  const [age, setAge] = useState(0)
  const [country, setCountry] = useState('')
  const [position, setPosition] = useState('')
  const [wage, setWage] = useState(0)
  const [newWage, setNewWage] = useState(0)

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
      // console.log(response)
      setEmployeeList(response.data)
    })
  }

  const updateEmployeeWage = (id)=>{
    Axios.put('http://localhost:3001/update', {wage: newWage,id: id}).then(
      (response)=>{
        setEmployeeList(employeeList.map((val) =>{
          return val.id === id?{id:val.id, name:val.name, age:val.age, country:val.country, position:val.position, wage:newWage}:val
        })
        )}
    )
  }

  const deleteEmployee = (id) =>{
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response)=>{
      setEmployeeList(employeeList.filter((val)=>{
        return val.id !== id;
      }))
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
              <div className="e-left">
                <h3 className="detail">Name: {val.name}</h3>
                <h3 className="detail">Age: {val.age}</h3>
                <h3 className="detail">Country: {val.country}</h3>
                <h3 className="detail">Position: {val.position}</h3>
                <h3 className="detail">Wage(k/year): {val.wage}</h3>
              </div>
              <div className="e-right">
                <input type="text" placeholder="update wage" className="update" onChange={(event)=>{setNewWage(event.target.value)}}></input>
                <button type="button" className="smBtn" onClick={()=>updateEmployeeWage(val.id)}>Update</button>
                <button type="button" className="smBtn" onClick={()=>deleteEmployee(val.id)}>Delete</button>
              </div>
            </div>
        })}
      </div>
    </div>
  );
}

export default App;

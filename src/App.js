import React, { Component } from "react";
import Select from "react-select";
import EmployeeCard from "./components/EmployeeCard";
import Wrapper from "./components/Wrapper";
import employees from "./employees.json";


const Departments = [
  { label: "Show All", value: "Show All" },
  { label: "Software Development", value: "Software Development" },
  { label: "Accounting", value: "Accounting" },
  { label: "Marketing", value: "Marketing" },
  { label: "Human Resource", value: "Human Resource" },
];

const employeeList = employees;

class App extends Component {

  // Setting this.state.employees to the employees json array
  state = {
    employees
  };

  componentDidMount() {
    this.setState({employess: employeeList});
  }

  handleChange = event => {
    console.log(event);
    console.log(event.value);
    const department = event.value;
    let employees = employeeList;
    if (department !== "Show All") {
      employees = employeeList.filter(employee => employee.department === department);
    }
    employees = this.sortByName(employees);
    this.setState({employees});
  };

  sortByName = employeeArray => {
    employeeList.sort(function(a, b) {
      var nameA = a.name.toUpperCase(); // ignore upper and lowercase
      var nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    
      // names must be equal
      return 0;
    });
    return employeeArray;
  };

  // Map over this.state.employees and render a employeeCard component for each employee object
  render() {
    return (
      <Wrapper>
        <div className="container">
          <div className="jumbotron">
            <h1 className="text-center">Employees Directory</h1>
            <div>Filter Employees By Department: 
              <Select 
                options={Departments} 
                placeholder="Select Department"
                onChange={this.handleChange}
                className="mt-2"
              />
            </div>
          </div> 
        </div>    
        {this.state.employees.map(employee => (     
          <EmployeeCard
            id={employee.id}
            key={employee.id}
            name={employee.name}
            image={employee.image}
            department={employee.department}
            title={employee.title}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;

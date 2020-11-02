import React, { Component } from "react";
import './Table.css';
import API from "../API/API"



class Table extends Component {
  constructor(props) {
     super(props)
     this.state = {
        employees: API,
        order: "asc",
        input: ''
     }
  }

  

  sortEmployees(){

   if (this.state.order === "asc"){
      this.setState({
         order: "desc"
      })
      this.sortDesc()
   } else {
      this.setState({
         order: "asc"
      })
      this.sortAsc()
   }

   

  }

  sortAsc(){
        this.state.employees.sort(function(a,b){
           if(a.email < b.email){
              return -1
           }

           if(a.email > b.email){
            return 1
         }

        })

     }

     sortDesc(){
      this.state.employees.sort(function(a,b){
         if(a.email < b.email){
            return 1
         }

         if(a.email > b.email){
          return -1
       }

      })

   }
  


  renderTableColumns() {
   let header = Object.keys(this.state.employees[0])
   return header.map((key, index) => {
      return <th className="column" key={index}><button className="sort" onClick={() =>{
         this.sortEmployees()
      }}>Sort</button>{key.toUpperCase()}</th>
   })
      

  }

  renderTableEntries() {
     if (this.state.order === "desc"){

     }
   return this.state.employees.map((employee, index) => {
      const { email, first, last, city, state, phone, pic } = employee
      return (
         <tr key={email}>
            <td>{email}</td>
            <td>{first}</td>
            <td>{last}</td>
            <td>{city}</td>
            <td>{state}</td>
            <td>{phone}</td>
            <td><img src={pic}></img></td>
         </tr>
      )
   })
}

userStartsTyping(e) {
    const searchParams = this.state.employees.filter(function(srch)  {
      let values = Object.values(srch).join("").toLowerCase();
      return values.indexOf(e.target.value) !== -1;
    });
   return searchParams;
}

  render() {

   
     return (
      <div className="mainbody">
      <h1>Employee Directory</h1>
      <form>
         <input
         onChange={e => this.setState({ employees: this.userStartsTyping(e)})}
         />
      </form>
      <table>
         <tbody>
            <tr>{this.renderTableColumns()}</tr>
            {this.renderTableEntries()}
         </tbody>
      </table>
   </div>
     )
     
  }
}

export default Table
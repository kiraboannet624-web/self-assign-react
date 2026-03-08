import React from "react";
import { useEffect, useState } from "react";
import EmpCard from "./components/empcard";

function App() {
  const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const printAll = () => {
  window.print();
};

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setEmployees(data));
  }, []);

  const filteredEmployees = employees.filter((employee) =>
  employee.name.toLowerCase().includes(search.toLowerCase()) ||
  employee.email.toLowerCase().includes(search.toLowerCase())
);

  return (
<>
  
    <input
  type="text"
  placeholder="Search by name or email..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
   
   <div className="container">
      {filteredEmployees.map((employee) => (
        <EmpCard key={employee.id} employee={employee} />
      ))}
    </div>
    <button onClick={printAll}>Print All Cards</button>
    </>
  );
}

export default App;

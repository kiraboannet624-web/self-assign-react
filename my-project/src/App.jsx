
import React from "react";
import { useEffect, useState } from "react";
import EmpCard from "./components/empcard";

function App() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const printAll = () => {
    window.print();
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
          throw new Error("Failed to fetch employee data.");
        }

        const data = await response.json();
        setEmployees(data);
      } catch (fetchError) {
        setError(fetchError.message || "Something went wrong while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase()) ||
    employee.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="app">
      <h1>Employee Card Generator</h1>

      <div className="controls no-print">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <button onClick={printAll}>Print Visible Cards</button>
      </div>

      {loading && <p className="status">Loading employees...</p>}
      {error && <p className="status error">{error}</p>}
      {!loading && !error && filteredEmployees.length === 0 && (
        <p className="status">No employees found.</p>
      )}

      <div className="container">
        {filteredEmployees.map((employee) => (
          <EmpCard key={employee.id} employee={employee} />
        ))}
      </div>
    </main>
  );
}

export default App;

import React, { useState } from "react";

const RegistrationTable = ({ data, editData, deleteData }) => {
  const [search, setSearch] = useState("");

  const filtered = data.filter(
    r => r.name.toLowerCase().includes(search.toLowerCase()) ||
         r.email.toLowerCase().includes(search.toLowerCase())
  );

  let w=0, s=0, c=0;
  filtered.forEach(r => { if(r.event==="Workshop") w++; else if(r.event==="Seminar") s++; else c++; });

  return (
    <>
      <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
      <table>
        <thead>
          <tr><th>Name</th><th>Email</th><th>Phone</th><th>Event</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {filtered.map(r => (
            <tr key={r._id}>
              <td>{r.name}</td>
              <td>{r.email}</td>
              <td>{r.phone}</td>
              <td>{r.event}</td>
              <td>
                <button onClick={() => editData(r)}>Edit</button>
                <button onClick={() => deleteData(r._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>Total: {filtered.length} | Workshop: {w} | Seminar: {s} | Conference: {c}</div>
    </>
  );
};

export default RegistrationTable;

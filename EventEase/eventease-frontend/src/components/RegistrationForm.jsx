import React, { useState, useEffect } from "react";
import RegistrationTable from "./RegistrationTable";
import Toast from "./Toast";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/events";

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventType, setEventType] = useState("");
  const [data, setData] = useState([]);
  const [toast, setToast] = useState("");

  // Load all registrations
  const fetchRegistrations = async () => {
    try {
      const res = await fetch(API_URL);   // ← FIXED (no /all)
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Error fetching registrations. Check backend!", err);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  // Register new user
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !eventType)
      return alert("Please fill all fields!");

    const newReg = { name, email, phone, event: eventType };

    try {
      const res = await fetch(API_URL, {     // ← FIXED (no /register)
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReg)
      });

      if (res.ok) {
        setToast("✅ Registration Successful!");
        setName(""); 
        setEmail(""); 
        setPhone(""); 
        setEventType("");
        fetchRegistrations();  // refresh table
      } else {
        alert("Registration failed!");
      }
    } catch (err) {
      console.error("Submit Error:", err);
      alert("Server error! Check backend.");
    }
  };

  // Delete
  const deleteData = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchRegistrations();
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  // Edit
  const editData = async (reg) => {
    setName(reg.name);
    setEmail(reg.email);
    setPhone(reg.phone);
    setEventType(reg.event);
    await deleteData(reg._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Download CSV
  const downloadCSV = () => {
    if (!data.length) return alert("No data!");
    const csv =
      "Name,Email,Phone,Event\n" +
      data.map(r => `${r.name},${r.email},${r.phone},${r.event}`).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "participants.csv";
    a.click();
  };

  return (
    <div className="container">
      <h2>Event Registration Form</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
          required
        />
        <select
          value={eventType}
          onChange={(e)=>setEventType(e.target.value)}
          required
        >
          <option value="">Select Event Type</option>
          <option value="Workshop">Workshop 🧰</option>
          <option value="Seminar">Seminar 📚</option>
          <option value="Conference">Conference 🎤</option>
        </select>

        <button type="submit">Register</button>
      </form>

      <RegistrationTable 
        data={data} 
        editData={editData} 
        deleteData={deleteData} 
      />

      <div className="actions">
        <button onClick={downloadCSV}>⬇️ Download CSV</button>
        <button onClick={() => window.print()}>🖨️ Print</button>
      </div>

      {toast && <Toast message={toast} setToast={setToast} />}
    </div>
  );
};

export default RegistrationForm;

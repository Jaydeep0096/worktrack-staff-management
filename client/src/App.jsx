import { useCallback, useEffect, useState } from "react";
import { employeeApi } from "./services/employeeApi";
import "./index.css";

const emptyForm = {
  name: "",
  email: "",
  department: "",
  jobTitle: "",
  salary: ""
};

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadEmployees = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await employeeApi.list({
        search: search.trim()
      });

      setEmployees(data);
    } catch (err) {
      setError(err.message || "Could not load employees");
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      await employeeApi.create({
        ...form,
        name: form.name.trim(),
        email: form.email.trim(),
        department: form.department.trim(),
        jobTitle: form.jobTitle.trim(),
        salary: Number(form.salary)
      });

      setForm(emptyForm);
      setMessage("Employee added successfully.");
      await loadEmployees();
    } catch (err) {
      setError(err.message || "Could not save employee");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this employee?")) return;

    setError("");
    setMessage("");

    try {
      await employeeApi.remove(id);
      setMessage("Employee deleted successfully.");
      await loadEmployees();
    } catch (err) {
      setError(err.message || "Could not delete employee");
    }
  }

  return (
    <main className="container">
      <header className="header">
        <div>
          <p className="eyebrow">WORKTRACK</p>
          <h1>Employee Management</h1>
          <p>Manage your employee records in one place.</p>
        </div>

        <span className="count">
          {employees.length} employees
        </span>
      </header>

      <section className="panel">
        <h2>Add an employee</h2>

        <form className="employee-form" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            minLength={2}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="department"
            placeholder="Department"
            value={form.department}
            onChange={handleChange}
            required
          />

          <input
            name="jobTitle"
            placeholder="Job title"
            value={form.jobTitle}
            onChange={handleChange}
            required
          />

          <input
            name="salary"
            type="number"
            placeholder="Annual salary"
            value={form.salary}
            onChange={handleChange}
            min="0"
            required
          />

          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Add employee"}
          </button>
        </form>
      </section>

      <section className="panel">
        <div className="list-header">
          <h2>Employee directory</h2>

          <input
            className="search"
            placeholder="Search name or email"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        {message && (
          <p className="success" role="status">{message}</p>
        )}

        {error && (
          <div className="error" role="alert">
            <span>{error}</span>
            <button type="button" onClick={loadEmployees}>
              Retry
            </button>
          </div>
        )}

        {loading ? (
          <p role="status">Loading employees...</p>
        ) : employees.length === 0 ? (
          <p>No employees found. Add your first employee.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Job title</th>
                  <th>Salary</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {employees.map((employee) => (
                  <tr key={employee._id}>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.department}</td>
                    <td>{employee.jobTitle}</td>
                    <td>
                      {Number(employee.salary).toLocaleString()}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="delete"
                        onClick={() => handleDelete(employee._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

import Employee from "../models/Employee.js";
export function getEmployees(search = "", department = "") {
  const filter = {};

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } }
    ];
  }

  if (department) {
    filter.department = department;
  }

  return Employee.find(filter)
    .sort({ createdAt: -1 })
    .limit(100);
}

export function createEmployee(data) {
  return Employee.create(data);
}

export function updateEmployee(id, data) {
  return Employee.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true
    }
  );
}

export function deleteEmployee(id) {
  return Employee.findByIdAndDelete(id);
}

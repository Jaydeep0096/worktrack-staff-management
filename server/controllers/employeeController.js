import * as employeeService from "../services/employeeService.js";

export async function listEmployees(req, res) {
  const employees = await employeeService.getEmployees(
    req.query.search || "",
    req.query.department || ""
  );

  res.json({ success: true, data: employees });
}

export async function addEmployee(req, res) {
  const employee = await employeeService.createEmployee(
    req.body
  );

  res.status(201).json({
    success: true,
    data: employee
  });
}

export async function editEmployee(req, res) {
  const employee = await employeeService.updateEmployee(
    req.params.id,
    req.body
  );

  if (!employee) {
    return res.status(404).json({
      success: false,
      message: "Employee not found"
    });
  }

  res.json({ success: true, data: employee });
}

export async function removeEmployee(req, res) {
  const employee = await employeeService.deleteEmployee(
    req.params.id
  );

  if (!employee) {
    return res.status(404).json({
      success: false,
      message: "Employee not found"
    });
  }

  res.json({
    success: true,
    message: "Employee deleted successfully"
  });
}

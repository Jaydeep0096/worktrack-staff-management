const API_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000/api";

async function request(path, options = {}) {
  const response = await fetch(API_URL + path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });

  const result = await response.json(); //.catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      result.message || `Request failed: ${response.status}`
    );
  }

  return result.data ?? result;
}

export const employeeApi = {
  list(params = {}) {
    const query = new URLSearchParams(params);
    const suffix = query.size ? `?${query}` : "";

    return request(`/employees${suffix}`);
  },

  create(employee) {
    return request("/employees", {
      method: "POST",
      body: JSON.stringify(employee)
    });
  },

  update(id, employee) {
    return request(`/employees/${id}`, {
      method: "PATCH",
      body: JSON.stringify(employee)
    });
  },

  remove(id) {
    return request(`/employees/${id}`, {
      method: "DELETE"
    });
  }
};

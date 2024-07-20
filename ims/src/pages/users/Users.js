import React from "react";

function Users() {
  const users = [
    { id: 1, name: "John Doe", email: "john.doe@example.com" },
    { id: 2, name: "Jane Doe", email: "jane.doe@example.com" },
    { id: 3, name: "Bob Smith", email: "bob.smith@example.com" },
    { id: 4, name: "Alice Johnson", email: "alice.johnson@example.com" },
    { id: 5, name: "Mike Brown", email: "mike.brown@example.com" },
  ];

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <span>{user.name}</span>
            <span>{user.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
} from "@material-tailwind/react";

export function Tables() {
  const [users, setUsers] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user data from the mock server
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://json-placeholder.mock.beeceptor.com/users" // Use the /users endpoint
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        console.log("API Response:", data); // Log the response

        // Ensure the response is an array
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format: Expected an array");
        }

        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (error) {
    return <Typography color="red">{error}</Typography>;
  }

  // If users is empty (e.g., API returned no data)
  if (users.length === 0) {
    return <Typography variant="h6">No users found.</Typography>;
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Users Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Name", "Company", "Email","Address","Zip","State", "Phone", "Country", "Status"].map(
                  (el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const className = `py-3 px-5 border-b border-blue-gray-50`;

                return (
                  <tr key={user.id}>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                       
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            {user.name}
                          </Typography>
                          <Typography className="text-xs font-normal text-blue-gray-500">
                            @{user.username}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {user.company}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {user.email}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {user.address}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {user.zip}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {user.state}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {user.phone}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {user.country}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Chip
                        variant="gradient"
                        color="green"
                        value="Active"
                        className="py-0.5 px-2 text-[11px] font-medium w-fit"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Tables;
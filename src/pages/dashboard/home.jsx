import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Chip,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Option,
} from "@material-tailwind/react";
import { StatisticsCard } from "@/widgets/cards";
import { statisticsCardsData } from "@/data";

export function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://json-placeholder.mock.beeceptor.com/users"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();

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

  const handleViewMore = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const updatedStatisticsCards = statisticsCardsData.map((card, index) =>
    index === 0
      ? {
          ...card,
          title: "Total Users",
          value: users.length,
        }
      : card
  );

  // Pagination logic
  const totalPages = Math.ceil(users.length / rowsPerPage);
  const paginatedUsers = users.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleRowsPerPageChange = (value) => {
    setRowsPerPage(Number(value));
    setCurrentPage(1); // Reset to the first page when rows per page changes
  };

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-12">
        <div className="col-span-4 grid grid-cols-1 gap-y-10">
          {updatedStatisticsCards.map(({ icon, title, value, footer, ...rest }) => (
            <StatisticsCard
              key={title}
              {...rest}
              title={title}
              value={value}
              icon={React.createElement(icon, {
                className: "w-6 h-6 text-white",
              })}
              footer={
                <Typography className="font-normal text-blue-gray-600">
                  <strong className={footer.color}>{footer.value}</strong>
                  &nbsp;{footer.label}
                </Typography>
              }
            />
          ))}
        </div>
        <div className="col-span-8">
          <Card className="rounded-lg">
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-4 p-6 flex items-center justify-between"
            >
              <Typography variant="h5" color="white" className="font-semibold">
                👋 Welcome Back!
              </Typography>
            </CardHeader>
            <CardBody className="p-6 text-center">
              <Typography variant="h6" className="text-gray-700">
                Hey there! We're excited to have you back.
              </Typography>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Users Table */}
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-1">
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-4 p-4">
            <Typography variant="h6" color="white">
              Users Table
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-auto">
            {loading ? (
              <Typography variant="h6">Loading...</Typography>
            ) : error ? (
              <Typography color="red">{error}</Typography>
            ) : users.length === 0 ? (
              <Typography variant="h6">No users found.</Typography>
            ) : (
              <>
                <table className="w-full min-w-[640px] table-auto border-collapse">
                  <thead>
                    <tr className="bg-blue-gray-100">
                      {["Name", "Email", "Address", "Status", "Action"].map((el) => (
                        <th key={el} className="border-b border-blue-gray-200 py-3 px-5 text-left">
                          <Typography variant="small" className="text-[12px] font-bold uppercase text-blue-gray-700">
                            {el}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedUsers.map((user) => (
                      <tr key={user.id} className="border-b border-blue-gray-200">
                        <td className="py-3 px-5">
                          <Typography variant="small" className="font-semibold text-blue-gray-800">
                            {user.name}
                          </Typography>
                        </td>
                        <td className="py-3 px-5">
                          <Typography variant="small" className="text-blue-gray-600">
                            {user.email}
                          </Typography>
                        </td>
                        <td className="py-3 px-5">
                          <Typography variant="small" className="text-blue-gray-600">
                            {user.address}
                          </Typography>
                        </td>
                        <td className="py-3 px-5">
                          <Chip variant="gradient" color="green" value="Active" className="py-0.5 px-2 text-[11px] font-medium w-fit" />
                        </td>
                        <td className="py-3 px-5">
                          <Button size="sm" color="blue" onClick={() => handleViewMore(user)}>
                            View More
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                      {/* Pagination Controls */}
                      <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-2">
                    <Typography variant="small">Rows per page:</Typography>
                    <Select
                      value={rowsPerPage.toString()}
                      onChange={(value) => handleRowsPerPageChange(value)}
                      className="w-20"
                    >
                      <Option value="5">5</Option>
                      <Option value="10">10</Option>
                      <Option value="20">20</Option>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                      size="sm"
                    >
                      Previous
                    </Button>
                    <Typography variant="small">
                      Page {currentPage} of {totalPages}
                    </Typography>
                    <Button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                      size="sm"
                    >
                      Next
                    </Button>
 
                  </div>
                </div>
                    </>
                    
            )}
          </CardBody>
        </Card>
      </div>

      {/* User Details Modal */}
      <Dialog open={openModal} handler={() => setOpenModal(false)}>
        <DialogHeader>User Details</DialogHeader>
        <DialogBody>
          {selectedUser ? (
            <div className="space-y-2">
              <Typography variant="h6">Name: {selectedUser.name}</Typography>
              <Typography>Email: {selectedUser.email}</Typography>
              <Typography>Address: {selectedUser.address}</Typography>
              <Typography>Phone: {selectedUser.phone || "N/A"}</Typography>
              <Typography>Company: {selectedUser.company || "N/A"}</Typography>
              <Typography>Website: {selectedUser.website || "N/A"}</Typography>
            </div>
          ) : (
            <Typography>No user selected</Typography>
          )}
        </DialogBody>
        <DialogFooter>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default Home;
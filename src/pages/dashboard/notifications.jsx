import React from "react";
import {
  Typography,
  Alert,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export function Notifications() {
  const [showAlerts, setShowAlerts] = React.useState({
    blue: true,
    green: true,
    orange: true,
    red: true,
  });
  const [showAlertsWithIcon, setShowAlertsWithIcon] = React.useState({
    blue: true,
    green: true,
    orange: true,
    red: true,
  });
  const alerts = ["gray", "green", "orange", "red"];

  return (
    <div className="mx-auto my-20 flex max-w-screen-lg flex-col gap-8">
      <Card>
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="m-0 p-4"
        >
          <Typography variant="h5" color="blue-gray">
            Assignment Task :
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 p-4">
          <p>
          APIs URL: https://app.beeceptor.com/mock-server/json-placeholder <br/>
        Using APIs given above, do the following:</p>
<ul>
<li> Create a login page</li>
<li>Show error on failed login</li>
<li>Go to Users page and show users list on successful login.</li>
<li> On click show users details.</li>
<li>Create aesthetically pleasing and professional looking pages, you may use any theme. Apply validations
where necessary.</li>
          </ul>     
        </CardBody>
      </Card>
      <Card>
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="m-0 p-4"
        >
          <Typography variant="h5" color="blue-gray">
           List of APIs EndPoints Use:
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 p-4">
          <p>
            JSONPlaceholder APIs server is up and running! <br />
            
            <strong>https://json-placeholder.mock.beeceptor.com</strong>        </p>
          <div>
            <p>            
<strong>GET  /users</strong><br />
Get a list of all the users
            </p>
            <p><strong>POST  /login</strong><br />
              Login example with failed attempt. Use 'fail' keyword in the password.</p>
            <p>
           <strong> POST  /login</strong><br />
            Login the user successfully and generate a JWT token.
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Notifications;

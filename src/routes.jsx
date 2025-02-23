import {
  HomeIcon,
  TableCellsIcon,
  InformationCircleIcon,

} from "@heroicons/react/24/solid";
import { Home, Tables, Notifications } from "@/pages/dashboard";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
    
      {
        icon: <TableCellsIcon {...icon} />,
        name: "all users",
        path: "/allusers",
        element: <Tables />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: " api end points",
        path: "/end-point",
        element: <Notifications />,
      },
    ],
  },
 
];

export default routes;

import { createHashRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Forms from "../pages/Forms/Forms";
import { REDIRECTION_ROUTES } from "../common/constants";
import EditForm from "../pages/EditForm/EditForm";
import ViewForm from "../pages/ViewForm/ViewForm";
import Responses from "../pages/Responses/Responses";

export const router = createHashRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: REDIRECTION_ROUTES.FORMS,
          element: <Forms />,
        },
        {
            path: REDIRECTION_ROUTES.EDIT_FORM,
            element: <EditForm />,
        },
        {
            path: REDIRECTION_ROUTES.VIEW_FORM,
            element: <ViewForm />,
        },
        {
          path: REDIRECTION_ROUTES.RESPONSES,
          element: <Responses />,
        }
      ],
    },
  ]);
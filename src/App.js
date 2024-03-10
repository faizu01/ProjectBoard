import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import Body from "./components/Body";
import CardDetails from "./components/CardDetails";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
<link rel="icon" href="./favicon.ico" />;

const AppLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/card/:cardID",
        element: <CardDetails />,
      },
    ],
  },
]);

ReactDOM.render(
  <DndProvider backend={HTML5Backend}>
    <RouterProvider router={appRouter}>
      <Outlet />
    </RouterProvider>
  </DndProvider>,
  document.getElementById("root")
);

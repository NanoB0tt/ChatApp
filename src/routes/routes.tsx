import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Root } from "../pages";
import { Login, Register } from "../pages/auth";
import { RequireAuth } from ".";
import { Chat } from "../pages/chat/chat";
import ErrorPage from "../pages/error";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<RequireAuth />} errorElement={<ErrorPage />}>
        <Route path="/" element={<Root />}>
          <Route path="chat/:id" element={<Chat />} />
        </Route>
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </>,
  ),
);

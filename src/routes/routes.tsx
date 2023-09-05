import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Root } from '../pages'
import { Login, Register } from '../pages/auth'
import { RequireAuth } from '.'
import { Chat } from '../pages/chat/chat'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<RequireAuth />}>
        <Route
          path="/"
          element={<Root />}
        >
          <Route
            path="chat/:id"
            element={<Chat />}
          />
        </Route>
      </Route>
      <Route
        path="login"
        element={<Login />}
      />
      <Route
        path="register"
        element={<Register />}
      />
    </>
  )
)

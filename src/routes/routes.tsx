import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Root } from '../pages'
import { Login, Register } from '../pages/auth'
import { RequireAuth } from '.'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<RequireAuth />}>
        <Route
          path="/"
          element={<Root />}
        />
      </Route>
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/register"
        element={<Register />}
      />
    </>
  )
)

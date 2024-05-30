import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Login from './Pages/Admin/Login';
import Choose from './Pages/Choose';
import Authorization from './Pages/User/Authorization';
import LoginUser from './Pages/User/LoginUser';
import MainLayout from './layout/MainLayout';
import Test from './Pages/Admin/Test';
import Profile from './Pages/Admin/Profile';
import Students from './Pages/Admin/Students';
import EditProfile from './Pages/Admin/EditProfile';
import EditProfileUser from './Pages/User/EditProfile';
import ChangePassword from './Pages/Admin/ChangePassword';
import ChangePasswordUser from './Pages/User/ChangePassword';
import TestById from './Pages/Admin/TestById';
import TestByIdUser from './Pages/User/TestById';
import AddTest from './Pages/Admin/AddTest';
import MainLayoutUser from './layout/MainLayoutUser';
import TestUser from './Pages/User/Test'
import ProfileUser from './Pages/User/Profile'
import Results from './Pages/User/Results';
import AuthorizationAdmin from './Pages/Admin/Authorization';
import './styles/ConfirmModal.css'
import ForgetPassword from './Pages/Admin/ForgetPassword';
import ForgetPasswordUser from './Pages/User/ForgetPassword';
import AddStudents from './Pages/Admin/AddStudents';
import ResultById from './Pages/User/ResultById';
import StudentsResult from './Pages/Admin/StudentResult';
import Speciality from './Pages/Admin/Speliciality';

function App() {
  const router=createBrowserRouter([
    {
      path: "/admin/login",
		  element: <Login/>
    },
    {
      path: '/admin/auth',
      element: <AuthorizationAdmin/>
    },
    {
      path: "/user/login",
		  element: <LoginUser/>
    },
    {
      path: "/",
		  element: <Choose/>
    },
    {
      path: "/admin/auth",
		  element: <Authorization/>
    },
    {
      path: "/user/auth",
		  element: <Authorization/>
    },
    {
      path: '/admin/forgot-password',
      element: <ForgetPassword/>
    },
    {
      path: '/user/forgot-password',
      element: <ForgetPasswordUser/>
    },
    {
      element: <MainLayoutUser/>,
      children: [
        {
          path: "/user/test",
          element: <TestUser/>
        },
        {
          path: `/user/test/:quizId`,
          element: <TestByIdUser/>
        },
        {
          path: "/user/profile",
          element: <ProfileUser/>
        },
        {
          path: "/user/profile/edit",
          element: <EditProfileUser/>
        },
        {
          path: "/user/profile/password",
          element: <ChangePasswordUser/>
        },
        {
          path: "/user/results",
          element: <Results/>
        },
        {
          path: "/user/results/:quizId",
          element: <ResultById/>
        },
    ]
    },
    {
      element: <MainLayout/>,
      children: [
        {
          path: "/admin/test",
          element: <Test/>
        },
        {
          path: "/admin/test/:specialId/add-test",
          element: <AddTest/>
        },
        {
          path: "/admin/test/:specialId/:quizId",
          element: <TestById/>
        },
        {
          path: "/admin/test/:specialId",
          element: <Speciality/>
        },
        {
          path: "/admin/test/:quizId/add",
          element: <AddStudents/>
        },
        {
          path: "/admin/profile",
          element: <Profile/>
        },
        {
          path: "/admin/profile/edit",
          element: <EditProfile/>
        },
        {
          path: "/admin/profile/password",
          element: <ChangePassword/>
        },
        {
          path: "/admin/students",
          element: <Students/>
        },
        {
          path: "/admin/students/:quizId",
          element: <StudentsResult/>
        },
      ]
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer
				position="bottom-left"
				autoClose={3000}
				closeOnClick
				draggable
				hideProgressBar={true}
			/>
    </div>
  );
}

export default App;

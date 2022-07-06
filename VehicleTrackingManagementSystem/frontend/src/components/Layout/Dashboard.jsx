import { FC, PropsWithChildren, ReactElement, useEffect, useRef, useState, } from 'react'
import BG from '../../assets/images/nav-bg.svg'
import logo from '../../assets/images/logo.png'
import activeHome from '../../assets/images/white-home-icon.svg'
import home from '../../assets/images/blued-home-icon.svg'
import settings from '../../assets/images/settings.svg'
import activeSettings from '../../assets/images/active-settings.svg'
import user_ from '../../assets/images/user.svg'
import activeUser from '../../assets/images/active-user.svg'
import department from '../../assets/images/cluster.svg'
import activeDepartment from '../../assets/images/active-cluster.svg'
import '../../assets/scss/dashboardLayout.scss'
import { NavLink, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { loadUser, selectUser, logout } from '../../store/modules/authSlice'
import Modal from '../Modal';
import toast from 'react-hot-toast';
import AppServices from "../../services";
import { useDispatch, useSelector } from 'react-redux'


const DashboardLayout = ({ children }) => {

  const childRef = useRef(null);

  const toggleModal = () => {
    if (childRef.current)
      childRef.current.toggleModal();
  }

  const [menuStatus, setMenuStatus] = useState(false);
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const toggleMenu = () => {
    setMenuStatus(!menuStatus);
  }
  const toggleSidebar = () => {
    setSidebarStatus(!sidebarStatus);
  }
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  }


  useEffect(() => {
    if (!loaded) {
      dispatch(loadUser());
      setLoaded(true);
    }
    else if (!user) {
      navigate('/login');
    }
  }, [loaded])


  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (user) {
      setEmail(user.email)
      setFirstName(user.firstName)
      setLastName(user.lastName)
    }
  }, [user])
  
  
  useEffect(() => {
    if (sidebarStatus) {
      toggleSidebar();
    }
  }, [useLocation().pathname])


  const updateUser = () => {

    toast.promise(
      AppServices.updateUser({ departmentId: user?.departmentId || "", gender: user?.gender || "male", email, firstName, lastName }, user?.id || ""),
      {
        loading: 'Updating account ...',
        success: (response) => {

          if (password.length) {
            AppServices.updateUserPassword({ newPassword: password, confirmPassword: password }, user?.id || "")
          }

          dispatch(loadUser())
          toggleModal();
          return "Account updated successfully";
        },
        error: (error) => {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          return message;
        },
      }
    );

    dispatch(loadUser());
  }


  return (
    <>
      <div className='nav-bar bg-primary'>
        <img src={BG} alt="" />
        <div className="flex justify-end ml-auto place-items-center">

          <div
            onClick={toggleSidebar}
            className="toggle-sidebar lg:hidden cursor-pointer flex place-items-center justify-center"
          >
            {sidebarStatus ? <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 18V20H3V18H21ZM6.596 3.90399L8.01 5.31799L4.828 8.49999L8.01 11.682L6.596 13.096L2 8.49999L6.596 3.90399ZM21 11V13H12V11H21ZM21 3.99999V5.99999H12V3.99999H21Z"
                fill="#28A4E2"
              />
            </svg> : <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 18V20H3V18H21ZM17.404 3.90399L22 8.49999L17.404 13.096L15.99 11.682L19.172 8.49999L15.99 5.31799L17.404 3.90399ZM12 11V13H3V11H12ZM12 3.99999V5.99999H3V3.99999H12Z"
                fill="#28A4E2"
              />
            </svg>}

          </div>
        </div>
      </div>
      <div className="flex">
        <div className={`full-height sidebar ${sidebarStatus ? 'absolute' : 'hidden'} md:block`}>
          <div id="logo" className="flex justify-center">
            <img
              alt="Coat of Arms of Rwanda logo"
              src={logo}
            />
          </div>
          <ul className="list-reset text-left flex flex-col h-4/6">
            <li
              className="dropdown"
              id="dropdown"
            >
              <NavLink
                className={`link-item colored-link ${useLocation().pathname === '/' ? 'active' : ''}`}
                to="/"
              >
                <img
                  src={useLocation().pathname === '/' ? activeHome : home}
                  alt=""
                />
                <span className="menu-link">
                  Home
                </span>
              </NavLink>
            </li>
            <li
              className="dropdown"
              id="dropdown"
            >
              <NavLink
                className={`link-item colored-link ${useLocation().pathname === '/users' ? 'active' : ''}`}
                to="/carOwners"
              >
                <img
                  src={useLocation().pathname === '/users' ? activeUser : user_}
                  alt=""
                />
                <span className="menu-link">
                  Car owners
                </span>
              </NavLink>
            </li>
            <li
              className="dropdown"
              id="dropdown"
            >
              <NavLink
                className={`link-item colored-link ${useLocation().pathname === '/departments' ? 'active' : ''}`}
                to="/vehicles"
              >
                <img
                  src={useLocation().pathname === '/departments' ? activeDepartment : department}
                  alt=""
                />
                <span className="menu-link">
                  Vehicles
                </span>
              </NavLink>
            </li>
          </ul>
          <div
            className="dropdown mt-auto relative flex h-1/4"
            id="dropdown"
            onClick={toggleMenu}
          >
            {menuStatus ?
              <div className="absolute">
                <button onClick={toggleModal}>Settings</button>
                <button onClick={handleLogout}>Logout</button>
              </div> : ''}
            <div className="avatar"><div className='mt-2'>WM</div></div>
            <div className="user-name ml-2 mt-1">{user?.firstName} ...</div>
          </div>
        </div>
        <div className=' full-height w-full bg-customBg'>{children}</div>
      </div>
      <Modal ref={childRef} width="767px" children={
        <div>
          <div className="modal-title text-center my-10">
            Settings
          </div>
          <div className="modal-body">
            <form>
              <div className="">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First name</label>
                      <input defaultValue={user?.firstName} onChange={(e) => { setFirstName(e.target.value) }} type="text" name="first-name" id="first-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Last name</label>
                      <input defaultValue={user?.lastName} onChange={(e) => { setLastName(e.target.value) }} type="text" name="last-name" id="last-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">Email address</label>
                      <input defaultValue={user?.email} onChange={(e) => { setEmail(e.target.value) }} type="text" name="email-address" id="email-address" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                      <input defaultValue={""} onChange={(e) => { setPassword(e.target.value) }} type="password" name="email-address" id="password" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                  </div>
                </div>
                <div className="">
                  <button type="submit" hidden></button>
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer my-10">
            <div className="flex justify-center">
              <button className='cancel mr-9' onClick={toggleModal}>Cancel</button>
              <button onClick={updateUser}>Submit</button>
            </div>
          </div>
        </div>
      } />
    </>
  )
}

export default DashboardLayout

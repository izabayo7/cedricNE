import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../assets/scss/dashboard.scss'
import '../assets/scss/modal.scss'
import Modal from '../components/Modal';
import { selectIsAdmin, selectIsLoggedIn } from '../store/modules/authSlice';
// import { addUser, removeUser, selectUsers, setUsers, updateUser } from '../store/modules/userSlice';
import AppServices from "../services";
import toast from 'react-hot-toast';
// import { selectDepartments, setDepartments } from '../store/modules/departmentSlice';
import { useDispatch, useSelector } from 'react-redux';

function Users() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isAdmin = useSelector(selectIsAdmin);
  const users = useSelector(selectUsers);
  const departments = useSelector(selectDepartments);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({});

  useEffect(() => {
    if (!isAdmin && isLoggedIn) {
      navigate('/');
    } else if (isLoggedIn) {
      AppServices.getDepartments().then((response) => {
        if (response.data.length) {
          dispatch(setDepartments(response.data))
        }
      })
      AppServices.getUsers().then((response) => {
        if (response.data.length) {
          dispatch(setUsers(response.data))
        }
      })
    }
  }, [isLoggedIn, isAdmin])

  const childRef = useRef<Current>(null);

  const toggleModal = () => {
    if (childRef.current)
      childRef.current.toggleModal();
  }


  const [selectedUser, setSelectedUser] = useState({})
  const [selectedUserId, setSelectedUserId] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!selectedUser.departmentId && departments.length)
      selectedUser.departmentId = departments[0].id || "";
  }, [selectedUser, departments])

  const handleSubmit = (e) => {
    e.preventDefault();

    const isUpdating = selectedUserId !== "";
    // if(isUpdating)


    toast.promise(
      isDeleting ? AppServices.deleteUser(selectedUserId) : isUpdating ? AppServices.updateUser({ ...selectedUser, password: undefined }, selectedUserId) : AppServices.register(selectedUser),
      {
        loading: `${isDeleting ? 'Deleting' : isUpdating ? 'Updating' : 'Creating'} user ...`,
        success: (response) => {
          if (isDeleting) dispatch(removeUser(selectedUserId));
          else if (isUpdating) dispatch(updateUser(response.data));
          else dispatch(addUser(response.data))

          if (selectedUser.password?.length) {
            AppServices.updateUserPassword({ newPassword: selectedUser.password, confirmPassword: selectedUser.password }, selectedUserId)
          }

          let message = `${isDeleting ? 'Deleted' : isUpdating ? 'Updated' : 'Created'} user successfully`
          if (isUpdating) setSelectedUserId("");
          if (isDeleting) setIsDeleting(false);
          setSelectedUser({});
          toggleModal();
          return message;
        },
        error: (error) => {
          let message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          if (typeof message === 'object') {
            message = "Can't remove a user that has registrationNumbers"
          }
          return message;
        },
      }
    );
  }

  return (
    <div className="pl-10 pt-10">
      <div>
        <div className="title">
          System users
        </div>
        <div className="md:flex">
          <div className='w-full'>
            <div className="md:flex">
              <div><button onClick={toggleModal} className='requestRegNum flex'>
                <div><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 14.252V22H4C3.99969 20.7789 4.27892 19.5739 4.8163 18.4774C5.35368 17.3809 6.13494 16.4219 7.10022 15.674C8.0655 14.9261 9.18918 14.4091 10.3852 14.1626C11.5811 13.9162 12.8177 13.9467 14 14.252ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM18 17V14H20V17H23V19H20V22H18V19H15V17H18Z" fill="white" />
                </svg>

                </div>
                <div className='mt-1'>Create a new user</div>

              </button>
              </div>
              <div className='flex ml-auto mr-6'>
                <div className='mt-2 ml-4'>
                  <input onChange={(e) => { setFilter({ ...filter, search: e.target.value }) }} type="text" name="" id="" placeholder='search' className='input px-3 py-1' />
                </div>
              </div>
            </div>
            <div className='table w-full'>
              <table>
                <thead>
                  <tr
                    className="
              flex flex-col flex-no
              wrap
              table-row
              rounded-l-lg rounded-none
              mb-2 mb-0
            "
                  >
                    <th>User names</th>
                    <th>Role</th>
                    <th>Department</th>
                    <th>Date added </th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="sm:flex-1 sm:flex-none">
                  {((elements) => {
                    if (filter.search) {
                      return elements.filter(element => element.firstName.toLowerCase().includes(filter?.search?.toLowerCase() || "")
                        || element.lastName.toLowerCase().includes(filter?.search?.toLowerCase() || "")
                        || element.email.toLowerCase().includes(filter?.search?.toLowerCase() || "")
                      )
                    }
                    return elements
                  })(users).map((user) => <tr key={user.id} className="
              sm:flex
              sm:flex-col
              sm:flex-no
              sm:wrap
              sm:table-row
              sm:mb-2
              sm:mb-0
              main-header
              sm:header tr
            ">
                    <td className='pt-1 p-3'>
                      <div className="flex">
                        <div></div>
                        <div>{user.firstName} {user.lastName}</div>
                      </div>
                    </td>
                    <td className='pt-1 p-3'>                      <div className='status rounded'>
                      {user.isAdmin ? 'Admin' : 'User'}
                    </div></td>
                    <td className='pt-1 p-3'>
                      <div className='status'>
                        {user.department?.name}
                      </div>
                    </td>
                    <td className='pt-1 p-3'>{((date) => { return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` })(new Date(user.createdAt || ""))}</td>
                    <td className='pt-1 p-3'>
                      <div className="flex">
                        <div onClick={() => { setSelectedUser({ firstName: user.firstName, lastName: user.lastName, departmentId: user.departmentId, email: user.email, gender: user.gender }); setSelectedUserId(user.id || ""); toggleModal(); }} className='status cursor-pointer rounded mr-2'>
                          Update
                        </div>
                        <div onClick={() => { setIsDeleting(true); setSelectedUserId(user.id || ""); toggleModal() }} className='status cursor-pointer rounded'>
                          Delete
                        </div>
                      </div>
                    </td>
                  </tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div >
      <Modal ref={childRef} width="767px">
        {isDeleting ? <div>
          <div className="modal-title text-center my-10">
            Are you sure you want to delete the selected user ?
          </div>
          <div className="modal-footer my-10">
            <div className="flex justify-center">
              <button className='cancel mr-9' onClick={toggleModal}>No</button>
              <button onClick={handleSubmit}>Yes</button>
            </div>
          </div>
        </div> : <div>
          <div className="modal-title text-center my-10">
            {selectedUserId !== "" ? "Update user" : "Create user"}
          </div>
          <div className="modal-body">
            <form action="#" method="POST">
              <div className="">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First name</label>
                      <input defaultValue={selectedUser?.firstName} onChange={(e) => { setSelectedUser({ ...selectedUser, firstName: e.target.value || "" }) }} type="text" name="first-name" id="first-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Last name</label>
                      <input defaultValue={selectedUser?.lastName} onChange={(e) => { setSelectedUser({ ...selectedUser, lastName: e.target.value || "" }) }} type="text" name="last-name" id="last-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">Email address</label>
                      <input defaultValue={selectedUser?.email} onChange={(e) => { setSelectedUser({ ...selectedUser, email: e.target.value || "" }) }} type="text" name="email-address" id="email-address" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                      <input defaultValue={""} onChange={(e) => { setSelectedUser({ ...selectedUser, password: e.target.value || "" }) }} type="password" name="email-address" id="password" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
                      <select defaultValue={selectedUser?.departmentId} onChange={(e) => { setSelectedUser({ ...selectedUser, departmentId: e.target.value || "" }) }} id="department" name="country" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option value="">Select department</option>
                        {departments.map((department) => <option key={department.id} value={department.id}>{department.name}</option>)}
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                      <select defaultValue={selectedUser?.gender} onChange={(e) => {
                        setSelectedUser({
                          ...selectedUser, gender: ((str) => {
                            if (str === "male") return 'male'
                            return 'female'
                          })(e.target.value)
                        })
                      }} id="department" name="country" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option value="">Select gender</option>
                        <option value="male">male</option>
                        <option value="female">female</option>
                      </select>
                    </div>

                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer my-10">
            <div className="flex justify-center">
              <button className='cancel mr-9' onClick={toggleModal}>Cancel</button>
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>}
      </Modal>
    </div >
  )
}

export default Users

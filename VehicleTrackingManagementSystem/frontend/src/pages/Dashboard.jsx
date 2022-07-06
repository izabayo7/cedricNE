import { useEffect, useRef, useState } from 'react'
import '../assets/scss/dashboard.scss'
import { selectIsLoggedIn, selectUser } from '../store/modules/authSlice';
import AppServices, { API_URL } from "../services";
// import { addRegistrationNumber, selectRegistrationNumbers, setRegistrationNumbers, updateRegistrationNumber } from '../store/modules/registrationNumberSlice';
import Modal from '../components/Modal';
import toast from 'react-hot-toast';
import pdf from '../assets/images/pdf.png'
import xlsx from '../assets/images/xlsx.png'
import word from '../assets/images/docx.png'
import ppt from '../assets/images/pptx.png'
import zip from '../assets/images/zip.svg'
import upload from '../assets/images/upload.svg'
import { useDispatch, useSelector } from 'react-redux';

function Dashboard() {
  // const isLoggedIn = useSelector(selectIsLoggedIn)
  // const dispatch = useDispatch();

  // const regNumbers = useSelector(selectRegistrationNumbers);
  // const user = useSelector(selectUser);

  // const [selectedRegNumber, setSelectedRegNumber] = useState({})
  // const [selectedRegNumberId, setSelectedRegNumberId] = useState("")
  // const [filter, setFilter] = useState({})
  // const [submitted, setSubmitted] = useState(false)
  // const [copyStatus, setCopyStatus] = useState(false)
  // const [file, setFile] = useState<any>(null)
  // const [years, setYears] = useState([])

  // const [modalStatus, setModalStatus] = useState(1);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     AppServices.getRegNumbers().then((response) => {
  //       if (response.data.length) {
  //         dispatch(setRegistrationNumbers(response.data))
  //         setYears(getYears(response.data));
  //       }
  //     })
  //   }
  // }, [isLoggedIn])

  // const childRef = useRef<Current>(null);

  // const toggleModal = () => {
  //   if (childRef.current)
  //     childRef.current.toggleModal();

  //   setFile(null)
  // }

  // const copyRegNumber = (e) => {
  //   e.preventDefault();
  //   navigator.clipboard.writeText(`${selectedRegNumber.indexNumber}/${selectedRegNumber.department}/${selectedRegNumber.year}`);
  //   setCopyStatus(true);
  //   setTimeout(() => {
  //     setCopyStatus(false)
  //   }, 3000);
  // }
  // const openDocument = (regNumber) => {
  //   window.open(`${API_URL}/regNumber/${regNumber.id}/document`, '_blank');
  // }
  // const handleFileChange = (e) => {
  //   e.preventDefault();
  //   setFile(e.target.files[0]);
  // }
  // const getYears = (elements) => {
  //   let years = [];
  //   elements.map((regNumber) => { if (!years.includes(regNumber.year)) years.push(regNumber.year); });
  //   years.sort((a, b) => parseInt(b) - parseInt(a)).unshift('ALL');
  //   return years;
  // }
  // const handleSubmit = (e) => {

  //   e.preventDefault();

  //   if (submitted) return;
  //   setSubmitted(true);
  //   let formData = new FormData();

  //   if (modalStatus === 2) {
  //     setSelectedRegNumberId("");
  //     setSelectedRegNumber({});
  //     toggleModal();
  //     return;
  //   }
  //   else if (modalStatus === 3) {
  //     formData.append('document', file);
  //   }

  //   toast.promise(
  //     modalStatus == 1 ? AppServices.registerRegNumber() : modalStatus == 3 ? AppServices.updateRegNumberDocument(formData, selectedRegNumberId) : AppServices.cancelRegNumber({ description: selectedRegNumber.description }, selectedRegNumberId),
  //     {
  //       loading: `${modalStatus == 1 ? 'Requesting' : modalStatus == 3 ? 'Updating' : 'Canceling'} Registration Number ...`,
  //       success: (response) => {
  //         if (modalStatus !== 1) dispatch(updateRegistrationNumber(response.data));
  //         else dispatch(addRegistrationNumber(response.data))

  //         let message = `${modalStatus == 1 ? 'Requested' : modalStatus == 3 ? 'Updated' : 'Cancelled'} Registration Number successfully`
  //         if (modalStatus !== 1) {
  //           setSelectedRegNumberId("");
  //           setSelectedRegNumber({});
  //           toggleModal();
  //         } else {
  //           setSelectedRegNumber(response.data);
  //           setSelectedRegNumberId(response.data.id);
  //           setModalStatus(2);
  //         }
  //         setSubmitted(false);
  //         return message;
  //       },
  //       error: (error) => {
  //         let message =
  //           (error.response &&
  //             error.response.data &&
  //             error.response.data.message) ||
  //           error.message ||
  //           error.toString();
  //         if (typeof message === 'object') {
  //           message = "Unexpected error";
  //         }
  //         setSubmitted(false);
  //         return message;
  //       },
  //     }
  //   );
  // }

  // const filterRegNumbers = (elements) => {
  //   if (filter.search) {
  //     return elements.filter((element) => element.department.toLowerCase().includes(filter?.search?.toLowerCase() || "")
  //       || element.user?.firstName.toLowerCase().includes(filter?.search?.toLowerCase() || "")
  //       || element.user?.lastName.toLowerCase().includes(filter?.search?.toLowerCase() || "")
  //       || (element.indexNumber?.toString().toLowerCase().includes(filter?.search?.split('/')[0] || "") && element.department.toLowerCase().includes(filter?.search?.split('/')[1]?.toLowerCase() || "") && element.year?.toString().toLowerCase().includes(filter?.search?.split('/')[2] || ""))
  //     )
  //   }
  //   if (filter.year) {
  //     return filter.year === "ALL" ? elements : elements.filter((element) => element.year == filter.year)
  //   }
  //   return elements
  // }

  return (
    <div className="pl-10 pt-10">
      Test
      {/* <div>
        <div className="title">
          Your registration numbers
        </div>
        <div className="md:flex">
          <div className='w-full md:w-3/4'>
            <div className="md:flex">
              <div><button hidden={user?.isAdmin} onClick={() => {
                setModalStatus(1);
                toggleModal();
              }} className='requestRegNum cursor-pointer flex'>
                <div><svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.1249 4.375H14.8749C15.339 4.375 15.7842 4.55937 16.1123 4.88756C16.4405 5.21575 16.6249 5.66087 16.6249 6.125V13.2738C17.209 13.4802 17.7012 13.8864 18.0147 14.4207C18.3282 14.955 18.4427 15.5829 18.338 16.1934C18.2333 16.804 17.9161 17.3579 17.4425 17.7571C16.9689 18.1564 16.3694 18.3754 15.7499 18.3754C15.1304 18.3754 14.5309 18.1564 14.0573 17.7571C13.5837 17.3579 13.2665 16.804 13.1618 16.1934C13.0571 15.5829 13.1716 14.955 13.4851 14.4207C13.7986 13.8864 14.2908 13.4802 14.8749 13.2738V6.125H13.1249V8.75L9.1874 5.25L13.1249 1.75V4.375ZM4.3749 7.72625C3.79085 7.51983 3.29857 7.11358 2.98509 6.57929C2.67161 6.04501 2.5571 5.4171 2.66182 4.80656C2.76653 4.19602 3.08373 3.64215 3.55733 3.24286C4.03093 2.84357 4.63044 2.62457 5.2499 2.62457C5.86936 2.62457 6.46888 2.84357 6.94248 3.24286C7.41608 3.64215 7.73327 4.19602 7.83799 4.80656C7.9427 5.4171 7.8282 6.04501 7.51472 6.57929C7.20124 7.11358 6.70896 7.51983 6.1249 7.72625V13.2738C6.70896 13.4802 7.20124 13.8864 7.51472 14.4207C7.8282 14.955 7.9427 15.5829 7.83799 16.1934C7.73327 16.804 7.41608 17.3579 6.94248 17.7571C6.46888 18.1564 5.86936 18.3754 5.2499 18.3754C4.63044 18.3754 4.03093 18.1564 3.55733 17.7571C3.08373 17.3579 2.76653 16.804 2.66182 16.1934C2.5571 15.5829 2.67161 14.955 2.98509 14.4207C3.29857 13.8864 3.79085 13.4802 4.3749 13.2738V7.72625ZM5.2499 6.125C5.48197 6.125 5.70453 6.03281 5.86862 5.86872C6.03272 5.70462 6.1249 5.48206 6.1249 5.25C6.1249 5.01794 6.03272 4.79538 5.86862 4.63128C5.70453 4.46719 5.48197 4.375 5.2499 4.375C5.01784 4.375 4.79528 4.46719 4.63119 4.63128C4.46709 4.79538 4.3749 5.01794 4.3749 5.25C4.3749 5.48206 4.46709 5.70462 4.63119 5.86872C4.79528 6.03281 5.01784 6.125 5.2499 6.125ZM5.2499 16.625C5.48197 16.625 5.70453 16.5328 5.86862 16.3687C6.03272 16.2046 6.1249 15.9821 6.1249 15.75C6.1249 15.5179 6.03272 15.2954 5.86862 15.1313C5.70453 14.9672 5.48197 14.875 5.2499 14.875C5.01784 14.875 4.79528 14.9672 4.63119 15.1313C4.46709 15.2954 4.3749 15.5179 4.3749 15.75C4.3749 15.9821 4.46709 16.2046 4.63119 16.3687C4.79528 16.5328 5.01784 16.625 5.2499 16.625ZM15.7499 16.625C15.982 16.625 16.2045 16.5328 16.3686 16.3687C16.5327 16.2046 16.6249 15.9821 16.6249 15.75C16.6249 15.5179 16.5327 15.2954 16.3686 15.1313C16.2045 14.9672 15.982 14.875 15.7499 14.875C15.5178 14.875 15.2953 14.9672 15.1312 15.1313C14.9671 15.2954 14.8749 15.5179 14.8749 15.75C14.8749 15.9821 14.9671 16.2046 15.1312 16.3687C15.2953 16.5328 15.5178 16.625 15.7499 16.625Z" fill="white" />
                </svg>
                </div>
                <div className='mt-1'>Request a Registration Number</div>

              </button>
              </div>
              <div className='flex ml-auto mr-6'>
                <div className='mt-1'>
                  <select onChange={(e) => { setFilter({ ...filter, year: e.target.value }) }} name="country" className="mt-1 input">
                    {
                      years.map((year, index) => <option value={year} key={index}>{year}</option>)
                    }
                  </select>
                </div>
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
                    <th>Registation numbers</th>
                    <th>Owner</th>
                    <th>Date</th>
                    <th>Status</th>
                    {isAdmin ? '' :
                      <th>Actions</th>}
                  </tr>
                </thead>
                <tbody className="sm:flex-1 sm:flex-none">
                  {filterRegNumbers(regNumbers).map(
                    (regNumber) => <tr key={regNumber.id} className="
              sm:flex
              sm:flex-col
              sm:flex-no
              sm:wrap
              sm:table-row
              sm:mb-2
              sm:mb-0
              main-header
              sm:header tr
              cursor-pointer
            " onDoubleClick={() => { setModalStatus(5); setSelectedRegNumber(regNumber); setSelectedRegNumberId(regNumber.id || ""); toggleModal(); }}>
                      <td className='pt-1 p-3'>
                        <div className="flex">
                          <div onDragEnd={() => { setModalStatus(3); setSelectedRegNumber(regNumber); setSelectedRegNumberId(regNumber.id || ""); toggleModal(); }} onClick={
                            regNumber.document ? () => { openDocument(regNumber) } : () => { setModalStatus(3); setSelectedRegNumber(regNumber); setSelectedRegNumberId(regNumber.id || ""); toggleModal(); }
                          } style={{ width: "30px", height: "30px", display: "flex", alignItems: "center", cursor: "pointer" }}>
                            <img
                              src={((str) => {
                                if (!str) return;
                                let extension = str.split('.');
                                extension = extension[extension.length - 1];
                                switch (extension) {
                                  case 'pdf':
                                    return pdf;
                                  case 'docx':
                                    return word;
                                  case 'xlsx':
                                    return xlsx;
                                  case 'zip':
                                    return zip;

                                  default:
                                    return;
                                }
                              })(regNumber.document) || upload}
                            />
                          </div>
                          <div>{regNumber.indexNumber}/{regNumber.department}/{regNumber.year}</div>
                        </div>
                      </td>
                      <td className='pt-1 p-3'>{user?.id === regNumber.userId ? "Me" : `${regNumber.user?.firstName} ${regNumber.user?.lastName}`}</td>
                      <td className='pt-1 p-3'>{((date) => { return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` })(new Date(regNumber.createdAt || ""))}</td>
                      <td className='pt-1 p-3'>
                        <div onClick={regNumber.isCanceled ? () => { setModalStatus(4); setSelectedRegNumber(regNumber); setSelectedRegNumberId(regNumber.id || ""); toggleModal() } : undefined} className='status'>
                          {regNumber.isCanceled ? "Canceled" : "Active"}
                        </div>
                      </td>
                      {isAdmin ? '' : <td className='pt-1 p-3'>
                        <div className="flex">
                          <div onClick={() => { setModalStatus(4); setSelectedRegNumber(regNumber); setSelectedRegNumberId(regNumber.id || ""); toggleModal() }} className='status cursor-pointer rounded'>
                            Cancel
                          </div>
                        </div>
                      </td>
                      }

                    </tr>)}
                </tbody>
              </table>
            </div>
          </div>
          <div className='statistics mt-4 md:mt-0'>
            <div className="title">Total registration numbers </div>
            <div className="total">{filterRegNumbers(regNumbers).length}</div>
            <div>
              <div className="flex justify-between">
                <h3 className="text-justify text-primary pb-1.5 text-xs">
                  Attached
                </h3>
                <h3 className="mr-4 text-completed text-xs">{((els) => {
                  let total = 0;
                  els.forEach((el) => {
                    if (el.document && !el.isCanceled) total++;
                  })
                  return total;
                })(filterRegNumbers(regNumbers))}</h3>
              </div>
              <div className="containerStyles">
                <div
                  className="filterStyles bg-customGreen"
                  style={{
                    width: + (((els) => {
                      let total = 0;
                      els.forEach((el) => {
                        if (el.document && !el.isCanceled) total++;
                      })
                      return total;
                    })(filterRegNumbers(regNumbers)) / filterRegNumbers(regNumbers).length) * 100 + '%'
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <h3 className="text-justify text-primary pb-1.5 text-xs">
                  Unattached
                </h3>
                <h3 className="mr-4 text-completed text-xs">{((els) => {
                  let total = 0;
                  els.forEach((el) => {
                    if (!el.document && !el.isCanceled) total++;
                  })
                  return total;
                })(filterRegNumbers(regNumbers))}</h3>
              </div>
              <div className="containerStyles">
                <div
                  className="filterStyles bg-customRed"
                  style={{
                    width: + (((els) => {
                      let total = 0;
                      els.forEach((el) => {
                        if (!el.document && !el.isCanceled) total++;
                      })
                      return total;
                    })(filterRegNumbers(regNumbers)) / filterRegNumbers(regNumbers).length) * 100 + '%'
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <h3 className="text-justify text-primary pb-1.5 text-xs">
                  Cancelled
                </h3>
                <h3 className="mr-4 text-completed text-xs">{((els) => {
                  let total = 0;
                  els.forEach((el) => {
                    if (el.isCanceled) total++;
                  })
                  return total;
                })(filterRegNumbers(regNumbers))}</h3>
              </div>
              <div className="containerStyles">
                <div
                  className="filterStyles bg-customRed"
                  style={{
                    width: + (((els) => {
                      let total = 0;
                      els.forEach((el) => {
                        if (el.isCanceled) total++;
                      })
                      return total;
                    })(filterRegNumbers(regNumbers)) / filterRegNumbers(regNumbers).length) * 100 + '%'
                  }}
                ></div>
              </div>
            </div>            
          </div>
        </div>
      </div >
      <Modal ref={childRef} width={((num) => { if (num === 1) return '510px'; else return '510px' })(modalStatus)}>
        <div>
          <div className="modal-title small text-center my-10">
            {modalStatus === 1 ? "Are you sure you want to generate" : modalStatus === 4 ? "Are you sure you want to cancel" : modalStatus === 3 ? "Update Registration Number" : "Conglaturations !!!"}
            <br />
            {modalStatus === 1 ? "a new Registration Number?" : modalStatus === 4 ? "this Registration Number?" : modalStatus === 3 ? "" : "below is your Registration Number"}
          </div>
          <div hidden={[1].includes(modalStatus)} className="modal-body">
            <form>
              <div className="">
                <div className="px-4 py-5 bg-white sm:p-6">
                  {modalStatus === 4 ? <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-6">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">Why are you canceling this registration Number?</label>
                      <div className="mt-1">
                        <textarea defaultValue={selectedRegNumber?.description} onChange={(e) => { setSelectedRegNumber({ ...selectedRegNumber, description: e.target.value || "" }) }} id="description" name="about" rows={3} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="description"></textarea>
                      </div>
                    </div>
                  </div> :
                    modalStatus !== 3 ? <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-4 sm:col-span-4">
                        <div className="regNumber">{selectedRegNumber.indexNumber}/{selectedRegNumber.department}/{selectedRegNumber.year}</div>
                      </div>
                      <div className="col-span-2 sm:col-span-2">
                        <button onClick={copyRegNumber} className={`flex copyRegNumber ${copyStatus ? 'copied' : ''}`}>
                          <div>
                            <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g clipPath="url(#clip0_2104_303)">
                                <path d="M7.76662 6V3C7.76662 2.73478 7.8544 2.48043 8.01067 2.29289C8.16694 2.10536 8.37888 2 8.59987 2H18.5989C18.8199 2 19.0319 2.10536 19.1881 2.29289C19.3444 2.48043 19.4322 2.73478 19.4322 3V17C19.4322 17.2652 19.3444 17.5196 19.1881 17.7071C19.0319 17.8946 18.8199 18 18.5989 18H16.0992V21C16.0992 21.552 15.7242 22 15.2601 22H5.27268C5.1628 22.0008 5.05387 21.9755 4.95215 21.9256C4.85043 21.8757 4.75792 21.8022 4.67995 21.7093C4.60198 21.6164 4.54008 21.5059 4.4978 21.3841C4.45552 21.2624 4.4337 21.1319 4.43359 21L4.43609 7C4.43609 6.448 4.81106 6 5.27518 6H7.76662ZM6.1026 8L6.1001 20H14.4327V8H6.1026ZM9.43313 6H16.0992V16H17.7657V4H9.43313V6Z" />
                              </g>
                              <defs>
                                <clipPath id="clip0_2104_303">
                                  <rect width="19.9981" height="24" fill="white" transform="translate(0.949219)" />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                          <div>copy</div>
                        </button>
                      </div>
                    </div> :
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-6">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Attach the document</label>
                          <input onChange={handleFileChange} type="file" accept='application/zip,application/x-zip,application/x-zip-compressed,application/octet-stream, application/pdf, application/msword, application/vnd.ms-powerpoint, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel' hidden id="filePicker" />
                          <div onClick={(e) => { document.getElementById('filePicker')?.click() }} className="uploadAttachment cursor-pointer">
                            <div className='mr-2'>
                              <svg width="29" height="24" viewBox="0 0 29 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.38028 20.9808C6.74499 20.8759 5.19118 20.3421 3.94071 19.4556C2.69025 18.5692 1.80707 17.3753 1.41729 16.0446C1.02751 14.7139 1.15105 13.3143 1.77028 12.0457C2.38951 10.7772 3.47275 9.70445 4.86535 8.98076C5.16167 7.05085 6.28976 5.27727 8.03851 3.99192C9.78725 2.70658 12.0368 1.99756 14.3662 1.99756C16.6956 1.99756 18.9451 2.70658 20.6939 3.99192C22.4426 5.27727 23.5707 7.05085 23.867 8.98076C25.2596 9.70445 26.3429 10.7772 26.9621 12.0457C27.5813 13.3143 27.7049 14.7139 27.3151 16.0446C26.9253 17.3753 26.0421 18.5692 24.7917 19.4556C23.5412 20.3421 21.9874 20.8759 20.3521 20.9808V20.9998H8.38028V20.9808ZM15.5634 12.9998H19.1549L14.3662 7.99976L9.57746 12.9998H13.169V16.9998H15.5634V12.9998Z" fill="white" />
                              </svg>

                            </div>
                            <div>{file ? file.name : selectedRegNumber.document || "Pick a file"}</div>
                          </div>
                        </div>
                      </div>}
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer my-10">
            <div className="flex justify-center">
              <button className='cancel mr-9' onClick={toggleModal}>{modalStatus === 1 ? "No" : modalStatus === 2 ? "Close" : "Cancel"}</button>
              <button hidden={[2, 5].includes(modalStatus) || isAdmin && modalStatus === 4} onClick={handleSubmit}>{modalStatus === 1 ? "Yes" : "Submit"}</button>
            </div>
          </div>
        </div>
      </Modal> */}
    </div >
  )
}

export default Dashboard

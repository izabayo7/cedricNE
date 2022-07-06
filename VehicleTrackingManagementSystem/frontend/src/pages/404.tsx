import '../assets/scss/404.scss'
import { useLocation } from 'react-router-dom'

function NotFound() {
  const location = useLocation();

  return (
    <div id="page_not_found">
      <div className="nav bg-yellow-100">
        <div className="flex place-items-center w-full justify-center">
          <div className="my-auto">
            <div className="margin">
              {location.pathname == "/access_denied" ? 401 : 404}
            </div>
            <div className="long margin">
              {
                location.pathname == "/access_denied"
                  ? "Access Denied"
                  : "Page not found"
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound

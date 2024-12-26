import {Link, withRouter} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {BsBriefcaseFill} from 'react-icons/bs'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const OnClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="mobile-view-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="home-website-logo"
          />
        </Link>

        <ul className="home-job-container">
          <li>
            <Link to="/" className="nav-link">
              <AiFillHome className="icon" />
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="nav-link">
              <BsBriefcaseFill className="icon" />
            </Link>
          </li>
        </ul>
        <div className="logout-btn-container">
          <button className="logout-btn" type="button" onClick={OnClickLogout}>
            .<FiLogOut className="logout-icon" />
          </button>
        </div>
      </div>
      <div className="desktop-view-container">
        <Link to="/" className="nav-link">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="home-website-logo"
          />
        </Link>
        <ul className="home-job-container">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="nav-link">
              Jobs
            </Link>
          </li>
        </ul>
        <div className="logout-btn-container">
          <button className="logout-btn" type="button" onClick={OnClickLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}
export default withRouter(Header)

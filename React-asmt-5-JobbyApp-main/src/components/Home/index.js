import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="mobile-view-home-container">
      <h1 className="home-heading">Find The Job That Fits Your Life</h1>
      <p className="home-description">
        Millions of people are searching for jobs,salary information,company
        reviews. Find the job that fits your ability and potential.
      </p>
      <div className="home-btn-container">
        <Link to="/jobs">
          <button type="button" className="home-button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)
export default Home

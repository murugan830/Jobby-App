import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import JobCard from '../JobCard'
import FilterGroups from '../FilterGroups'

import ProfileCard from '../ProfileCard'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]
const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    radioInput: '',
    checkboxInputs: [],
  }

  componentDidMount() {
    this.getAllJobs()
  }

  getAllJobs = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const {searchInput, checkboxInputs, radioInput} = this.state

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${checkboxInputs}&minimum_package=${radioInput}&search=${searchInput}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.jobs.map(eachJob => ({
        id: eachJob.id,
        companyLogoUrl: eachJob.company_logo_url,
        title: eachJob.title,
        rating: eachJob.rating,
        location: eachJob.location,
        employmentType: eachJob.employment_type,
        packagePerAnnum: eachJob.package_per_annum,
        jobDescription: eachJob.job_description,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobsSuccessView = () => {
    const {jobsList} = this.state

    const jobsListCount = jobsList.length > 0

    return jobsListCount ? (
      <ul className="jobs-list">
        {jobsList.map(eachItem => (
          <JobCard jobDetails={eachItem} key={eachItem.id} />
        ))}
      </ul>
    ) : (
      <div className="no-job-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  onclickErrorButton = () => {
    this.getAllJobs()
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="failure-view-heading">Oop! Something Went Wrong</h1>
      <p className="failure-view-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="retry-btn"
        type="button"
        onClick={this.onclickErrorButton}
      >
        Retry
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" height="50" width="50" color="#ffffff" />
    </div>
  )

  renderAllJobs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  onGetRadioOption = id => {
    this.setState({radioInput: id}, this.getAllJobs)
  }

  onGetCheckboxInputOption = id => {
    const {checkboxInputs} = this.state
    const inputNotInList = checkboxInputs.filter(eachItem => eachItem === id)

    if (inputNotInList.length === 0) {
      this.setState(
        prevState => ({
          checkboxInputs: [...prevState.checkboxInputs, id],
        }),
        this.getAllJobs,
      )
    } else {
      const filteredData = checkboxInputs.filter(eachItem => eachItem !== id)
      this.setState({checkboxInputs: filteredData}, this.getAllJobs)
    }
  }

  onSubmitSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getAllJobs()
    }
  }

  onClickSearchButton = () => {
    this.getAllJobs()
  }

  searchComponent = () => {
    const {searchInput} = this.state

    return (
      <>
        <input
          type="search"
          value={searchInput}
          className="search-input"
          onChange={this.onSubmitSearch}
          onKeyDown={this.onEnterSearchInput}
          placeholder="Search"
        />
        <button
          className="search-icon-button"
          type="button"
          data-testid="searchButton"
          onClick={this.onClickSearchButton}
        >
          <BsSearch className="search-icon" />.
        </button>
      </>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="profile-filter-container">
            <div className="search-mobile-view-container">
              {this.searchComponent()}
            </div>
            <ProfileCard />
            <hr className="separating" />
            <FilterGroups
              employmentTypesList={employmentTypesList}
              onGetCheckboxInputOption={this.onGetCheckboxInputOption}
              salaryRangesList={salaryRangesList}
              onGetRadioOption={this.onGetRadioOption}
            />
          </div>
          <div className="desktop-jobs-container">
            <div className="search-desktop-view-container">
              {this.searchComponent()}
            </div>
            {this.renderAllJobs()}
          </div>
        </div>
      </>
    )
  }
}
export default Jobs

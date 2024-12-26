import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'

import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class JobItemDetails extends Component {
  state = {jobItemsList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount = () => {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.job_details
      const similarJobs = data.similar_jobs

      const filteredSimilarJobs = similarJobs.map(eachItem => ({
        id: eachItem.id,
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      const filteredData = {
        id: updatedData.id,
        companyLogoUrl: updatedData.company_logo_url,
        companyWebsiteUrl: updatedData.company_website_url,
        employmentType: updatedData.employment_type,
        jobDescription: updatedData.job_description,
        lifeAtCompany: {
          description: updatedData.life_at_company.description,
          imageUrl: updatedData.life_at_company.image_url,
        },
        location: updatedData.location,
        packagePerAnnum: updatedData.package_per_annum,
        rating: updatedData.rating,
        skills: updatedData.skills.map(eachItem => ({
          name: eachItem.name,
          imageUrl: eachItem.image_url,
        })),
        title: updatedData.title,
        similarJobs: filteredSimilarJobs,
      }
      this.setState({
        jobItemsList: filteredData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobDetailsSuccessView = () => {
    const {jobItemsList} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
      similarJobs,
    } = jobItemsList
    const {description, imageUrl} = lifeAtCompany

    return (
      <>
        <div className="job-item-container">
          <div className="company-logo-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="title-rating-container">
              <h1 className="title">{title}</h1>
              <div className="rating-container">
                <AiFillStar className="star-icon" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="salary-container">
            <div className="location-employee-container">
              <div className="location-container">
                <MdLocationOn className="location-icon" />
                <p className="location">{location}</p>
              </div>
              <div className="employmentType-container">
                <BsBriefcaseFill className="suitcase-icon" />
                <p className="employmentType">{employmentType}</p>
              </div>
            </div>
            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr className="separator" />
          <div className="visit-container">
            <h1 className="description-heading">Description</h1>
            <a href={companyWebsiteUrl} className="visit-heading">
              Visit <BiLinkExternal />
            </a>
          </div>
          <p className="description-para">{jobDescription}</p>
          <h1 className="skills-heading">skills</h1>
          <ul className="skills-lists">
            {skills.map(eachItem => (
              <li key={eachItem.name} className="skills-list-item">
                <div className="skills-list-item-container">
                  <img
                    src={eachItem.imageUrl}
                    alt={eachItem.name}
                    className="skills-image"
                  />
                  <p className="skills-para">{eachItem.name}</p>
                </div>
              </li>
            ))}
          </ul>
          <h1 className="life-at-company-heading">Life at Company</h1>
          <div className="life-at-company-description-image-container">
            <p className="life-at-company-description">{description}</p>
            <img
              src={imageUrl}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>
        <div className="similar-job-container">
          <h1 className="similar-job-heading">Similar Jobs</h1>
          <ul className="similar-jobs-container-lists">
            {similarJobs.map(eachItem => (
              <SimilarJobs similarJobsDetails={eachItem} key={eachItem.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  onclickJobRetryButton = () => {
    this.getJobItemDetails()
  }

  renderJobDetailsFailureView = () => (
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
        onClick={this.onclickJobRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderJobDetailsLoaderView = () => (
    <div className="loader-job-item-container" data-testid="loader">
      <Loader type="ThreeDots" height="50" width="50" color="#ffffff" />
    </div>
  )

  renderSwitchJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobDetailsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderJobDetailsLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-container">
          {this.renderSwitchJobDetails()}
        </div>
      </>
    )
  }
}
export default JobItemDetails

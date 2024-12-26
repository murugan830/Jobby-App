import {Link} from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import {GiSuitcase} from 'react-icons/gi'
import {AiFillStar} from 'react-icons/ai'

import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
  } = jobDetails

  return (
    <li className="job-card-container">
      <Link to={`/jobs/${id}`} className="nav-link">
        <div className="company-logo-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
              <GiSuitcase className="suitcase-icon" />
              <p className="employmentType">{employmentType}</p>
            </div>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="separator" />
        <h1 className="description-heading">Description</h1>
        <p className="description-para">{jobDescription}</p>
      </Link>
    </li>
  )
}
export default JobCard

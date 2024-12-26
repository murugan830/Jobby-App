import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {GiSuitcase} from 'react-icons/gi'
import './index.css'

const SimilarJobs = props => {
  const {similarJobsDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobsDetails

  return (
    <li className="similar-job-card-container">
      <div className="company-logo-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      {/* <hr className="separator" /> */}
      <h1 className="description-heading">Description</h1>
      <p className="description-para">{jobDescription}</p>
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
      </div>
    </li>
  )
}
export default SimilarJobs

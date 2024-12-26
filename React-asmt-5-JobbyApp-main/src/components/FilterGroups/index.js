import './index.css'

const FilterGroups = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    onGetRadioOption,
    onGetCheckboxInputOption,
  } = props

  const getRadioOption = event => {
    onGetRadioOption(event.target.id)
  }

  const getCheckboxInputOption = event => {
    onGetCheckboxInputOption(event.target.id)
  }

  return (
    <div className="employee-salary-container">
      <div className="employmentTypes-container">
        <h1 className="employmentTypes-heading">Type of Employment</h1>
        <ul className="employmentTypes-lists">
          {employmentTypesList.map(eachItem => (
            <li
              className="employmentTypes-list"
              key={eachItem.employmentTypeId}
            >
              <input
                type="checkbox"
                className="checkbox-input"
                id={eachItem.employmentTypeId}
                onChange={getCheckboxInputOption}
              />
              <label htmlFor={eachItem.employmentTypeId} className="label">
                {eachItem.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <hr className="separating" />
      <div className="salaryRange-container">
        <h1 className="salaryRange-heading">Salary Range</h1>
        <ul className="salaryRange-lists">
          {salaryRangesList.map(eachItem => (
            <li className="salaryRange-list" key={eachItem.salaryRangeId}>
              <input
                type="radio"
                name="salary"
                id={eachItem.salaryRangeId}
                onChange={getRadioOption}
              />
              <label className="label" htmlFor={eachItem.salaryRangeId}>
                {eachItem.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default FilterGroups

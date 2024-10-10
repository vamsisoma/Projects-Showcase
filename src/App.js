import {Component} from 'react'
import './App.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

class App extends Component {
  state = {newList: [], activeId: categoriesList[0].id, iserror: false}

  componentDidMount() {
    this.getFromAPI()
  }

  getFromAPI = async () => {
    const {activeId} = this.state
    const url = `https://apis.ccbp.in/ps/projects?category=${activeId}`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const updatedList = data.projects.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
      }))
      this.setState({newList: updatedList})
    } else {
      this.setState({iserror: true})
    }
  }

  onChangeClicked = event => {
    console.log(event.target.value)
    this.setState({activeId: event.target.value}, this.getFromAPI)
  }

  onRetryClicked = () => {
    this.getFromAPI()
  }

  render() {
    const {newList, activeId, iserror} = this.state
    return (
      <div className="MainCon">
        <nav className="navCon">
          <img
            className="navImage"
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
          />
        </nav>

        <div className="SubCon">
          <select
            value={activeId}
            className="SelectStyle"
            onChange={this.onChangeClicked}
          >
            {categoriesList.map(each => (
              <option key={each.id} value={each.id}>
                {each.displayText}
              </option>
            ))}
          </select>

          {iserror ? (
            <div className="ErrorStyle">
              <img
                src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
                alt="failure view"
                className="iamgeFailure"
              />

              <h1>Oops! something went wrong</h1>
              <p>We cannot seem to find the page you are looking for</p>
              <button
                type="button"
                className="Errorbutton"
                onClick={this.onRetryClicked}
              >
                Retry
              </button>
            </div>
          ) : (
            <ul className="ulStyle">
              {newList.map(each => (
                <li key={each.id}>
                  <div className="ProjectCon">
                    <img
                      className="imageProject"
                      src={each.imageUrl}
                      alt={each.name}
                    />
                    <p className="headProject">{each.name}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App

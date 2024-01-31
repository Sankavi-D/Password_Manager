import './App.css'

const App = () => <div>Hello World</div>

export default App
import {Component} from 'react'
import {v4} from 'uuid'

import './App.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class App extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    searchInput: '',
    // isAddButtonClicked: false,
    isTrue: false,
    latestList: [],
    isShow: false,
  }

  onChangeWebsiteInput = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsernameInput = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  displayUserCard = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    const initial = websiteInput.slice(0, 1).toUpperCase()
    const classValue = colorList[Math.floor(Math.random() * 5)]
    const newValues = {
      id: v4(),
      initialValue: initial,
      websiteName: websiteInput,
      userName: usernameInput,
      password: passwordInput,
      classAdd: classValue,
    }
    this.setState(prevState => ({
      latestList: [...prevState.latestList, newValues],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
      searchInput: '',
      isTrue: true,
    }))

    // return (
    //   <div>
    //     <div>{websiteInput[0]}</div>
    //     <div>
    //       <p>{websiteInput}</p>
    //       <p>{usernameInput}</p>
    //       <img
    //         src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png alt"
    //         alt="stars"
    //       />
    //     </div>
    //     <div>
    //       <img
    //         src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png alt"
    //         alt="delete"
    //       />
    //     </div>
    //   </div>
    // )
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  searchList = event => {
    this.setState({searchInput: event.target.value})
  }

  deleteItem = id => {
    const {latestList} = this.state
    const newList = latestList.filter(eachValue => eachValue.id !== id)
    const caseOf = newList.length !== 0
    this.setState({latestList: newList, isTrue: caseOf})
  }

  //   onClickAddButton = () => {
  //     this.setState({isAddButtonClicked: true})
  //   }

  render() {
    const {
      websiteInput,
      usernameInput,
      passwordInput,
      latestList,
      isShow,
      searchInput,
      //   isAddButtonClicked,
    } = this.state
    let {isTrue} = this.state
    const newList = latestList.filter(eachValue =>
      eachValue.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="main-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="data-collection-container">
          <form className="input-container" onSubmit={this.displayUserCard}>
            <h1>Add New Password</h1>
            <div className="input-box">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-image"
              />
              <input
                type="text"
                placeholder="Enter Website"
                onChange={this.onChangeWebsiteInput}
                value={websiteInput}
              />
            </div>

            <div className="input-box">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                alt="username"
                className="input-image"
              />
              <input
                type="text"
                placeholder="Enter Username"
                onChange={this.onChangeUsernameInput}
                value={usernameInput}
              />
            </div>

            <div className="input-box">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                alt="password"
                className="input-image"
              />
              <input
                type="password"
                placeholder="Enter Password"
                onChange={this.onChangePasswordInput}
                value={passwordInput}
              />
            </div>

            <div className="add-button-container">
              <button type="submit" className="add-button">
                Add
              </button>
            </div>
          </form>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="password-manager-image"
            />
          </div>
        </div>
        <div className="password-display-container">
          <div className="header">
            <h1>Your Passwords</h1>
            <p className="count">{newList.length}</p>
            <div className="input-box">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="input-image"
              />
              <input
                type="search"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
                value={searchInput}
              />
            </div>
          </div>
          <hr />
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="checkBox"
              className="check-box"
              onChange={this.showPassword}
            />
            <label htmlFor="checkBox">Show Passwords</label>
          </div>
          {!isTrue && (
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
              />
              <p>No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul>
              {newList.map(eachValue => (
                <li id={eachValue.id} key={eachValue.id}>
                  <p>{eachValue.initialValue}</p>
                  <div>
                    <p>{eachValue.websiteName}</p>
                    <p>{eachValue.userName}</p>
                    {!isShow && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                      />
                    )}
                    {isShow && <p>{eachValue.password}</p>}
                  </div>
                  <button
                    type="button"
                    onClick={() => this.deleteItem(eachValue.id)}
                    data-testid="delete"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                    />
                  </button>
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

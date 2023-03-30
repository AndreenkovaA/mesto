export default class UserInfo {
  constructor(selectors) {
    this._nameSelector = selectors.nameSelector;
    this._jobSelector = selectors.jobSelector;
    this._profileName = document.querySelector(this._nameSelector);
    this._profileJob = document.querySelector(this._jobSelector);
  }

  getUserInfo() {
    const name = this._profileName.textContent;
    const job = this._profileJob.textContent;

    return { name: name, job: job };
  }

  setUserInfo(userData) {
    this._profileName.textContent = userData.name;
    this._profileJob.textContent = userData.job;
  }
}
export default class UserInfo {
  constructor(selectors) {
    this._nameSelector = selectors.nameSelector;
    this._jobSelector = selectors.jobSelector;
    this._avatarSelector = selectors.avatarSelector;
    this._profileName = document.querySelector(this._nameSelector);
    this._profileJob = document.querySelector(this._jobSelector);
    this._profileAvatar = document.querySelector(this._avatarSelector);
  }

  getUserInfo() {
    const name = this._profileName.textContent;
    const about = this._profileJob.textContent;

    return { name: name, about: about };
  }

  setUserInfo(userData) {
    this._profileName.textContent = userData.name;
    this._profileJob.textContent = userData.about;
    this._profileAvatar.src = userData.avatar;
    this.userId = userData._id;
  }
}
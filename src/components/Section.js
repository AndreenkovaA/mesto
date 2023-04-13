export default class Section {
  constructor({renderer}, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  addItem(element, asFirst = false) {
    if (asFirst) {
      this._container.prepend(element);
    } else {
      this._container.append(element);
    }
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }
}
export default class Section {
  constructor({items, renderer}, selector) {
    this._renderedItems = items;
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

  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}
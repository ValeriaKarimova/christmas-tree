import IntroView from "./IntroView";
import TreeView from "./TreeView";
import ToysView from "./ToysView";
import Filter from "./Filter";
import Cart from "./Cart";

class Application {
  filter: Filter;
  cart: Cart;

  constructor() {
    this.filter = new Filter();
    this.filter.restore();
    this.cart = new Cart();
    this.cart.restore();
  }

  init() {
    const introView = new IntroView(() => this.onToysClick());
    introView.init();

    document.querySelector(".controls__selected__count").innerHTML = String(
      this.cart.toyNums.length
    );

    const homeButton = document.querySelector(
      ".navigation__main-page"
    ) as HTMLElement;

    const treeButton = document.querySelector(
      ".navigation__tree-page"
    ) as HTMLElement;

    const toysButton = document.querySelector(
      ".navigation__toys-page"
    ) as HTMLElement;

    toysButton.addEventListener("click", () => this.onToysClick());
    treeButton.addEventListener("click", () => this.onTreeClick());
    homeButton.addEventListener("click", () => this.onHomeClick());
  }

  onToysClick() {
    const toysView = new ToysView(this.filter, this.cart);
    toysView.init();
    toysView.applyFilter();
  }

  onHomeClick() {
    const introView = new IntroView(() => this.onToysClick());
    introView.init();
  }

  onTreeClick() {
    const treeView = new TreeView();
    treeView.init();
  }
}

export default Application;

import IntroView from "./IntroView";
import TreeView from "./TreeView";
import ToysView from "./ToysView";
import Filter from "./Filter";

class Application {
  filter: Filter;

  constructor() {
    this.filter = new Filter();
    this.filter.restore();
  }

  init() {
    const introView = new IntroView(() => this.onToysClick());
    introView.init();
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
    const toysView = new ToysView(this.filter);
    toysView.init();
    toysView.applyFilter();
  }

  onHomeClick() {
    const introView = new IntroView(() => this.onToysClick());
    introView.init();
  }

  onTreeClick() {
    console.log("onTreeClick");
    const treeView = new TreeView();
    treeView.init();
  }
}

export default Application;

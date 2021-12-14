import IntroView from './IntroView';
import TreeView from './TreeView';
import ToysView from './ToysView';


class Application {



    init () {
        const introView = new IntroView(() => this.onToysClick());
        introView.init();

        const homeButton = document.querySelector('.navigation__main-page');
        const treeButton = document.querySelector('.navigation__tree-page');
        const toysButton = document.querySelector('.navigation__toys-page');
        toysButton.addEventListener('click', () => this.onToysClick());
        treeButton.addEventListener('click', () => this.onTreeClick());
        homeButton.addEventListener('click', () => this.onHomeClick());
    } 

    onToysClick() {
        console.log("onToysClick")
        const toysView = new ToysView();
        toysView.init();
    }

    onHomeClick() {
        console.log("onHomeClick")
        const introView = new IntroView(() => this.onToysClick());
        introView.init();
    }

    onTreeClick() {
        console.log("onTreeClick")
        const treeView = new TreeView();
        treeView.init();
    }

}

export default Application;
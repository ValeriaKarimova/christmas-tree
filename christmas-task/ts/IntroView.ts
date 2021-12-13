class IntroView {
    clickHandler: () => void;
    constructor(clickHandler: () => void) {
        this.clickHandler = clickHandler;
    }

    init() {
        const basicPart = document.querySelector('.main');
        basicPart.innerHTML = '';
        const pageContent = document.querySelector('#initial__page') as HTMLTemplateElement;
        basicPart.append(pageContent.content.cloneNode(true));
        const startButton = document.querySelector('.main__intro__block__start-button');
        startButton.addEventListener('click', this.clickHandler);
    }
}

export default IntroView;
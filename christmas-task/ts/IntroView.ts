class IntroView {
  clickHandler: () => void;
  constructor(clickHandler: () => void) {
    this.clickHandler = clickHandler;
  }

  init() {
    const basicPart = document.querySelector(".main") as HTMLElement;
    basicPart.innerHTML = "";
    const pageContent = document.querySelector(
      "#initial__page"
    ) as HTMLTemplateElement;
    basicPart.append(pageContent.content.cloneNode(true));
    const startButton = document.querySelector(
      ".main__intro__block__start-button"
    ) as HTMLElement;
    startButton.addEventListener("click", this.clickHandler);
  }
}

export default IntroView;

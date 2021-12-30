class Popup {
    showPopup() {
        const basicPart = document.querySelector(".main") as HTMLElement;
        const popupContent = document.querySelector(
          "#popup__window"
        ) as HTMLTemplateElement;
    
        basicPart.append(popupContent.content.cloneNode(true));
    
        document.querySelector(".popup__error-message").innerHTML =
          '"Извините, все слоты заполнены!"';
        const popupButton = document.querySelector(".popup__button-ok");
        popupButton.addEventListener("click", () => this.hidePopup());
      }
    
      hidePopup() {
        const basicPart = document.querySelector(".main") as HTMLElement;
        const popup = document.querySelector(
          ".popup__window__wrapper"
        ) as HTMLElement;
        basicPart.removeChild(popup);
      }
}

export default Popup;
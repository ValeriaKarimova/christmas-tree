import toyCardsData from "../src/data.json";
import Filter from "./Filter";
import FilterController from "./FilterController";

class ToysView {
  filter: Filter;

  constructor(filter: Filter) {
    this.filter = filter;
  }

  init() {
    const basicPart = document.querySelector(".main") as HTMLElement;
    basicPart.innerHTML = "";
    const pageContent = document.querySelector(
      "#toys__page"
    ) as HTMLTemplateElement;
    basicPart.append(pageContent.content.cloneNode(true));

    const filterController = new FilterController(
      this.filter,
      () => this.onFilterUpdated(),
      () => this.sortCards()
    );
    filterController.init();
    this.sortCards();
  }

  createCards() {
    const cardHolder = document.querySelector(".main__toys-block");
    cardHolder.innerHTML = "";

    toyCardsData.forEach((toyInfo) => {
      const cardContent = document.querySelector(
        "#toy__card-template"
      ) as HTMLTemplateElement;
      const cardView = cardContent.content.firstElementChild.cloneNode(
        true
      ) as HTMLDivElement;

      cardHolder.append(cardView);
      cardView.querySelector(".toy-card__text").innerHTML = toyInfo.name;
      cardView.querySelector(".amount").innerHTML = toyInfo.count;
      cardView.querySelector(".year").innerHTML = toyInfo.year;
      cardView.querySelector(".shape").innerHTML = toyInfo.shape;
      cardView.querySelector(".color").innerHTML = toyInfo.color;
      cardView.querySelector(".size").innerHTML = toyInfo.size;
      cardView.querySelector(".favorite").innerHTML = toyInfo.favorite
        ? "Да"
        : "Нет";
      cardView
        .querySelector(".toy-card__content__img")
        .setAttribute(
          "style",
          `background-image: url(../assets/toys/${toyInfo.num}.png)`
        );
    });
  }

  onFilterUpdated() {
    this.filter.store();
    this.applyFilter();
  }

  applyFilter() {
    document.querySelectorAll(".toy-card").forEach((card: HTMLElement) => {
      this.isSatisfy(card)
        ? card.setAttribute("style", "display: block")
        : card.setAttribute("style", "display: none");
    });
  }

  isSatisfy(card: HTMLElement): boolean {
    let result = true;
    const amount = +card.querySelector(".amount").innerHTML;
    const year = +card.querySelector(".year").innerHTML;

    if (this.filter.userInput != "") {
      if (
        card
          .querySelector(".toy-card__text")
          .innerHTML.search(this.filter.userInput) == -1
      ) {
        result = false;
      }
    }

    if (
      this.filter.isFavorite &&
      card.querySelector(".favorite").innerHTML !== "Да"
    ) {
      result = false;
    }

    if (
      !this.filter.shape.includes(card.querySelector(".shape").innerHTML) &&
      this.filter.shape.length !== 0
    ) {
      result = false;
    }

    if (
      !this.filter.color.includes(card.querySelector(".color").innerHTML) &&
      this.filter.color.length !== 0
    ) {
      result = false;
    }

    if (
      !this.filter.size.includes(card.querySelector(".size").innerHTML) &&
      this.filter.size.length !== 0
    ) {
      result = false;
    }

    if (amount < this.filter.countMin || amount > this.filter.countMax) {
      result = false;
    }

    if (year < this.filter.yearMin || year > this.filter.yearMax) {
      result = false;
    }

    return result;
  }

  pickToys() {
    const pickedToys = document.querySelector(".controls__selected__count");
    let count = 0;

    document.querySelectorAll(".toy-card").forEach((card) => {
      card.addEventListener("click", () => {
        card
          .querySelector(".toy-card__content__img__flag")
          .classList.contains("picked")
          ? count--
          : count++;

        if (count > 20) {
          this.showPopup("Извините, все слоты заполнены!");
          return;
        }

        pickedToys.innerHTML = String(count);
        card
          .querySelector(".toy-card__content__img__flag")
          .classList.toggle("picked");
      });
    });
  }

  sortCards() {

    if (this.filter.sorting == "alphabeticOrder") {
      toyCardsData.sort((a, b) => (a.name > b.name ? 1 : -1));
    } else if (this.filter.sorting == "alphabeticOrderRevert") {
      toyCardsData.sort((a, b) => (a.name < b.name ? 1 : -1));
    } else if (this.filter.sorting == "ascendingOrder") {
      toyCardsData.sort((a, b) => (a.year > b.year ? 1 : -1));
    } else if (this.filter.sorting == "descendingOrder") {
      toyCardsData.sort((a, b) => (a.year < b.year ? 1 : -1));
    }

    this.createCards();
    this.applyFilter();
    this.pickToys();
  }

  showPopup(errorText: string) {
    const basicPart = document.querySelector(".main") as HTMLElement;
    const popupContent = document.querySelector(
      "#popup__window"
    ) as HTMLTemplateElement;

    basicPart.append(popupContent.content.cloneNode(true));

    document.querySelector(".popup__error-message").innerHTML = errorText;
    const popupButton = document.querySelector(".popup__button-ok");
    popupButton.addEventListener("click", () => this.hidePopup());
  }

  hidePopup() {
    const popup = document.querySelector(".popup__window__wrapper");
    popup.setAttribute("style", "display: none");
  }
}

export default ToysView;

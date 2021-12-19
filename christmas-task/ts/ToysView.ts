import Data from "../src/data.json";
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
    for (let info of Data) {
      const cardContent = document.querySelector(
        "#toy__card-template"
      ) as HTMLTemplateElement;
      const cardView = cardContent.content.firstElementChild.cloneNode(
        true
      ) as HTMLDivElement;
      cardHolder.append(cardView);
      cardView.querySelector(".toy-card__text").innerHTML = info.name;
      cardView.querySelector(".amount").innerHTML = info.count;
      cardView.querySelector(".year").innerHTML = info.year;
      cardView.querySelector(".shape").innerHTML = info.shape;
      cardView.querySelector(".color").innerHTML = info.color;
      cardView.querySelector(".size").innerHTML = info.size;
      cardView.querySelector(".favorite").innerHTML = info.favorite
        ? "Да"
        : "Нет";
      cardView
        .querySelector(".toy-card__content__img")
        .setAttribute(
          "style",
          `background-image: url(../assets/toys/${info.num}.png)`
        );
    }
  }

  onFilterUpdated() {
    this.filter.store();

    this.applyFilter();
  }

  applyFilter() {
    document.querySelectorAll(".toy-card").forEach((card: HTMLElement) => {
      if (this.isSatisfy(card)) {
        card.setAttribute("style", "display: block");
      } else {
        card.setAttribute("style", "display: none");
      }
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
    let pickedToys = document.querySelector(".controls__selected__count");
    let count = 0;
    document.querySelectorAll(".toy-card").forEach((card) => {
      card.addEventListener("click", () => {
        card
          .querySelector(".toy-card__content__img__flag")
          .classList.contains("picked")
          ? count--
          : count++;
        if (count > 20) {
          alert("Извините, все слоты заполнены");
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
      Data.sort((a, b) => (a.name > b.name ? 1 : -1));
    } else if (this.filter.sorting == "alphabeticOrderRevert") {
      Data.sort((a, b) => (a.name < b.name ? 1 : -1));
    } else if (this.filter.sorting == "ascendingOrder") {
      Data.sort((a, b) => (a.year > b.year ? 1 : -1));
    } else if (this.filter.sorting == "descendingOrder") {
      Data.sort((a, b) => (a.year < b.year ? 1 : -1));
    }
    this.createCards();
    this.applyFilter();
    this.pickToys();
  }
}

export default ToysView;

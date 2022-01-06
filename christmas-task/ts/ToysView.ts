import toyCardsData from "../src/data.json";
import Filter from "./Filter";
import Cart from "./Cart";
import FilterController from "./FilterController";
import Popup from "./Popup";
import ToysController from "./ToysController";

class ToysView {
  filter: Filter;
  cart: Cart;
  controller: ToysController;

  constructor(filter: Filter, cart: Cart) {
    this.filter = filter;
    this.cart = cart;
    this.controller = new ToysController(this.filter);
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
      this.cart,
      () => this.onFilterUpdated(),
      () => this.controller.sortCards()
    );
    filterController.init();
    this.createCards();
    this.controller.sortCards();
    this.pickToys();
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
      cardView.setAttribute("data-num", `${toyInfo.num}`);

      if (this.cart.toyNums.includes(toyInfo.num)) {
        cardView
          .querySelector(".toy-card__content__img__flag")
          .classList.add("picked");
      }

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
      this.controller.isSatisfy(card)
        ? card.setAttribute("style", "display: block")
        : card.setAttribute("style", "display: none");
    });
  }

  pickToys() {
    document.querySelectorAll(".toy-card").forEach((card: HTMLElement) => {
      card.addEventListener("click", () => this.onCardClick(card));
    });
  }

  onCardClick(card: HTMLElement) {
    const pickedToys = document.querySelector(".controls__selected__count");
    const MAXTOYS = 20;
    const popup = new Popup();
    const selectedToys: Array<string> = this.cart.toyNums;
    const currentCardNum: string = card.dataset.num;

    if (selectedToys.length + 1 > MAXTOYS) {
      popup.showPopup();
      return;
    }

    card
      .querySelector(".toy-card__content__img__flag")
      .classList.contains("picked")
      ? selectedToys.splice(selectedToys.indexOf(currentCardNum), 1)
      : this.updateCart(selectedToys, currentCardNum);

    pickedToys.innerHTML = String(selectedToys.length);
    card
      .querySelector(".toy-card__content__img__flag")
      .classList.toggle("picked");
  }

  updateCart(selected: string[], num: string) {
    selected.push(num);
    this.cart.store();
  }
}

export default ToysView;

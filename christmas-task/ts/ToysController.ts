import Filter from "./Filter";
import Sorting from "./Sorting";

class ToysController {
  filter: Filter;

  constructor(filter: Filter) {
    this.filter = filter;
  }

  sortCards() {
    const cardsWrapper = document.querySelector(
      ".main__toys-block"
    ) as HTMLElement;
    const toyCards = document.querySelectorAll(".toy-card");
    const toyCardsArray = Array.from(toyCards);
    const sortedCards = toyCardsArray.sort((a, b) => this.sorter(a, b));

    sortedCards.forEach((card) => cardsWrapper.appendChild(card));
  }

  sorter(a: Element, b: Element): number {
    const orderBy =
      this.filter.sorting == Sorting.alphabetic ||
      this.filter.sorting == Sorting.alphabeticRevert
        ? ".toy-card__text"
        : ".year";

    let direction =
      a.querySelector(orderBy).innerHTML > b.querySelector(orderBy).innerHTML
        ? 1
        : -1;

    if (
      this.filter.sorting == Sorting.descending ||
      this.filter.sorting == Sorting.alphabeticRevert
    ) {
      direction = direction * -1;
    }
    return direction;
  }

  isSatisfy(card: HTMLElement): boolean {
    let result = true;
    
    const amount = +card.querySelector(".amount").innerHTML;
    const year = +card.querySelector(".year").innerHTML;
    const userText = card
      .querySelector(".toy-card__text")
      .innerHTML.toLowerCase()
      .search(this.filter.userInput);

    if (this.filter.userInput != "" && userText == -1) {
      result = false;
    }

    if (
      this.filter.isFavorite &&
      card.querySelector(".favorite").innerHTML == "Нет"
    ) {
      result = false;
    }

    if (
      !this.filter.shape.includes(card.querySelector(".shape").innerHTML) &&
      this.filter.shape.length > 0
    ) {
      result = false;
    }

    if (
      !this.filter.color.includes(card.querySelector(".color").innerHTML) &&
      this.filter.color.length > 0
    ) {
      result = false;
    }

    if (
      !this.filter.size.includes(card.querySelector(".size").innerHTML) &&
      this.filter.size.length > 0
    ) {
      result = false;
    }

    if (
      amount < this.filter.toysCount.min ||
      amount > this.filter.toysCount.max
    ) {
      result = false;
    }

    if (
      year < this.filter.purchaseYear.min ||
      year > this.filter.purchaseYear.max
    ) {
      result = false;
    }

    return result;
  }
}

export default ToysController;

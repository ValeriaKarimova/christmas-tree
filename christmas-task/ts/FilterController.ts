import Filter from "./Filter";
import * as noUiSlider from "nouislider";
import "../src/assets/styles/nouislider.css";
import Cart from "./Cart";

class FilterController {
  filter: Filter;
  cart: Cart;

  callback: () => void;
  sortingCallback: () => void;

  checkBox: HTMLInputElement;
  selectedOption: HTMLInputElement;
  yearSlider: noUiSlider.target;
  countSlider: noUiSlider.target;

  constructor(
    filter: Filter,
    cart: Cart,

    callback: () => void,
    sortingCallback: () => void
  ) {
    this.filter = filter;
    this.cart = cart;

    this.callback = callback;
    this.sortingCallback = sortingCallback;

    this.checkBox = document.querySelector(
      ".favorite__checkbox-input"
    ) as HTMLInputElement;
    this.selectedOption = document.querySelector(
      ".filters-block__sort__select"
    ) as HTMLInputElement;
    this.countSlider = document.getElementById(
      "count__range"
    ) as noUiSlider.target;
    this.yearSlider = document.getElementById(
      "year__range"
    ) as noUiSlider.target;
  }

  init() {
    this.handleClicks(".shape__buttons-wrapper", this.filter.shape);
    this.handleClicks(".color__buttons-wrapper", this.filter.color);
    this.handleClicks(".size__buttons-wrapper", this.filter.size);

    this.checkBox.addEventListener("click", () => {
      this.filter.isFavorite = !this.filter.isFavorite;
      this.callback();
    });

    this.initCountSlider();
    this.initYearSlider();
    this.initUserInput();
    this.getSortValue();
    this.onResetFilterClick();
    this.onResetSettingsClick();
    this.updateFilterView();
  }

  initUserInput() {
    const searchInput = document.querySelector(
      ".controls__search"
    ) as HTMLInputElement;

    searchInput.addEventListener("input", () => {
      this.filter.userInput = searchInput.value.trim().toLowerCase() as string;
      this.callback();
    });
  }

  initCountSlider() {
    const TOYS_COUNT = {min: 1, max: 12};
    noUiSlider.create(this.countSlider, {
      start: [this.filter.toysCount.min, this.filter.toysCount.max],
      connect: true,
      step: 1,
      range: {
        min: [TOYS_COUNT.min],
        max: [TOYS_COUNT.max],
      },
      format: {
        to: function (value: number) {
          return Math.round(value);
        },
        from: function (value) {
          return parseInt(value);
        },
      },
    });

    this.countSlider.noUiSlider.on("update", (values: []) => {
      this.filter.toysCount.min = values.at(0);
      this.filter.toysCount.max = values.at(1);
      this.callback();
      this.updateSliderView();
    });
  }

  initYearSlider() {
    const PURCHASE_YEAR = {min: 1940, max: 2020};
    noUiSlider.create(this.yearSlider, {
      start: [this.filter.purchaseYear.min, this.filter.purchaseYear.max],
      step: 10,
      connect: true,
      range: {
        min: [PURCHASE_YEAR.min],
        max: [PURCHASE_YEAR.max],
      },
      format: {
        to: function (value: number) {
          return Math.round(value);
        },
        from: function (value) {
          return parseInt(value);
        },
      },
    });

    this.yearSlider.noUiSlider.on("update", (values: []) => {
      this.filter.purchaseYear.min = values.at(0);
      this.filter.purchaseYear.max = values.at(1);
      this.callback();
      this.updateSliderView();
    });
  }

  handleClicks(wrapper: string, filtrationType: Array<string>) {
    const filterButtons = document.querySelector(wrapper) as HTMLElement;

    filterButtons.addEventListener("click", () =>
      this.onFilterButtonClick(event, filtrationType)
    );
  }

  onFilterButtonClick(event: Event, filtrationType: Array<string>) {
    const clickedButton = event.target as HTMLElement;

    if (clickedButton.tagName !== "BUTTON") {
      return;
    }

    if (filtrationType.includes(clickedButton.innerHTML)) {
      filtrationType.splice(filtrationType.indexOf(clickedButton.innerHTML), 1);
    } else {
      filtrationType.push(clickedButton.innerHTML);
    }

    this.updateFilterView();
    this.callback();
  }

  updateFilterView() {
    this.updateButtonGroup(".shape__button", this.filter.shape);
    this.updateButtonGroup(".color__button", this.filter.color);
    this.updateButtonGroup(".size__button", this.filter.size);

    this.checkBox.checked = this.filter.isFavorite;
    this.selectedOption.value = this.filter.sorting;

    this.countSlider.noUiSlider.set([
      this.filter.toysCount.min,
      this.filter.toysCount.max,
    ]);
    this.yearSlider.noUiSlider.set([
      this.filter.purchaseYear.min,
      this.filter.purchaseYear.max,
    ]);
  }

  updateSliderView() {
    const countMinOutput = document.querySelector(
      ".slider__count__base__output-min"
    ) as HTMLElement;
    const countMaxOutput = document.querySelector(
      ".slider__count__base__output-max"
    ) as HTMLElement;
    const yearMinOutput = document.querySelector(
      ".slider__year__base__output-min"
    ) as HTMLElement;
    const yearMaxOutput = document.querySelector(
      ".slider__year__base__output-max"
    ) as HTMLElement;

    countMinOutput.innerHTML = String(this.filter.toysCount.min);
    countMaxOutput.innerHTML = String(this.filter.toysCount.max);
    yearMinOutput.innerHTML = String(this.filter.purchaseYear.min);
    yearMaxOutput.innerHTML = String(this.filter.purchaseYear.max);
  }

  updateButtonGroup(groupClassName: string, selectedTypes: Array<string>) {
    const buttons = document.querySelectorAll(groupClassName);

    buttons.forEach((button) => {
      button.classList.remove("active");
      const isSelected = selectedTypes.includes(button.innerHTML);

      if (isSelected) {
        button.classList.add("active");
      }
    });
  }

  getSortValue() {
    this.selectedOption.addEventListener("change", () => {
      this.filter.sorting = this.selectedOption.value;
      this.sortingCallback();
    });
  }

  onResetFilterClick() {
    const resetFilterButton = document.querySelector(
      ".reset-filters"
    ) as HTMLElement;
    resetFilterButton.addEventListener("click", () => this.resetFiltration());
  }

  onResetSettingsClick() {
    const resetSettingsButton = document.querySelector(
      ".reset-settings"
    ) as HTMLElement;

    resetSettingsButton.addEventListener("click", () => this.resetSettings());
  }

  resetSettings() {
    localStorage.clear();

    this.cart.toyNums.length = 0;
    this.resetFiltration();

    document.querySelector(".controls__selected__count").innerHTML = String(
      this.cart.toyNums.length
    );
    document.querySelectorAll(".toy-card").forEach((card) => {
      card
        .querySelector(".toy-card__content__img__flag")
        .classList.remove("picked");
    });
  }

  resetFiltration() {
    this.filter.shape.length = 0;
    this.filter.color.length = 0;
    this.filter.size.length = 0;
    this.filter.isFavorite = false;
    this.filter.purchaseYear = { min: 1940, max: 2020 };
    this.filter.toysCount = { min: 1, max: 12 };

    this.updateFilterView();
    this.callback();
  }
}

export default FilterController;

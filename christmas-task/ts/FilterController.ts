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
    this.onResetStorageClick();
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
    noUiSlider.create(this.countSlider, {
      start: [this.filter.countMin, this.filter.countMax],
      connect: true,
      step: 1,
      range: {
        min: [1],
        max: [12],
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

    const self = this;

    this.countSlider.noUiSlider.on(
      "update",
      function (values: [], handle: number) {
        self.filter.countMin = values.at(0);
        self.filter.countMax = values.at(1);
        self.callback();
        self.updateSliderView();
      }
    );
  }

  initYearSlider() {
    noUiSlider.create(this.yearSlider, {
      start: [this.filter.yearMin, this.filter.yearMax],
      step: 10,
      connect: true,
      range: {
        min: [1940],
        max: [2020],
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
    const self = this;

    this.yearSlider.noUiSlider.on(
      "update",
      function (values: [], handle: number) {
        self.filter.yearMin = values.at(0);
        self.filter.yearMax = values.at(1);
        self.callback();
        self.updateSliderView();
      }
    );
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
      this.filter.countMin,
      this.filter.countMax,
    ]);
    this.yearSlider.noUiSlider.set([this.filter.yearMin, this.filter.yearMax]);
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

    countMinOutput.innerHTML = String(this.filter.countMin);
    countMaxOutput.innerHTML = String(this.filter.countMax);
    yearMinOutput.innerHTML = String(this.filter.yearMin);
    yearMaxOutput.innerHTML = String(this.filter.yearMax);
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

  onResetStorageClick() {
    const resetStorageButton = document.querySelector(
      ".reset-settings"
    ) as HTMLElement;

    resetStorageButton.addEventListener("click", () => this.resetStorage());
  }

  resetStorage() {
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
    this.filter.countMin = 1;
    this.filter.countMax = 12;
    this.filter.yearMin = 1940;
    this.filter.yearMax = 2020;

    this.updateFilterView();
    this.callback();
  }
}

export default FilterController;

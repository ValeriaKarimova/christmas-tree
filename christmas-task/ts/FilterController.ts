import Filter from "./Filter";

class FilterController {
  filter: Filter;
  callback: () => void;

  constructor(filter: Filter, callback: () => void) {
    this.filter = filter;
    this.callback = callback;
  }

  init() {
    this.handleClicks(".shape__buttons-wrapper", this.filter.shape);
    this.handleClicks(".color__buttons-wrapper", this.filter.color);
    this.handleClicks(".size__buttons-wrapper", this.filter.size);

    const checkBox = document.querySelector('.favorite__checkbox-input') as HTMLInputElement;
      checkBox.addEventListener('click', () => {
        this.filter.isFavorite.includes('да') ? this.filter.isFavorite.splice(0, 1) : this.filter.isFavorite.push('да');
        this.callback();
      } )
  }

  handleClicks(wrapper: string, filtrationType: Array<string>) {
    const filterButtons = document.querySelector(wrapper) as HTMLElement;
    filterButtons.addEventListener("click", (event) => {
      const clickedButton = event.target as HTMLElement;

      if (filtrationType.includes(clickedButton.innerHTML)) {
        filtrationType.splice(filtrationType.indexOf(clickedButton.innerHTML), 1);
      } else {
        filtrationType.push(clickedButton.innerHTML);
      }
      

      this.updateFilterView();
      this.callback();
    });
  }

  updateFilterView() {
    this.updateButtonGroup(".shape__button", this.filter.shape);
    this.updateButtonGroup('.color__button', this.filter.color);
    this.updateButtonGroup('.size__button', this.filter.size);
  }

  updateButtonGroup(groupClassName: string, selectedTypes: Array<string>) {
    const buttons = document.querySelectorAll(groupClassName);
    buttons.forEach((button) => {
        button.classList.remove("active");
        let isSelected = selectedTypes.includes(button.innerHTML)

        if (isSelected) {
            button.classList.add("active");
        }
    });
  }
}

export default FilterController;

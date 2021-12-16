import Filter from "./Filter";
import * as noUiSlider from 'nouislider';
import '../src/assets/styles/nouislider.css';

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
        this.filter.isFavorite = !this.filter.isFavorite;
        this.callback();
    } )

   this.initCountSlider();
   this.initYearSlider();
    
    
    
  }

  initCountSlider() {
    const countSlider = document.getElementById('count__range') as noUiSlider.target;

    noUiSlider.create(countSlider, {
        start: [1, 12],
        connect: true,
        step: 1,
        range: {
            'min': [1],
            'max': [12]
        },
        format: {
            to: function(value: number) {
                return Math.round(value)
            },
            from: function(value) {
                return parseInt(value)
            }
        }
    });

    const self = this;
    
    countSlider.noUiSlider.on('update', function (values:[] , handle:Number) {
        self.filter.countMin = values.at(0);
        self.filter.countMax = values.at(1);
        self.callback();
        self.updateSliderView();
    });
  }

  initYearSlider() {
    const yearSlider = document.getElementById('year__range') as noUiSlider.target;

    noUiSlider.create(yearSlider, {
        start: [1940, 2020],
        step: 10,
        range: {
            'min': [1940],
            'max': [2020]
        },
        format: {
            to: function(value: number) {
                return Math.round(value)
            },
            from: function(value) {
                return parseInt(value)
            }
        }
        
    });
    const self = this;
    
    yearSlider.noUiSlider.on('update', function (values:[] , handle:Number) {
        self.filter.yearMin = values.at(0);
        self.filter.yearMax = values.at(1);
        self.callback();
        self.updateSliderView();
    });
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

  updateSliderView() {
      const countMinOutput = document.querySelector('.slider__count__base__output-min');
      const countMaxOutput = document.querySelector('.slider__count__base__output-max');
      const yearMinOutput = document.querySelector('.slider__year__base__output-min');
      const yearMaxOutput = document.querySelector('.slider__year__base__output-max');

      countMinOutput.innerHTML = String(this.filter.countMin);
      countMaxOutput.innerHTML = String(this.filter.countMax);
      yearMinOutput.innerHTML = String(this.filter.yearMin);
      yearMaxOutput.innerHTML = String(this.filter.yearMax);

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

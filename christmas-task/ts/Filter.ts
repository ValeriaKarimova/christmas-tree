class Filter {
  shape: Array<string>;
  color: Array<string>;
  size: Array<string>;
  isFavorite: boolean;
  countMin: number;
  countMax: number;
  yearMin: number;
  yearMax: number;
  sorting: string;
  userInput: string;

  constructor() {
    this.shape = [];
    this.color = [];
    this.size = [];
    this.isFavorite = false;
    this.countMin = 1;
    this.countMax = 12;
    this.yearMin = 1940;
    this.yearMax = 2020;
    this.sorting = "ascendingOrder";
    this.userInput = "";
  }

  store() {
    localStorage.setItem("filter", JSON.stringify(this));
  }

  restore() {
    const savedData = localStorage.getItem("filter");

    if (savedData === undefined || savedData === null) {
      return;
    }
    
    const json = JSON.parse(savedData);
    this.shape = json.shape;
    this.color = json.color;
    this.size = json.size;
    this.isFavorite = json.isFavorite;
    this.countMin = json.countMin;
    this.countMax = json.countMax;
    this.yearMin = json.yearMin;
    this.yearMax = json.yearMax;
    this.sorting = json.sorting;
  }
}

export default Filter;

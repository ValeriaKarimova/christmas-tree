import Sorting from "./Sorting";

class Filter {
  shape: Array<string>;
  color: Array<string>;
  size: Array<string>;
  isFavorite: boolean;
  purchaseYear: {min: number, max: number};
  toysCount: {min: number, max: number};
  sorting: string;
  userInput: string;

  constructor() {
    this.shape = [];
    this.color = [];
    this.size = [];
    this.isFavorite = false;
    this.purchaseYear = {min: 1940, max:2020};
    this.toysCount = {min: 1, max: 12};
    this.sorting = Sorting.ascending;
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
    this.purchaseYear = json.purchaseYear;
    this.toysCount = json.toysCount;
    this.sorting = json.sorting;
  }
}

export default Filter;

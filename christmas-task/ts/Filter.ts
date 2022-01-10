import Sorting from "./Sorting";
import { TOYS_COUNT, PURCHASE_YEAR } from "./Constants";

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
    this.purchaseYear = PURCHASE_YEAR;
    this.toysCount = TOYS_COUNT;
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

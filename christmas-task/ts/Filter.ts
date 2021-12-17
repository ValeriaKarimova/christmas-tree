import Data from "../src/data.json";
import SortType from "./SortType";

class Filter {
  
    shape: Array<string>
    color: Array<string>
    size: Array<string>
    isFavorite: boolean;
    countMin: number;
    countMax: number;
    yearMin: number;
    yearMax: number;
    sorting: string;

    constructor () {
        this.shape = [];
        this.color = [];
        this.size = [];
        this.isFavorite = false;
        this.countMin = 0;
        this.countMax = 0;
        this.yearMin = 0;
        this.yearMax = 0;
        this.sorting = "ascendingOrder";
    }

  store() {
    localStorage.setItem('filter', JSON.stringify(this));
  }

  restore() {
    const savedData = localStorage.getItem('filter');
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

    console.log ();
  }
}

export default Filter;

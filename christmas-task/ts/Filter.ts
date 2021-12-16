import Data from "../src/data.json";
import SortType from "./SortType";

class Filter {
  
    shape: Array<string>
    color: Array<string>
    size: Array<string>
    isFavorite: Boolean;
    countMin: number;
    countMax: number;
    yearMin: number;
    yearMax: number;
    sorting: SortType

    constructor () {
        this.shape = [];
        this.color = [];
        this.size = [];
        this.isFavorite = false;
        this.countMin = 0;
        this.countMax = 0;
        this.yearMin = 0;
        this.yearMax = 0;
    }

  store() {
    console.log("store to Local");
  }

  restore() {
    console.log("restore from Local");
  }
}

export default Filter;

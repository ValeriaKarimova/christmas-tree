import Data from "../src/data.json";
import SortType from "./SortType";

class Filter {
  
    shape: Array<string>
    color: Array<string>
    size: Array<string>
    isFavorite: Boolean;
    countMin: Array<string>
    countMax: Array<string>
    yearMin: Array<string>
    yearMax: Array<string>
    sorting: SortType

  store() {
    console.log("store to Local");
  }

  restore() {
    console.log("restore from Local");
  }
}

export default Filter;

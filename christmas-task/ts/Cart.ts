class Cart {
  toyNums: Array<string>;

  constructor() {
    this.toyNums = [];
  }

  store() {
    localStorage.setItem("toyNums", JSON.stringify(this));
  }

  restore() {
    const selectedToysData = localStorage.getItem("toyNums");
    if (selectedToysData === undefined || selectedToysData === null) {
      return;
    }
    const json = JSON.parse(selectedToysData);
    this.toyNums = json.toyNums;
  }
}

export default Cart;

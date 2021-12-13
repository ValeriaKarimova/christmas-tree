class DataReceiver {
    async loadData() {
        const toyData = await this.getJsonData("./data.json");
        return toyData;
      }
    
      async getJsonData(path:string) {
        const response = await fetch(path);
        const data = await response.json();
        return data;
      }
}

export default DataReceiver;
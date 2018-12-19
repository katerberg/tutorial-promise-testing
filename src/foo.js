export default class Foo {
  async functionToTest() {
    try {
      const data = await this.getData();
      this.storedData = data;
      return data.map(datum => ({name: datum}));
    } catch(err) {
      this.error = err;
      this.storedData = [];
      return this.storedData;
    }

//     return this.getData().then(data => {
//       this.storedData = data;
//       return data.map(datum => ({name: datum}));
//     }).catch(err => {
//       this.error = err;
//       this.storedData = [];
//       return this.storedData;
//     });
  }

  multiSource() {
    //get data from first and second and combine them
    //after that get data from third
    // return all combined
  }

  async getThirdData() {
    return new Promise((resolve, reject) => {
      resolve(['pierre']);
    });
  }

  async getSecondData() {
    return new Promise((resolve, reject) => {
      resolve(['kelsey']);
    });
  }

  async getData() {
    return new Promise((resolve, reject) => {
      resolve(['foo']);
    });
  }
}

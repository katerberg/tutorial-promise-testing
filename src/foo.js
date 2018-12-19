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

  async multiSource() {
    //get data from first and second and combine them
    //after that get data from third
    // return all combined
    //
    const firstPromise = this.getData();
    const secondPromise = this.getSecondData();
    const [first, second] = await Promise.all([firstPromise, secondPromise]);
    return [first, second, await this.getThirdData()];
    // const firstCall = this.getData();
    // const secondCall = this.getSecondData();

    // return Promise.all([firstCall, secondCall]).then(([first, second]) => {
    //   return this.getThirdData().then(third => {
    //     return [first, second, third];
    //   });
    // });
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

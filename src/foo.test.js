import pDefer from 'p-defer';
import Foo from './Foo';

describe('Foo', () => {
  it('exists so that all of the other jsx files are tested', () => {
    const testObject = new Foo();

    expect(testObject).to.exist;
  });

  describe('getData', () => {
    it('eventually gives back an array', (done) => {
      const testObject = new Foo();

      testObject.getData().then(response => {
        expect(response).to.eql(['foo']);
        done();
      });
    });
  });

  describe('functionToTest', () => {
    it('gets data and turns it into an object', (done) => {
      const testObject = new Foo();
      const defer = pDefer();
      sinon.stub(testObject, 'getData').returns(defer.promise);

      testObject.functionToTest().then(response => {
        expect(response).to.eql([{name: 'blah'}, {name: 'halb'}]);
        done();
      });

      defer.resolve(['blah', 'halb']);
    });

    it('caches the data from getData when it comes back', (done) => {
      const testObject = new Foo();
      const defer = pDefer();
      sinon.stub(testObject, 'getData').returns(defer.promise);

      testObject.functionToTest();

      expect(testObject.storedData).to.eql(undefined);
      defer.resolve(['foo']);
      defer.promise.then(response => {
        expect(testObject.storedData).to.eql(['foo']);
        done();
      });
    });

    it('stores error message and hands back empty data when getData fails', (done) => {
      const testObject = new Foo();
      const defer = pDefer();
      sinon.stub(testObject, 'getData').returns(defer.promise);

      const responsePromise = testObject.functionToTest();

      expect(testObject.error).to.eql(undefined);
      defer.reject('idk what happened');

      responsePromise.then((responseData) => {
        expect(responseData).to.eql([]);
        expect(testObject.storedData).to.eql([]);
        expect(testObject.error).to.eql('idk what happened');
        done();
      });
    });

  });

  describe('multiSource', () => {
    it('gets data from 2 sources and after fetches third and combines them', (done) => {
      const testObject = new Foo();
      const firstDefer = pDefer();
      const secondDefer = pDefer();
      const thirdDefer = pDefer();
      sinon.stub(testObject, 'getData').returns(firstDefer.promise);
      sinon.stub(testObject, 'getSecondData').returns(secondDefer.promise);
      sinon.stub(testObject, 'getThirdData').returns(thirdDefer.promise);

      testObject.multiSource().then(response => {
        expect(response).to.eql(['first', 'second', 'third']);
        done();
      });

      firstDefer.resolve('first');
      secondDefer.resolve('second');
      thirdDefer.resolve('third');
    });

    it('calls first and second simultaneously but not the third one', () => {
      const testObject = new Foo();
      const firstDefer = pDefer();
      const secondDefer = pDefer();
      const thirdDefer = pDefer();
      sinon.stub(testObject, 'getData').returns(firstDefer.promise);
      sinon.stub(testObject, 'getSecondData').returns(secondDefer.promise);
      sinon.stub(testObject, 'getThirdData').returns(thirdDefer.promise);

      testObject.multiSource()

      expect(testObject.getData).to.have.been.called;
      expect(testObject.getSecondData).to.have.been.called;
      expect(testObject.getThirdData).not.to.have.been.called;
    });
  });
});

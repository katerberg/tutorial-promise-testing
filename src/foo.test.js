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
});

import Foo from './Foo';

describe('Foo', () => {
  it('exists so that all of the other jsx files are tested', () => {
    const testObject = new Foo();

    expect(testObject).to.exist;
  });
});


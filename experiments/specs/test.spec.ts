import { Element } from '@wdio/sync';

describe('test', () => {
  it('should work', () => {
    browser.timeouts('implicit', 5000);
    browser.context('NATIVE_APP');

    let test: Element;
    test = $('body') as any;
    console.log(test);
  });
});

import { LinkifyPipe } from '@shared/pipes/linkify/linkify.pipe';

describe('LinkifyPipe', () => {
  it('create an instance', () => {
    const pipe = new LinkifyPipe();
    expect(pipe).toBeTruthy();
  });
});

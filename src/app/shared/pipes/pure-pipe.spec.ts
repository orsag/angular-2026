import { PurePipe } from '../../Pipes/pure-pipe';

describe('PurePipe', () => {
  it('create an instance', () => {
    const pipe = new PurePipe();
    expect(pipe).toBeTruthy();
  });
});

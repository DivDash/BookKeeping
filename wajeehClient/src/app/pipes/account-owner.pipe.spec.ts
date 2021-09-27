import { AccountOwnerPipe } from './account-owner.pipe';

describe('AccountOwnerPipe', () => {
  it('create an instance', () => {
    const pipe = new AccountOwnerPipe();
    expect(pipe).toBeTruthy();
  });
});

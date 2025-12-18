import { Workday } from './workday';

describe('Workday', () => {
  it('should create an instance', () => {
    expect(Workday.createEmpty()).toBeTruthy();
  });
});

import { UnfollowTrackerPage } from './app.po';

describe('unfollow-tracker App', () => {
  let page: UnfollowTrackerPage;

  beforeEach(() => {
    page = new UnfollowTrackerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

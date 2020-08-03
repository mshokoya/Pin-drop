describe('App component (integration)', () => {
  it.todo('should attempt to fetch signed in users details upon render');

  // session storage token tests

  describe('When user is signed in', () => {
    it.todo('should fetch the correct user detail');
    it.todo('should pass user details to "viewer" state');
    it.todo('should pass user details as "viewer" prop to the "Header" component');
  });

  describe('When user in not signed in', () => {
    it.todo('fetch should return empty object');
    it.todo('should not change "viewer" state');
    it.todo('should pass "null" value as "viewer" prop to the "Header" component');
  });
});

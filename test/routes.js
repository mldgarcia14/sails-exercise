require("test_helper");

describe("routes", function() {

  /*
   * Default route test
   */
  describe("GET /", function() {
    it("should return 200", function(done) {
      request
        .get("/")
        .expect(200, done);
    });
  });

});

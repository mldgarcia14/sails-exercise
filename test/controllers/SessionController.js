require("test_helper");

describe(TEST_NAME, function(){

  var sessionTestValidUser = {
    username: "usession",
    password: 'session',  
    last_name: "Test",
    first_name: "Session Login",
    age: 12
  };

  var user_id;

  //input initial data sets
  before(function(done) {

    userObj = _.clone(sessionTestValidUser);
    User.create(userObj).done(function(err, record) {
      expect(err).not.to.exist;
      user_id = record.id;
      done();
    });

  });

  after(function(done){
    //check if sample record exists in the database
    User.findOneByUsername(sessionTestValidUser.username).done(function(err, user_found){
      
      user_found.destroy(function(err){
        expect(err).not.to.exist;
        done();
      });
    
    });
  });

  describe("POST /auth", function(done) {
    it("should redirect to /session/new when username or password is empty", function(done) {
      var auths = {
        username: "",
        password: "password"
      }

      request.post("/session/auth")
        .send(auths)
        .expect(200)
        .expect("Location", "/session/new")
        .expect(302, done);

    });
  }); 

  describe("POST /auth", function(done) {
    it("should redirect to /session/new when username invalid", function(done) {
      var fakeAuth = {
        username: "usessionsss",
        password: "session"
      }

      request.post("/session/auth")
        .send(fakeAuth)
        .expect(200)
        .expect("Location", "/session/new")
        .expect(302, done);

    });
  });

  describe("POST /auth", function(done) {
    it("should redirect to /session/new when username is correct but password is invalid", function(done) {
      var fakeAuth = {
        username: "usession",
        password: "sessionsds"
      }
      request.post("/session/auth")
        .send(fakeAuth)
        .expect(200)
        .expect("Location", "/session/new")
        .expect(302, done);

    });
  });

  describe("POST /auth", function(done) {
    it("should redirect to /profile/show when auth is correct", function(done) {
      var trueAuth = {
        username: "usession",
        password: "session"
      }

      request.post("/session/auth")
        .send(trueAuth)
        .expect(200)
        .expect("Location", "/profile/show/" + user_id)
        .expect(302, done);

    });
  }); 

  describe("GET /destroy", function(done) {
    it("should redirect to /session/new when the user logged-out", function(done) {

      request.get("/session/destroy")
        .expect(200)
        .expect('Location', '/session/new')
        .expect(302, done);

    });
  });    

});
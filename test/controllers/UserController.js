require("test_helper");

describe(TEST_NAME, function(){

  afterEach(function(done){

    User.findOneByUsername('mjordan').done(function(err, user_found){

      if(user_found){
        user_found.destroy(function(err){
          expect(err).not.to.exist;
        });
      }
      
      done();
    
    });
  });

  describe("GET index", function() {
    it("should be successful", function(done) {
      request.get("/")
        .expect(200, done);
    });
  });    


  describe("GET register/", function() {
    it("should be successful", function(done) {
      request.get("/user/register")
        .expect(200, done);
    });
  });

  describe("POST create/", function() {
    it("should be able to add & register new User", function(done) {
      var objNewUserTest = {
        username: 'mjordan',
        password: 'youtube',
        c_password: 'youtube',
        last_name: 'michael',
        first_name: 'jordan',
        age: 23
      } 

      request.post("/user/create/")
        .send(objNewUserTest)
        .expect(200)
        .expect("Location", "/")
        .expect(302, done);

    });
  });  

  describe("Post update", function() {
    it("should be able to update user", function(done) {
      var objNewUserTest = {
        id: 1,
        last_name: 'Scottie',
        first_name: 'Pippen',
        age: 52
      }
      request.post("/user/update")
        .send(objNewUserTest)
        .expect(200)
        .expect("Location", "/profile/show/" + objNewUserTest.id)
        .expect(302, done);
    });
  });    

});
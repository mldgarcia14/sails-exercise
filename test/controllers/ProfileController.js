require("test_helper");

var test_session = false

describe(TEST_NAME, function(){

  before(function(){
    // var  validUser ={
    //   username: 'usession',
    //   password: 'session',
    //   last_name: 'last_name',
    //   first_name: 'first_name',
    //   age: 211
    // }
    // User.create(validUser, function(err){
    //   if(err){done(err);}
    //   expect(err).not.to.exist;
    // });
    test_session = true;
  });

  describe("GET /profile/show/1", function(){

    it("should redirect to /session/new if user is not logged in", function(done){
      request.get('/profile/show/1')
        .expect(200)
        .expect('Location', '/session/new')
        .expect(302, done);
    });    
       
  });

  describe("GET /profile/edit/1", function(){

    it("should redirect to /session/new if user is not logged in", function(done){
      request.get('/profile/edit/1')
        .expect(200)
        .expect('Location', '/session/new')
        .expect(302, done);
    });    

  });


});
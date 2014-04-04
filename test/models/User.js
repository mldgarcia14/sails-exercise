require("test_helper");

describe(TEST_NAME, function() {

  var validUser = {
    username: "supermario",
    password: 'youtube',  
    last_name: "Mario",
    first_name: "Super",
    age: 21
  };

  //input initial data sets
  before(function(done) {
    userObj = _.clone(validUser);
    User.create(userObj).done(function(err, record) {
      expect(err).not.to.exist;
      done();
    });
    
  });

  after(function(done){
    //check if sample record exists in the database
    User.findOneByUsername(validUser.username).done(function(err, user_found){
      
      user_found.destroy(function(err){
        expect(err).not.to.exist;
        done();
      });
    
    });
  });  

  describe("validations", function() {

    //USERNAME
    describe("USERNAME field Testing", function() {

      t_uname1 = "jua";
      it("should return error if USERNAME is less than 4 characters >> Test Input: " +  t_uname1, function (done){
        User.update({
          id: 1
        },{username: 'co1'},function (err, user){
          expect(err).to.exist;
          err.ValidationError.username[0].rule.should.equal('minLength');
        });
        done();
      });

      t_uname2 = "anothertestusername";
      it("should return error if USERNAME is more than 10 characters >> Test Input: " + t_uname2, function (done){
        User.update({
          id: 1
        },{username: 'wew1212123lasjda1231lajs'},function (err, user){
          expect(err).to.exist;
          err.ValidationError.username[0].rule.should.equal('maxLength');
        });
        done();
      });

    });

    //PASSWORD
    describe("PASSWORD field Testing", function() {

      var testUserInput = {
        username: 'username',
        first_name: 'first_name',
        last_name: 'last_name',
        age: 22,
      }

      it("CREATE NEW Record: should return error if PASSWORD is not present: ", function (done){
        User.create(testUserInput, function (err, user){
          expect(err).to.exist;
        });
        done();
      });

      var testUserInputUpdate = {
        username: 'username',
        first_name: "first_name",
        last_name: "last_name",
        age: 22,
        password: "" 
      }

      it("UPDATE Record: should return error if PASSWORD does not have a value: ", function (done){
        User.update({id: 1},testUserInputUpdate, function (err, user){
          expect(err).to.exist;
        });
        done();
      });

      it("CHECK Password: should return error if PASSWORD present on query selection", function (done){
          request.get('/user')
          .set('Accept', 'application/json')
          .expect(200)
          .end(function(err, res){
            if (err) return done(err);
            res.body.should.not.have.deep.property("[0].password");
            done();
          });          
      });

    });


    //LASTNAME
    describe("LASTNAME field Testing", function(done) {

      var testUserInput = {
        username: 'username',
        first_name: 'first_name',
        password: 'password',
        age: 22    
      }

      it("CREATE NEW Record: should return error if LASTNAME is not present: ", function (done){
        User.create(testUserInput, function (err, user){
          expect(err).to.exist;
        });
        done();
      });

      var testUserInputUpdate = {
        username: 'username',
        first_name: "first_name",
        last_name: "",
        password: 'password',
        age: 22 
      }

      it("UPDATE Record: should return error if LASTNAME does not have a value: ", function (done){
        User.update({id: 1},testUserInputUpdate, function (err, user){
          expect(err).to.exist;
        });
        done();
      });

    });


    //FIRSTNAME
    describe("FIRSTNAME field Testing", function() {

      var testUserInput = {
        username: 'username',
        last_name: 'last_name',
        password: 'password',
        age: 22    
      }

      it("CREATE NEW Record: should return error if FIRSTNAME is not present: ", function (done){
        User.create(testUserInput, function (err, user){
          expect(err).to.exist;
        });
        done();
      });

      var testUserInputUpdate = {
        username: 'username',
        last_name: 'last_name',  
        first_name: "" ,
        password: 'password',
        age: 22 
      }

      it("UPDATE Record: should return error if FIRSTNAME does not have a value: ", function (done){
        User.update({id: 1},testUserInputUpdate, function (err, user){
          expect(err).to.exist;
        });
        done();
      });

    });    


    //AGE
    describe("AGE field Testing", function() {

      var testUserInput = {
        username: 'username',
        last_name: 'last_name',
        first_name: 'first_name',
        password: 'password'
      }

      it("CREATE NEW Record: should return error if AGE is not present: ", function (done){
        User.create(testUserInput, function (err, user){
          expect(err).to.exist;
        });
        done();
      });

      var testUserInputUpdate = {
        username: 'username',
        last_name: 'last_name',  
        first_name: "firt_name",
        age: "",
        password: 'password'
      }

      it("UPDATE Record: should return error if AGE does not have a value: ", function (done){
        User.update({id: 1},testUserInputUpdate, function (err, user){
          expect(err).to.exist;
        });
        done();
      });


     it("should return error if AGE is not an integer: ", function (done){
        User.update({id: 1},{age: 'test_integer'}, function (err, user){
          expect(err).to.exist;
        });
        done();
      });


    });

  });
  

});
/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	
  	/* e.g.
  	nickname: 'string'
  	*/
    username:{
    	type: 'string',
    	required: true,
    	minLength: 4,
    	maxLength: 10,
      unique: true
    },

    password:{
      type: 'string',
      required: true
    },

    last_name:{
    	type: 'string',
    	required: true
    },

    first_name:{
      type: 'string',
      required: true
    },

    age:{
      type: 'integer',
      required: true
    },
    
    toJSON: function(){
      var objUser = this.toObject();

      delete objUser.password;
      return objUser;
    }

  },

   // pre-insert method modifications
  beforeCreate: function (userObj, next) {
    require('bcrypt').hash(userObj.password, 10, function passwordEncrypted(err, password) {
      if (err) return next(err);
      userObj.password = password;
      // values.online= true;
      next();
    });
  }

};
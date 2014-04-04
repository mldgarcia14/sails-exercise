/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  _config: {},

  index: function(req, res){
    res.locals.flash = _.clone(req.session.flash);
    res.view();
    req.session.flash = {};
  },  

  create: function(req, res, next){

    var objNewUser = {
 	    username: req.param('username'),
 	    password: req.param('password'),
 	    last_name: req.param('last_name'),
 	    first_name: req.param('first_name'),
 	    age: req.param('age')
 	  }


 	  User.create(objNewUser, function(err, objNewUser){
      if(err){
      	req.session.flash = {
          message: 'Validation Error!',
      		error: err,
          username: req.param('username'),
          last_name: req.param('last_name'),
          first_name: req.param('first_name'),
          age: req.param('age')
      	};

        if(req.param('password') != req.param('c_password')){
          req.session.flash.passwordconfirmation = 'Password & Confirmation did not match.'
        }
 	      res.locals.flash = req.session.flash;
 	      return res.redirect('/user/register');
 	    }
      else{

        if(req.param('password') != req.param('c_password')){
          req.session.flash ={
            message: 'Validation Error!',
            passwordconfirmation: 'Password & Confirmation did not match.',
            username: req.param('username'),
            last_name: req.param('last_name'),
            first_name: req.param('first_name'),
            age: req.param('age')          
          }
          res.locals.flash = req.session.flash;
          return res.redirect('/user/register');      
        }
      }
 	    req.session.flash = {};
 	    return res.redirect('/');	
 	  });
  },

  register: function(req, res, next){
    res.locals.flash = _.clone(req.session.flash);
    console.log(res.locals.flash);
    res.view();
    req.session.flash = {};
  },

  update: function(req, res, next){
    var userToUpdate = {
      first_name: req.param('first_name'),
      last_name:  req.param('last_name'),
      age:        req.param('age')
    }

    User.update(req.param('id'), userToUpdate, function userUpdated(err){
      if(err){
        req.session.flash = {
          err: [{Error: 'Error in Updating'}]
        }
        return res.redirect('/profile/show/' + req.param('id'));
      }
      req.session.flash = {
        err: [{Success: 'Update Success'}]
      }        
      res.redirect('/profile/show/' + req.param('id'));
   });

 }

  
};
/**
 * SessionController
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
var objBcrypt = require('bcrypt');
module.exports = {
  
  _config: {},

  new: function(req, res){
    res.locals.flash = _.clone(req.session.flash);
    res.view();
    req.session.flash = {};   
  },

  auth: function(req, res, next){

  	if(!req.param('username') || !req.param('password')){
      req.session.flash = {
        err: {error: 'Please fill-in the login form.'}
      }               
      res.redirect('/session/new');
      return;
  	}

  	User.findOneByUsername(req.param('username'), function(err, user){
  	  if(err){ return next(err);}

  	  //If no user is found
  	  if(!user){
        req.session.flash = {
          err: {error: 'Username not found!'}
        }
  	  	res.redirect('/session/new');
  	  	return;
  	  }

  	  //check for password
  	  objBcrypt.compare(req.param('password'),user.password , function(err, valid){
  	    if(err){ return next(err);}
      	if(valid){
          req.session.authenticated = true;
          req.session.userSessionObject = user;          
		      res.redirect('/profile/show/' + user.id);      	  
      	}else{
      	  req.session.flash = {
      	  	err : {error: 'Password is incorrect'},
            username: req.param('username')
      	  }
      	  res.redirect('/session/new');
      	  return;
      	}
  	  });

  	});

  },

  destroy: function(req, res, next){
    req.session.flash = {
      err: {error: 'Logout!'}
    }
    req.session.authenticated = false;
    req.session.userSessionObject = false;
    res.redirect('/session/new');
    return;
  }
  
};
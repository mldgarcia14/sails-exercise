/**
 * ProfileController
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

  show: function(req, res, next){

  	if(!req.param('id')){
  		res.redirect('/session/new');
  		return;
  	}

    User.findOne(req.param('id')).done(function(err, user) {
	  if(err){
	  	next(err);
	  	return;
	  }

	  if(!user){
	  	req.session.flash = {
	  	  err: [{error: 'User not found!'}]
	  	}
	  	res.redirect('/session/new');
	  	return;
	  }else{
   		res.locals.flash = _.clone(req.session.flash);	  	
	  	res.view({'user': user});
	  	req.session.flash = {}
	  }

    });    

  	res.view();
  },

  edit: function(req, res, next){
    User.findOne(req.param('id')).done(function(err, user) {
	  if(err){
	  	next(err);
	  	return;
	  }

	  if(!user){
	  	req.session.flash = {
	  	  err: [{error: 'User not found!'}]
	  	}
	  	res.redirect('/session/new');
	  	return;
	  }else{
	  	res.view({'user': user});
	  }

    });    	
  	
  }
  
};
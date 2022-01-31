/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'get /': 'PageController.login',
  'get /signup': 'PageController.signup',
  'get /welcome': 'PageController.welcome',
  'get /logout': 'PageController.logout',
  'get /export/excel': 'PageController.export',

  'get /today': 'PageController.today',
  'get /weekly': 'PageController.weekly',



  'POST /login' : 'UserController.login',
  'POST /create' : 'UserController.create',
  'POST /table/add' : 'TableController.add',
  'POST /table/edit' : 'TableController.edit',
  'POST /table/delete' : 'TableController.delete',
  'POST /table/img_upload' : 'TableController.img_upload',

  'POST /user/add' : 'UserController.add',
  'POST /user/edit' : 'UserController.edit',
  'POST /user/delete' : 'UserController.delete',


  'POST /api/login' : 'UserController.apilogin',



  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};

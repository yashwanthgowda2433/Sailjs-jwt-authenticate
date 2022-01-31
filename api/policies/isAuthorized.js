'use strict';
var jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  let token;
  // console.log(req.signedCookies.sailsjwt);
  
  if(req.signedCookies.sailsjwt)
  {
    var date = new Date().toISOString().replace('T', ' ').substring(0, 10);
    var expiry = new Date(sails.config.custom.license_expired).toISOString().replace('T', ' ').substring(0, 10);
    // console.log(date)
    // console.log(expiry)

    if(date <= expiry)
    {
      return jwt.verify(req.signedCookies.sailsjwt, sails.config.custom.jwtSecret, async function(err, payload) {
        // if there's an error verifying the token (e.g. it's invalid or expired), no go
        if (err || !payload.user) return res.json(401, {err: 'No Authorization header was found'});
        // otherwise try to look up that user
        // console.log(payload.user)
        var user = await User.findOne(payload.user)
        // if the user can't be found, no go
        if (!user) return res.json(401, {err: 'No Authorization header was found'});
        // otherwise save the user object on the request (i.e. "log in") and continue
        // console.log(user)
        req.user = user
        next()
      })
    }else{
      return  res.send('License Expired')
    }
    
  }else{
    next()
  }

  
};
'use strict';
var jwt = require('jsonwebtoken');
const sendsms = require('../services/sendsms');

module.exports = {
    create: async function(req, res) {
        const data = req.body;
        // if (data.password !== data.confirmPassword) return res.badRequest("Password not the same");
        const email_exists = await User.findOne({email : data.email});
		if(email_exists)
		{

            res.send({ error: 'Email Already Exists!' });
		}else{
            var password = data.password;
           

        var user = await User.create({
                email: data.email,
                password: password,
                name: data.name,
                number: data.number,
            }).intercept('E_UNIQUE', (err)=> {
                return 'emailAlreadyInUse';
             }).intercept({name:'UsageError'}, (err)=> {
                return 'invalid';
             }).fetch();

            if (!user) return res.notFound()

            var token = jwt.sign({user: user.id}, sails.config.custom.jwtSecret, {expiresIn: 24 * 60 * 60 * 1000})
            res.cookie('sailsjwt', token, {
                        signed: true,
                        maxAge: 24 * 60 * 60 * 1000
                    })
            // var result = res.send({ token: jwToken.issue({ id: user.id }) }); // payload is { id: user.id}
            // return res.redirect('/welcome',{token: result});
            return res.redirect('/welcome');
        }
    },

    login: async function(req, res) {
        console.log('true');
        const data = req.body;
        var email = data.email;
        var password = data.password;
        if (!data.email || !data.password) return res.badRequest('Email and password required');

        var user = await User.findOne({ email: email })
        .then((user) => {
            if (!user) return res.notFound();
            console.log(user)
            User.comparePassword(password, user.encryptedPassword)
                .then(() => {
                    // var token = jwToken.issue({ id: user.id });
		            var date = new Date().toISOString().replace('T', ' ').substring(0, 10)
                    var expiry = new Date(sails.config.custom.license_expired).toISOString().replace('T', ' ').substring(0, 10);

                    if(date <=  expiry)
                    {
                         var token = jwt.sign({user: user.id}, sails.config.custom.jwtSecret, {expiresIn: 24 * 60 * 60 * 1000})
                        res.cookie('sailsjwt', token, {
                            signed: true,
                            maxAge: 24 * 60 * 60 * 1000
                        })
                        return res.redirect('/welcome');

                    }else{
                        return res.send('License Expired, Please renew now to login!')
                    }
                    // return res.send({ token: jwToken.issue({ id: user.id }) }); // payload is { id: user.id}

                    
                })
                .catch((err) => {
                    return res.forbidden();
                });
        })
            // .then((user) => {
            //     if (!user) return res.notFound();
            //     console.log(user.password)
            //     if(password == user.password)
            //     {
            //         return res.send({ token: jwToken.issue({ id: User.id }) })

            //     }else{
            //         return res.forbidden();
            //     }
                    
            // })
            .catch((err) => {
                sails.log.error(err);
                return res.serverError();
            });

            if(user)
            {
                return res.redirect('/welcome');
            }
    },

    apilogin: async function(req, res) {
        const data = req.body;
        var mobile = data.mobile;
        if (!data.mobile) return res.badRequest('Enter Number!');

        var user = await User.findOne({ number: mobile })
        if (!user) return res.notFound();

        var otp = Math.random().toString().substr(2, 6);
        console.log(otp)
        var otp_update = await User.update({id:user.id},{otp:otp}).fetch()
        if(otp_update)
        {
            var message = sails.config.sms.smstemplate_confirmation;
            message = message.replace("XXXXXX",otp);
            var to = mobile;
            var date = new Date().toISOString().replace('T', ' ').substring(0, 19)
            var logins = await Logins.create({userId:user.id, logintime:date}).exec(function (err, result) {
                return res.send({otp_sent:true,user:user});
            });

            // var sms = await sendsms.send(to,message);
            // if(sms)
            // {
            // }
            
        }
    },

    add: async function(req, res) {
        const data = req.body;
        // if (data.password !== data.confirmPassword) return res.badRequest("Password not the same");
        const email_exists = await User.findOne({email : data.email});
		if(email_exists)
		{

            res.send({ error: 'Email Already Exists!' });
		}else{
            var password = data.password;
           

        var user = await User.create({
                email: data.email,
                password: password,
                name: data.name,
                number: data.number,
            }).intercept('E_UNIQUE', (err)=> {
                return 'emailAlreadyInUse';
             }).intercept({name:'UsageError'}, (err)=> {
                return 'invalid';
             }).fetch();

            if (!user) return res.notFound()

            return res.redirect('/welcome');
        }
    },

    edit: async function (req, res) {
  
        var name = req.body.name;
        var email = req.body.email;
        var number = req.body.number;

        var id = req.body.id;
       if(name){
        await User.update({id:id},{name:name}).exec(function(err){
            if(err)
            {
                res.status(500).send({error: 'Database Error'});
            }else{
                return res.redirect('/welcome');
            }
        });
       }

       if(email){
        await User.update({id:id},{email:email}).exec(function(err){
            if(err)
            {
                res.status(500).send({error: 'Database Error'});
            }else{
                return res.redirect('/welcome');
            }
        });
       }

        if(number){
            await User.update({id:id},{number:number}).exec(function(err){
                if(err)
                {
                    res.status(500).send({error: 'Database Error'});
                }else{
                    return res.redirect('/welcome');
                }
            });
        
       }
    
        //   return username;
        // this.res.redirect('/');
    },

    delete: async function (req, res) {

        var id = req.body.iddel;
       
        User.destroy({id:id}).exec(function(err){
            if(err)
            {
                res.status(500).send({error: 'Database Error'});
            }else{
                return res.redirect('/welcome');
            }
        });
    
        //   return username;
        // this.res.redirect('/');
        // return false;
    },

};
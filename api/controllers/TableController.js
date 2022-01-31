'use strict';
var jwt = require('jsonwebtoken');

module.exports = {
    add: async function (req,res) {
        console.log(req.body.title);
        var title = req.body.title;
        var description = req.body.description;
            
        await Table.create({title:title, description:description}).exec(function(err){
            if(err)
            {
                res.status(500).send({error: 'Database Error'});
            }else{
                return res.redirect('/welcome');
            }
        });
    
        //   return username;
        // this.res.redirect('/welcome');
    },

    edit: async function (req, res) {
  
        var title = req.body.title;
        var description = req.body.description;
        var id = req.body.id;
       if(title){
        await Table.update({id:id},{title:title}).exec(function(err){
            if(err)
            {
                res.status(500).send({error: 'Database Error'});
            }else{
                return res.redirect('/welcome');
            }
        });
       }

       if(description){
        await Table.update({id:id},{description:description}).exec(function(err){
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
       
        Table.destroy({id:id}).exec(function(err){
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

    img_upload: function (req, res) {
        const dirname =  '../../assets/images/';

        req.file('avatar').upload({
            dirname: dirname,
            saveAs: function(file, cb) {
                cb(null, file.filename);
            }
          }, function (err, uploadedFiles) {
            if (err) return res.serverError(err);
            console.log(uploadedFiles)
            Images.create({path:uploadedFiles[0].filename}).exec(function (err){
                if (err) return res.serverError(err);
                return res.redirect('/welcome');

              });
            
          });
    
    }

    
};
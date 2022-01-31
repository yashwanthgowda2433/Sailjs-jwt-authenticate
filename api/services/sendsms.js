'use strict';

const querystring = require("querystring");
const { Curl } = require("node-libcurl");

const api_url = sails.config.sms.sms_apiurl;
const apikey = sails.config.sms.sms_apikey;
const senderid = sails.config.sms.sms_senderid;

module.exports = {
  
  // Verifies token on a request
  send(to, message, type="xml") {
      message = encodeURIComponent(message)
    //   const params = "web/send/?apikey="+apikey+"&sender="+senderid+"&to="+to+"&message="+message;
      const params = "web/send/";
      const eurl = api_url+params;
      const curlTest = new Curl();

      curlTest.setOpt(Curl.option.URL, eurl);
      curlTest.setOpt(Curl.option.POST, true);
      curlTest.setOpt(
        Curl.option.POSTFIELDS,
        querystring.stringify({
            apikey: apikey,
            sender: senderid,
            to: to,
            message: message
        })
    );
     var status =  curlTest.on("end", function (statusCode, data, headers) {
        console.log("Status code " + statusCode);
        console.log("***");
        console.log("Our response: " + data);
        console.log("***");
        console.log("Length: " + data.length);
        console.log("***");
        console.log("Total time taken: " + this.getInfo("TOTAL_TIME"));
    
        this.close();
       });
      const terminate = curlTest.close.bind(curlTest);
      curlTest.on("error", terminate);
      curlTest.perform();
      return status;
  }
};
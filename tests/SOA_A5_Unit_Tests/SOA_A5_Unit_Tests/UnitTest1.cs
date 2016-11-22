using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using RestSharp;
using System.Collections.Generic;

namespace SOA_A5_Unit_Tests
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestN1()
        {
            var client = new RestClient("http://localhost:1337");
            // client.Authenticator = new HttpBasicAuthenticator(username, password);

            //to test login using "token", for folders use "folders"
            var request = new RestRequest("token", Method.POST);
            //request.AddParameter("name", "value"); // adds to POST or URL querystring based on Method
            
            //request.AddUrlSegment("id", "123"); // replaces matching token in request.Resource
            request.AddHeader("Content-type", "application/json");
            
            // add parameters for all properties on an object
            request.AddJsonBody(new
            {
                //path=""
                username ="ed",
                password ="pass123"
            }
            );

            // easily add HTTP Headers
            //request.AddHeader("x-token", "d5f27f1b-c56f-40e1-8f19-d8dd030c2726-aaf7ea5a-75a4-41c7-8177-8218fe133789-e6e6ead9-c9c6-4cd8-9b4d-3e44ad08fba3");

            // execute the request
            IRestResponse response = client.Execute(request);
            var content = response.Content; // raw content as string
            //Console.Write(content);
            var jsonObj = Newtonsoft.Json.JsonConvert.DeserializeObject<Dictionary<string,object>> (content);
            string s = jsonObj["userId"].ToString();
            Assert.IsTrue(s == "5");
        }

        [TestMethod]
        public void TestE1()
        {
            var client = new RestClient("http://localhost:1337");
            // client.Authenticator = new HttpBasicAuthenticator(username, password);

            //to test login using "token", for folders use "folders"
            var request = new RestRequest("folders", Method.POST);
            //request.AddParameter("name", "value"); // adds to POST or URL querystring based on Method

            //request.AddUrlSegment("id", "123"); // replaces matching token in request.Resource
            request.AddHeader("Content-type", "application/json");

            // add parameters for all properties on an object
            request.AddJsonBody(new
            {
                path ="myStuff",
                username = "ed",
                //password = "pass123"
            }
            );

            // easily add HTTP Headers
            request.AddHeader("x-token", "328457b5-004e-4a1b-a334-c644f468a652-3e0d14fe-479b-4086-a47b-82585fbb2e06-c676d204-f861-4cd1-97a2-44506f1015dc");

            // execute the request
            IRestResponse response = client.Execute(request);
            var content = response.Content; // raw content as string
            //Console.Write(content);
            var jsonObj = Newtonsoft.Json.JsonConvert.DeserializeObject<Dictionary<string, object>>(content);
            string sMsg = jsonObj["message"].ToString();
            string sError = jsonObj["error"].ToString();
            bool bMsg = false;
            bool bError = false;
            
            if (sMsg.Contains("already exists"))
            {
                bMsg = true;
            }

            if (sError == "True")
            {
                bError = true;
            }

            Assert.IsTrue(bMsg && bError);
        }
    }
}

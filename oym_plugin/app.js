/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

'use strict';
// This is buggy
// var request = require('request');

(function () {
    Office.initialize = function (reason) {
        $(document).ready(function () {

            // TODO1: Determine if the user's version of Office supports all the 
            //        Office.js APIs that are used in the tutorial.
            if (!Office.context.requirements.isSetSupported('WordApi', '1.3')) {
                console.log('Sorry. The tutorial add-in uses Word.js APIs that are not available in your version of Office.');
            }
            // TODO2: Assign event handlers and other initializaton logic.
            $('#insert-paragraph').click(insertParagraph);
            $('#replace-text').click(replaceText);
        });
    };

    // TODO3: Add handlers and business logic functions here.
    function insertParagraph() {
        Word.run(function (context) {
            var documentBody = context.document.body;
            context.load(documentBody);
            return context.sync().then(function(){
                // Get all Document Text and use as Prompt
                var prompt = documentBody.text
                console.log(prompt);

                // POST Request vanilla
                var http = new XMLHttpRequest();
                var url = 'http://localhost:5000';
                var params = JSON.stringify({'raw_text': String(prompt)})
                http.open('POST', url, true);

                //Send the proper header information along with the request
                http.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
                http.setRequestHeader('Access-Control-Allow-Origin', '*');

                http.onreadystatechange = function() {//Call a function when the state changes.
                    if(http.readyState == 4 && http.status == 201) {
                        // alert(http.responseText);
                        console.log(http.responseText);
                        var docBody = context.document.body;
                        var inspiration = JSON.parse(http.responseText);
                        var output = String(inspiration.model_text)
                        console.log(output);
                        docBody.insertParagraph(output, "End");
                        return context.sync();
                    }
                }   
                http.send(params);
            })
        })
        .catch(function (error) {
            console.log("Error: " + error);
            if (error instanceof OfficeExtension.Error) {
                console.log("Debug info: " + JSON.stringify(error.debugInfo));
            }
        });
    };
})();
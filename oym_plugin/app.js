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
                // POST Request

                // request.post('<insert URL>', {
                //     json: {
                //         model_prompt: prompt
                //     }
                // }, (error, res, body) => {
                //     if (error) {
                //         console.error(error);
                //         return;
                //     }
                //     console.log(`statusCode: ${res.statusCode}`);
                //     console.log(body);

                //     // Write to Word Document
                //     var docBody = context.document.body;
                //     docBody.insertParagraph(body);
                //     return context.sync();
                // });
            })
        })
        .catch(function (error) {
            console.log("Error: " + error);
            if (error instanceof OfficeExtension.Error) {
                console.log("Debug info: " + JSON.stringify(error.debugInfo));
            }
        });
    };

    function replaceText() {
        Word.run(function (context) {
            
            const doc = context.document;
            const originalRange = doc.getSelection();
            console.log(originalRange);
            // originalRange.insertText("many", "Replace");

            return context.sync();
        })
        .catch(function (error) {
            console.log("Error: " + error);
            if (error instanceof OfficeExtension.Error) {
                console.log("Debug info: " + JSON.stringify(error.debugInfo));
            }
        });
    }
  
})();
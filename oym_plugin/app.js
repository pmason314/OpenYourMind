/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

'use strict';

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
        });
    };

    // TODO3: Add handlers and business logic functions here.
    function insertParagraph() {
        Word.run(function (context) {
    
            // TODO4: Queue commands to insert a paragraph into the document.
            var docBody = context.document.body;
            docBody.insertParagraph("Office has several versions, including Office 2016, Office 365 Click-to-Run, and Office on the web.",
                                    "Start");
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
/*!
Alpaca Version 1.0.4

Copyright 2013 Gitana Software, Inc.

Licensed under the Apache License, Version 2.0 (the "License"); 
you may not use this file except in compliance with the License. 

You may obtain a copy of the License at 
	http://www.apache.org/licenses/LICENSE-2.0 

Unless required by applicable law or agreed to in writing, software 
distributed under the License is distributed on an "AS IS" BASIS, 
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
See the License for the specific language governing permissions and 
limitations under the License. 

For more information, please contact Gitana Software, Inc. at this
address:

  info@gitanasoftware.com
*/

(function($) {

    module("fields: text");

    // Test case 1 : Simple text field with only string data input.
    test("Simple text field with only string data input", function() {
        stop();
        $("#text-1").alpaca({
            "data": "I Love Alpaca Ice Cream!",
            "postRender": function (renderedField) {
                expect(2);
                var inputElem = $('#text-1 input:text');
                ok(inputElem.length, 'Text input field generated.');
                equal(inputElem.val(), 'I Love Alpaca Ice Cream!', 'Input field value populated correctly.');
                start();
            }
        });
    });

    // Test case 2 : Text field with data, schema and options.
    test("Text field with data, schema and options", function() {
        stop();
        $("#text-2").alpaca({
            "data": "Mint Chocolate",
            "options": {
                "label": "Ice Cream",
                "helper": "Your favorite ice cream?",
                "placeholder": "Enter an Ice Cream flavor",
                "size": 30
            },
            "schema": {
                "minLength": 3,
                "maxLength": 8
            },
            "postRender": function (renderedField) {
                expect(11);
                var inputElem = $('#text-2 input:text');
                ok(inputElem.length, 'Text input field generated.');
                equal(inputElem.val(), 'Mint Chocolate', 'Input field value populated correctly.');
                equal(inputElem.attr('size'), "30", 'Input field size set.');
                equal(inputElem.attr('placeholder'), "Enter an Ice Cream flavor", 'Input field placeholder set.');
                var labelElem = $('#text-2 .alpaca-controlfield-label>div');
                ok(labelElem.length, 'Input field label generated.');
                equal(labelElem.text(), 'Ice Cream', 'Label text populated correctly.');
                var helperElem = $('#text-2 .alpaca-controlfield-helper > span.alpaca-controlfield-helper-text');
                ok(helperElem.length, 'Input field helper generated.');
                equal(helperElem.text(), 'Your favorite ice cream?', 'Helper text populated correctly.');
                var invalidElem = $('#text-2 .alpaca-field-invalid');
                ok(invalidElem.length, 'Input field marked as invalid.');
                var messageElem = $('#text-2 .alpaca-controlfield-message-text');
                ok(messageElem.length, 'Field error message generated.');
                equal(messageElem.text(), Alpaca.substituteTokens(renderedField.view.getMessage("stringTooLong"), [8]), 'Error message text populated correctly.');
                start();
            }
        });
    });

    // Test case 3 : Text field with data, schema, options and custom view.
    test("Text field with data, schema, options and custom view", function() {
        stop();
        $("#text-3").alpaca({
            "data": "Mint",
            "options": {
                "label": "Ice Cream",
                "helper": "Your favorite ice cream?",
                "placeholder": "Enter an Ice Cream flavor",
                "size": 30
            },
            "schema": {
                "minLength": 3,
                "maxLength": 8
            },
            "view": {
                "parent": "VIEW_WEB_EDIT",
                "styles": {
                    ".alpaca-controlfield-label": {
                        "float": "left",
                        "padding": "6px 0.3em 0 0"
                    }
                }
            },
            "postRender": function (renderedField) {
                expect(12);
                var inputElem = $('#text-3 input:text');
                ok(inputElem.length, 'Text input field generated.');
                equal(inputElem.val(), 'Mint', 'Input field value populated correctly.');
                equal(inputElem.attr('size'), "30", 'Input field size set.');
                equal(inputElem.attr('placeholder'), "Enter an Ice Cream flavor", 'Input field placeholder set.');
                var labelElem = $('#text-3 .alpaca-controlfield-label>div');
                ok(labelElem.length, 'Input field label generated.');
                equal(labelElem.text(), 'Ice Cream', 'Label value populated correctly.');
                equal(labelElem.parent().css('float'), 'left', 'Label float style injected correctly.');
                equal(labelElem.parent().css('padding-top'), '6px', 'Label padding style injected correctly.');
                var helperElem = $('#text-3 .alpaca-controlfield-helper > span.alpaca-controlfield-helper-text');
                ok(helperElem.length, 'Input field helper generated.');
                equal(helperElem.text(), 'Your favorite ice cream?', 'Helper text populated correctly.');
                var invalidElem = $('#text-3 .alpaca-field-invalid');
                ok(invalidElem.length==0, 'Input field not marked as invalid.');
                var messageElem = $('#text-3 .alpaca-controlfield-message-text');
                ok(messageElem.length==0, 'Field error message not generated.');
                start();
            }
        });
    });

}(jQuery) );
(function($) {

    module("fields: checkbox");

    // Test case 1 : Simple checkbox field with only boolean data input.
    test("Simple checkbox field with only boolean data input", function() {
        stop();
        $("#checkbox-1").alpaca({
            "data": false,
            "postRender": function (renderedField) {
                expect(2);
                var inputElem = $('#checkbox-1 input:checkbox');
                ok(inputElem.length, 'Checkbox input field generated.');
                equal(inputElem.is(':checked'), false, 'Checkbox field value populated correctly.');
                start();
            }
        });
    });

    // Test case 2 : Checkbox field with label and right label.
    test("Checkbox field with label and right label", function() {
        stop();
        $("#checkbox-2").alpaca({
            "data": true,
            "options": {
                "label": "Question:",
                "rightLabel": "Do you like Alpaca?"
            },
            "postRender": function (renderedField) {
                expect(6);
                var inputElem = $('#checkbox-2 input:checkbox');
                ok(inputElem.length, 'Checkbox input field generated.');
                equal(inputElem.is(':checked'), true, 'Checkbox field value populated correctly.');
                var labelElem = $('#checkbox-2 .alpaca-controlfield-label>div');
                ok(labelElem.length, 'Checkbox field label generated.');
                equal(labelElem.text(), 'Question:', 'Label text populated correctly.');
                var rightLabelElem = $('#checkbox-2 .alpaca-controlfield-checkbox > span > label');
                ok(rightLabelElem.length, 'Checkbox field right label generated.');
                equal(rightLabelElem.text(), 'Do you like Alpaca?', 'Right label text populated correctly.');
                start();
            }
        });
    });

}(jQuery) );
(function($) {

    module("fields: number");

    // Test case 1 : Simple number field with only boolean data input.
    test("Simple number field with only number data input", function() {
        stop();
        $("#number-1").alpaca({
            "data": 15,
            "postRender": function (renderedField) {
                expect(2);
                var inputElem = $('#number-1 input:text');
                ok(inputElem.length, 'Input field generated.');
                equal(inputElem.val(), "15", 'Field value populated correctly.');
                start();
            }
        });
    });

    // Test case 2 : Number field with options and schema.
    test("Number field with label and right label", function() {
        stop();
        $("#number-2").alpaca({
            "data": 3.55,
            "options": {
                "label": "Gas Price:",
                "helper": "Enter Gas Price in Your Neighborhood"
            },
            "schema": {
                minimum: 2.10,
                maximum: 3.25
            }
            ,
            "postRender": function (renderedField) {
                expect(13);
                var inputElem = $('#number-2 input:text');
                ok(inputElem.length, 'Input field generated.');
                equal(inputElem.val(), "3.55", 'Field value populated correctly.');
                var labelElem = $('#number-2 .alpaca-controlfield-label>div');
                ok(labelElem.length, 'Field label generated.');
                equal(labelElem.text(), 'Gas Price:', 'Label text populated correctly.');
                var helperElem = $('#number-2 .alpaca-controlfield-helper > span.alpaca-controlfield-helper-text');
                ok(helperElem.length, 'Input field helper generated.');
                equal(helperElem.text(), 'Enter Gas Price in Your Neighborhood', 'Helper text populated correctly.');
                var invalidElem = $('#number-2 .alpaca-field-invalid');
                ok(invalidElem.length, 'Input field marked as invalid.');
                var messageElem = $('#number-2 .alpaca-controlfield-message-text');
                ok(messageElem.length, 'Field error message generated.');
                equal(messageElem.text(), Alpaca.substituteTokens(renderedField.view.getMessage("stringValueTooLarge"), [3.25]), 'Error message text populated correctly.');
                // change the field value and trigger the field re-validation
                inputElem.blur(function() {
                    if (inputElem.val() == '1.11') {
                        var invalidElem = $('#number-2 .alpaca-field-invalid');
                        ok(invalidElem.length, 'Input field marked as invalid with value 1.11.');
                        var messageElem = $('#number-2 .alpaca-controlfield-message-text');
                        ok(messageElem.length, 'Field error message generated.');
                        equal(messageElem.text(), Alpaca.substituteTokens(renderedField.view.getMessage("stringValueTooSmall"), [2.1]), 'Error message text populated correctly.');
                                    }
                    if (inputElem.val() == '2.22') {
                        var invalidElem = $('#number-2 .alpaca-field-invalid');
                        ok(invalidElem.length==0, 'Input field marked as valid with value 2.22.');
                    }
                })
                inputElem.val('1.11');
                inputElem.blur();
                inputElem.val('2.22');
                inputElem.blur();
                start();
            }
        });
    });

}(jQuery) );
(function($) {

    module("fields: any");

    // Test case 1 : Any field with data and schema.
    test("Any field with data and schema", function() {
        stop();
        $("#any-1").alpaca({
            "data": "I Love Alpaca Ice Cream!",
            "schema": {
                "title": "Ice Cream",
                "type": "any"
            },
            "postRender": function (renderedField) {
                expect(4);
                var inputElem = $('#any-1 input:text');
                ok(inputElem.length, 'Text input field generated.');
                equal(inputElem.val(), 'I Love Alpaca Ice Cream!', 'Input field value populated correctly.');
                var labelElem = $('#any-1 .alpaca-controlfield-label>div');
                ok(labelElem.length, 'Input field label generated.');
                equal(labelElem.text(), 'Ice Cream', 'Label text populated correctly.');
                start();
            }
        });
    });

}(jQuery) );
(function($) {

    module("fields: array");

    // Test case 1 : Array field with only array data input.
    test("Array field with only array data input", function() {
        stop();
        $("#array-1").alpaca({
            "data": ["test1", "test2", "test3"],
            "postRender": function (renderedField) {
                expect(20);
                var inputElem0 = $('#array-1 input:text:eq(0)');
                ok(inputElem0.length, 'First text input field generated.');
                equal(inputElem0.val(), 'test1', 'First input field value populated correctly.');
                var inputElem1 = $('#array-1 input:text:eq(1)');
                ok(inputElem1.length, 'Second text input field generated.');
                equal(inputElem1.val(), 'test2', 'Second input field value populated correctly.');
                var inputElem2 = $('#array-1 input:text:eq(2)');
                ok(inputElem2.length, 'Third text input field generated.');
                equal(inputElem2.val(), 'test3', 'Third input field value populated correctly.');
                // test array item toolbar
                inputElem0.hover(function() {
                    var id = inputElem0.attr('id');
                    var itemArrayBar = $("#array-1 #" + id + "-item-container > .alpaca-fieldset-array-item-toolbar");
                    ok(itemArrayBar.length, 'First item toolbar generated.');
                    var buttons = $('button', itemArrayBar);
                    equal(buttons.length, 4, 'Four buttons generated.');
                    // simulate add
                    var addButton = $('button.alpaca-fieldset-array-item-toolbar-add', itemArrayBar);
                    ok(addButton.length, 'Add button generated.');
                    addButton.click(function() {
                        var newInputElem = $('#array-1 input:text:eq(1)');
                        ok(newInputElem.length, 'New text input field generated.');
                        equal(newInputElem.val(), 'test1', 'New input field value populated correctly.');
                        // simulate remove
                        var newId = newInputElem.attr('id');
                        var newItemArrayBar = $("#array-1 #" + newId + "-item-container > .alpaca-fieldset-array-item-toolbar");
                        var removeButton = $('button.alpaca-fieldset-array-item-toolbar-remove', newItemArrayBar);
                        ok(removeButton.length, 'Remove button generated.');
                        removeButton.click(function() {
                            var inputElems = $('#array-1 input:text');
                            equal(inputElems.length, 3, 'Item removed successfully.');
                            // simulate up
                            var upButton = $('button.alpaca-fieldset-array-item-toolbar-up', itemArrayBar);
                            ok(upButton.length, 'Up button generated.');
                            upButton.click(function() {
                                var newInputElem0 = $('#array-1 input:text:eq(0)');
                                equal(newInputElem0.val(), 'test3', 'New first input field value populated correctly.');
                                var newInputElem2 = $('#array-1 input:text:eq(2)');
                                equal(newInputElem2.val(), 'test1', 'New last input field value populated correctly.');
                                // simulate down
                                itemArrayBar = $("#array-1 #" + id + "-item-container > .alpaca-fieldset-array-item-toolbar");
                                var downButton = $('button.alpaca-fieldset-array-item-toolbar-down', itemArrayBar);
                                ok(downButton.length, 'Down button generated.');
                                downButton.click(function() {
                                    var newInputElem00 = $('#array-1 input:text:eq(0)');
                                    equal(newInputElem00.val(), 'test1', 'New first input field value populated correctly.');
                                    var newInputElem22 = $('#array-1 input:text:eq(2)');
                                    equal(newInputElem22.val(), 'test3', 'New last input field value populated correctly.');
                                });
                                downButton.click();
                            });
                            upButton.click();
                        });
                        removeButton.click();
                    });
                    addButton.click();
                }, function() {
                    var id = inputElem0.attr('id');
                    var itemArrayBar = $("#array-1 #" + id + "-item-container > .alpaca-fieldset-array-item-toolbar");
                    ok(itemArrayBar.length, 'First item toolbar generated.');
                    inputElem0.mouseenter();
                });
                inputElem0.mouseleave();
                start();
            }
        });
    });

    // Test case 2 : Array field with options and schema.
    test("Array field with options and schema", function() {
        stop();
        $("#array-2").alpaca({
            "data": ["M"],
            "options": {
                "label": "Ice Cream",
                "helper": "Favorite Ice Cream",
                "itemLabel": "Favorite"
            },
            "schema": {
                "description": "My Favorite Ice Creams",
                "type": "array",
                "items": {
                    "title": "Ice Cream",
                    "type": "string",
                    "minLength": 3,
                    "maxLength": 8,
                    "minItems": 2,
                    "maxItems": 2
                }
            },
            "postRender": function (renderedField) {
                expect(22);
                var inputElem0 = $('#array-2 input:text:eq(0)');
                ok(inputElem0.length, 'First text input field generated.');
                equal(inputElem0.val(), 'M', 'First input field value populated correctly.');
                var id = inputElem0.attr('id');
                var arrayHelperItem = $('#array-2 .alpaca-fieldset-helper');
                ok(arrayHelperItem.length, 'Array helper generated.');
                equal(arrayHelperItem.text(), 'Favorite Ice Cream', 'Array helper text populated correctly.');
                var item0LabelElem = $('#array-2 #' + id + '-item-container > .alpaca-controlfield-label > div');
                ok(item0LabelElem.length, 'Item label generated.');
                equal(item0LabelElem.text(), 'Favorite 1', 'Item label text populated correctly.');
                var inputElem0LabelElem = $('#array-2 #' + id + '-controlfield-label > div');
                ok(inputElem0LabelElem.length, 'Array item label generated.');
                equal(inputElem0LabelElem.text(), 'Ice Cream', 'Array item label text populated correctly.');
                var inputElem0MessageElem = $('#array-2 #' + id + '-field-message-0 > .alpaca-controlfield-message-text');
                ok(inputElem0MessageElem.length, 'Array item invalid message generated.');
                equal(inputElem0MessageElem.text(), Alpaca.substituteTokens(renderedField.view.getMessage("stringTooShort"), [3]), 'Array item invalid text populated correctly.');
                var arrayElem = $('#array-2 fieldset.alpaca-field-invalid');
                ok(arrayElem.length, 'Array marked as invalid.');
                var arrayId = arrayElem.attr('alpaca-field-id');
                var arrayMessageElem = $('#array-2 #' + arrayId + '-field-message-0 > .alpaca-controlfield-message-text');
                ok(arrayMessageElem.length, 'Array invalid message generated.');
                equal(arrayMessageElem.text(), Alpaca.substituteTokens(renderedField.view.getMessage("notEnoughItems"), [2]), 'Array invalid text populated correctly.');

                // test array item toolbar
                inputElem0.hover(function() {
                    var id = inputElem0.attr('id');
                    var itemArrayBar = $("#array-2 #" + id + "-item-container > .alpaca-fieldset-array-item-toolbar");
                    ok(itemArrayBar.length, 'First item toolbar generated.');
                    var removeButton = $('button.alpaca-fieldset-array-item-toolbar-remove', itemArrayBar);
                    ok(removeButton.length, 'Remove button generated.');
                    var removeButtonDisabled = removeButton.button("option", "disabled");
                    ok(removeButtonDisabled, 'Remove button disabled.');
                    // simulate add
                    var addButton = $('button.alpaca-fieldset-array-item-toolbar-add', itemArrayBar);
                    ok(addButton.length, 'Add button generated.');
                    addButton.click(function() {
                        var newInputElem = $('#array-2 input:text:eq(1)');
                        ok(newInputElem.length, 'New text input field generated.');
                        equal(newInputElem.val(), 'M', 'New input field value populated correctly.');
                        var arrayMessageElem = $('#array-2 #' + arrayId + '-field-message-0');
                        ok(arrayMessageElem.length == 0, 'Array invalid message removed.');
                        itemArrayBar = $("#array-2 #" + id + "-item-container > .alpaca-fieldset-array-item-toolbar");
                        addButton = $('button.alpaca-fieldset-array-item-toolbar-add', itemArrayBar);
                        var addButtonDisabled = addButton.button("option", "disabled");
                        ok(addButtonDisabled, 'Add button disabled.');
                    });
                    addButton.click();
                }, function() {
                    var id = inputElem0.attr('id');
                    var itemArrayBar = $("#array-2 #" + id + "-item-container > .alpaca-fieldset-array-item-toolbar");
                    ok(itemArrayBar.length, 'First item toolbar generated.');
                    inputElem0.mouseenter();
                });
                inputElem0.mouseleave();
                start();
            }
        });
    });

    // Test case 3 : Array field with array default value.
    test("Array field with array default value", function() {
        stop();
        $("#array-3").alpaca({
            "schema": {
                "description": "My Favorite Ice Creams",
                "type": "array",
                "default": '["Vanilla","Mint","Moose Track"]',
                "items": {
                    "title": "Ice Cream",
                    "type": "string",
                    "minLength": 3,
                    "maxLength": 8,
                    "minItems": 2,
                    "maxItems": 5
                }
            },
            "postRender": function (renderedField) {
                expect(6);
                var inputElem0 = $('#array-3 input:text:eq(0)');
                ok(inputElem0.length, 'First text input field generated.');
                equal(inputElem0.val(), 'Vanilla', 'First input field value populated correctly.');
                var inputElem1 = $('#array-3 input:text:eq(1)');
                ok(inputElem1.length, 'Second text input field generated.');
                equal(inputElem1.val(), 'Mint', 'Second input field value populated correctly.');
                var inputElem2 = $('#array-3 input:text:eq(2)');
                ok(inputElem2.length, 'Third text input field generated.');
                equal(inputElem2.val(), 'Moose Track', 'Third input field value populated correctly.');
                start();
            }
        });
    });

    // Test case 4 : Array field with string default value.
    test("Array field with string default value", function() {
        stop();
        $("#array-4").alpaca({
            "schema": {
                "description": "My Favorite Ice Creams",
                "type": "array",
                "default": "Vanilla",
                "items": {
                    "title": "Ice Cream",
                    "type": "string"
                }
            },
            "postRender": function (renderedField) {
                expect(2);
                var inputElem0 = $('#array-4 input:text:eq(0)');
                ok(inputElem0.length, 'First text input field generated.');
                equal(inputElem0.val(), 'Vanilla', 'First input field value populated correctly.');
                start();
            }
        });
    });

    // Test case 5 : Array field with item type as object.
    test("Array field with item type as object", function() {
        stop();
        $("#array-5").alpaca({
            "schema": {
                "description": "My Favorite Ice Creams",
                "type": "array",
                "items": {
                    "title": "Ice Cream",
                    "type": "object",
                    "properties": {
                        "flavor": {
                            "title": "Flavor",
                            "description": "Ice cream flavor",
                            "type": "string"
                        },
                        "topping": {
                            "title": "Topping",
                            "description": "Ice cream topping",
                            "type": "string"
                        }
                    }
                }
            },
            "postRender": function (renderedField) {
                expect(9);
                var arrayToolBarAddButton = $('#array-5 .alpaca-fieldset-array-toolbar-add');
                ok(arrayToolBarAddButton.length, 'Array toolbar with add button generated.');
                arrayToolBarAddButton.click(function() {
                    var objectFieldSetItem = $('#array-5 .alpaca-fieldset-items-container fieldset');
                    var objectFieldSetItemId = objectFieldSetItem.attr('alpaca-field-id');
                    ok(objectFieldSetItem.length, 'New object field generated.');
                    var inputElem0 = $('input:text:eq(0)', objectFieldSetItem);
                    ok(inputElem0.length, 'New object first text input field generated.');
                    var inputElem0Id = inputElem0.attr('id');
                    var inputElem0LabelElem = $('#' + inputElem0Id + '-controlfield-label > div', objectFieldSetItem);
                    ok(inputElem0LabelElem.length, 'Label for new object first text input field generated.');
                    equal(inputElem0LabelElem.text(), 'Flavor', 'Label for new object first text input field populated with correct text.');
                    var inputElem1 = $('input:text:eq(1)', objectFieldSetItem);
                    ok(inputElem1.length, 'New object second text input field generated.');
                    var inputElem1Id = inputElem1.attr('id');
                    var inputElem1LabelElem = $('#' + inputElem1Id + '-controlfield-label > div', objectFieldSetItem);
                    ok(inputElem1LabelElem.length, 'Label for new object second text input field generated.');
                    equal(inputElem1LabelElem.text(), 'Topping', 'Label for second object first text input field populated with correct text.');
                    var arrayItemToolBarRemoveButton = $('#array-5 #' + objectFieldSetItemId + '-item-container .alpaca-fieldset-array-item-toolbar .alpaca-fieldset-array-item-toolbar-remove');
                    arrayItemToolBarRemoveButton.click(function() {
                        arrayToolBarAddButton = $('#array-5 .alpaca-fieldset-array-toolbar-add');
                        ok(arrayToolBarAddButton.length, 'Array toolbar re-generated once all items are removed.');
                    });
                    arrayItemToolBarRemoveButton.click();
                });
                arrayToolBarAddButton.click();
                start();
            }
        });
    });

    // Test case 6 : Nested array field.
    test("Nested array field", function() {
        stop();
        $("#array-6").alpaca({
            "schema": {
                "description": "Ice Cream Prices",
                "type": "array",
                "items": {
                    "title": "Flavor Price",
                    "type": "array",
                    "items": {
                        "title": "Price",
                        "type": "number"
                    }
                }
            },
            "postRender": function (renderedField) {
                expect(4);
                var arrayToolBarAddButton = $('#array-6 .alpaca-fieldset-array-toolbar-add');
                ok(arrayToolBarAddButton.length, 'Array toolbar with add button generated.');
                arrayToolBarAddButton.click(function() {
                    var objectFieldSetItem = $('#array-6 .alpaca-fieldset-items-container fieldset');
                    ok(objectFieldSetItem.length, 'New array item field generated.');
                    var subArrayToolBarAddButton = $('.alpaca-fieldset-array-toolbar .alpaca-fieldset-array-toolbar-add', objectFieldSetItem);
                    ok(subArrayToolBarAddButton.length, 'Sub array toolbar with add button generated.');
                    subArrayToolBarAddButton.click(function() {
                        var inputElem0 = $('input:text:eq(0)', objectFieldSetItem);
                        ok(inputElem0.length, 'Sub array item text input field generated.');
                    });
                    subArrayToolBarAddButton.click();
                });
                arrayToolBarAddButton.click();
                start();
            }
        });
    });
}(jQuery) );(function($) {

    module("fields: object");

    // Test case 1 : Simple object field with only object data input.
    test("Simple object field with only object data input.", function() {
        stop();
        $("#object-1").alpaca({
            "data": {
                name: "Taylor Swift",
                age: 18
            },
            "postRender": function (renderedField) {
                expect(4);
                var inputElem0 = $('#object-1 input:text:eq(0)');
                ok(inputElem0.length, 'First text input field generated.');
                equal(inputElem0.val(), 'Taylor Swift', 'First input field value populated correctly.');
                var inputElem1 = $('#object-1 input:text:eq(1)');
                ok(inputElem1.length, 'Second text input field generated.');
                equal(inputElem1.val(), '18', 'Second input field value populated correctly.');
                start();
            }
        });
    });

    // Test case 2 : Object field with data and schema.
    test("Object field with data and schema.", function() {
        stop();
        $("#object-2").alpaca({
            "data": {
                name: "Taylor Swift",
                age: 18
            },
            "schema": {
                "title": "Customer Profile",
                "description": "Customer Contact Information",
                "type": "object",
                "properties": {
                    "name": {
                        "title": "Full Name",
                        "description": "Enter Your Full Name",
                        "type": "string"
                    },
                    "age": {
                        "title": "Age",
                        "type": "number"
                    }
                }
            },
            "postRender": function (renderedField) {
                expect(12);
                var inputElem0 = $('#object-2 input:text:eq(0)');
                ok(inputElem0.length, 'First text input field generated.');
                equal(inputElem0.val(), 'Taylor Swift', 'First input field value populated correctly.');
                var id0 = inputElem0.attr('id');
                var inputElem0LabelElem = $('#object-2 #' + id0 + '-controlfield-label > div');
                ok(inputElem0LabelElem.length, 'First text input field label generated.');
                equal(inputElem0LabelElem.text(), 'Full Name', 'First input field label text populated correctly.');
                var inputElem0HelperElem = $('#object-2 #' + id0 + '-controlfield-helper .alpaca-controlfield-helper-text');
                ok(inputElem0HelperElem.length, 'First text input field helper generated.');
                equal(inputElem0HelperElem.text(), 'Enter Your Full Name', 'First input field helper text populated correctly.');
                var inputElem1 = $('#object-2 input:text:eq(1)');
                ok(inputElem1.length, 'Second text input field generated.');
                equal(inputElem1.val(), '18', 'Second input field value populated correctly.');
                var id = $('#object-2 fieldset').attr('alpaca-field-id');
                var fieldSetLabelItem = $('#object-2 fieldset legend');
                ok(fieldSetLabelItem.length, 'Fieldset label generated.');
                equal(fieldSetLabelItem.text(), 'Customer Profile', 'Fieldset label text populated correctly');
                var fieldSetHelperItem = $('#object-2 fieldset .alpaca-fieldset-helper');
                ok(fieldSetHelperItem.length, 'Fieldset helper generated.');
                equal(fieldSetHelperItem.text(), 'Customer Contact Information', 'Fieldset helper text populated correctly');
                start();
            }
        });
    });

    // Test case 3 : Object field with data, options and schema.
    test("Object with data and schema.", function() {
        stop();
        var initData = {
            name: "James Bond",
            age: 45,
            icecream: ["Chocolate", "Vanilla", "Strawberry"],
            address: {
                street: ["100 Main Street", "Suite 200"],
                city: "Burlington",
                state: "MA",
                zip: "18210"
            }
        };
        $("#object-3").alpaca({
            "data": initData,
            "schema": {
                "title": "Customer Profile",
                "description": "Alpaca Ice Cream Customer Profile",
                "type": "object",
                "properties": {
                    "name": {
                        "title": "Full Name",
                        "type": "string"
                    },
                    "age": {
                        "title": "Age",
                        "type": "number"
                    },
                    "icecream": {
                        "title": "Favorite Ice Cream",
                        "type": "array"
                    },
                    "address": {
                        "title": "Home Address",
                        "type": "object",
                        "properties": {
                            "street": {
                                "title": "Street Address",
                                "type": "array",
                                "items": {
                                    "type": "string",
                                    "maxLength": 30,
                                    "minItems": 1,
                                    "maxItems": 3
                                }
                            },
                            "city": {
                                "title": "City",
                                "type": "string"
                            },
                            "state": {
                                "title": "State",
                                "type": "string"
                            },
                            "zip": {
                                "title": "Zip Code",
                                "type": "string"
                            }
                        }
                    }
                }
            },
            "options": {
                "fields": {
                    "address": {
                        "fields": {
                            "street": {
                                "collapsed": true,
                                "itemLabel": "Line"
                            }
                        }
                    }
                }
            },
            "postRender": function (renderedField) {
                expect(5);
                deepEqual(renderedField.getValue(), initData, 'Object field getValue() method returns correct value.');
                var addressFieldSetElem = $('#object-3 > fieldset > .alpaca-fieldset-items-container > div:eq(3) > fieldset');
                ok(addressFieldSetElem.length, 'Fieldset for address field generated.');
                var streetFieldElem = $('.alpaca-fieldset-items-container fieldset', addressFieldSetElem);
                ok(streetFieldElem.length, 'Fieldset for street field generated.');
                //var displayStyle = $('.alpaca-fieldset-items-container',streetFieldElem).css('display');
                //equal(displayStyle,'none',"Street field collapsed initially.")
                var streetFieldItemLabel0Elem = $('.alpaca-controlfield-label:eq(0)', streetFieldElem);
                ok(streetFieldItemLabel0Elem.length, 'Street field label generated.');
                equal(streetFieldItemLabel0Elem.text(), 'Line 1', "Street field label text populated correctly.")
                start();
            }
        });
    });

    // Test case 4 : Object field with default value.
    test("Object field with default value.", function() {
        stop();
        $("#object-4").alpaca({
            "schema": {
                "title": "Customer Profile",
                "description": "Customer Contact Information",
                "type": "object",
                "default": '{"name":"Taylor Swift","age":18}',
                "properties": {
                    "name": {
                        "title": "Full Name",
                        "description": "Enter Your Full Name",
                        "type": "string"
                    },
                    "age": {
                        "title": "Age",
                        "type": "number"
                    }
                }
            },
            "postRender": function (renderedField) {
                expect(12);
                var inputElem0 = $('#object-4 input:text:eq(0)');
                ok(inputElem0.length, 'First text input field generated.');
                equal(inputElem0.val(), 'Taylor Swift', 'First input field value populated correctly.');
                var id0 = inputElem0.attr('id');
                var inputElem0LabelElem = $('#object-4 #' + id0 + '-controlfield-label > div');
                ok(inputElem0LabelElem.length, 'First text input field label generated.');
                equal(inputElem0LabelElem.text(), 'Full Name', 'First input field label text populated correctly.');
                var inputElem0HelperElem = $('#object-4 #' + id0 + '-controlfield-helper .alpaca-controlfield-helper-text');
                ok(inputElem0HelperElem.length, 'First text input field helper generated.');
                equal(inputElem0HelperElem.text(), 'Enter Your Full Name', 'First input field helper text populated correctly.');
                var inputElem1 = $('#object-4 input:text:eq(1)');
                ok(inputElem1.length, 'Second text input field generated.');
                equal(inputElem1.val(), '18', 'Second input field value populated correctly.');
                var id = $('#object-4 fieldset').attr('alpaca-field-id');
                var fieldSetLabelItem = $('#object-4 fieldset legend');
                ok(fieldSetLabelItem.length, 'Fieldset label generated.');
                equal(fieldSetLabelItem.text(), 'Customer Profile', 'Fieldset label text populated correctly');
                var fieldSetHelperItem = $('#object-4 fieldset .alpaca-fieldset-helper');
                ok(fieldSetHelperItem.length, 'Fieldset helper generated.');
                equal(fieldSetHelperItem.text(), 'Customer Contact Information', 'Fieldset helper text populated correctly');
                start();
            }
        });
    });
}(jQuery) );(function($) {

    module("fields: integer");

    // Test case 1 : Simple object field with only integer data input.
    test("Simple object field with only integer data input.", function() {
        stop();
        $("#integer-1").alpaca({
            "data": 18,
            "postRender": function (renderedField) {
                expect(3);
                equal(renderedField.getValue(), 18, 'Integer field getValue() method returns correct value.')
                var inputElem0 = $('#integer-1 input:text');
                ok(inputElem0.length, 'Input field generated.');
                equal(inputElem0.val(), '18', 'Input field value populated correctly.');
                start();
            }
        });
    });

    // Test case 2 : Integer field with data and schema.
    test("Integer field with data and schema.", function() {
        stop();
        $("#integer-2").alpaca({
            "data": 17,
            "options": {
                "type": "integer",
                "label": "Age:",
                "helper": "Guess Talyor Swift's Age"
            },
            "schema": {
                minimum: 18,
                maximum: 25,
                exclusiveMinimum: true,
                exclusiveMaximum: true,
                divisibleBy: 2
            },
            "postRender": function (renderedField) {
                expect(17);
                var inputElem = $('#integer-2 input:text');
                ok(inputElem.length, 'Input field generated.');
                equal(inputElem.val(), '17', 'Input field value populated correctly.');
                var id = inputElem.attr('id');
                var inputElemLabelElem = $('#integer-2 #' + id + '-controlfield-label > div');
                ok(inputElemLabelElem.length, 'Input field label generated.');
                equal(inputElemLabelElem.text(), 'Age:', 'Input field label text populated correctly.');
                var inputElemHelperElem = $('#integer-2 #' + id + '-controlfield-helper .alpaca-controlfield-helper-text');
                ok(inputElemHelperElem.length, 'Input field helper generated.');
                equal(inputElemHelperElem.text(), "Guess Talyor Swift's Age", 'Input field helper text populated correctly.');
                var inputElem0MessageElem0 = $('#integer-2 #' + id + '-field-message-0 > .alpaca-controlfield-message-text');
                ok(inputElem0MessageElem0.length, 'First integer field invalid message generated.');
                equal(inputElem0MessageElem0.text(), Alpaca.substituteTokens(renderedField.view.getMessage("stringDivisibleBy"), [2]), 'First integer field invalid message text populated correctly.');
                var inputElem0MessageElem1 = $('#integer-2 #' + id + '-field-message-1 > .alpaca-controlfield-message-text');
                ok(inputElem0MessageElem1.length, 'Second integer field invalid message generated.');
                equal(inputElem0MessageElem1.text(), Alpaca.substituteTokens(renderedField.view.getMessage("stringValueTooSmallExclusive"), [18]), 'Second integer field invalid message text populated correctly.');
                // change the field value and trigger the field re-validation
                inputElem.blur(function() {
                    if (inputElem.val() == '26') {
                        var invalidElem = $('#integer-2 .alpaca-field-invalid');
                        ok(invalidElem.length, 'Input field marked as invalid with value 26.');
                        var messageElem = $('#integer-2 .alpaca-controlfield-message-text');
                        ok(messageElem.length, 'Field invalid message generated.');
                        equal(messageElem.text(), Alpaca.substituteTokens(renderedField.view.getMessage("stringValueTooLargeExclusive"), [25]), 'Invalid message text populated correctly.');
                    }
                    if (inputElem.val() == '20') {
                        var invalidElem = $('#integer-2 .alpaca-field-invalid');
                        ok(invalidElem.length == 0, 'Input field marked as valid with value 20.');
                    }
                    if (inputElem.val() == '20.1') {
                        var invalidElem = $('#integer-2 .alpaca-field-invalid');
                        ok(invalidElem.length, 'Input field marked as invalid with value 20.1.');
                        var messageElem = $('#integer-2 .alpaca-controlfield-message-text');
                        ok(messageElem.length, 'Field invalid message generated.');
                        equal(messageElem.text(), renderedField.view.getMessage("stringNotAnInteger"), 'Invalid message text populated correctly.');
                    }
                })
                inputElem.val('20');
                inputElem.blur();
                inputElem.val('26');
                inputElem.blur();
                inputElem.val('20.1');
                inputElem.blur();
                start();
            }
        });
    });

    // Test case 3 : Integer field with slider control.
    test("Integer field with data and schema.", function() {
        stop();
        $("#integer-3").alpaca({
            "data": 18,
            "options": {
                "type": "integer",
                "label": "Snow Days:",
                "helper": "Number of Snow Days in January 2011",
                "slider": true
            },
            "schema": {
                minimum: 1,
                maximum: 31
            },
            "postRender": function (renderedField) {
                expect(4);
                var inputElem = $('#integer-3 input:text');
                ok(inputElem.length, 'Input field generated.');
                equal(inputElem.val(), '18', 'Input field value populated correctly.');
                var sliderElem = $('#integer-3 .ui-slider > a');
                ok(sliderElem.length, 'Slider control generated.');
                equal(renderedField.slider.slider( "value"), 18, 'Slider location set correctly.');
                start();
            }
        });
    });
}(jQuery) );(function($) {

    module("fields: radio");

    // Test case 1 : Radio field with data, schema and options.
    test("Radio field with data, schema and options.", function() {
        stop();
        $("#radio-1").alpaca({
            "data": "Coffee",
            "options": {
                "label": "Ice cream",
                "helper": "Guess my favorite ice cream?"
            },
            "schema": {
                "enum": ["Vanilla", "Chocolate", "Coffee"]
            },
            "postRender": function (renderedField) {
                expect(4);
                equal(renderedField.getValue(), "Coffee", 'Radio groupd field getValue() method returns correct value.')
                var radioElems = $('#radio-1 input:radio');
                equal(radioElems.length, 4, 'Right number of radio controls generated.');
                var radioCheckedElem = $('#radio-1 input:radio:checked');
                equal(radioCheckedElem.length, 1, "Checked radio control found.");
                equal(radioCheckedElem.val(), "Coffee", "Right radio control checked.")
                start();
            }
        });
    });

    // Test case 2 : Radio field with option labels.
    test("Radio field with option labels.", function() {
        stop();
        $("#radio-2").alpaca({
            "data": "Coffee2",
            "options": {
                "label": "Ice cream",
                "helper": "Guess my favorite ice cream?",
                "optionLabels": ["Vanilla Flavor", "Chocolate Flavor", "Coffee Flavor"]
            },
            "schema": {
                "required": true,
                "enum": ["Vanilla", "Chocolate", "Coffee"]
            },
            "postRender": function (renderedField) {
                expect(12);
                var radioElems = $('#radio-2 input:radio');
                equal(radioElems.length, 3, 'Right number of radio controls generated.');
                var radioCheckedElem = $('#radio-2 input:radio:checked');
                equal(radioCheckedElem.length, 1, "Checked radio control found.");
                equal(radioCheckedElem.val(), "Vanilla", "Right radio control checked.");
                var invalidElem = $('#radio-2 .alpaca-field-invalid');
                ok(invalidElem.length, 'Field marked as invalid with value Coffee2.');
                var messageElem = $('#radio-2 .alpaca-controlfield-message-text');
                ok(messageElem.length, 'Field invalid message generated.');
                equal(messageElem.text(), Alpaca.substituteTokens(renderedField.view.getMessage("invalidValueOfEnum"), ["Vanilla,Chocolate,Coffee"]), 'Invalid message text populated correctly.');
                var rightLabelElem0 = $('#radio-2 .alpaca-controlfield-radio-label:eq(0)');
                ok(rightLabelElem0.length, 'First option right label generated.');
                equal(rightLabelElem0.text(),'Vanilla Flavor','First option right label text populated correctly.')
                var rightLabelElem1 = $('#radio-2 .alpaca-controlfield-radio-label:eq(1)');
                ok(rightLabelElem1.length, 'Second option right label generated.');
                equal(rightLabelElem1.text(),'Chocolate Flavor','Second option right label text populated correctly.')
                var rightLabelElem2 = $('#radio-2 .alpaca-controlfield-radio-label:eq(2)');
                ok(rightLabelElem2.length, 'Third option right label generated.');
                equal(rightLabelElem2.text(),'Coffee Flavor','Third option right label text populated correctly.')
                start();
            }
        });
    });

    // Test case 3 : Radio field with option labels and integer value.
    test("Radio field with option labels.", function() {
        stop();
        $("#radio-3").alpaca({
            "data": 3,
            "options": {
                "label": "Rate My Ice cream",
                "helper": "Please rate my ice cream",
                "optionLabels": ["Bad", "Ok", "Good"]
            },
            "schema": {
                "required": true,
                "enum": [1, 2, 3]
            },
            "postRender": function (renderedField) {
                expect(10);
                var radioElems = $('#radio-3 input:radio');
                equal(radioElems.length, 3, 'Right number of radio controls generated.');
                var radioCheckedElem = $('#radio-3 input:radio:checked');
                equal(radioCheckedElem.length, 1, "Checked radio control found.");
                equal(radioCheckedElem.val(), "3", "Right radio control checked.");
                var rightLabelElem0 = $('#radio-3 .alpaca-controlfield-radio-label:eq(0)');
                ok(rightLabelElem0.length, 'First option right label generated.');
                equal(rightLabelElem0.text(),'Bad','First option right label text populated correctly.');
                var rightLabelElem1 = $('#radio-3 .alpaca-controlfield-radio-label:eq(1)');
                ok(rightLabelElem1.length, 'Second option right label generated.');
                equal(rightLabelElem1.text(),'Ok','Second option right label text populated correctly.');
                var rightLabelElem2 = $('#radio-3 .alpaca-controlfield-radio-label:eq(2)');
                ok(rightLabelElem2.length, 'Third option right label generated.');
                equal(rightLabelElem2.text(),'Good','Third option right label text populated correctly.');
                ok(renderedField.getValue()===3, 'Return value with right type.');
                start();
            }
        });
    });

    // Test case 4 : Radio field with option labels and integer value.
    test("Radio field for boolean type.", function() {
        stop();
        $("#radio-4").alpaca({
            "data": false,
            "options": {
                "type" : "radio",
                "label": "Rate My Ice cream",
                "helper": "Please rate my ice cream",
                "optionLabels": ["Good", "Bad"]
            },
            "schema": {
                "type" : "boolean",
                "required": true,
                "default" : true,
                "enum": [true,false]
            },
            "postRender": function (renderedField) {
                expect(1);
                ok(renderedField.getValue()===false, 'Return value with right type.');
                start();
            }
        });
    });
}(jQuery) );(function($) {

    module("fields: select");

    // Test case 1 : Select field with data, schema and options.
    test("Select field with data, schema and options.", function() {
        stop();
        $("#select-1").alpaca({
            "data": "Coffee",
            "options": {
                "label": "Ice cream",
                "helper": "Guess my favorite ice cream?"
            },
            "schema": {
                "enum": ["Vanilla", "Chocolate", "Coffee", "Strawberry", "Mint"]
            }
            ,
            "postRender": function (renderedField) {
                expect(4);
                equal(renderedField.getValue(), "Coffee", 'Select field getValue() method returns correct value.')
                var selectElems = $('#select-1 select > option');
                equal(selectElems.length, 6, 'Right number of select options generated.');
                var selectCheckedElem = $('#select-1 select > option:selected');
                equal(selectCheckedElem.length, 1, "Checked select control found.");
                equal(selectCheckedElem.val(), "Coffee", "Right select control checked.")
                start();
            }
        });
    });

    // Test case 2 : Select field with option labels.
    test("Select field with option labels.", function() {
        stop();
        $("#select-2").alpaca({
            "data": "Coffee",
            "options": {
                "label": "Ice cream",
                "helper": "Guess my favorite ice cream?",
                "optionLabels": ["Vanilla Flavor", "Chocolate Flavor", "Coffee Flavor"]
            },
            "schema": {
                "enum": ["Vanilla", "Chocolate", "Coffee", "Strawberry", "Mint"]
            },
            "postRender": function (renderedField) {
                expect(6);
                var selectElems = $('#select-2 select > option');
                equal(selectElems.length, 6, 'Right number of select options generated.');
                var selectCheckedElem = $('#select-2 select > option:selected');
                equal(selectCheckedElem.length, 1, "Checked select control found.");
                equal(selectCheckedElem.val(), "Coffee", "Right select control checked.");
                var rightLabelElem0 = $('#select-2 select > option:eq(1)');
                equal(rightLabelElem0.text(), 'Vanilla Flavor', 'First option right label text populated correctly.');
                var rightLabelElem1 = $('#select-2 select > option:eq(2)');
                equal(rightLabelElem1.text(), 'Chocolate Flavor', 'Second option right label text populated correctly.');
                var rightLabelElem2 = $('#select-2 select > option:eq(3)');
                equal(rightLabelElem2.text(), 'Coffee Flavor', 'Third option right label text populated correctly.');
                start();
            }
        });
    });

    // Test case 3 : Select field with options loaded from external data source.
    test("Select field with options loaded from external data source.", function() {
        stop();
        $("#select-3").alpaca({
            "options": {
                "label": "Ice cream",
                "helper": "Guess my favorite ice cream?",
                "type": "select",
                "dataSource": "../examples/components/fields/data/icecream-list.html"
            },
            "postRender": function (renderedField) {
                expect(5);
                var selectElems = $('#select-3 select > option');
                equal(selectElems.length, 5, 'Right number of select options generated.');
                var rightLabelElem0 = $('#select-3 select > option:eq(1)');
                equal(rightLabelElem0.text(), 'Vanilla Flavor', 'First option right label text populated correctly.');
                var rightLabelElem1 = $('#select-3 select > option:eq(2)');
                equal(rightLabelElem1.text(), 'Chocolate Flavor', 'Second option right label text populated correctly.');
                var rightLabelElem2 = $('#select-3 select > option:eq(3)');
                equal(rightLabelElem2.text(), 'Strawberry Flavor', 'Third option right label text populated correctly.');
                var rightLabelElem3 = $('#select-3 select > option:eq(4)');
                equal(rightLabelElem3.text(), 'Mint Flavor', 'Fourth option right label text populated correctly.');
                start();
            }
        });
    });

    // Test case 4 : Multiple select field with options loaded from external data source..
    test("Multiple select field with options loaded from external data source.", function() {
        stop();
        $("#select-4").alpaca({
            "data": ["Vanilla", "Chocolate"],
            "options": {
                "label": "Ice cream",
                "helper": "Guess my favorite ice cream?",
                "type": "select",
                "multiple": true,
                "size": 3,
                "dataSource": "../examples/components/fields/data/icecream-list.html"
            },
            "postRender": function (renderedField) {
                expect(10);
                var selectElems = $('#select-4 select > option');
                equal(selectElems.length, 5, 'Right number of select options generated.');
                var rightLabelElem0 = $('#select-4 select > option:eq(1)');
                equal(rightLabelElem0.text(), 'Vanilla Flavor', 'First option right label text populated correctly.');
                var rightLabelElem1 = $('#select-4 select > option:eq(2)');
                equal(rightLabelElem1.text(), 'Chocolate Flavor', 'Second option right label text populated correctly.');
                var rightLabelElem2 = $('#select-4 select > option:eq(3)');
                equal(rightLabelElem2.text(), 'Strawberry Flavor', 'Third option right label text populated correctly.');
                var rightLabelElem3 = $('#select-4 select > option:eq(4)');
                equal(rightLabelElem3.text(), 'Mint Flavor', 'Fourth option right label text populated correctly.');
                var selectedElems = $('#select-4 select > option:selected');
                equal(selectedElems.length, 2, 'Right number of select options generated.');
                var selectedElem0 = $('#select-4 select > option:selected:eq(0)');
                equal(selectedElem0.val(), 'Vanilla', 'Right first option selected.');
                var selectedElem1 = $('#select-4 select > option:selected:eq(1)');
                equal(selectedElem1.val(), 'Chocolate', 'Right second option selected.');
                var selectElem = $('#select-4 select');
                equal(selectElem.attr('size'), '3', 'Select size option set correctly.');
                equal(selectElem.attr('multiple'),'multiple', 'Select multiple option set correctly.');
                start();
            }
        });
    });

}(jQuery) );(function($) {

    module("fields: uppercase");

    // Test case 1 : Upper case field.
    test("Upper case field.", function() {
        stop();
        $("#uppercase-1").alpaca({
            "data": "Ice cream is wonderful.",
            "schema": {
                "format": "uppercase"
            },
            "postRender": function (renderedField) {
                expect(4);
                equal(renderedField.getValue(), "ICE CREAM IS WONDERFUL.", 'Select field getValue() method returns correct value.');
                var inputElem = $('#uppercase-1 input:text');
                ok(inputElem.length, 'Text input field generated.');
                equal(inputElem.val(), "ICE CREAM IS WONDERFUL.", "Text input field value populated correctly.");
                inputElem.val('ice cream');
                inputElem.keypress(function() {
                    Alpaca.later(50, renderedField, function() {
                        equal(inputElem.val(), "ICE CREAM", "Text input converted to upper case automatically.");
                        start();
                    });
                });
                inputElem.keypress();
            }
        });
    });

}(jQuery) );(function($) {

    module("fields: lowercase");

    // Test case 1 : Lower case field.
    test("Lower case field.", function() {
        stop();
        $("#lowercase-1").alpaca({
            "data": "Ice Cream Is Wonderful.",
            "schema": {
                "format": "lowercase"
            },
            "postRender": function (renderedField) {
                expect(4);
                equal(renderedField.getValue(), "ice cream is wonderful.", 'Select field getValue() method returns correct value.');
                var inputElem = $('#lowercase-1 input:text');
                ok(inputElem.length, 'Text input field generated.');
                equal(inputElem.val(), "ice cream is wonderful.", "Text input field value populated correctly.");
                inputElem.val('ICE CREAM');
                inputElem.keypress(function() {
                    Alpaca.later(50, renderedField, function() {
                        equal(inputElem.val(), "ice cream", "Text input converted to lower case automatically.");
                        start();
                    });
                });
                inputElem.keypress();
            }
        });
    });

}(jQuery) );(function($) {

    module("fields: ipv4");

    // Test case 1 : Upper case field.
    test("Upper case field.", function() {
        stop();
        $("#ipv4-1").alpaca({
            "data": "100.60",
            "schema": {
                "format": "ip-address"
            },
            "postRender": function (renderedField) {
                expect(7);
                equal(renderedField.getValue(), "100.60", 'IP address field getValue() method returns correct value.');
                var inputElem = $('#ipv4-1 input:text');
                ok(inputElem.length, 'Text input field generated.');
                equal(inputElem.val(), "100.60", "Text input field value populated correctly.");
                var invalidElem = $('#ipv4-1 .alpaca-field-invalid');
                ok(invalidElem.length, 'Input field marked as invalid.');
                var messageElem = $('#ipv4-1 .alpaca-controlfield-message-text');
                ok(messageElem.length, 'Field error message generated.');
                equal(messageElem.text(), renderedField.view.getMessage("invalidIPv4"), 'Error message text populated correctly.');
                // change the field value and trigger the field re-validation
                inputElem.blur(function() {
                    if (inputElem.val() == '192.168.0.1') {
                        var invalidElem = $('#ipv4-1 .alpaca-field-invalid');
                        ok(invalidElem.length==0, 'Input field marked as valid with value 192.168.0.1.');
                    }
                });
                inputElem.val('192.168.0.1');
                inputElem.blur();
                start();
            }
        });
    });

}(jQuery) );(function($) {

    module("fields: date");

    // Test case 1 : Upper case field.
    test("Date field.", function() {
        stop();
        $("#date-1").alpaca({
            "data": "10/105/2001",
            "schema": {
                "format": "date"
            },
            "postRender": function (renderedField) {
                expect(7);
                equal(renderedField.getValue(), "10/105/2001", 'Date field getValue() method returns correct value.');
                var inputElem = $('#date-1 input:text');
                ok(inputElem.length, 'Text input field generated.');
                equal(inputElem.val(), "10/105/2001", "Text input field value populated correctly.");
                var invalidElem = $('#date-1 .alpaca-field-invalid');
                ok(invalidElem.length, 'Input field marked as invalid.');
                var messageElem = $('#date-1 .alpaca-controlfield-message-text');
                ok(messageElem.length, 'Field error message generated.');
                equal(messageElem.text(), Alpaca.substituteTokens(renderedField.view.getMessage("invalidDate"), [renderedField.options.dateFormat]), 'Error message text populated correctly.');
                // change the field value and trigger the field re-validation
                inputElem.blur(function() {
                    if (inputElem.val() == '10/10/2001') {
                        var invalidElem = $('#date-1 .alpaca-field-invalid');
                        ok(invalidElem.length == 0, 'Input field marked as valid with value 10/10/2001.');
                    }
                });
                inputElem.val('10/10/2001');
                inputElem.blur();
                start();
            }
        });
    });

}(jQuery) );(function($) {

    module("fields: password");

    // Test case 1 : Password field.
    test("Password field.", function() {
        stop();
        $("#password-1").alpaca({
            "data": "password",
            "schema": {
                "format": "password"
            },
            "postRender": function (renderedField) {
                expect(3);
                equal(renderedField.getValue(), "password", 'Password field getValue() method returns correct value.');
                var inputElem = $('#password-1 input:password');
                ok(inputElem.length, 'Password input field generated.');
                equal(inputElem.val(), "password", "Password input field value populated correctly.");
                start();
            }
        });
    });

}(jQuery) );(function($) {

    module("fields: email");

    // Test case 1 : Email field.
    test("Email field.", function() {
        stop();
        $("#email-1").alpaca({
            "data": "support",
            "schema": {
                "format": "email"
            },
            "postRender": function (renderedField) {
                expect(7);
                equal(renderedField.getValue(), "support", 'Email field getValue() method returns correct value.');
                var inputElem = $('#email-1 input:text');
                ok(inputElem.length, 'Text input field generated.');
                equal(inputElem.val(), "support", "Text input field value populated correctly.");
                var invalidElem = $('#email-1 .alpaca-field-invalid');
                ok(invalidElem.length, 'Input field marked as invalid.');
                var messageElem = $('#email-1 .alpaca-controlfield-message-text');
                ok(messageElem.length, 'Field error message generated.');
                equal(messageElem.text(), renderedField.view.getMessage("invalidEmail"), 'Error message text populated correctly.');
                // change the field value and trigger the field re-validation
                inputElem.blur(function() {
                    if (inputElem.val() == 'admin@alpaca.org') {
                        var invalidElem = $('#email-1 .alpaca-field-invalid');
                        ok(invalidElem.length == 0, 'Input field marked as valid with value 10/10/2001.');
                    }
                });
                inputElem.val('admin@alpaca.org');
                inputElem.blur();
                start();
            }
        });
    });

}(jQuery) );(function($) {

    module("fields: phone");

    // Test case 1 : Phone field.
    test("Phone field.", function() {
        stop();
        $("#phone-1").alpaca({
            "data": "",
            "schema": {
                "format": "phone"
            },
            "postRender": function (renderedField) {
                expect(6);
                var inputElem = $('#phone-1 input:text');
                ok(inputElem.length, 'Text input field generated.');
                inputElem.focus(function() {
                    equal(inputElem.val(), "(___) ___-____", "Text mask generated correctly.");
                    // change the field value and trigger the field re-validation
                    inputElem.blur(function() {
                        if (inputElem.val() == '') {
                            var invalidElem = $('#phone-1 .alpaca-field-invalid');
                            ok(invalidElem.length, 'Input field marked as invalid with value (123) 456-.');
                            var messageElem = $('#phone-1 .alpaca-controlfield-message-text');
                            ok(messageElem.length, 'Field error message generated.');
                            equal(messageElem.text(), renderedField.view.getMessage("invalidPhone"), 'Error message text populated correctly.');
                        }
                        if (inputElem.val() == '(123) 456-7890') {
                            var invalidElem = $('#phone-1 .alpaca-field-invalid');
                            ok(invalidElem.length == 0, 'Input field marked as valid with value (123) 456-7890.');
                        }
                    });
                    inputElem.val('(123) 456-');
                    inputElem.blur();
                    inputElem.val('(123) 456-7890');
                    inputElem.blur();
                });
                inputElem.focus();

                start();
            }
        });
    });

}(jQuery) );(function($) {

    module("fields: textarea");

    // Test case 1 : Textarea field with options.
    test("Textarea field with options.", function() {
        stop();
        var data = "Ice cream or ice-cream is a frozen dessert usually made from dairy products, such as milk and cream, and often combined with fruits or other ingredients and flavours.";
        $("#textarea-1").alpaca({
            "data": data,
            "options": {
                "type": "textarea",
                "label": "Receipt",
                "helper": "Receipt for Best Homemade Ice Cream",
                "rows": 6,
                "cols": 80
            },
            "postRender": function (renderedField) {
                expect(5);
                equal(renderedField.getValue(), data, 'Textarea field getValue() method returns correct value.');
                var inputElem = $('#textarea-1 textarea');
                ok(inputElem.length, 'Textarea input field generated.');
                equal(inputElem.val(), data, "Textarea input field value populated correctly.");
                equals(inputElem.attr('cols'),80, 'Textarea has right number of columns.')
                equals(inputElem.attr('rows'),6, 'Textarea has right number of rows.')
                start();
            }
        });
    });

}(jQuery) );(function($) {

    module("fields: wysiwyg");

    // Test case 1 : Wysiwyg editor.
    test("Wysiwyg editor.", function() {
        stop();
        var data = "Ice cream or ice-cream is a frozen dessert usually made from dairy products, such as milk and cream, and often combined with fruits or other ingredients and flavours.";
        $("#wysiwyg-1").alpaca({
            "data": data,
            "options": {
                "type": "wysiwyg"
            },
            "postRender": function (renderedField) {
                expect(2);
                equal(renderedField.getValue(), data, 'Wysiwyg editor getValue() method returns correct value.');
                var inputElem = $('#wysiwyg-1 .wysiwyg');
                equal(inputElem.length, 1, 'Wysiwyg editor field generated.');
                start();
            }
        });
    });

}(jQuery) );(function($) {

    module("fields: file");

    // Test case 1 : File field.
    test("File field.", function() {
        stop();
        var data = "Ice cream or ice-cream is a frozen dessert usually made from dairy products, such as milk and cream, and often combined with fruits or other ingredients and flavours.";
        $("#file-1").alpaca({
            "data": "",
            "options": {
                "type": "file",
                "label": "Ice Cream Photo:",
                "helper": "Pick your favorite ice cream picture."
            },
            "postRender": function (renderedField) {
                expect(5);
                var inputElem = $('#file-1 input:file');
                ok(inputElem.length, 'File input field generated.');
                var labelElem = $('#file-1 .alpaca-controlfield-label>div');
                ok(labelElem.length, 'Input field label generated.');
                equal(labelElem.text(), 'Ice Cream Photo:', 'Label text populated correctly.');
                var helperElem = $('#file-1 .alpaca-controlfield-helper > span.alpaca-controlfield-helper-text');
                ok(helperElem.length, 'Input field helper generated.');
                equal(helperElem.text(), 'Pick your favorite ice cream picture.', 'Helper text populated correctly.');
                start();
            }
        });
    });

}(jQuery) );(function($) {

    module("fields: address");

    // Test case 1 : Address field with options.
    test("Address field with options.", function() {
        stop();
        var data = {
            "street":[
                "100 Main Street",
                "Suite 200"
            ],
            "city":"Burlington",
            "state":"MA",
            "zip":"18210"
        };
        $("#address-1").alpaca({
            "data": data,
            "options": {
                "type": "address",
                "addressValidation": true
            },
            "schema": {
                "title": "Home Address",
                "type": "any"
            },
            "postRender": function (renderedField) {
                expect(7);
                deepEqual(renderedField.getValue(), data, 'Address field getValue() method returns correct value.');
                equal(renderedField.getAddress(), '100 Main Street Suite 200 Burlington MA 18210', 'Address field getAddress() method returns correct value.');
                var inputElem = $('#address-1 fieldset');
                ok(inputElem.length, 'Address input field generated.');
                var selectOptionElems = $('select > option', inputElem);
                equal(selectOptionElems.length, 60, 'Address state select field generated correctly.');
                var zipElem = $('.alpaca-fieldset-items-container input[name="zip"]', inputElem);
                ok(zipElem.length, 'Address zip field correctly.');
                equal(zipElem.attr('size'), 5, 'Address zip field generated with right size.');
                zipElem.focus(function() {
                    equal(zipElem.val(), "_____", "Address zip field text mask generated correctly.");
                });
                zipElem.val('');
                zipElem.focus();
                start();
            }
        });
    });

}(jQuery) );(function($) {

    module("fields: dependency");

    // Test case 1 : Field dependecy through schema dependency properties.
    test("Field dependecy through schema dependency properties.", function() {
        stop();
        $("#dependency-1").alpaca({
            "data": {},
            "schema": {
                "title": "Ice Cream Picker",
                "description": "Select Your Favorite Ice Cream",
                "type": "object",
                "properties": {
                    "fan": {
                        "title": "Alpaca Ice Cream Lover?",
                        "type": "boolean",
                        "description": "Say YES If You Are Truly An Alpaca Ice Cream Lover."
                    },
                    "icecream": {
                        "title": "Favorite Ice Cream",
                        "type": "String",
                        "enum": ["Vanilla", "Chocolate", "Coffee", "Strawberry", "Mint"],
                        "dependencies": "fan"
                    },
                    "topping": {
                        "title": "Favorite Topping",
                        "type": "String",
                        "enum": ["Marshmelllow", "Chocolate Chip", "Caramel", "Cookie Dough"],
                        "dependencies": ["icecream"]
                    }
                }
            },
            "postRender": function (renderedField) {
                expect(9);
                var inputElem = $('#dependency-1 fieldset');
                ok(inputElem.length, 'Object field generated.');
                var fieldElem0 = $('.alpaca-fieldset-items-container > div:eq(0) input:checkbox',inputElem);
                var fieldContainerElem0 = $('.alpaca-fieldset-items-container > div:eq(0) > span',inputElem);
                ok(fieldElem0.length, 'Input field for fan property generated.');
                notEqual(fieldContainerElem0.css('display'), 'none', 'Input field for fan property shown.');
                var fieldElem1 = $('.alpaca-fieldset-items-container > div:eq(1) select',inputElem);
                var fieldContainerElem1 = $('.alpaca-fieldset-items-container > div:eq(1) > span',inputElem);
                ok(fieldElem1.length, 'Input field for icecream property generated.');
                equal(fieldContainerElem1.css('display'), 'none', 'Input field for icecream property hidden.');
                var fieldElem2 = $('.alpaca-fieldset-items-container > div:eq(2) select',inputElem);
                var fieldContainerElem2 = $('.alpaca-fieldset-items-container > div:eq(2) > span',inputElem);
                ok(fieldElem2.length, 'Input field for topping property generated.');
                equal(fieldContainerElem2.css('display'), 'none', 'Input field for topping property hidden.');
                fieldElem0.change(function() {
                    fieldContainerElem1 = $('.alpaca-fieldset-items-container > div:eq(1) > span');
                    notEqual(fieldContainerElem1.css('display'), 'none', 'Input field for icecream property shown after after checkbox for fan property is checked.');
                    fieldElem1.change(function() {
                        fieldContainerElem2 = $('.alpaca-fieldset-items-container > div:eq(2) > span');
                        notEqual(fieldContainerElem2.css('display'), 'none', 'Input field for topping property shown after after select for icecream property is selected.');
                    });
                    fieldElem1.val( 'Vanilla' ).attr('selected',true);
                    fieldElem1.change();
                });
                fieldElem0.change();
                start();
            }
        });
    });

}(jQuery) );(function($) {

    module("fields: conditional");

    // Test case 1 : Conditional field through combination of schema dependency properties and options dependency properties..
    test("Conditional field through combination of schema dependency properties and options dependency properties.", function() {
        stop();
        $("#conditional-1").alpaca({
            "data": {},
            "options": {
                "fields": {
                    "flavour": {
                        "dependencies": {
                            "choice": "Flavour"
                        }
                    },
                    "topping": {
                        "dependencies": {
                            "choice": "Topping"
                        }
                    }
                }
            },
            "schema": {
                "title": "Ice Cream Picker",
                "description": "Select Your Favorite Ice Cream",
                "type": "object",
                "properties": {
                    "choice": {
                        "title": "Select",
                        "type": "String",
                        "description": "What do you want to choose?",
                        "enum": ["Flavour", "Topping"]
                    },
                    "flavour": {
                        "title": "Flavour",
                        "type": "String",
                        "enum": ["Vanilla", "Chocolate", "Coffee", "Strawberry", "Mint"],
                        "dependencies": "choice"
                    },
                    "topping": {
                        "title": "Topping",
                        "type": "String",
                        "enum": ["Marshmelllow", "Chocolate Chip", "Caramel", "Cookie Dough"],
                        "dependencies": "choice"
                    }
                }
            },
            "view": "VIEW_WEB_EDIT_LIST",
            "postRender": function (renderedField) {
                expect(11);
                var inputElem = $('#conditional-1 fieldset');
                ok(inputElem.length, 'Object field generated.');
                var fieldElem0 = $('.alpaca-fieldset-items-container > li:eq(0) input:radio:eq(0)', inputElem);
                var fieldContainerElem0 = $('.alpaca-fieldset-items-container > li:eq(0) > span', inputElem);
                ok(fieldElem0.length, 'Input field for choice property generated.');
                notEqual(fieldContainerElem0.css('display'), 'none', 'Input field for choice property shown.');
                var fieldElem0Name = fieldElem0.attr('name');
                var fieldElem0Option0 = fieldElem0;
                var fieldElem0Option1 = $('.alpaca-fieldset-items-container > li:eq(0) input:radio:eq(1)', inputElem);
                var fieldElem0Option2 = $('.alpaca-fieldset-items-container > li:eq(0) input:radio:eq(2)', inputElem);
                var fieldElem1 = $('.alpaca-fieldset-items-container > li:eq(1) select', inputElem);
                var fieldContainerElem1 = $('.alpaca-fieldset-items-container > li:eq(1) > span', inputElem);
                ok(fieldElem1.length, 'Input field for icecream property generated.');
                equal(fieldContainerElem1.css('display'), 'none', 'Input field for icecream property hidden.');
                var fieldElem2 = $('.alpaca-fieldset-items-container > li:eq(2) select', inputElem);
                var fieldContainerElem2 = $('.alpaca-fieldset-items-container > li:eq(2) > span', inputElem);
                ok(fieldElem2.length, 'Input field for topping property generated.');
                equal(fieldContainerElem2.css('display'), 'none', 'Input field for topping property hidden.');
                fieldElem0Option1.change(function() {
                    Alpaca.later(50, renderedField, function() {
                        fieldContainerElem1 = $('.alpaca-fieldset-items-container > li:eq(1) > span');
                        notEqual(fieldContainerElem1.css('display'), 'none', 'Input field for icecream property shown if option Flavour of choice field is selected..');
                        fieldContainerElem2 = $('.alpaca-fieldset-items-container > li:eq(2) > span');
                        equal(fieldContainerElem2.css('display'), 'none', 'Input field for topping property hidden if option Flavour of choice field is selected.');
                        fieldElem0Option2.attr('checked', true);
                        fieldElem0Option2.change();
                    });
                });
                fieldElem0Option2.change(function() {
                    Alpaca.later(50, renderedField, function() {
                        fieldContainerElem1 = $('.alpaca-fieldset-items-container > li:eq(1) > span');
                        equal(fieldContainerElem1.css('display'), 'none', 'Input field for icecream property hidden if option Topping of choice field is selected..');
                        fieldContainerElem2 = $('.alpaca-fieldset-items-container > li:eq(2) > span');
                        notEqual(fieldContainerElem2.css('display'), 'none', 'Input field for topping property shown if option Topping of choice field is selected.');
                        start();
                    });
                });
                fieldElem0Option1.attr('checked', true);
                fieldElem0Option1.change();
            }
        });
    });

}(jQuery) );(function($) {

    module("fields: form and buttons");

    // Test case 1 : Form and Buttons.
    test("Form and buttons.", function() {
        stop();
        $("#form-1").alpaca({
            "data" : {
                "name" : "Britney Spears",
                "feedback" : "Alpaca is very cute.",
                "ranking" : "excellent"
            },
            "schema" : {
                "title" : "User Feedback",
                "description" : "What do you think about Alpaca?",
                "type" : "object",
                "properties" : {
                    "name" : {
                        "type" : "string",
                        "title" : "Name",
                        "required" : true
                    },
                    "feedback" : {
                        "type" : "string",
                        "title" : "Feedback"
                    },
                    "ranking" : {
                        "type" : "string",
                        "title" : "Ranking",
                        "enum" : ['excellent','ok','so so'],
                        "required" : true
                    }
                }
            },
            "options" : {
                "renderForm":true,
                "form":{
                    "attributes":{
                        "action":"../../endpoints/save.php",
                        "method":"post"
                    },
                    "buttons":{
                        "submit":{},
                        "reset":{}
                    }
                },
                "fields" : {
                    "helper" : "Tell us what you think about Alpaca!",
                    "name" : {
                        "size" : 20,
                        "helper" : "Please enter your name."
                    },
                    "feedback" : {
                        "type" : "textarea",
                        "name" : "your_feedback",
                        "rows" : 5,
                        "cols" : 30,
                        "helper" : "Please enter your feedback."
                    },
                    "ranking" : {
                        "type" : "select",
                        "helper" : "Select your ranking.",
                        "optionLabels" : ["Awesome!","It's Ok","Hmm..."]
                    }
                }
            },
            "postRender": function (renderedField) {
                expect(5);
                var formElem = $('#form-1 form');
                ok(formElem.length, 'Form generated.');
                equal(formElem.attr('action'), '../../endpoints/save.php', 'Form field action attribute populated correctly.');
                equal(formElem.attr('method'), 'post', 'Form field method attribute populated correctly.');
                var submitButtonElem = $('#form-1 form input:submit');
                ok(submitButtonElem.length, 'Submit button generated.');
                var resetButtonElem = $('#form-1 form input:reset');
                ok(resetButtonElem.length, 'Reset button generated.');
                start();
            }
        });
    });

}(jQuery) );(function($) {

    module("fields: time");

    // Test case 1 : Upper case field.
    test("Time field.", function() {
        stop();
        $("#time-1").alpaca({
            "data": "10:75:76",
            "schema": {
                "format": "time"
            },
            "postRender": function (renderedField) {
                expect(7);
                equal(renderedField.getValue(), "10:75:76", 'Time field getValue() method returns correct value.');
                var inputElem = $('#time-1 input:text');
                ok(inputElem.length, 'Text input field generated.');
                equal(inputElem.val(), "10:75:76", "Text input field value populated correctly.");
                var invalidElem = $('#time-1 .alpaca-field-invalid');
                ok(invalidElem.length, 'Input field marked as invalid.');
                var messageElem = $('#time-1 .alpaca-controlfield-message-text');
                ok(messageElem.length, 'Field error message generated.');
                equal(messageElem.text(), Alpaca.substituteTokens(renderedField.view.getMessage("invalidTime"), [renderedField.options.timeFormat]), 'Error message text populated correctly.');
                // change the field value and trigger the field re-validation
                inputElem.blur(function() {
                    if (inputElem.val() == '10:10:16') {
                        var invalidElem = $('#time-1 .alpaca-field-invalid');
                        ok(invalidElem.length == 0, 'Input field marked as valid with value 10:10:16.');
                    }
                });
                inputElem.val('10:10:16');
                inputElem.blur();
                start();
            }
        });
    });

}(jQuery) );(function($) {

    module("fields: tag");

    // Test case 1 : Upper case field.
    test("Tag field.", function() {
        stop();
        $("#tag-1").alpaca({
            "data": ["tag1","Tag2 "," tAg3"],
            "options": {
                "type": "tag"
            },
            "postRender": function (renderedField) {
                expect(5);
                var inputElem = $('#tag-1 input:text');
                ok(inputElem.length, 'Text input field generated.');
                inputElem.blur();
                same(renderedField.getValue(), ["tag1","tag2","tag3"], 'Tag field getValue() methods returns expected value.');
                equal(inputElem.val(), "tag1,tag2,tag3", "Text input field value populated correctly.");
                inputElem.val('new taG1, new TAG2, new tag3 ');
                inputElem.blur();
                equal(inputElem.val(), "new tag1,new tag2,new tag3", "Text input field value populated correctly after user input.");
                same(renderedField.getValue(), ["new tag1","new tag2","new tag3"], 'Tag field getValue() methods returns expected value.');
                start();
            }
        });
    });

}(jQuery) );(function($) {

    module("fields: map");

    // Test case 1 : Upper case field.
    test("Map field.", function() {
        stop();
        $("#map-1").alpaca({
            "data": {
                "john316" : {
                    "firstName" : "Tim",
                    "lastName" : "Tebow",
                    "gender" : "Male"

                }
            },
            "schema": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "_key" : {
                            "title" : "User Id"
                        },
                        "firstName" : {
                            "title" : "First Name",
                            "description" : "Enter user's first name."
                        },
                        "lastName" : {
                            "title" : "Last Name",
                            "description" : "Enter user's last name."
                        },
                        "gender" : {
                            "title" : "Gender",
                            "description" : "Select user's gender",
                            "enum" : ["Male","Female"]
                        }
                    }
                }
            },
            "options" : {
                "type" : "map",
                "fields": {
                    "item" : {
                        "fields" : {
                            "_key" : {
                                "size" : 60,
                                "helper" : "Provide a unique user id."
                            }
                        }
                    }
                }
            },
            "postRender": function (renderedField) {
                expect(15);
                var arrayToolBarAddButton = $('#map-1 .alpaca-fieldset-array-item-toolbar-add');
                ok(arrayToolBarAddButton.length, 'Array toolbar with add button generated.');
                arrayToolBarAddButton.click(function() {
                    var objectFieldSetItem = $('#map-1 .alpaca-fieldset-items-container fieldset:eq(0)');
                    var objectFieldSetItemId = objectFieldSetItem.attr('alpaca-field-id');
                    ok(objectFieldSetItem.length, 'New object field generated.');
                    var inputElem0 = $('input:text:eq(0)', objectFieldSetItem);
                    ok(inputElem0.length, 'New object first text input field generated.');
                    equal(inputElem0.val(), 'john316', 'Id field for new object populated with correct value.');
                    var inputElem0Id = inputElem0.attr('id');
                    var inputElem0LabelElem = $('#' + inputElem0Id + '-controlfield-label > div', objectFieldSetItem);
                    ok(inputElem0LabelElem.length, 'Label for new object first text input field generated.');
                    equal(inputElem0LabelElem.text(), 'User Id', 'Label for new object first text input field populated with correct text.');
                    var inputElem1 = $('input:text:eq(1)', objectFieldSetItem);
                    ok(inputElem1.length, 'New object second text input field generated.');
                    var inputElem1Id = inputElem1.attr('id');
                    var inputElem1LabelElem = $('#' + inputElem1Id + '-controlfield-label > div', objectFieldSetItem);
                    ok(inputElem1LabelElem.length, 'Label for new object second text input field generated.');
                    equal(inputElem1LabelElem.text(), 'First Name', 'Label for second object first text input field populated with correct text.');
                    var arrayElem = $('#map-1 fieldset.alpaca-field-invalid');
                    ok(arrayElem.length, 'Array marked as invalid.');
                    var arrayId = arrayElem.attr('alpaca-field-id');
                    var arrayMessageElem = $('#map-1 #' + arrayId + '-field-message-0 > .alpaca-controlfield-message-text');
                    ok(arrayMessageElem.length, 'Array invalid message generated.');
                    equal(arrayMessageElem.text(), renderedField.view.getMessage("keyNotUnique"), 'Array invalid text populated correctly.');
                    inputElem0.blur(function() {
                        if (inputElem0.val() == 'john326') {
                            var invalidElem = $('#map-1 fieldset.alpaca-field-invalid');
                            ok(invalidElem.length == 0, 'Array marked as valid with new key.');
                            var updatedVal = renderedField.getValue();
                            ok(updatedVal['john316']!= null, 'Map value contains john316 key');
                            ok(updatedVal['john326']!= null, 'Map value contains john326 key');
                        }
                    });
                    inputElem0.val('john326');
                    inputElem0.blur();
                });
                arrayToolBarAddButton.click();
                start();
            }
        });
    });

}(jQuery) );(function($) {

    module("validation: validation");

    // Test case 1 : Required field.
    test("Required field.", function() {
        stop();
        $("#validation-1").alpaca({
            "data": "",
            "schema": {
                "title": "Required field",
                "type": "string",
                "required": true
            },
            "postRender": function (renderedField) {
                expect(5);
                var inputElem = $('#validation-1 input:text');
                ok(inputElem.length, 'Text input field generated.');
                var invalidElem = $('#validation-1 .alpaca-field-invalid');
                ok(invalidElem.length, 'Input field marked as invalid.');
                var messageElem = $('#validation-1 .alpaca-controlfield-message-text');
                ok(messageElem.length, 'Field error message generated.');
                equal(messageElem.text(), renderedField.view.getMessage("notOptional"), 'Error message text populated correctly.');
                // change the field value and trigger the field re-validation
                inputElem.blur(function() {
                    if (inputElem.val() == 'test') {
                        var invalidElem = $('#validation-1 .alpaca-field-invalid');
                        ok(invalidElem.length == 0, 'Input field marked as valid with value test.');
                    }
                });
                inputElem.val('test');
                inputElem.blur();
                inputElem.focus();

                start();
            }
        });
    });

    // Test case 2 : Field with disallowed values.
    test("Field with disallowed values.", function() {
        stop();
        $("#validation-2").alpaca({
            "data": "book",
            "schema": {
                "title": "Diallowed value",
                "type": "string",
                "disallow": ["book", "pencil"]
            },
            "postRender": function (renderedField) {
                expect(5);
                var inputElem = $('#validation-2 input:text');
                ok(inputElem.length, 'Text input field generated.');
                var invalidElem = $('#validation-2 .alpaca-field-invalid');
                ok(invalidElem.length, 'Input field marked as invalid.');
                var messageElem = $('#validation-2 .alpaca-controlfield-message-text');
                ok(messageElem.length, 'Field error message generated.');
                equal(messageElem.text(), Alpaca.substituteTokens(renderedField.view.getMessage("disallowValue"), ['book,pencil']), 'Error message text populated correctly.');
                // change the field value and trigger the field re-validation
                inputElem.blur(function() {
                    if (inputElem.val() == 'book2') {
                        var invalidElem = $('#validation-1 .alpaca-field-invalid');
                        ok(invalidElem.length == 0, 'Input field marked as valid with value book2.');
                    }
                });
                inputElem.val('book2');
                inputElem.blur();
                inputElem.focus();

                start();
            }
        });
    });

    // Test case 3 : JSON schema validator.
    test("JSON schema validator.", function() {
        expect(2);
        var data1 = "book";
        var data2 = "book2";
        var schema = {
            "title": "Enum field",
            "type": "string",
            "enum": ["book", "pen", "eraser"]
        };
        ok(Validator.validate(data1, schema).valid, 'Data1 is valid against the schema.');
        ok(!Validator.validate(data2, schema).valid, 'Data2 is invalid against the schema.');
    });

    // Test case 4 : Custom validator.
    test("Custom validator.", function() {
        stop();
        $("#validation-4").alpaca({
            "data": "book",
            "schema": {
                "title": "Diallowed value",
                "type": "string",
                "disallow": ["book", "pencil"]
            },
            "options": {
                "validator" : function(control, callback) {
                    var controlVal = control.getValue();
                    if (controlVal == "pen" || controlVal == "book") {
                        callback({
                            "message": "Invalid value (custom validator)",
                            "status": false
                        });
                    } else {
                        callback({
                            "message": "Valid value (custom validator)",
                            "status": true
                        });
                    }
                }
            },
            "postRender": function (renderedField) {
                expect(9);
                var inputElem = $('#validation-4 input:text');
                ok(inputElem.length, 'Text input field generated.');
                var invalidElem = $('#validation-4 .alpaca-field-invalid');
                ok(invalidElem.length, 'Input field marked as invalid.');
                var messageElem = $('#validation-4 .alpaca-controlfield-message-text:eq(1)');
                ok(messageElem.length, 'Field error message generated.');
                equal(messageElem.text(), 'Invalid value (custom validator)', 'Error message text populated correctly.');
                // change the field value and trigger the field re-validation
                inputElem.blur(function() {
                    if (inputElem.val() == 'pen') {
                        messageElem = $('#validation-4 .alpaca-controlfield-message-text:eq(0)');
                        ok(messageElem.length, 'Field error message generated.');
                        equal(messageElem.text(), 'Invalid value (custom validator)', 'Error message text populated correctly.');
                    }
                    if (inputElem.val() == 'pencil') {
                        messageElem = $('#validation-4 .alpaca-controlfield-message-text:eq(0)');
                        ok(messageElem.length, 'Field error message generated.');
                        equal(messageElem.text(), Alpaca.substituteTokens(renderedField.view.getMessage("disallowValue"), ['book,pencil']), 'Error message text populated correctly.');
                    }
                    if (inputElem.val() == 'pen2') {
                        var invalidElem = $('#validation-4 .alpaca-field-invalid');
                        ok(invalidElem.length == 0, 'Input field marked as valid with value book2.');
                    }
                });
                inputElem.val('pen2');
                inputElem.blur();
                inputElem.val('pen');
                inputElem.blur();
                inputElem.val('pencil');
                inputElem.blur();
                start();
            }
        });
    });

}(jQuery) );(function($) {

    module("wizard: wizard");

    // Test case 1 : Configuration-based wizard without using a layout template.
    test("Configuration-based wizard without using a layout template.", function() {
        stop();
        $("#wizard-1").alpaca({
            "data": "../examples/components/wizards/customer-profile-data.json",
            "options": "../examples/components/wizards/customer-profile-options.json",
            "schema": "../examples/components/wizards/customer-profile-schema.json",
            "view": {
                "parent": "VIEW_WEB_EDIT_LIST",
                "wizard": {
                    "renderWizard": true,
                    "statusBar": true,
                    "validation": true,
                    "steps": 3,
                    "bindings": {
                        "name": 1,
                        "age": 1,
                        "gender": 1,
                        "photo": 1,
                        "member": 2,
                        "phone": 2,
                        "icecream": 2,
                        "address": 3
                    },
                    "stepTitles": [
                        {
                            "title": "Basic",
                            "description": "Name, Age etc."
                        },
                        {
                            "title": "Membership",
                            "description": "Favorite, Member etc."
                        },
                        {
                            "title": "Contact",
                            "description": "Phone, Address etc."
                        }
                    ]
                }
            },
            "postRender": function (renderedField) {
                expect(29);
                var fieldSetElem = $('#wizard-1 fieldset');
                ok(fieldSetElem.length, 'Fieldset for wizard generated.');
                var wizardStatusBarElem = $('.alpaca-wizard-status-bar', fieldSetElem);
                ok(wizardStatusBarElem.length, 'Wizard status bar generated.');
                var wizardStepHeadElems = $('li', wizardStatusBarElem);
                equal(wizardStepHeadElems.length, 3, "Right number of step heads generated.");
                var step0Elem = $('#step0', fieldSetElem);
                ok(step0Elem.length, 'Step 1 of wizard generated.');
                notEqual(step0Elem.css('display'), 'none', 'Step 1 of wizard shown.');
                var step1Elem = $('#step1', fieldSetElem);
                ok(step1Elem.length, 'Step 2 of wizard generated.');
                equal(step1Elem.css('display'), 'none', 'Step 2 of wizard hidden.');
                var step2Elem = $('#step2', fieldSetElem);
                ok(step2Elem.length, 'Step 3 of wizard generated.');
                equal(step2Elem.css('display'), 'none', 'Step 3 of wizard hidden.');
                var step0NextButtonElem = $('button#step0-button-next', step0Elem);
                ok(step0NextButtonElem.length, "Next button for step 1 generated");
                equal(step0NextButtonElem.text(), 'Next', "Text for stepv1 next button populated correctly.");
                step0NextButtonElem.click(function() {
                    notEqual(step1Elem.css('display'), 'none', 'Step 2 of wizard shown.');
                    equal(step0Elem.css('display'), 'none', 'Step 1 of wizard hidden.');
                    equal(step2Elem.css('display'), 'none', 'Step 3 of wizard hidden.');
                    var step1NextButtonElem = $('button#step1-button-next', step1Elem);
                    ok(step1NextButtonElem.length, "Next button for step 2 generated");
                    equal(step1NextButtonElem.text(), 'Next', "Text for step 2 next button populated correctly.");
                    step1NextButtonElem.click(function() {
                        notEqual(step2Elem.css('display'), 'none', 'Step 3 of wizard shown.');
                        equal(step0Elem.css('display'), 'none', 'Step 1 of wizard hidden.');
                        equal(step1Elem.css('display'), 'none', 'Step 2 of wizard hidden.');
                        var step2PrevButtonElem = $('button#step2-button-pre', step2Elem);
                        ok(step2PrevButtonElem.length, "Back button for step 3 generated");
                        equal(step2PrevButtonElem.text(), 'Back', "Text for step 3 back button populated correctly.");
                        step2PrevButtonElem.click(function() {
                            notEqual(step1Elem.css('display'), 'none', 'Step 2 of wizard shown.');
                            equal(step0Elem.css('display'), 'none', 'Step 1 of wizard hidden.');
                            equal(step2Elem.css('display'), 'none', 'Step 3 of wizard hidden.');
                            var step1PrevButtonElem = $('button#step1-button-pre', step1Elem);
                            ok(step1PrevButtonElem.length, "Back button for step 2 generated");
                            equal(step1PrevButtonElem.text(), 'Back', "Text for step 2 back button populated correctly.");
                            step1PrevButtonElem.click(function() {
                                notEqual(step0Elem.css('display'), 'none', 'Step 1 of wizard shown.');
                                equal(step1Elem.css('display'), 'none', 'Step 2 of wizard hidden.');
                                equal(step2Elem.css('display'), 'none', 'Step 3 of wizard hidden.');

                            });
                            step1PrevButtonElem.click();
                        });
                        step2PrevButtonElem.click();
                    });
                    step1NextButtonElem.click();
                });
                step0NextButtonElem.click();
                start();
            }
        });
    });

    // Test case 2 : Template-based wizard.
    test("Template-based wizard.", function() {
        stop();
        $("#wizard-2").alpaca({
            "data": "../examples/components/wizards/customer-profile-data.json",
            "options": "../examples/components/wizards/customer-profile-options.json",
            "schema": "../examples/components/wizards/customer-profile-schema.json",
            "view": {
                "parent": "VIEW_WEB_EDIT_LIST",
                "layout": {
                    "template": '../examples/components/wizards/wizard-template.html',
                    "bindings": {
                        "name": "alpaca-wizard-step-1",
                        "age": "alpaca-wizard-step-1",
                        "gender": "alpaca-wizard-step-1",
                        "photo": "alpaca-wizard-step-1",
                        "member": "alpaca-wizard-step-2",
                        "phone": "alpaca-wizard-step-2",
                        "icecream": "alpaca-wizard-step-2",
                        "address": "alpaca-wizard-step-3"
                    }
                },
                "wizard": {
                    "renderWizard": true,
                    "statusBar": true
                }
            },
            "postRender": function (renderedField) {
                expect(29);
                var fieldSetElem = $('#wizard-2 .alpaca-wizard');
                ok(fieldSetElem.length, 'Wizard generated.');
                var wizardStatusBarElem = $('#wizard-2 .alpaca-wizard-status-bar');
                ok(wizardStatusBarElem.length, 'Wizard status bar generated.');
                var wizardStepHeadElems = $('li', wizardStatusBarElem);
                equal(wizardStepHeadElems.length, 3, "Right number of step heads generated.");
                var step0Elem = $('#step0', fieldSetElem);
                ok(step0Elem.length, 'Step 1 of wizard generated.');
                notEqual(step0Elem.css('display'), 'none', 'Step 1 of wizard shown.');
                var step1Elem = $('#step1', fieldSetElem);
                ok(step1Elem.length, 'Step 2 of wizard generated.');
                equal(step1Elem.css('display'), 'none', 'Step 2 of wizard hidden.');
                var step2Elem = $('#step2', fieldSetElem);
                ok(step2Elem.length, 'Step 3 of wizard generated.');
                equal(step2Elem.css('display'), 'none', 'Step 3 of wizard hidden.');
                var step0NextButtonElem = $('button#step0-button-next', step0Elem);
                ok(step0NextButtonElem.length, "Next button for step 1 generated");
                equal(step0NextButtonElem.text(), 'Next', "Text for stepv1 next button populated correctly.");
                step0NextButtonElem.click(function() {
                    notEqual(step1Elem.css('display'), 'none', 'Step 2 of wizard shown.');
                    equal(step0Elem.css('display'), 'none', 'Step 1 of wizard hidden.');
                    equal(step2Elem.css('display'), 'none', 'Step 3 of wizard hidden.');
                    var step1NextButtonElem = $('button#step1-button-next', step1Elem);
                    ok(step1NextButtonElem.length, "Next button for step 2 generated");
                    equal(step1NextButtonElem.text(), 'Next', "Text for step 2 next button populated correctly.");
                    step1NextButtonElem.click(function() {
                        notEqual(step2Elem.css('display'), 'none', 'Step 3 of wizard shown.');
                        equal(step0Elem.css('display'), 'none', 'Step 1 of wizard hidden.');
                        equal(step1Elem.css('display'), 'none', 'Step 2 of wizard hidden.');
                        var step2PrevButtonElem = $('button#step2-button-pre', step2Elem);
                        ok(step2PrevButtonElem.length, "Back button for step 3 generated");
                        equal(step2PrevButtonElem.text(), 'Back', "Text for step 3 back button populated correctly.");
                        step2PrevButtonElem.click(function() {
                            notEqual(step1Elem.css('display'), 'none', 'Step 2 of wizard shown.');
                            equal(step0Elem.css('display'), 'none', 'Step 1 of wizard hidden.');
                            equal(step2Elem.css('display'), 'none', 'Step 3 of wizard hidden.');
                            var step1PrevButtonElem = $('button#step1-button-pre', step1Elem);
                            ok(step1PrevButtonElem.length, "Back button for step 2 generated");
                            equal(step1PrevButtonElem.text(), 'Back', "Text for step 2 back button populated correctly.");
                            step1PrevButtonElem.click(function() {
                                notEqual(step0Elem.css('display'), 'none', 'Step 1 of wizard shown.');
                                equal(step1Elem.css('display'), 'none', 'Step 2 of wizard hidden.');
                                equal(step2Elem.css('display'), 'none', 'Step 3 of wizard hidden.');

                            });
                            step1PrevButtonElem.click();
                        });
                        step2PrevButtonElem.click();
                    });
                    step1NextButtonElem.click();
                });
                step0NextButtonElem.click();
                start();
            }
        });
    });

}(jQuery) );(function($) {

    module("forms: create");

    // Test case 1 : Form for creating new content.
    test("Form for creating new content.", function() {
        stop();
        $("#createform-1").alpaca({
            "options": "../examples/forms/customer-profile/options.json",
            "schema": "../examples/forms/customer-profile/schema.json",
            "view": "VIEW_WEB_CREATE",
            "postRender": function (renderedField) {
                expect(13);
                var formElem = $('#createform-1 form');
                ok(formElem.length, 'Form generated.');
                equal(formElem.attr('action'), '../../endpoints/echo.php', 'Form field action attribute populated correctly.');
                equal(formElem.attr('method'), 'post', 'Form field method attribute populated correctly.');
                var textInputElems = $('#createform-1 input:text');
                equal(textInputElems.length, 5, 'Right number of text input fields rendered.');
                equal($('#createform-1 input:text:eq(0)').val(), '', 'Data not bounded for name text field.');
                equal($('#createform-1 input:text:eq(1)').val(), '', 'Data not bounded for age text field.');
                equal($('#createform-1 input:text:eq(2)').val(), '', 'Data not bounded for phone text field.');
                equal($('#createform-1 input:text:eq(3)').val(), '', 'Data not bounded for city text field.');
                equal($('#createform-1 input:text:eq(4)').val(), '', 'Data not bounded for zip text field.');
                equal($('#createform-1 input:radio:checked').val(), '', 'Data not bounded for gender radio field.');
                equal($('#createform-1 select:eq(0) > option:selected').val(), '', 'Data not bounded for favorite select field.');
                equal($('#createform-1 select:eq(1) > option:selected').val(), '', 'Data not bounded for state select field.');
                var inputElem = $('#createform-1 input:checkbox');
                equal(inputElem.is(':checked'), false, 'Data not bounded for membership checkbox field.');
                start();
            }
        });
    });

    // Test case 2 : Simple form for creating new content.
    test("Simple form for creating new content.", function() {
        stop();
        $("#createform-2").alpaca({
            "options": "../examples/forms/customer-profile/simple-options.json",
            "schema": "../examples/forms/customer-profile/schema.json",
            "view": "VIEW_WEB_CREATE",
            "postRender": function (renderedField) {
                expect(1);
                var textInputElems = $('#createform-2 span.alpaca-controlfield:visible');
                equal(textInputElems.length, 2, 'Right number of input fields are shown.');
                start();
            }
        });
    });

}(jQuery) );(function($) {

    module("forms: edit");

    // Test case 1 : Edit form with readonly fields.
    test("Edit form with readonly fields.", function() {
        stop();
        $("#editform-1").alpaca({
            "data": "../examples/forms/customer-profile/data.json",
            "options": "../examples/forms/customer-profile/simple-options.json",
            "schema": "../examples/forms/customer-profile/schema.json",
            "view": {
                "parent": "VIEW_WEB_EDIT",
                "displayReadonly": true
            },
            "postRender": function (renderedField) {
                expect(4);
                equal($('#editform-1 input:text[readOnly]').length, 7, 'Right number of readonly text input fields rendered.');
                equal($('#editform-1 input:radio[readOnly]').length, 3, 'Right number of readonly radio input fields rendered.');
                equal($('#editform-1 select[readOnly]').length, 1, 'Right number of readonly select input fields rendered.');
                equal($('#editform-2 span.alpaca-controlfield:hidden').length, 0, 'No hidden field.');
                start();
            }
        });
    });

    // Test case 2 : Simple form for editing content.
    test("Simple form for editing content.", function() {
        stop();
        $("#editform-2").alpaca({
            "data": "../examples/forms/customer-profile/data.json",
            "options": "../examples/forms/customer-profile/simple-options.json",
            "schema": "../examples/forms/customer-profile/schema.json",
            "view": {
                "parent": "VIEW_WEB_EDIT",
                "displayReadonly": false
            },
            "postRender": function (renderedField) {
                expect(1);
                var textInputElems = $('#editform-2 span.alpaca-controlfield:visible');
                equal(textInputElems.length, 2, 'Right number of input fields are shown.');
                start();
            }
        });
    });

}(jQuery) );
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

    var Alpaca = $.alpaca;

    Alpaca.Fields.AddressField = Alpaca.Fields.ObjectField.extend(
    /**
     * @lends Alpaca.Fields.AddressField.prototype
     */
    {
        /**
         * @constructs
         * @augments Alpaca.Fields.ObjectField
         *
         * @class A combo field for rendering a standard US address. It also comes up with support for Google Map
         * which would requires including Google Map JS file for the form that uses this class.
         *
         * @param {Object} container Field container.
         * @param {Any} data Field data.
         * @param {Object} options Field options.
         * @param {Object} schema Field schema.
         * @param {Object|String} view Field view.
         * @param {Alpaca.Connector} connector Field connector.
         * @param {Function} errorCallback Error callback.
         */
        constructor: function(container, data, options, schema, view, connector,errorCallback) {
            this.base(container, data, options, schema, view, connector,errorCallback);
        },

        /**
         * @private
         * @see Alpaca.Fields.ObjectField#setup
         */
        setup: function() {
            this.base();

            this.schema = {
                "title": "Home Address",
                "type": "object",
                "properties": {
                    "street": {
                        "title": "Street",
                        "type": "array",
                        "items": {
                            "type": "string",
                            "maxLength": 30,
                            "minItems": 0,
                            "maxItems": 3
                        }
                    },
                    "city": {
                        "title": "City",
                        "type": "string"
                    },
                    "state": {
                        "title": "State",
                        "type": "string",
                        "enum": ["AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WV", "WI", "WY"]
                    },
                    "zip": {
                        "title": "Zip Code",
                        "type": "string",
                        "pattern": /^(\d{5}(-\d{4})?)?$/
                    }
                }
            };
            Alpaca.merge(this.options, {
                "fields": {
                    "zip": {
                        "maskString": "99999",
                        "size": 5
                    },
                    "state": {
                        "optionLabels": ["ALABAMA", "ALASKA", "AMERICANSAMOA", "ARIZONA", "ARKANSAS", "CALIFORNIA", "COLORADO", "CONNECTICUT", "DELAWARE", "DISTRICTOFCOLUMBIA", "FEDERATEDSTATESOFMICRONESIA", "FLORIDA", "GEORGIA", "GUAM", "HAWAII", "IDAHO", "ILLINOIS", "INDIANA", "IOWA", "KANSAS", "KENTUCKY", "LOUISIANA", "MAINE", "MARSHALLISLANDS", "MARYLAND", "MASSACHUSETTS", "MICHIGAN", "MINNESOTA", "MISSISSIPPI", "MISSOURI", "MONTANA", "NEBRASKA", "NEVADA", "NEWHAMPSHIRE", "NEWJERSEY", "NEWMEXICO", "NEWYORK", "NORTHCAROLINA", "NORTHDAKOTA", "NORTHERNMARIANAISLANDS", "OHIO", "OKLAHOMA", "OREGON", "PALAU", "PENNSYLVANIA", "PUERTORICO", "RHODEISLAND", "SOUTHCAROLINA", "SOUTHDAKOTA", "TENNESSEE", "TEXAS", "UTAH", "VERMONT", "VIRGINISLANDS", "VIRGINIA", "WASHINGTON", "WESTVIRGINIA", "WISCONSIN", "WYOMING"]
                    }
                }
            });

            if (Alpaca.isEmpty(this.options.addressValidation)) {
                this.options.addressValidation = true;
            }
        },

        /**
         * Returns address in a single line string.
         *
         * @returns {String} Address as a single line string.
         */
        getAddress: function() {
            var value = this.getValue();
            if (this.view.type == "view") {
                value = this.data;
            }
            var address = "";
            if (value) {
                if (value.street) {
                    $.each(value.street, function(index, value) {
                        address += value + " ";
                    });
                }
                if (value.city) {
                    address += value.city + " ";
                }
                if (value.state) {
                    address += value.state + " ";
                }
                if (value.zip) {
                    address += value.zip;
                }
            }
            return address;
        },

        /**
         * @see Alpaca.Field#renderField
         */
        renderField: function(onSuccess) {
            this.base();
            var _this = this;
            // apply additional css
            $(this.fieldContainer).addClass("alpaca-addressfield");

            if (this.options.addressValidation) {
                $('<div style="clear:both;"></div>').appendTo(this.fieldContainer);
                var mapButton = $('<div class="alpaca-form-button">Google Map</div>').appendTo(this.fieldContainer);
                if (mapButton.button) {
                    mapButton.button({
                        text: true
                    });
                }
                mapButton.click(
                        function() {
                            if (google && google.maps) {
                                var geocoder = new google.maps.Geocoder();
                                var address = _this.getAddress();
                                if (geocoder) {
                                    geocoder.geocode({
                                        'address': address
                                    }, function(results, status) {
                                        if (status == google.maps.GeocoderStatus.OK) {
                                            var mapCanvasId = _this.getId() + "-map-canvas";
                                            if ($('#' + mapCanvasId).length == 0) {
                                                $("<div id='" + mapCanvasId + "' class='alpaca-controlfield-address-mapcanvas'></div>").appendTo(_this.fieldContainer);
                                            }
                                            var map = new google.maps.Map(document.getElementById(_this.getId() + "-map-canvas"), {
                                                "zoom": 10,
                                                "center": results[0].geometry.location,
                                                "mapTypeId": google.maps.MapTypeId.ROADMAP
                                            });
                                            var marker = new google.maps.Marker({
                                                map: map,
                                                position: results[0].geometry.location
                                            });
                                        } else {
                                            _this.displayMessage("Geocoding failed: " + status);
                                        }
                                    });
                                }
                            } else {
                                _this.displayMessage("Google Map API is not installed.");
                            }
                        }).wrap('<small/>');
            }

            if (onSuccess) {
                onSuccess();
            }
        },//__BUILDER_HELPERS

        /**
         * @see Alpaca.Field#isContainer
         */
        isContainer: function() {
            return false;
        },

        /**
         * @private
         * @see Alpaca.Fields.ObjectField#getSchemaOfOptions
         */
        getSchemaOfOptions: function() {
            return Alpaca.merge(this.base(), {
                "properties": {
                    "validateAddress": {
                        "title": "Address Validation",
                        "description": "Enable address validation if true",
                        "type": "boolean",
                        "default": true
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.ObjectField#getOptionsForOptions
         */
        getOptionsForOptions: function() {
            return Alpaca.merge(this.base(), {
                "fields": {
                    "validateAddress": {
                        "helper": "Address validation if checked",
                        "rightLabel": "Enable Google Map for address validation?",
                        "type": "checkbox"
                    }
                }
            });
        },
        /**
         * @see Alpaca.Fields.ObjectField#getTitle
         */
        getTitle: function() {
            return "Address";
        },

        /**
         * @see Alpaca.Fields.ObjectField#getDescription
         */
        getDescription: function() {
            return "Standard US Address with Street, City, State and Zip. Also comes with support for Google map.";
        },

        /**
         * @see Alpaca.Fields.ObjectField#getType
         */
        getType: function() {
            return "any";
        },

        /**
         * @see Alpaca.Fields.ObjectField#getFieldType
         */
        getFieldType: function() {
            return "address";
        }//__END_OF_BUILDER_HELPERS
    });

    Alpaca.registerFieldClass("address", Alpaca.Fields.AddressField);
})(jQuery);
(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.DateField = Alpaca.Fields.TextField.extend(
    /**
     * @lends Alpaca.Fields.DateField.prototype
     */
    {
        /**
         * @constructs
         * @augments Alpaca.Fields.TextField
         *
         * @class Date control for JSON schema date format.
         *
         * @param {Object} container Field container.
         * @param {Any} data Field data.
         * @param {Object} options Field options.
         * @param {Object} schema Field schema.
         * @param {Object|String} view Field view.
         * @param {Alpaca.Connector} connector Field connector.
         * @param {Function} errorCallback Error callback.
         */
        constructor: function(container, data, options, schema, view, connector, errorCallback) {
            this.base(container, data, options, schema, view, connector, errorCallback);
        },

        /**
         * @see Alpaca.Fields.TextField#setup
         */
        setup: function() {
            this.base();

            if (!this.options.dateFormat) {
                this.options.dateFormat = Alpaca.defaultDateFormat;
            }
            if (!this.options.dateFormatRegex) {
                this.options.dateFormatRegex = Alpaca.regexps.date;
            }
        },

        /**
         * @see Alpaca.Fields.TextField#postRender
         */
        postRender: function() {
            this.base();
            if (this.field.datepicker) {
                this.field.datepicker({
                    "dateFormat":  this.options.dateFormat
                });
                if (this.fieldContainer) {
                    this.fieldContainer.addClass('alpaca-controlfield-date');
                }
            }
        },

        /**
         * @see Alpaca.Field#onChange
         */
        onChange: function(e) {
            this.base();
            this.renderValidationState();
        },

        /**
         * @see Alpaca.Fields.TextField#handleValidate
         */
        handleValidate: function() {
            var baseStatus = this.base();

            var valInfo = this.validation;

            var status = this._validateDateFormat();
            valInfo["invalidDate"] = {
                "message": status ? "" : Alpaca.substituteTokens(this.view.getMessage("invalidDate"), [this.options.dateFormat]),
                "status": status
            };

            return baseStatus && valInfo["invalidDate"]["status"];
        },

        /**
         * Validates date format.
         * @returns {Boolean} True if it is a valid date, false otherwise.
         */
        _validateDateFormat: function() {
            var value = this.field.val();

            if ($.datepicker) {
                try {
                    $.datepicker.parseDate(this.options.dateFormat, value);
                    return true;
                } catch(e) {
                    return false;
                }
            } else {
                //validate the date without the help of datepicker.parseDate
                return value.match(this.options.dateFormatRegex);
            }
        },

        /**
         * @see Alpaca.Fields.TextField#setValue
         */
        setValue: function(val) {
            // skip out if no date
            if (val == "") {
                this.base(val);
                return;
            }

            this.base(val);
        },//__BUILDER_HELPERS

        /**
         * @private
         * @see Alpaca.Fields.TextField#getSchemaOfSchema
         */
        getSchemaOfSchema: function() {
            return Alpaca.merge(this.base(), {
                "properties": {
                    "format": {
                        "title": "Format",
                        "description": "Property data format",
                        "type": "string",
                        "default":"date",
                        "enum" : ["date"],
                        "readonly":true
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.TextField#getOptionsForSchema
         */
        getOptionsForSchema: function() {
            return Alpaca.merge(this.base(), {
                "fields": {
                    "format": {
                        "type": "text"
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.TextField#getSchemaOfOptions
         */
        getSchemaOfOptions: function() {
            return Alpaca.merge(this.base(), {
                "properties": {
                    "dateFormat": {
                        "title": "Date Format",
                        "description": "Date format",
                        "type": "string",
                        "default": Alpaca.defaultDateFormat
                    },
                    "dateFormatRegex": {
                        "title": "Format Regular Expression",
                        "description": "Regular expression for validation date format",
                        "type": "string",
                        "default": Alpaca.regexps.date
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.TextField#getOptionsForOptions
         */
        getOptionsForOptions: function() {
            return Alpaca.merge(this.base(), {
                "fields": {
                    "dateFormat": {
                        "type": "text"
                    },
                    "dateFormatRegex": {
                        "type": "text"
                    }
                }
            });
        },

        /**
         * @see Alpaca.Fields.TextField#getTitle
         */
        getTitle: function() {
            return "Date Field";
        },

        /**
         * @see Alpaca.Fields.TextField#getDescription
         */
        getDescription: function() {
            return "Date Field.";
        },

        /**
         * @see Alpaca.Fields.TextField#getFieldType
         */
        getFieldType: function() {
            return "date";
        }//__END_OF_BUILDER_HELPERS
    });

    Alpaca.registerMessages({
        "invalidDate": "Invalid date for format {0}"
    });
    Alpaca.registerFieldClass("date", Alpaca.Fields.DateField);
    Alpaca.registerDefaultFormatFieldMapping("date", "date");
})(jQuery);
(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.DatetimeField = Alpaca.Fields.TextField.extend(
        /**
         * @lends Alpaca.Fields.DatetimeField.prototype
         */
        {
            /**
             * @constructs
             * @augments Alpaca.Fields.ObjectField
             *
             * @class A combo field for rendering a standard US range. It also comes up with support for Google Map
             * which would requires including Google Map JS file for the form that uses this class.
             *
             * @param {Object} container Field container.
             * @param {Any} data Field data.
             * @param {Object} options Field options.
             * @param {Object} schema Field schema.
             * @param {Object|String} view Field view.
             * @param {Alpaca.Connector} connector Field connector.
             * @param {Function} errorCallback Error callback.
             */
            constructor: function(container, data, options, schema, view, connector, errorCallback) {
                this.base(container, data, options, schema, view, connector, errorCallback);
            },

            /**
             * @see Alpaca.Fields.TextField#setup
             */
            /**
             * @private
             * @see Alpaca.Fields.ObjectField#setup
             */
            setup: function() {
                this.base();
            },

            /**
             * @see Alpaca.Fields.TextField#postRender
             */
            postRender: function() {
                var _this = this;
                this.base();
                if (this.field.datetimepicker) {
                    this.field.hover(function() {
                        if (!$(this).hasClass('hasDatepicker')) {
                            $(this).datetimepicker(_this.options.datetime ? _this.options.datetime : {});
                        }
                    });
                    if (this.fieldContainer) {
                        this.fieldContainer.addClass('alpaca-controlfield-datetime');
                    }
                }
            },

            /**
             *@see Alpaca.Fields.TextField#setValue
             */
            setValue: function(value) {
                if (value) {
                    if (Alpaca.isNumber()) {
                        value = new Date(value);
                    }
                    if (Object.prototype.toString.call(value) == "[object Date]") {
                        this.base((value.getMonth() + 1) + "/" + value.getDate() + "/" + value.getFullYear() + " " + value.getHours() + ":" + value.getMinutes());
                    } else {
                        this.base(value);
                    }
                } else {
                    this.base(value);
                }
            },

            /**
             * @see Alpaca.Fields.TextField#getValue
             */
            getValue: function() {
                return this.base();
            },

            /**
             * Returns field value in datetime.
             *
             * @returns {Date} Field value.
             */
            getDatetime: function() {
                try {
                    return this.field.datetimepicker('getDate');
                } catch (e) {
                    return this.getValue();
                }
            },//__BUILDER_HELPERS

            /**
             * @private
             * @see Alpaca.ControlField#getSchemaOfOptions
             */
            getSchemaOfOptions: function() {
                return Alpaca.merge(this.base(), {
                    "properties": {
                        "datetime": {
                            "title": "Timepicker options",
                            "description": "Options that are supported by the <a href='http://trentrichardson.com/examples/timepicker/'>jQuery timepicker addon</a>.",
                            "type": "any"
                        }
                    }
                });
            },

            /**
             * @private
             * @see Alpaca.ControlField#getOptionsForOptions
             */
            getOptionsForOptions: function() {
                return Alpaca.merge(this.base(), {
                    "fields": {
                        "datetime": {
                            "type": "any"
                        }
                    }
                });
            },

            /**
             * @see Alpaca.Fields.TextField#getTitle
             */
            getTitle: function() {
                return "Datetime Field";
            },

            /**
             * @see Alpaca.Fields.TextField#getDescription
             */
            getDescription: function() {
                return "Datetime Field based on Trent Richardson's <a href='http://trentrichardson.com/examples/timepicker/'>jQuery timepicker addon</a>.";
            },

            /**
             * @see Alpaca.Fields.TextField#getFieldType
             */
            getFieldType: function() {
                return "datetime";
            }//__END_OF_BUILDER_HELPERS
        });

    Alpaca.registerFieldClass("datetime", Alpaca.Fields.DatetimeField);
    Alpaca.registerDefaultFormatFieldMapping("datetime", "datetime");
})(jQuery);
(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.EmailField = Alpaca.Fields.TextField.extend(
    /**
     * @lends Alpaca.Fields.EmailField.prototype
     */
    {
        /**
         * @constructs
         * @augments Alpaca.Fields.TextField
         *
         * @class Control for JSON schema email format.
         *
         * @param {Object} container Field container.
         * @param {Any} data Field data.
         * @param {Object} options Field options.
         * @param {Object} schema Field schema.
         * @param {Object|String} view Field view.
         * @param {Alpaca.Connector} connector Field connector.
         * @param {Function} errorCallback Error callback.
         */
        constructor: function(container, data, options, schema, view, connector, errorCallback) {
            this.base(container, data, options, schema, view, connector, errorCallback);
        },

        /**
         * @see Alpaca.Fields.TextField#setup
         */
        setup: function() {
            this.base();

            if (!this.schema.pattern) {
                this.schema.pattern = Alpaca.regexps.email;
            }
        },

        /**
         * @see Alpaca.Fields.TextField#postRender
         */
        postRender: function() {
            this.base();
            if (this.fieldContainer) {
                this.fieldContainer.addClass('alpaca-controlfield-email');
            }
        },

        /**
         * @see Alpaca.Fields.TextField#handleValidate
         */
        handleValidate: function() {
            var baseStatus = this.base();

            var valInfo = this.validation;

            if (!valInfo["invalidPattern"]["status"]) {
                valInfo["invalidPattern"]["message"] = this.view.getMessage("invalidEmail");
            }

            return baseStatus;
        },//__BUILDER_HELPERS

        /**
         * @private
         * @see Alpaca.Fields.TextField#getSchemaOfSchema
         */
        getSchemaOfSchema: function() {
            var pattern = (this.schema && this.schema.pattern) ? this.schema.pattern : Alpaca.regexps.email;
            return Alpaca.merge(this.base(), {
                "properties": {
                    "pattern": {
                        "title": "Pattern",
                        "description": "Field Pattern in Regular Expression",
                        "type": "string",
                        "default": pattern,
                        "enum":[pattern],
                        "readonly": true
                    },
                    "format": {
                        "title": "Format",
                        "description": "Property data format",
                        "type": "string",
                        "default":"email",
                        "enum":["email"],
                        "readonly":true
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.TextField#getOptionsForSchema
         */
        getOptionsForSchema: function() {
            return Alpaca.merge(this.base(), {
                "fields": {
                    "format": {
                        "type": "text"
                    }
                }
            });
        },

        /**
         * @see Alpaca.Fields.TextField#getTitle
         */
        getTitle: function() {
            return "Email Field";
        },

        /**
         * @see Alpaca.Fields.TextField#getDescription
         */
        getDescription: function() {
            return "Email Field.";
        },

        /**
         * @see Alpaca.Fields.TextField#getFieldType
         */
        getFieldType: function() {
            return "email";
        }//__END_OF_BUILDER_HELPERS
    });

    Alpaca.registerMessages({
        "invalidEmail": "Invalid Email address e.g. admin@gitanasoftware.com"
    });
    Alpaca.registerFieldClass("email", Alpaca.Fields.EmailField);
    Alpaca.registerDefaultFormatFieldMapping("email", "email");
})(jQuery);
(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.IntegerField = Alpaca.Fields.NumberField.extend(
    /**
     * @lends Alpaca.Fields.IntegerField.prototype
     */
    {
        /**
         * @constructs
         * @augments Alpaca.Fields.NumberField
         *
         * @class Control for integers. If jQuery UI is enabled, it can also be
         * turned into a slider.
         *<p>
         * The following additional JSON Schema properties are supported:
         *<p/>
         *<code>
         *     <pre>
         * {
         *    minimum: {number},
         *    maximum: {number},
         *    minimumCanEqual: {boolean},
         *    maximumCanEqual: {boolean},
         *    divisibleBy: {number}
         * }
         * </pre>
         * </code>
         *
         * @param {Object} container Field container.
         * @param {Any} data Field data.
         * @param {Object} options Field options.
         * @param {Object} schema Field schema.
         * @param {Object|String} view Field view.
         * @param {Alpaca.Connector} connector Field connector.
         * @param {Function} errorCallback Error callback.
         */
        constructor: function(container, data, options, schema, view, connector, errorCallback) {
            this.base(container, data, options, schema, view, connector, errorCallback);
        },

        /**
         * @see Alpaca.Fields.NumberField#getValue
         */
        getValue: function() {
            var textValue = this.field.val();
            if (Alpaca.isValEmpty(textValue)) {
                return "";
            } else {
                return parseInt(textValue);
            }
        },

        /**
         * @see Alpaca.Field#onChange
         */
        onChange: function(e) {
            this.base();
            if (this.slider) {
                this.slider.slider("value", this.getValue());
            }
        },

        /**
         * @see Alpaca.Fields.NumberField#postRender
         */
        postRender: function() {
            this.base();
            var _this = this;
            if (this.options.slider) {
                if (!Alpaca.isEmpty(this.schema.maximum) && !Alpaca.isEmpty(this.schema.minimum)) {
                    this.field.after('<div id="slider"></div>');
                    this.slider = $('#slider', this.field.parent()).slider({
                        value: this.getValue(),
                        min: this.schema.minimum,
                        max: this.schema.maximum,
                        slide: function(event, ui) {
                            _this.setValue(ui.value);
                            _this.renderValidationState();
                        }
                    });
                }
            }
            if (this.fieldContainer) {
                this.fieldContainer.addClass('alpaca-controlfield-integer');
            }
        },

        /**
         * @see Alpaca.Fields.NumberField#handleValidate
         */
        handleValidate: function() {

            var baseStatus = this.base();

            var valInfo = this.validation;

            if (!valInfo["stringNotANumber"]["status"]) {
                valInfo["stringNotANumber"]["message"] = this.view.getMessage("stringNotAnInteger");
            }

            return baseStatus;
        },

        /**
         * Validates if it is an integer.
         * @returns {Boolean} true if it is an integer
         */
        _validateNumber: function() {
            var textValue = this.field.val();

            if (Alpaca.isValEmpty(textValue)) {
                return true;
            }

            var floatValue = this.getValue();

            // quick check to see if what they entered was a number
            if (isNaN(floatValue)) {
                return false;
            }

            // check if valid number format
            if (!textValue.match(Alpaca.regexps.integer)) {
                return false;
            }

            return true;
        },//__BUILDER_HELPERS

        /**
         * @private
         * @see Alpaca.Fields.NumberField#getSchemaOfSchema
         */
        getSchemaOfSchema: function() {
            return Alpaca.merge(this.base(), {
                "properties": {
                    "minimum": {
                        "title": "Minimum",
                        "description": "Minimum value of the property.",
                        "type": "integer"
                    },
                    "maximum": {
                        "title": "Maximum",
                        "description": "Maximum value of the property.",
                        "type": "integer"
                    },
                    "divisibleBy": {
                        "title": "Divisible By",
                        "description": "Property value must be divisible by this number.",
                        "type": "integer"
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.NumberField#getOptionsForSchema
         */
        getOptionsForSchema: function() {
            return Alpaca.merge(this.base(), {
                "fields": {
                    "minimum": {
                        "helper": "Minimum value of the field.",
                        "type": "integer"
                    },
                    "maximum": {
                        "helper": "Maximum value of the field.",
                        "type": "integer"
                    },
                    "divisibleBy": {
                        "helper": "Property value must be divisible by this number.",
                        "type": "integer"
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.NumberField#getSchemaOfOptions
         */
        getSchemaOfOptions: function() {
            return Alpaca.merge(this.base(), {
                "properties": {
                    "slider": {
                        "title": "Slider",
                        "description": "Generate jQuery UI slider control with the field if true.",
                        "type": "boolean",
                        "default": false
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.NumberField#getOptionsForOptions
         */
        getOptionsForOptions: function() {
            return Alpaca.merge(this.base(), {
                "fields": {
                    "slider": {
                        "rightLabel": "Slider control ?",
                        "helper": "Generate slider control if selected.",
                        "type": "checkbox"
                    }
                }
            });
        },

        /**
         * @see Alpaca.Fields.NumberField#getTitle
         */
        getTitle: function() {
            return "Integer Field";
        },

        /**
         * @see Alpaca.Fields.NumberField#getDescription
         */
        getDescription: function() {
            return "Field for integers.";
        },

        /**
         * @see Alpaca.Fields.NumberField#getType
         */
        getType: function() {
            return "integer";
        },

        /**
         * @see Alpaca.Fields.NumberField#getFieldType
         */
        getFieldType: function() {
            return "integer";
        }//__END_OF_BUILDER_HELPERS
    });

    // Additional Registrations
    Alpaca.registerMessages({
        "stringNotAnInteger": "This value is not an integer."
    });
    Alpaca.registerFieldClass("integer", Alpaca.Fields.IntegerField);
    Alpaca.registerDefaultSchemaFieldMapping("integer", "integer");
})(jQuery);
(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.IPv4Field = Alpaca.Fields.TextField.extend(
    /**
     * @lends Alpaca.Fields.IPv4Field.prototype
     */
    {
        /**
         * @constructs
         * @augments Alpaca.Fields.TextField
         *
         * @class Control for JSON schema ip-address format.
         *
         * @param {Object} container Field container.
         * @param {Any} data Field data.
         * @param {Object} options Field options.
         * @param {Object} schema Field schema.
         * @param {Object|String} view Field view.
         * @param {Alpaca.Connector} connector Field connector.
         * @param {Function} errorCallback Error callback.
         */
        constructor: function(container, data, options, schema, view, connector, errorCallback) {
            this.base(container, data, options, schema, view, connector, errorCallback);
        },

        /**
         * @see Alpaca.Fields.TextField#setup
         */
        setup: function() {
            this.base();
            
            if (!this.schema.pattern) {
                this.schema.pattern = Alpaca.regexps.ipv4;
            }
        },

        /**
         * @see Alpaca.Fields.TextField#postRender
         */
        postRender: function() {
            this.base();
			if (this.fieldContainer) {
				this.fieldContainer.addClass('alpaca-controlfield-ipv4');
			}	
        },
		        
        /**
         * @see Alpaca.Fields.TextField#handleValidate
         */
        handleValidate: function() {
            var baseStatus = this.base();
            
            var valInfo = this.validation;
            
            if (!valInfo["invalidPattern"]["status"]) {
                valInfo["invalidPattern"]["message"] = this.view.getMessage("invalidIPv4");
            }
            
            return baseStatus;
        },//__BUILDER_HELPERS

        /**
         * @private
         * @see Alpaca.Fields.TextField#getSchemaOfSchema
         */
        getSchemaOfSchema: function() {
            var pattern = (this.schema && this.schema.pattern)? this.schema.pattern : Alpaca.regexps.ipv4;
            return Alpaca.merge(this.base(), {
                "properties": {
                    "pattern": {
                        "title": "Pattern",
                        "description": "Field Pattern in Regular Expression",
                        "type": "string",
                        "default": pattern,
                        "readonly": true
                    },                    
					"format": {
                        "title": "Format",
                        "description": "Property data format",
                        "type": "string",
                        "enum": ["ip-address"],
						"default":"ip-address",
						"readonly":true
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.TextField#getOptionsForSchema
         */
		getOptionsForSchema: function() {
            return Alpaca.merge(this.base(),{
				"fields": {
					"format": {
						"type": "text"
					}
				}
			});
        },
        
        /**
         * @see Alpaca.Fields.TextField#getTitle
         */
        getTitle: function() {
            return "IP Address Field";
        },
        
        /**
         * @see Alpaca.Fields.TextField#getDescription
         */
        getDescription: function() {
            return "IP Address Field.";
        },

		/**
         * @see Alpaca.Fields.TextField#getFieldType
         */
        getFieldType: function() {
            return "ipv4";
        }//__END_OF_BUILDER_HELPERS
    });
    
    Alpaca.registerMessages({
        "invalidIPv4": "Invalid IPv4 address, e.g. 192.168.0.1"
    });
    Alpaca.registerFieldClass("ipv4", Alpaca.Fields.IPv4Field);
    Alpaca.registerDefaultFormatFieldMapping("ip-address", "ipv4");
})(jQuery);
(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.JSONField = Alpaca.Fields.TextAreaField.extend(
    /**
     * @lends Alpaca.Fields.JSONField.prototype
     */
    {
        /**
         * @constructs
         * @augments Alpaca.Fields.TextAreaField
         *
         * @class JSON control for chunk of text.
         *
         * @param {Object} container Field container.
         * @param {Any} data Field data.
         * @param {Object} options Field options.
         * @param {Object} schema Field schema.
         * @param {Object|String} view Field view.
         * @param {Alpaca.Connector} connector Field connector.
         * @param {Function} errorCallback Error callback.
         */
        constructor: function(container, data, options, schema, view, connector, errorCallback) {
            this.base(container, data, options, schema, view, connector, errorCallback);
        },

        /**
         * @see Alpaca.ContainerField#getValue
         */
        setValue: function(value) {
            if (Alpaca.isObject(value) || typeof(value) == "object") {
                value = JSON.stringify(value, null, 3);
            }
            this.base(value);
        },

        /**
         * @see Alpaca.ContainerField#getValue
         */
        getValue: function() {

            var val = this.base();

            if (val && Alpaca.isString(val)) {
                val = JSON.parse(val);
            }

            return val;
        },

        /**
         * @see Alpaca.Fields.TextField#handleValidate
         */
        handleValidate: function() {
            var baseStatus = this.base();

            var valInfo = this.validation;

			var status = this._validateJSON();
            valInfo["stringNotAJSON"] = {
                "message": status.status ? "" : this.view.getMessage("stringNotAJSON") +" "+ status.message,
                "status": status.status
            };

            return baseStatus && valInfo["stringNotAJSON"]["status"] ;
        },

        /**
         * Validates if it is a valid JSON object.
         * @returns {Boolean} true if it is a valid JSON object
         */
        _validateJSON: function() {
            var textValue = this.field.val();
            // allow null
            if (Alpaca.isValEmpty(textValue)) {
                return {
                    "status" : true
                };
            }

            // parse the string
            try {
                var obj = JSON.parse(textValue);
                // format the string as well
                this.setValue(JSON.stringify(obj, null, 3));
                return {
                    "status" : true
                };
            } catch(e) {
                return {
                    "status" : false,
                    "message" : e.message
                };
            }
        },

        /**
         * @see Alpaca.Fields.TextAreaField#postRender
         */
    	postRender: function() {
            this.base();
			if (this.fieldContainer) {
				this.fieldContainer.addClass('alpaca-controlfield-json');
			}
            // Some auto-formatting capabilities
            var _this = this;
            this.field.bind('keypress', function(e) {
                //console.log(e.which);
                if (e.which == 34) {
                    _this.field.insertAtCaret('"');
                }
                if (e.which == 123) {
                    _this.field.insertAtCaret('}');
                }
                if (e.which == 91) {
                    _this.field.insertAtCaret(']');
                }
            });
            this.field.bind('keypress', 'Ctrl+l', function() {
                _this.getEl().removeClass("alpaca-field-focused");

                // set class from state
                _this.renderValidationState();
            });
            this.field.attr('title','Type Ctrl+L to format and validate the JSON string.');
        },//__BUILDER_HELPERS

		/**
         * @see Alpaca.Fields.TextAreaField#getTitle
		 */
		getTitle: function() {
			return "JSON Editor";
		},

		/**
         * @see Alpaca.Fields.TextAreaField#getDescription
		 */
		getDescription: function() {
			return "Editor for JSON objects with basic validation and formatting.";
		},

		/**
         * @see Alpaca.Fields.TextAreaField#getFieldType
         */
        getFieldType: function() {
            return "json";
        }//__END_OF_BUILDER_HELPERS
    });

    // Additional Registrations
    Alpaca.registerMessages({
        "stringNotAJSON": "This value is not a valid JSON string."
    });

    Alpaca.registerFieldClass("json", Alpaca.Fields.JSONField);

    $.fn.insertAtCaret = function (myValue) {

        return this.each(function() {

            //IE support
            if (document.selection) {

                this.focus();
                sel = document.selection.createRange();
                sel.text = myValue;
                this.focus();

            } else if (this.selectionStart || this.selectionStart == '0') {

                //MOZILLA / NETSCAPE support
                var startPos = this.selectionStart;
                var endPos = this.selectionEnd;
                var scrollTop = this.scrollTop;
                this.value = this.value.substring(0, startPos) + myValue + this.value.substring(endPos, this.value.length);
                this.focus();
                this.selectionStart = startPos /*+ myValue.length*/;
                this.selectionEnd = startPos /*+ myValue.length*/;
                this.scrollTop = scrollTop;

            } else {

                this.value += myValue;
                this.focus();
            }
        });
    };
/*
 * jQuery Hotkeys Plugin
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Based upon the plugin by Tzury Bar Yochay:
 * http://github.com/tzuryby/hotkeys
 *
 * Original idea by:
 * Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/
*/
    jQuery.hotkeys = {
        version: "0.8",

        specialKeys: {
            8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
            20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
            37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del",
            96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
            104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/",
            112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8",
            120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 191: "/", 224: "meta"
        },

        shiftNums: {
            "`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&",
            "8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ": ", "'": "\"", ",": "<",
            ".": ">",  "/": "?",  "\\": "|"
        }
    };

    function keyHandler( handleObj ) {
        // Only care when a possible input has been specified
        if ( typeof handleObj.data !== "string" ) {
            return;
        }

        var origHandler = handleObj.handler,
            keys = handleObj.data.toLowerCase().split(" ");

        handleObj.handler = function( event ) {
            // Don't fire in text-accepting inputs that we didn't directly bind to
            if ( this !== event.target && (/textarea|select/i.test( event.target.nodeName ) ||
                 event.target.type === "text") ) {
                return;
            }

            // Keypress represents characters, not special keys
            var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[ event.which ],
                character = String.fromCharCode( event.which ).toLowerCase(),
                key, modif = "", possible = {};

            // check combinations (alt|ctrl|shift+anything)
            if ( event.altKey && special !== "alt" ) {
                modif += "alt+";
            }

            if ( event.ctrlKey && special !== "ctrl" ) {
                modif += "ctrl+";
            }

            // TODO: Need to make sure this works consistently across platforms
            if ( event.metaKey && !event.ctrlKey && special !== "meta" ) {
                modif += "meta+";
            }

            if ( event.shiftKey && special !== "shift" ) {
                modif += "shift+";
            }

            if ( special ) {
                possible[ modif + special ] = true;

            } else {
                possible[ modif + character ] = true;
                possible[ modif + jQuery.hotkeys.shiftNums[ character ] ] = true;

                // "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
                if ( modif === "shift+" ) {
                    possible[ jQuery.hotkeys.shiftNums[ character ] ] = true;
                }
            }

            for ( var i = 0, l = keys.length; i < l; i++ ) {
                if ( possible[ keys[i] ] ) {
                    return origHandler.apply( this, arguments );
                }
            }
        };
    }

    jQuery.each([ "keydown", "keyup", "keypress" ], function() {
        jQuery.event.special[ this ] = { add: keyHandler };
    });

})(jQuery);
(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.IntegerField = Alpaca.Fields.NumberField.extend(
    /**
     * @lends Alpaca.Fields.IntegerField.prototype
     */
    {
        /**
         * @constructs
         * @augments Alpaca.Fields.NumberField
         *
         * @class Control for integers. If jQuery UI is enabled, it can also be
         * turned into a slider.
         *<p>
         * The following additional JSON Schema properties are supported:
         *<p/>
         *<code>
         *     <pre>
         * {
         *    minimum: {number},
         *    maximum: {number},
         *    minimumCanEqual: {boolean},
         *    maximumCanEqual: {boolean},
         *    divisibleBy: {number}
         * }
         * </pre>
         * </code>
         *
         * @param {Object} container Field container.
         * @param {Any} data Field data.
         * @param {Object} options Field options.
         * @param {Object} schema Field schema.
         * @param {Object|String} view Field view.
         * @param {Alpaca.Connector} connector Field connector.
         * @param {Function} errorCallback Error callback.
         */
        constructor: function(container, data, options, schema, view, connector, errorCallback) {
            this.base(container, data, options, schema, view, connector, errorCallback);
        },

        /**
         * @see Alpaca.Fields.NumberField#getValue
         */
        getValue: function() {
            var textValue = this.field.val();
            if (Alpaca.isValEmpty(textValue)) {
                return "";
            } else {
                return parseInt(textValue);
            }
        },

        /**
         * @see Alpaca.Field#onChange
         */
        onChange: function(e) {
            this.base();
            if (this.slider) {
                this.slider.slider("value", this.getValue());
            }
        },

        /**
         * @see Alpaca.Fields.NumberField#postRender
         */
        postRender: function() {
            this.base();
            var _this = this;
            if (this.options.slider) {
                if (!Alpaca.isEmpty(this.schema.maximum) && !Alpaca.isEmpty(this.schema.minimum)) {
                    this.field.after('<div id="slider"></div>');
                    this.slider = $('#slider', this.field.parent()).slider({
                        value: this.getValue(),
                        min: this.schema.minimum,
                        max: this.schema.maximum,
                        slide: function(event, ui) {
                            _this.setValue(ui.value);
                            _this.renderValidationState();
                        }
                    });
                }
            }
            if (this.fieldContainer) {
                this.fieldContainer.addClass('alpaca-controlfield-integer');
            }
        },

        /**
         * @see Alpaca.Fields.NumberField#handleValidate
         */
        handleValidate: function() {

            var baseStatus = this.base();

            var valInfo = this.validation;

            if (!valInfo["stringNotANumber"]["status"]) {
                valInfo["stringNotANumber"]["message"] = this.view.getMessage("stringNotAnInteger");
            }

            return baseStatus;
        },

        /**
         * Validates if it is an integer.
         * @returns {Boolean} true if it is an integer
         */
        _validateNumber: function() {
            var textValue = this.field.val();

            if (Alpaca.isValEmpty(textValue)) {
                return true;
            }

            var floatValue = this.getValue();

            // quick check to see if what they entered was a number
            if (isNaN(floatValue)) {
                return false;
            }

            // check if valid number format
            if (!textValue.match(Alpaca.regexps.integer)) {
                return false;
            }

            return true;
        },//__BUILDER_HELPERS

        /**
         * @private
         * @see Alpaca.Fields.NumberField#getSchemaOfSchema
         */
        getSchemaOfSchema: function() {
            return Alpaca.merge(this.base(), {
                "properties": {
                    "minimum": {
                        "title": "Minimum",
                        "description": "Minimum value of the property.",
                        "type": "integer"
                    },
                    "maximum": {
                        "title": "Maximum",
                        "description": "Maximum value of the property.",
                        "type": "integer"
                    },
                    "divisibleBy": {
                        "title": "Divisible By",
                        "description": "Property value must be divisible by this number.",
                        "type": "integer"
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.NumberField#getOptionsForSchema
         */
        getOptionsForSchema: function() {
            return Alpaca.merge(this.base(), {
                "fields": {
                    "minimum": {
                        "helper": "Minimum value of the field.",
                        "type": "integer"
                    },
                    "maximum": {
                        "helper": "Maximum value of the field.",
                        "type": "integer"
                    },
                    "divisibleBy": {
                        "helper": "Property value must be divisible by this number.",
                        "type": "integer"
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.NumberField#getSchemaOfOptions
         */
        getSchemaOfOptions: function() {
            return Alpaca.merge(this.base(), {
                "properties": {
                    "slider": {
                        "title": "Slider",
                        "description": "Generate jQuery UI slider control with the field if true.",
                        "type": "boolean",
                        "default": false
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.NumberField#getOptionsForOptions
         */
        getOptionsForOptions: function() {
            return Alpaca.merge(this.base(), {
                "fields": {
                    "slider": {
                        "rightLabel": "Slider control ?",
                        "helper": "Generate slider control if selected.",
                        "type": "checkbox"
                    }
                }
            });
        },

        /**
         * @see Alpaca.Fields.NumberField#getTitle
         */
        getTitle: function() {
            return "Integer Field";
        },

        /**
         * @see Alpaca.Fields.NumberField#getDescription
         */
        getDescription: function() {
            return "Field for integers.";
        },

        /**
         * @see Alpaca.Fields.NumberField#getType
         */
        getType: function() {
            return "integer";
        },

        /**
         * @see Alpaca.Fields.NumberField#getFieldType
         */
        getFieldType: function() {
            return "integer";
        }//__END_OF_BUILDER_HELPERS
    });

    // Additional Registrations
    Alpaca.registerMessages({
        "stringNotAnInteger": "This value is not an integer."
    });
    Alpaca.registerFieldClass("integer", Alpaca.Fields.IntegerField);
    Alpaca.registerDefaultSchemaFieldMapping("integer", "integer");
})(jQuery);
(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.LowerCaseField = Alpaca.Fields.TextField.extend(
    /**
     * @lends Alpaca.Fields.LowerCaseField.prototype
     */
    {
        /**
         * @constructs
         * @augments Alpaca.Fields.TextField
         *
         * @class Control for lower case text.
         *
         * @param {Object} container Field container.
         * @param {Any} data Field data.
         * @param {Object} options Field options.
         * @param {Object} schema Field schema.
         * @param {Object|String} view Field view.
         * @param {Alpaca.Connector} connector Field connector.
         * @param {Function} errorCallback Error callback.
         */
        constructor: function(container, data, options, schema, view, connector, errorCallback) {
            this.base(container, data, options, schema, view, connector, errorCallback);
        },

        /**
         * @see Alpaca.Fields.TextField#postRender
         */
        postRender: function() {
            this.base();
            if (this.fieldContainer) {
                this.fieldContainer.addClass('alpaca-controlfield-lowercase');
            }
        },

        /**
         * @see Alpaca.Fields.TextField#setValue
         */
        setValue: function(val) {
            var lowerValue = val.toLowerCase();

            if (lowerValue != this.getValue()) {
                this.base(lowerValue);
            }
        },

        /**
         * @see Alpaca.ControlField#onKeyPress
         */
        onKeyPress: function(e) {
            this.base(e);

            var _this = this;

            Alpaca.later(25, this, function() {
                var v = _this.getValue();
                _this.setValue(v);
            });
        },//__BUILDER_HELPERS

        /**
         * @see Alpaca.Fields.TextField#getTitle
         */
        getTitle: function() {
            return "Lowercase Text";
        },

        /**
         * @see Alpaca.Fields.TextField#getDescription
         */
        getDescription: function() {
            return "Text field for lowercase text.";
        },

        /**
         * @see Alpaca.Fields.TextField#getFieldType
         */
        getFieldType: function() {
            return "lowercase";
        }//__END_OF_BUILDER_HELPERS
    });

    Alpaca.registerFieldClass("lowercase", Alpaca.Fields.LowerCaseField);
    Alpaca.registerDefaultFormatFieldMapping("lowercase", "lowercase");

})(jQuery);
(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.MapField = Alpaca.Fields.ArrayField.extend(
    /**
     * @lends Alpaca.Fields.MapField.prototype
     */
    {
        /**
         * @constructs
         * @augments Alpaca.Fields.TextAreaField
         *
         * @class JSON control for chunk of text.
         *
         * @param {Object} container Field container.
         * @param {Any} data Field data.
         * @param {Object} options Field options.
         * @param {Object} schema Field schema.
         * @param {Object|String} view Field view.
         * @param {Alpaca.Connector} connector Field connector.
         * @param {Function} errorCallback Error callback.
         */
        constructor: function(container, data, options, schema, view, connector, errorCallback) {
            this.base(container, data, options, schema, view, connector, errorCallback);
        },

        /**
         * @see Alpaca.Fields.TextAreaField#setup
         */
        setup: function() {

            if (Alpaca.isEmpty(this.data)) {
                return;
            }
            if (!Alpaca.isArray(this.data)) {

                if (Alpaca.isObject(this.data)) {
                    var newData = [];
                    $.each(this.data, function(key, value) {
                        var newValue = Alpaca.cloneObject(value);
                        newValue["_key"] = key;
                        newData.push(newValue);
                    });
                    this.data = newData;
                }
            }

            Alpaca.mergeObject(this.options, {
                "forceRevalidation" : true
            });

            this.base();
        },

        /**
         * @see Alpaca.ContainerField#getValue
         */
        getValue: function() {
            var o = {};
            for (var i = 0; i < this.children.length; i++) {
                var v = this.children[i].getValue();
                var key = v["_key"];
                if (key) {
                    delete v["_key"];
                    o[key] = v;
                }
            }
            return o;
        },

        /**
         * @see Alpaca.Fields.TextField#handleValidate
         */
        handleValidate: function() {
            var baseStatus = this.base();

            var valInfo = this.validation;

			var status = this._validateKey();
            valInfo["keyNotUnique"] = {
                "message": status.status ? "" : this.view.getMessage("keyNotUnique"),
                "status": status.status
            };

            return baseStatus && valInfo["keyNotUnique"]["status"] ;
        },

        /**
         * Validates if key fields are unique.
         * @returns {Boolean} true if keys are unique
         */
        _validateKey: function() {
            var counter = 0;
            $.each(this.getValue(),function() {
                counter ++;
            });
            if (counter != this.children.length) {
                return {
                    "status" : false
                };
            } else {
                return {
                    "status" : true
                };
            }
        },

        /**
         * @see Alpaca.Fields.TextAreaField#postRender
         */
    	postRender: function() {
            this.base();
			if (this.fieldContainer) {
				this.fieldContainer.addClass('alpaca-controlfield-map');
			}
        },//__BUILDER_HELPERS

		/**
         * @see Alpaca.Fields.TextAreaField#getTitle
		 */
		getTitle: function() {
			return "Map Field";
		},

		/**
         * @see Alpaca.Fields.TextAreaField#getDescription
		 */
		getDescription: function() {
			return "Field for objects with key/value pairs that share the same schema for values.";
		},

		/**
         * @see Alpaca.Fields.TextAreaField#getFieldType
         */
        getFieldType: function() {
            return "map";
        }//__END_OF_BUILDER_HELPERS
    });

    Alpaca.registerFieldClass("map", Alpaca.Fields.MapField);

    // Additional Registrations
    Alpaca.registerMessages({
        "keyNotUnique": "Keys of map field are not unique."
    });
})(jQuery);
(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.PasswordField = Alpaca.Fields.TextField.extend(
    /**
     * @lends Alpaca.Fields.PasswordField.prototype
     */
    {
        /**
         * @constructs
         * @augments Alpaca.Fields.TextField
         *
         * @class Control for JSON schema password format.
         *
         * @param {Object} container Field container.
         * @param {Any} data Field data.
         * @param {Object} options Field options.
         * @param {Object} schema Field schema.
         * @param {Object|String} view Field view.
         * @param {Alpaca.Connector} connector Field connector.
         * @param {Function} errorCallback Error callback.
         */
        constructor: function(container, data, options, schema, view, connector, errorCallback) {
            this.base(container, data, options, schema, view, connector, errorCallback);
        },

        /**
         * @see Alpaca.Fields.TextField#setup
         */
        setup: function() {
            this.base();
            
            if (!this.schema.pattern) {
                this.schema.pattern = Alpaca.regexps.password;
            }
            
            this.controlFieldTemplate = this.view.getTemplate("controlFieldPassword");
        },

        /**
         * @see Alpaca.Fields.TextField#postRender
         */
        postRender: function() {
            this.base();
			if (this.fieldContainer) {
				this.fieldContainer.addClass('alpaca-controlfield-password');
			}
        },
		        
        /**
         * @see Alpaca.Fields.TextField#handleValidate
         */
        handleValidate: function() {
            var baseStatus = this.base();
            
            var valInfo = this.validation;
            
            if (!valInfo["invalidPattern"]["status"]) {
                valInfo["invalidPattern"]["message"] = this.view.getMessage("invalidPassword");
            }
            
            return baseStatus;
        },//__BUILDER_HELPERS

        /**
         * @private
         * @see Alpaca.Fields.TextField#getSchemaOfSchema
         */
        getSchemaOfSchema: function() {
            var pattern = (this.schema && this.schema.pattern)? this.schema.pattern : /^[0-9a-zA-Z\x20-\x7E]*$/;
            return Alpaca.merge(this.base(), {
                "properties": {
                    "pattern": {
                        "title": "Pattern",
                        "description": "Field Pattern in Regular Expression",
                        "type": "string",
                        "default": this.schema.pattern,
                        "enum":[pattern],
                        "readonly": true
                    },                    
					"format": {
                        "title": "Format",
                        "description": "Property data format",
                        "type": "string",
						"default":"password",
                        "enum":["password"],
						"readonly":true
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.TextField#getOptionsForSchema
         */
		getOptionsForSchema: function() {
            return Alpaca.merge(this.base(),{
				"fields": {
					"format": {
						"type": "text"
					}
				}
			});
        },
        
        /**
         * @see Alpaca.Fields.TextField#getTitle
         */
        getTitle: function() {
            return "Password Field";
        },
        
        /**
         * @see Alpaca.Fields.TextField#getDescription
         */
        getDescription: function() {
            return "Password Field.";
        },

		/**
         * @see Alpaca.Fields.TextField#getFieldType
         */
        getFieldType: function() {
            return "password";
        }//__END_OF_BUILDER_HELPERS
    });
    
    Alpaca.registerTemplate("controlFieldPassword", '<input type="password" id="${id}" {{if options.size}}size="${options.size}"{{/if}} {{if options.readonly}}readonly="readonly"{{/if}} {{if name}}name="${name}"{{/if}} {{each(i,v) options.data}}data-${i}="${v}"{{/each}}/>');
    Alpaca.registerMessages({
        "invalidPassword": "Invalid Password"
    });
    Alpaca.registerFieldClass("password", Alpaca.Fields.PasswordField);
    Alpaca.registerDefaultFormatFieldMapping("password", "password");
})(jQuery);
(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.PersonalNameField = Alpaca.Fields.TextField.extend(
    /**
     * @lends Alpaca.Fields.PersonalNameField.prototype
     */
    {
        /**
         * @constructs
         * @augments Alpaca.Fields.TextField
         *
         * @class Control for upper case text.
         *
         * @param {Object} container Field container.
         * @param {Any} data Field data.
         * @param {Object} options Field options.
         * @param {Object} schema Field schema.
         * @param {Object|String} view Field view.
         * @param {Alpaca.Connector} connector Field connector.
         * @param {Function} errorCallback Error callback.
         */
        constructor: function(container, data, options, schema, view, connector, errorCallback) {
            this.base(container, data, options, schema, view, connector, errorCallback);
        },

        /**
         * @see Alpaca.Fields.TextField#postRender
         */
        postRender: function() {
            this.base();
            if (this.fieldContainer) {
                this.fieldContainer.addClass('alpaca-controlfield-personalname');
            }
        },

        /**
         * @see Alpaca.Fields.TextField#setValue
         */
        setValue: function(val) {
            var upperValue = "";

            for ( var i = 0; i < val.length; i++ ) {
                if ( i == 0 ) {
                    upperValue += val.charAt(i).toUpperCase();
                } else if (val.charAt(i-1) == ' ' ||  val.charAt(i-1) == '-' || val.charAt(i-1) == "'") {
                    upperValue += val.charAt(i).toUpperCase();
                } else {
                    upperValue += val.charAt(i);
                }
            }

            if (upperValue != this.getValue()) {
                this.base(upperValue);
            }
        },

        /**
         * @see Alpaca.ControlField#onKeyPress
         */
        onKeyPress: function(e) {
            this.base(e);

            var _this = this;

            Alpaca.later(25, this, function() {
                var v = _this.getValue();
                _this.setValue(v);
            });
        },//__BUILDER_HELPERS

        /**
         * @see Alpaca.Fields.TextField#getTitle
         */
        getTitle: function() {
            return "Personal Name";
        },

        /**
         * @see Alpaca.Fields.TextField#getDescription
         */
        getDescription: function() {
            return "Text Field for personal name with captical letter for first letter & after hyphen, space or apostrophe.";
        },

        /**
         * @see Alpaca.Fields.TextField#getFieldType
         */
        getFieldType: function() {
            return "personalname";
        }//__END_OF_BUILDER_HELPERS
    });

    Alpaca.registerFieldClass("personalname", Alpaca.Fields.PersonalNameField);

})(jQuery);
(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.PhoneField = Alpaca.Fields.TextField.extend(
    /**
     * @lends Alpaca.Fields.PhoneField.prototype
     */
    {
        /**
         * @constructs
         * @augments Alpaca.Fields.TextField
         *
         * @class Control for standard US phone numbers.
         *
         * @param {Object} container Field container.
         * @param {Any} data Field data.
         * @param {Object} options Field options.
         * @param {Object} schema Field schema.
         * @param {Object|String} view Field view.
         * @param {Alpaca.Connector} connector Field connector.
         * @param {Function} errorCallback Error callback.
         */
        constructor: function(container, data, options, schema, view, connector, errorCallback) {
            this.base(container, data, options, schema, view, connector, errorCallback);
        },

        /**
         * @see Alpaca.Fields.TextField#setup
         */
        setup: function() {
            this.base();

            if (!this.schema.pattern) {
                this.schema.pattern = Alpaca.regexps.phone;
            }

            if (Alpaca.isEmpty(this.options.maskString)) {
                this.options.maskString = "(999) 999-9999";
            }

        },

        /**
         * @see Alpaca.Fields.TextField#postRender
         */
        postRender: function() {
            this.base();
            if (this.fieldContainer) {
                this.fieldContainer.addClass('alpaca-controlfield-phone');
            }
        },

        /**
         * @see Alpaca.Fields.TextField#handleValidate
         */
        handleValidate: function() {
            var baseStatus = this.base();

            var valInfo = this.validation;

            if (!valInfo["invalidPattern"]["status"]) {
                valInfo["invalidPattern"]["message"] = this.view.getMessage("invalidPhone");
            }

            return baseStatus;
        },//__BUILDER_HELPERS

        /**
         * @private
         * @see Alpaca.Fields.TextField#getSchemaOfSchema
         */
        getSchemaOfSchema: function() {
            var pattern = (this.schema && this.schema.pattern) ? this.schema.pattern : Alpaca.regexps.phone;
            return Alpaca.merge(this.base(), {
                "properties": {
                    "pattern": {
                        "title": "Pattern",
                        "description": "Field Pattern in Regular Expression",
                        "type": "string",
                        "default": pattern,
                        "enum":[pattern],
                        "readonly": true
                    },
                    "format": {
                        "title": "Format",
                        "description": "Property data format",
                        "type": "string",
                        "default":"phone",
                        "enum":["phone"],
                        "readonly":true
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.TextField#getOptionsForSchema
         */
        getOptionsForSchema: function() {
            return Alpaca.merge(this.base(), {
                "fields": {
                    "format": {
                        "type": "text"
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.TextField#getSchemaOfOptions
         */
        getSchemaOfOptions: function() {
            return Alpaca.merge(this.base(), {
                "properties": {
                    "maskString": {
                        "title": "Field Mask String",
                        "description": "Expression for field mask",
                        "type": "string",
                        "default": "(999) 999-9999"
                    }
                }
            });
        },

        /**
         * @see Alpaca.Fields.TextField#getTitle
         */
        getTitle: function() {
            return "Phone Field";
        },

        /**
         * @see Alpaca.Fields.TextField#getDescription
         */
        getDescription: function() {
            return "Phone Field.";
        },

        /**
         * @see Alpaca.Fields.TextField#getFieldType
         */
        getFieldType: function() {
            return "phone";
        }//__END_OF_BUILDER_HELPERS
    });

    Alpaca.registerMessages({
        "invalidPhone": "Invalid Phone Number, e.g. (123) 456-9999"
    });
    Alpaca.registerFieldClass("phone", Alpaca.Fields.PhoneField);
    Alpaca.registerDefaultFormatFieldMapping("phone", "phone");
})(jQuery);
(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.TagField = Alpaca.Fields.LowerCaseField.extend(
    /**
     * @lends Alpaca.Fields.TagField.prototype
     */
    {
        /**
         * @constructs
         * @augments Alpaca.Fields.TextField
         *
         * @class Time control for JSON schema time format.
         *
         * @param {Object} container Field container.
         * @param {Any} data Field data.
         * @param {Object} options Field options.
         * @param {Object} schema Field schema.
         * @param {Object|String} view Field view.
         * @param {Alpaca.Connector} connector Field connector.
         * @param {Function} errorCallback Error callback.
         */
        constructor: function(container, data, options, schema, view, connector, errorCallback) {
            this.base(container, data, options, schema, view, connector, errorCallback);
        },

        /**
         * @see Alpaca.Fields.TextField#setup
         */
        setup: function() {
            this.base();

            if (!this.options.separator) {
                this.options.separator = ",";
            }
        },

        /**
         * @see Alpaca.Fields.TextField#postRender
         */
        postRender: function() {
            this.base();
            if (this.fieldContainer) {
                this.fieldContainer.addClass('alpaca-controlfield-tag');
            }
        },

        /**
         * @see Alpaca.Fields.TextField#getValue
         */
        getValue: function() {
            var val = this.base();
            if (val == "") {
                return [];
            }
            return val.split(this.options.separator);
        },

        /**
         * @see Alpaca.Fields.TextField#setValue
         */
        setValue: function(val) {
            if (val == "") {
                return;
            }

            this.base(val.join(this.options.separator));
        },

        /**
         * @see Alpaca.Field#onBlur
         */
        onBlur: function(e) {
            this.base(e);

            var vals = this.getValue();

            var trimmed = [];

            $.each(vals, function(i, v) {
                if (v.trim() != "") {
                    trimmed.push(v.trim());
                }
            });

            this.setValue(trimmed);

        },//__BUILDER_HELPERS

        /**
         * @private
         * @see Alpaca.Fields.TextField#getSchemaOfOptions
         */
        getSchemaOfOptions: function() {
            return Alpaca.merge(this.base(), {
                "properties": {
                    "separator": {
                        "title": "Separator",
                        "description": "Separator used to split tags.",
                        "type": "string",
                        "default":","
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.TextField#getOptionsForOptions
         */
        getOptionsForOptions: function() {
            return Alpaca.merge(this.base(), {
                "fields": {
                    "separator": {
                        "type": "text"
                    }
                }
            });
        },

        /**
         * @see Alpaca.Fields.TextField#getTitle
         */
        getTitle: function() {
            return "Tag Field";
        },

        /**
         * @see Alpaca.Fields.TextField#getDescription
         */
        getDescription: function() {
            return "Text field for entering list of tags separated by delimiter.";
        },

        /**
         * @see Alpaca.Fields.TextField#getFieldType
         */
        getFieldType: function() {
            return "tag";
        }//__END_OF_BUILDER_HELPERS
    });

    Alpaca.registerFieldClass("tag", Alpaca.Fields.TagField);
})(jQuery);
(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.TimeField = Alpaca.Fields.TextField.extend(
    /**
     * @lends Alpaca.Fields.TimeField.prototype
     */
    {
        /**
         * @constructs
         * @augments Alpaca.Fields.TextField
         *
         * @class Time control for JSON schema time format.
         *
         * @param {Object} container Field container.
         * @param {Any} data Field data.
         * @param {Object} options Field options.
         * @param {Object} schema Field schema.
         * @param {Object|String} view Field view.
         * @param {Alpaca.Connector} connector Field connector.
         * @param {Function} errorCallback Error callback.
         */
        constructor: function(container, data, options, schema, view, connector, errorCallback) {
            this.base(container, data, options, schema, view, connector, errorCallback);
        },

        /**
         * @see Alpaca.Fields.TextField#setup
         */
        setup: function() {
            this.base();

            if (!this.options.timeFormat) {
                this.options.timeFormat = "hh:mm:ss";
            }

            if (!this.options.timeFormatRegex) {
                this.options.timeFormatRegex = /^(([0-1][0-9])|([2][0-3])):([0-5][0-9]):([0-5][0-9])$/;
            }

            if (Alpaca.isEmpty(this.options.maskString)) {
                this.options.maskString = "99:99:99";
            }
        },

        /**
         * @see Alpaca.Fields.TextField#postRender
         */
        postRender: function() {
            this.base();
            if (this.fieldContainer) {
                this.fieldContainer.addClass('alpaca-controlfield-time');
            }
        },

        /**
         * @see Alpaca.Field#onChange
         */
        onChange: function(e) {
            this.base();
            this.renderValidationState();
        },

        /**
         * @see Alpaca.Fields.TextField#handleValitime
         */
        handleValidate: function() {
            var baseStatus = this.base();

            var valInfo = this.validation;

            var status = this._validateTimeFormat();
            valInfo["invalidTime"] = {
                "message": status ? "" : Alpaca.substituteTokens(this.view.getMessage("invalidTime"), [this.options.timeFormat]),
                "status": status
            };

            return baseStatus && valInfo["invalidTime"]["status"];
        },

        /**
         * Valitimes time format.
         * @returns {Boolean} True if it is a valid time, false otherwise.
         */
        _validateTimeFormat: function() {
            var value = this.field.val();
            if (!this.schema.required && (Alpaca.isValEmpty(value) || value == "__:__:__")) {
                return true;
            }
            //valitime the time without the help of timepicker.parseTime
            return value.match(this.options.timeFormatRegex);
        },//__BUILDER_HELPERS

        /**
         * @see Alpaca.Fields.TextField#setValue
         */
        setValue: function(val) {
            // skip out if no time
            if (val == "") {
                this.base(val);
                return;
            }

            this.base(val);
        },

        /**
         * @private
         * @see Alpaca.Fields.TextField#getSchemaOfSchema
         */
        getSchemaOfSchema: function() {
            return Alpaca.merge(this.base(), {
                "properties": {
                    "format": {
                        "title": "Format",
                        "description": "Property data format",
                        "type": "string",
                        "default":"time",
                        "enum" : ["time"],
                        "readonly":true
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.TextField#getOptionsForSchema
         */
        getOptionsForSchema: function() {
            return Alpaca.merge(this.base(), {
                "fields": {
                    "format": {
                        "type": "text"
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.TextField#getSchemaOfOptions
         */
        getSchemaOfOptions: function() {
            return Alpaca.merge(this.base(), {
                "properties": {
                    "timeFormat": {
                        "title": "Time Format",
                        "description": "Time format",
                        "type": "string",
                        "default": "hh:mm:ss"
                    },
                    "timeFormatRegex": {
                        "title": "Format Regular Expression",
                        "description": "Regular expression for validation time format",
                        "type": "string",
                        "default": /^(([0-1][0-9])|([2][0-3])):([0-5][0-9]):([0-5][0-9])$/
                    },
                    "maskString": {
                        "default" : "99:99:99"
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.TextField#getOptionsForOptions
         */
        getOptionsForOptions: function() {
            return Alpaca.merge(this.base(), {
                "fields": {
                    "timeFormat": {
                        "type": "text"
                    },
                    "timeFormatRegex": {
                        "type": "text"
                    }
                }
            });
        },

        /**
         * @see Alpaca.Fields.TextField#getTitle
         */
        getTitle: function() {
            return "Time Field";
        },

        /**
         * @see Alpaca.Fields.TextField#getDescription
         */
        getDescription: function() {
            return "Field for time.";
        },

        /**
         * @see Alpaca.Fields.TextField#getFieldType
         */
        getFieldType: function() {
            return "time";
        }//__END_OF_BUILDER_HELPERS
    });

    Alpaca.registerMessages({
        "invalidTime": "Invalid time for format {0}"
    });
    Alpaca.registerFieldClass("time", Alpaca.Fields.TimeField);
    Alpaca.registerDefaultFormatFieldMapping("time", "time");
})(jQuery);
(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.UpperCaseField = Alpaca.Fields.TextField.extend(
    /**
     * @lends Alpaca.Fields.UpperCaseField.prototype
     */
    {
        /**
         * @constructs
         * @augments Alpaca.Fields.TextField
         *
         * @class Control for upper case text.
         *
         * @param {Object} container Field container.
         * @param {Any} data Field data.
         * @param {Object} options Field options.
         * @param {Object} schema Field schema.
         * @param {Object|String} view Field view.
         * @param {Alpaca.Connector} connector Field connector.
         * @param {Function} errorCallback Error callback.
         */
        constructor: function(container, data, options, schema, view, connector, errorCallback) {
            this.base(container, data, options, schema, view, connector, errorCallback);
        },

        /**
         * @see Alpaca.Fields.TextField#postRender
         */
        postRender: function() {
            this.base();
            if (this.fieldContainer) {
                this.fieldContainer.addClass('alpaca-controlfield-uppercase');
            }
        },

        /**
         * @see Alpaca.Fields.TextField#setValue
         */
        setValue: function(val) {
            var upperValue = val.toUpperCase();

            if (upperValue != this.getValue()) {
                this.base(upperValue);
            }
        },

        /**
         * @see Alpaca.ControlField#onKeyPress
         */
        onKeyPress: function(e) {
            this.base(e);

            var _this = this;

            Alpaca.later(25, this, function() {
                var v = _this.getValue();
                _this.setValue(v);
            });
        },//__BUILDER_HELPERS

        /**
         * @see Alpaca.Fields.TextField#getTitle
         */
        getTitle: function() {
            return "Uppercase Text";
        },

        /**
         * @see Alpaca.Fields.TextField#getDescription
         */
        getDescription: function() {
            return "Text field for uppercase text.";
        },

        /**
         * @see Alpaca.Fields.TextField#getFieldType
         */
        getFieldType: function() {
            return "uppercase";
        }//__END_OF_BUILDER_HELPERS
    });

    Alpaca.registerFieldClass("uppercase", Alpaca.Fields.UpperCaseField);
    Alpaca.registerDefaultFormatFieldMapping("uppercase", "uppercase");

})(jQuery);
(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.WysiwygField = Alpaca.Fields.TextAreaField.extend(
    /**
     * @lends Alpaca.Fields.WysiwygField.prototype
     */
    {
        /**
         * @constructs
         * @augments Alpaca.Fields.TextAreaField
         *
         * @class WYSIWYG control for chunk of text.
         *
         * @param {Object} container Field container.
         * @param {Any} data Field data.
         * @param {Object} options Field options.
         * @param {Object} schema Field schema.
         * @param {Object|String} view Field view.
         * @param {Alpaca.Connector} connector Field connector.
         * @param {Function} errorCallback Error callback.
         */
        constructor: function(container, data, options, schema, view, connector, errorCallback) {
            this.base(container, data, options, schema, view, connector, errorCallback);
        },

        /**
         * @see Alpaca.Fields.TextAreaField#setup
         */
        setup: function() {
            this.base();
            this.isWyswygLoaded = false;
        },
        
        /**
         * @see Alpaca.Fields.TextAreaField#postRender
         */
    	postRender: function() {
            this.base();            
			// see if we can render jWysiwyg
            var _this = this;
            var wysiwygOptions = this.options.wysiwyg ? this.options.wysiwyg : {};
			if (this.field.wysiwyg) {
				if (this.options.onDemand && !this.isWyswygLoaded) {
                    this.outerEl.delegate("textarea", "mouseenter", function() {
                        _this.wyswygLoaded = $(this).wysiwyg(wysiwygOptions);
                        _this.isWyswygLoaded = true;
                    });
                    this.outerEl.delegate(".wysiwyg", "mouseleave", function() {
                        _this.wyswygLoaded.wysiwyg('destroy');
                        _this.isWyswygLoaded = false;
                    });
                } else {
                    this.field.wysiwyg(wysiwygOptions);
                    this.isWyswygLoaded = true;
                }
                this.outerEl.delegate(".wysiwyg", "mouseleave", function() {
                    _this.data = _this.getValue();
                    _this.renderValidationState();
                });
			}
			if (this.fieldContainer) {
				this.fieldContainer.addClass('alpaca-controlfield-wysiwyg');
			}
        },//__BUILDER_HELPERS
		
        /**
         * @private
         * @see Alpaca.ControlField#getSchemaOfOptions
         */
        getSchemaOfOptions: function() {
            return Alpaca.merge(this.base(), {
                "properties": {
                    "wysiwyg": {
                        "title": "Editor options",
                        "description": "Options that are supported by the <a href='https://github.com/akzhan/jwysiwyg'>jQuery WYSIWYG plugin</a>.",
                        "type": "any"
                    },
                    "onDemand": {
                        "title": "On Demand",
                        "description": "If true, WYSIWYG editor will only be enabled when the field is hovered.",
                        "type": "boolean",
                        "default": false
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.ControlField#getOptionsForOptions
         */
        getOptionsForOptions: function() {
            return Alpaca.merge(this.base(), {
                "fields": {
                    "wysiwyg": {
                        "type": "any"
                    },
                    "onDemand": {
                        "type": "checkbox",
                        "rightLabel": "Make the editor on-demand?"
                    }
                }
            });
        },

		/**
         * @see Alpaca.Fields.TextAreaField#getTitle
		 */
		getTitle: function() {
			return "Wysiwyg Editor";
		},
		
		/**
         * @see Alpaca.Fields.TextAreaField#getDescription
		 */
		getDescription: function() {
			return "Wysiwyg editor for multi-line text which is based on Akzhan Abdulin's <a href='https://github.com/akzhan/jwysiwyg'>jQuery WYSIWYG plugin</a>.";
		},

		/**
         * @see Alpaca.Fields.TextAreaField#getFieldType
         */
        getFieldType: function() {
            return "wysiwyg";
        }//__END_OF_BUILDER_HELPERS
    });
    
    Alpaca.registerFieldClass("wysiwyg", Alpaca.Fields.WysiwygField);
    
})(jQuery);

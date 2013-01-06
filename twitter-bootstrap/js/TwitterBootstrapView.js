(function($) {

    var Alpaca = $.alpaca;

    Alpaca.styleInjections["twitter-bootstrap"] = {
        "field" : function(targetDiv) {
            targetDiv.addClass('control-group');
        },
        "required" : function(targetDiv) {
            $('<span class="icon-star"></span>').prependTo(targetDiv);
        },
        "error" : function(targetDiv) {
            targetDiv.addClass('control-group error');
        },
        "errorMessage" : function(targetDiv) {
            targetDiv.addClass('');
        },
        "removeError" : function(targetDiv) {
            targetDiv.removeClass('error');
        },
        "container" : function(targetDiv) {
            targetDiv.addClass('');
        },
        "wizardStatusBar" : function(targetDiv) {
            targetDiv.addClass('ui-widget-header ui-corner-all');
        },
        "wizardCurrentStep" : function(targetDiv) {
            targetDiv.addClass('ui-state-highlight ui-corner-all');
        },
        "wizardUnCurrentStep" : function(targetDiv) {
            targetDiv.removeClass('ui-state-highlight ui-corner-all');
        },
        "containerExpandedIcon" : "icon-circle-arrow-down",
        "containerCollapsedIcon" : "icon-circle-arrow-right",
        "commonIcon" : "",
        "addIcon" : "icon-plus-sign",
        "removeIcon" : "icon-minus-sign",
        "upIcon" : "icon-chevron-up",
        "downIcon" : "icon-chevron-down",
        "wizardPreIcon" : "ui-icon-triangle-1-w",
        "wizardNextIcon" : "ui-icon-triangle-1-e",
        "wizardDoneIcon" : "ui-icon-triangle-1-e",
        "buttonBeautifier"  : function(button, iconClass, withText) {
            var buttonText = button.html();
            button.attr("title", buttonText);
            var addedButtonText = withText ? buttonText : "";
            button.empty().append('<i class="alpaca-fieldset-legend-button ' + iconClass + '"></i> ' + addedButtonText + '</span>');
        }
    };

    Alpaca.registerView({
        "id": "VIEW_WEB_EDIT_TWITTER_BOOTSTRAP",
        "parent": 'VIEW_WEB_EDIT',
        "title": "Web Edit View for Twitter Bootstrap",
        "description": "Web edit view for twitter bootstrap.",
        "style":"twitter-bootstrap",
        "templates": {
            "controlFieldLabel": '{{if options.label}}<div class="{{if options.labelClass}}${options.labelClass}{{/if}}"> ${options.label}</div>{{/if}}',
            "controlFieldHelper": '{{if options.helper}}<div class="{{if options.helperClass}}${options.helperClass}{{/if}}"><i class="icon-info-sign"></i> <span class="alpaca-controlfield-helper-text">${options.helper}</span></div>{{/if}}',
            "controlFieldMessage": '<div><span class="icon-exclamation-sign"></span><span class="alpaca-controlfield-message-text help-inline">${message}</span></div>',
            "arrayToolbar":'<span class="alpaca-fieldset-array-toolbar"><button class="btn btn-small alpaca-fieldset-array-toolbar-icon alpaca-fieldset-array-toolbar-add">${addItemLabel}</button></span>',
            "arrayItemToolbar": '<div class="btn-toolbar alpaca-fieldset-array-item-toolbar"><div class="btn-group"><button class="btn btn-small alpaca-fieldset-array-item-toolbar-icon alpaca-fieldset-array-item-toolbar-add">${addItemLabel}</button><button class="btn btn-small alpaca-fieldset-array-item-toolbar-icon alpaca-fieldset-array-item-toolbar-remove">${removeItemLabel}</button><button class="btn btn-small alpaca-fieldset-array-item-toolbar-icon alpaca-fieldset-array-item-toolbar-up">${moveUpItemLabel}</button><button class="btn btn-small alpaca-fieldset-array-item-toolbar-icon alpaca-fieldset-array-item-toolbar-down">${moveDownItemLabel}</button></div></div>',
            "controlFieldCheckbox": '<span>{{if options.rightLabel}}<label for="${id}" class="checkbox">{{/if}}<input type="checkbox" id="${id}" {{if options.readonly}}readonly="readonly"{{/if}} {{if name}}name="${name}"{{/if}} {{each(i,v) options.data}}data-${i}="${v}"{{/each}}/>{{if options.rightLabel}}${options.rightLabel}</label>{{/if}}</span>',
            "controlFieldRadio": '<div id="${id}" class="alpaca-controlfield-radio">{{if !required}}<label class="alpaca-controlfield-radio-label radio inline"><input type="radio" {{if options.readonly}}readonly="readonly"{{/if}} name="${name}" value=""/>None</label>{{/if}}{{each selectOptions}}<label class="alpaca-controlfield-radio-label radio inline"><input type="radio" {{if options.readonly}}readonly="readonly"{{/if}} name="${name}" value="${value}" {{if value == data}}checked="checked"{{/if}}/>${text}</label>{{/each}}</div>'
        },
        "render": function(field, renderedCallback) {

            field.render(function(field) {

                $('select,input[type=text], textarea', field.outerEl).addClass('input-xlarge');
                $('input:submit, input:reset, .alpaca-form-button').addClass('btn').removeClass('alpaca-form-button');

                // Inject addon icon to phone/email field
                /*
                $('.alpaca-controlfield-phone', field.outerEl).addClass('input-prepend').prepend('<span class="add-on">&#9990;</span>')
                $('.alpaca-controlfield-email', field.outerEl).addClass('input-prepend').prepend('<span class="add-on"><i class="icon-envelope"></i></span>')
                $('.alpaca-controlfield-time', field.outerEl).addClass('input-prepend').prepend('<span class="add-on"><i class="icon-time"></i></span>')
                $('.alpaca-controlfield-date', field.outerEl).addClass('input-prepend').prepend('<span class="add-on"><i class="icon-calendar"></i></span>')
                */

                if (renderedCallback) {
                    renderedCallback(field);
                }
            });

        }
    });

})(jQuery);
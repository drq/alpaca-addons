(function($) {

    var Alpaca = $.alpaca;

    Alpaca.styleInjections["twitter-bootstrap"] = {
        "field" : function(targetDiv) {
            targetDiv.addClass('control-group');
        },
        "required" : function(targetDiv) {
            $('<span class="ui-icon ui-icon-star icon-star"></span>').prependTo(targetDiv);
        },
        "error" : function(targetDiv) {
            targetDiv.addClass('ui-state-error control-group error');
        },
        "errorMessage" : function(targetDiv) {
            targetDiv.addClass('ui-state-error-text');
        },
        "removeError" : function(targetDiv) {
            targetDiv.removeClass('error');
        },
        "container" : function(targetDiv) {
            targetDiv.addClass('ui-widget-content');
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
        "containerExpandedIcon" : "ui-icon-circle-arrow-s",
        "containerCollapsedIcon" : "ui-icon-circle-arrow-e",
        "commonIcon" : "ui-icon",
        "addIcon" : "ui-icon-circle-plus",
        "removeIcon" : "ui-icon-circle-minus",
        "upIcon" : "ui-icon-circle-arrow-n",
        "downIcon" : "ui-icon-circle-arrow-s",
        "wizardPreIcon" : "ui-icon-triangle-1-w",
        "wizardNextIcon" : "ui-icon-triangle-1-e",
        "wizardDoneIcon" : "ui-icon-triangle-1-e",
        "buttonBeautifier"  : function(button, iconClass, withText) {
            button.addClass("ui-button ui-widget ui-state-default ui-corner-all");
            if (withText) {
                button.addClass("ui-button-text-icon-primary");
            } else {
                button.addClass("ui-button-icon-only");
            }
            var buttonText = button.html();
            button.attr("title", buttonText);
            button.empty().append('<span class="ui-button-icon-primary ui-icon alpaca-fieldset-legend-button ' + iconClass + '"></span><span class="ui-button-text">' + buttonText + '</span>');
            button.hover(function() {
                if (!button.hasClass("alpaca-fieldset-array-item-toolbar-disabled")) {
                    $(this).addClass("ui-state-hover");
                }
            }, function() {
                if (!button.hasClass("alpaca-fieldset-array-item-toolbar-disabled")) {
                    $(this).removeClass("ui-state-hover");
                }
            });
        }
    };

    Alpaca.registerView({
        "id": "VIEW_WEB_EDIT_TWITTER_BOOTSTRAP",
        "parent": 'VIEW_WEB_EDIT',
        "title": "Web Edit View for Twitter Bootstrap",
        "description": "Web edit view for twitter bootstrap.",
        "style":"twitter-bootstrap",
        "templates": {
            "controlFieldMessage": '<div><span class="icon-warning-sign"></span><span class="alpaca-controlfield-message-text help-inline">${message}</span></div>'
        },
        "render": function(field, renderedCallback) {

            field.render(function(field) {

                $('select,input[type=text], textarea', field.outerEl).addClass('input-xlarge');

                if (renderedCallback) {
                    renderedCallback(field);
                }
            });

        }
    });

})(jQuery);
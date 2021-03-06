var validateMeta = function(pluginId, owner, name, baseUrl) {
    checkId(pluginId, owner, name, baseUrl)
};

var tooltip = function(selector, title) {
    $(selector)
        .attr('data-toggle', 'tooltip')
        .attr('data-placement', 'right')
        .attr('title', title);
    $('[data-toggle="tooltip"]').tooltip();
};

var removeSpinner = function(selector) {
    $(selector).removeClass('fa-spinner fa-spin');
};

var success = function(selector) {
    removeSpinner(selector);
    $(selector).addClass('fa-check-circle');
};

var failed = function(selector, message) {
    removeSpinner(selector);
    $(selector).addClass('fa-times-circle');
    tooltip(selector, message);
};

var checkId = function(pluginId, owner, name, baseUrl) {
    $.ajax({
        url: baseUrl + '/api/projects/search?pluginId=' + pluginId,
        statusCode: {
            404: function() {
                success('.id-status');
                checkName(owner, name, true, baseUrl);
            },
            200: function() {
                failed('.id-status', 'That plugin ID is not available!');
                checkName(owner, name, false, baseUrl);
            }
        }
    })
};

var checkName = function(owner, name, idSuccess, baseUrl) {
    if (name.length > 25) {
        failed('.name-status', 'This name is too long. Please rename your project to something under 25 characters.');
        updateContinueButton(idSuccess, false);
        return;
    }

    $.ajax({
        url: baseUrl + '/' + owner + '/' + name,
        statusCode: {
            404: function() {
                success('.name-status');
                updateContinueButton(idSuccess, true);
            },
            200: function() {
                failed('.name-status', 'You already have a project of this name!');
                updateContinueButton(idSuccess, false);
            }
        }
    });
};

var updateContinueButton = function(idSuccess, nameSuccess) {
    if (idSuccess && nameSuccess) {
        $('.continue-btn').prop('disabled', false);
    }
};

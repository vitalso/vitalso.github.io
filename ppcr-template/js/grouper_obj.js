let objGrouper = {
    validated : false,
    updated : false,
    result: {},
    init: function()
    {
        this.wizard();
        this.export();
    },
    export: function() {
        $('#export').click(function(e) {
            e.preventDefault();

            objGrouper.exportGroups();
        });
    },
    wizard: function()
    {
        $('#wizard').steps({
            headerTag: 'a',
            onFinished: function(event, currentIndex)
            {
                //console.log('Finished');

                window.location.href = document.URL;
            },
            onStepChanging: function(event, currentIndex, newIndex)
            {
                if (newIndex < currentIndex) {
                    return true;
                }

                switch (newIndex) {
                    case 1:
                        return objGrouper.validateSettings();
                    case 2:
                        return objGrouper.collectUpdatedGroups();
                    case 3:
                        return objGrouper.updateGroups();
                }

                return true;
            }
        });
    },
    validateSettings()
    {
        if (objGrouper.validated) {
            objGrouper.validated = false;

            return true;
        }

        let data = $('#regroup_form').serializeArray();

        $('#page-overlay').show();

        $.ajax({
            url: '/keyword-grouper/generate',
            type: 'POST',
            data: {
                data: data,
            },
            success: function (result)
            {
                //console.log(result);

                $('#page-overlay').hide();

                objGrouper.validated = result.success;

                $('.has-error').removeClass('has-error');
                $('.error-container').html('').hide();

                if (objGrouper.validated) {

                    objGrouper.result['adGroup'] = result['adGroup'];
                    objGrouper.result['settings'] = result['settings'];
                    objGrouper.result['grouper'] = result['grouper'];

                    $('#wizard').steps('next');

                    objGrouper.makePreviewPage();
                } else {
                    if (result.errors) {
                        let message;

                        for (const [key, errors] of Object.entries(result.errors)) {

                            message = '';
                            for (const [, val] of Object.entries(errors)) {
                                message += val;
                            }

                            $('#' + key).addClass('has-error');
                            $('#' + key + '-error').html(message).show();
                        }
                    }
                }
            },
            error: function (xhr, status, error) {
                //console.log(status);
                //console.log(error);
                //console.log(xhr);
            }
        });

        return false;
    },
    makePreviewPage()
    {
        if (objGrouper.result['adGroup']) {
            $('#existingAdGroupName').html(objGrouper.result['adGroup']['name']);
        }

        let length = 0;
        objGrouper.result['grouper']['groups'].forEach(function(item) {
            if (item.type === 'grouped') {
                length++;
            }
        });

        $('#existingAdGroupLength').html(objGrouper.result['grouper']['keywordsCount']);
        $('#newAdGroupsNumber').html(length);

        let groupsContainer = $('#js-groups'),
            notGroupedPhrasesContainer = $('#js-phrases > div'),
            groupsHtml = '',
            notGroupedPhrasesHtml = '',
            index = 1;

        if (groupsContainer.length) {
            for (const [, group] of Object.entries(objGrouper.result['grouper'].groups)) {
                if (group.type === 'grouped') {
                    groupsHtml += objGrouper.getGroupHtml(group, index);

                    index++;
                }
            }

            groupsContainer.html(groupsHtml);
        }

        if (notGroupedPhrasesContainer.length) {
            for (const [, phrase] of Object.entries(objGrouper.result['grouper']['notGroupedPhrases'])) {
                notGroupedPhrasesHtml += objGrouper.getPhraseHtml(phrase, 'draggable');
            }

            notGroupedPhrasesContainer.html(notGroupedPhrasesHtml);
        }

        $('.sortable').sortable({
            revert: true,
            cursor: 'move',
            items: '.drag-element',
            connectWith: '.sortable',
            stop: function() {
                objGrouper.checkDrags();
            },
            receive: function(event, ui) {
                //
            }
        });
    },
    checkDrags()
    {
        let newAdGroupsNumber = 0;
        $('.drag-group').find('.drag-card').each(function(i) {
            $(this).find('.group-number').text('Ad Group ' + ++i);
            $(this).attr('id', 'drag-card-id-' + ++i)

            let number = $(this).find('.drag-element').length;

            $(this).find('.group-size').html(number);

            newAdGroupsNumber++;
        });

        $('#newAdGroupsNumber').html(newAdGroupsNumber);
    },
    collectUpdatedGroups()
    {
        let groupsContainer = $('#js-groups'),
            notGroupedPhrasesContainer = $('#js-phrases > div'),
            groups = [],
            groupedPhrases = [],
            notGroupedPhrases = [],
            keyword, matchType, isNegative;

        notGroupedPhrasesContainer.find('.title').each(function() {
            notGroupedPhrases.push($(this).html().trim());
        });

        //console.log(objGrouper.result.settings);

        groupsContainer.find('.drag-card').each(function() {
            let name = $(this).find('.group-title').find('span.value').html().trim(),
                phrases = [];

            $(this).find('.title').each(function() {

                matchType = $(this).attr('data-match-type');
                isNegative = !!($(this).closest('.negative-list').length);
                matchType = typeof matchType === 'undefined' ? 'broad' : matchType;

                keyword = {
                    'match_type': matchType,
                    'is_negative': isNegative,
                    'decorated': $(this).html().trim()
                };

                phrases.push(keyword);
            });

            //console.log(phrases);

            groups.push({
                'name':             name,
                'adGroupStatus':    objGrouper.result.settings['newAdGroupStatusName'],
                'keywordStatus':    objGrouper.result.settings['newKeywordStatusName'],
                'adStatus':         objGrouper.result.settings['newAdStatusName'],
                'keywordsCount':    phrases.length,
                'adsCount':         objGrouper.result.settings['copyAds'] && objGrouper.result['adGroup']
                                        ? objGrouper.result['adGroup'].adsCount
                                        : 0,
                'maxCpc':           objGrouper.result.settings['maxCpc'],
                'phrases':          phrases
            });

            //console.log(phrases);

            groupedPhrases = groupedPhrases.concat(phrases);
        });

        //console.log(groupedPhrases);

        objGrouper.result['updated'] = {
            groups: groups,
            groupedPhrases: groupedPhrases,
            notGroupedPhrases: notGroupedPhrases,
        };

        if (groups.length > 0) {

            objGrouper.makeConfirmPage();

            return true;
        }

        return false;
    },
    makeConfirmPage()
    {
        let alertsContainer = $('#js-confirm-alerts'),
            summaryContainer = $('#js-confirm-summary'),
            alerts = [],
            tables = [],
            rows, table;

        alertsContainer.html('');
        summaryContainer.html('');

        //console.log(objGrouper.result);

        if (objGrouper.result.adGroup) {
            alerts.push(
                'Split the existing <strong>Ad Group “' + objGrouper.result.adGroup.name + '”</strong> ' +
                'containing <strong>' + objGrouper.result.adGroup.keywordsCount + ' keywords</strong> ' +
                'in <strong>' + objGrouper.result.updated.groups.length + ' new Ad Groups</strong> '
            );

            rows = objGrouper.getSummaryExistingTableRowHtml(objGrouper.result.adGroup);
            table = objGrouper.getSummaryExistingTableHtml('Summary for the existing Ad Group', rows);

            tables.push(table);
        }

        alerts.push('Create ' + objGrouper.result.updated.groups.length + ' New Ad Groups (please find all details in the table below).');
        alerts.push(
            (objGrouper.result.settings['pauseNewKeywords'] ? 'Pause' : 'Delete') +
            ' ' +
            objGrouper.result.updated.groupedPhrases.length +
            ' keywords in the existing Ad groups.'
        );

        rows = '';
        objGrouper.result.updated.groups.forEach(function(group) {
            rows += objGrouper.getSummaryNewTableRowHtml(group);
        });

        table = objGrouper.getSummaryNewTableHtml(
            'Summary for the New Ad Groups (' + objGrouper.result.updated.groups.length + ')',
            rows
        );

        alerts.forEach(function(item) {
            alertsContainer.append(objGrouper.getAlertHtml(item));
        });

        tables.push(table);

        tables.forEach(function(table) {
            summaryContainer.append(table);
        });

        return true;
    },
    updateGroups()
    {
        if (objGrouper.updated) {
            objGrouper.updated = false;

            return true;
        }

        $('#page-overlay').show();

        //console.log(objGrouper.result.updated.groups);

        $.ajax({
            url: '/keyword-grouper/update',
            type: 'POST',
            data: {
                groups: objGrouper.result.updated.groups,
                settings: objGrouper.result.settings
            },
            success: function (result)
            {
                $('#page-overlay').hide();

                objGrouper.updated = result.success;

                if (objGrouper.updated) {
                    $('#wizard').steps('next');
                }
            }
        });
    },
    exportGroups: function()
    {
        $('#page-overlay').show();

        //console.log(objGrouper.result);

        let data = {
            settings: objGrouper.result.settings,
            grouper: objGrouper.result.grouper,
            //format: 'csv'
        };

        $.ajax({
            url: '/keyword-grouper/export',
            type: 'POST',
            data: data,
            success: function (result)
            {
                //console.log(result);


                $('#page-overlay').hide();
                $('#wizard-p-2').hide();
                $('#wizard-p-3').show();
                //$("#wizard").steps("setStep", 3);
            }
        });
    },
    getSummaryExistingTableHtml: function(title, rows)
    {
        return '' +
            '<div class="summary">' +
                '<strong>' + title + '</strong>' +
                '<table class="table">' +
                    '<thead>' +
                        '<tr>' +
                            '<th>Ad Group</th>' +
                            '<th>Ad Status</th>' +
                            '<th>Keywords</th>' +
                            '<th>Keyword status</th>' +
                            '<th>Keyword Max CPC</th>' +
                            '<th>Ads</th>' +
                        '</tr>' +
                    '</thead>' +
                    '<tbody>' + rows + '</tbody>' +
                '</table>' +
            '</div>';
    },
    getSummaryExistingTableRowHtml: function(group)
    {
        //console.log(group);

        let adBtnClass      = group['adStatus'] === 'ENABLED'       ? 'btn-primary' : 'btn-warning', // the same as keywordStatus !!!
            keywordBtnClass = group['keywordStatus'] === 'ENABLED'  ? 'btn-primary' : 'btn-warning';

        return '' +
            '<tr>' +
            '<td>' + group['name'] + '</td>' +
            '<td><button type="button" class="btn  btn-xs ' + adBtnClass + '">' + group['adStatus'] + '</button></td>' +
            '<td>' + group['keywordsCount'] + ' keywords</td>' +
            '<td><button type="button" class="btn  btn-xs ' + keywordBtnClass + '">' + group['keywordStatus'] + '</button></td>' +
            '<td>' + group['maxCpc'] + ' EUR</td>' +
            '<td>' + group['adsCount'] + '</td>' +
            '</tr>';
    },
    getSummaryNewTableHtml: function(title, rows)
    {
        return '' +
            '<div class="summary">' +
                '<strong>' + title + '</strong>' +
                '<table class="table">' +
                    '<thead>' +
                        '<tr>' +
                            '<th>Ad Group</th>' +
                            '<th>Ad Group Status</th>' +
                            '<th>Keywords</th>' +
                            '<th>Keyword status</th>' +
                            '<th>Ad status</th>' +
                            '<th>Keyword Max CPC</th>' +
                            '<th>Ads</th>' +
                        '</tr>' +
                    '</thead>' +
                    '<tbody>' + rows + '</tbody>' +
                '</table>' +
            '</div>';
    },
    getSummaryNewTableRowHtml: function(group)
    {
        let adBtnClass      = group['adStatus']         === 'ENABLED' ? 'btn-primary' : 'btn-warning',
            adGroupBtnClass = group['adGroupStatus']    === 'ENABLED' ? 'btn-primary' : 'btn-warning',
            keywordBtnClass = group['keywordStatus']    === 'ENABLED' ? 'btn-primary' : 'btn-warning';

        return '' +
            '<tr>' +
                '<td>' + group['name'] + '</td>' +
                '<td><button type="button" class="btn  btn-xs ' + adGroupBtnClass + '">' + group['adGroupStatus'] + '</button></td>' +
                '<td>' + group['keywordsCount'] + ' keywords</td>' +
                '<td><button type="button" class="btn  btn-xs ' + keywordBtnClass + '">' + group['keywordStatus'] + '</button></td>' +
                '<td><button type="button" class="btn  btn-xs ' + adBtnClass + '">' + group['adStatus'] + '</button></td>' +
                '<td>' + group['maxCpc'] + ' EUR</td>' +
                '<td>' + group['adsCount'] + '</td>' +
            '</tr>';
    },
    getAlertHtml: function(text)
    {
        return '' +
            '<div class="alert alert-success">' + 
                '<i class="fa fa-check" aria-hidden="true"></i>' +
                '<p>' + text + '</p>' +
            '</div>';
    },
    getPhraseHtml: function (phrase, additionalClass)
    {
        return '' +
            '<div class="drag-element parent-remove ' + additionalClass + '">' +
                '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                    '<path d="M8.46563 1.87303C8.64792 2.05683 8.6467 2.35364 8.46291 2.53594C8.3715 2.62659 8.25213 2.67185 8.13284 2.67188C8.01223 2.67188 7.89166 2.62563 7.8 2.53322L6.35501 1.0763C6.26623 0.986789 6.14845 0.9375 6.02344 0.9375C5.89842 0.9375 5.78065 0.986789 5.69189 1.0763L4.24687 2.53322C4.06458 2.71702 3.76779 2.71823 3.58397 2.53594C3.40017 2.35364 3.39893 2.05683 3.58125 1.87303L5.02624 0.416109C5.2924 0.147773 5.64654 0 6.02344 0C6.40034 0 6.75448 0.147773 7.02063 0.416109L8.46563 1.87303ZM7.8 9.46678L6.35501 10.9237C6.26623 11.0132 6.14845 11.0625 6.02344 11.0625C5.89842 11.0625 5.78065 11.0132 5.69189 10.9237L4.24687 9.46678C4.06458 9.28298 3.76779 9.28176 3.58397 9.46406C3.40017 9.64636 3.39893 9.94317 3.58125 10.127L5.02624 11.5839C5.2924 11.8522 5.64654 12 6.02344 12C6.40034 12 6.75448 11.8522 7.02063 11.5839L8.46563 10.127C8.64792 9.94317 8.6467 9.64636 8.46291 9.46406C8.27909 9.28174 7.9823 9.28298 7.8 9.46678ZM2.53322 4.22344C2.71702 4.04114 2.71826 3.74433 2.53594 3.56053C2.35362 3.37673 2.05685 3.37552 1.87303 3.55781L0.416109 5.0028C0.147773 5.26896 0 5.6231 0 6C0 6.3769 0.147773 6.73104 0.416109 6.9972L1.87303 8.44219C1.96444 8.53284 2.0838 8.57812 2.2031 8.57812C2.32371 8.57812 2.4443 8.53186 2.53594 8.43947C2.71823 8.25567 2.71702 7.95886 2.53322 7.77656L1.0763 6.33157C0.986789 6.24279 0.9375 6.12502 0.9375 6C0.9375 5.87498 0.986789 5.75721 1.0763 5.66845L2.53322 4.22344ZM11.5839 5.0028L10.127 3.55781C9.94315 3.37552 9.64636 3.37671 9.46406 3.56053C9.28176 3.74433 9.28298 4.04114 9.46678 4.22344L10.9237 5.66843C11.0132 5.75721 11.0625 5.87498 11.0625 6C11.0625 6.12502 11.0132 6.24279 10.9237 6.33155L9.46678 7.77656C9.28298 7.95886 9.28174 8.25567 9.46406 8.43947C9.5557 8.53188 9.67627 8.57812 9.79688 8.57812C9.91617 8.57812 10.0356 8.53284 10.1269 8.44219L11.5839 6.9972C11.8522 6.73104 12 6.3769 12 6C12 5.6231 11.8522 5.26896 11.5839 5.0028ZM6.02344 7.64062C5.1188 7.64062 4.38281 6.90464 4.38281 6C4.38281 5.09536 5.1188 4.35938 6.02344 4.35938C6.92808 4.35938 7.66406 5.09536 7.66406 6C7.66406 6.90464 6.92808 7.64062 6.02344 7.64062ZM6.02344 6.70312C6.41114 6.70312 6.72656 6.3877 6.72656 6C6.72656 5.6123 6.41114 5.29688 6.02344 5.29688C5.63573 5.29688 5.32031 5.6123 5.32031 6C5.32031 6.3877 5.63573 6.70312 6.02344 6.70312Z" fill="#1AB394" />' +
                '</svg>' +
                '<span class="title">' + phrase + '</span>' +
                '<a href="#" class="remove-group">' +
                    '<i class="fa fa-trash"></i>' +
                '</a>' +
            '</div>';
    },
    getGroupHtml: function(group, index)
    {
        let phrases = '',
            negativePhrases = '',
            additionalClass = '';

        for (const [, item] of Object.entries(group['cleaned'])) {

            //console.log(item);

            additionalClass = 'ui-state-default';

            if (item.isNegative) {
                additionalClass += ' negative-element';
            }

            if (item.isNegative) {
                negativePhrases += objGrouper.getPhraseHtml(item.keyword, additionalClass);
            } else {
                phrases += objGrouper.getPhraseHtml(item.keyword, additionalClass);
            }
        }

        return '' +
            '<div class="drag-card parent-remove">' +
                '<div class="drag-top-info">' +
                    '<span class="group-number-container">' +
                        '<span class="group-number">Ad Group ' + index + '</span> ' +
                        '<span class="group-is_focus">' + (group.isFocus ? '*' : '') + '</span> ' +
                        '(<span class="group-size">' + group.count + '</span>)' +
                    '</span>' +
                    '<h4 class="group-title">' +
                        '<span class="value">' + group.name + '</span>' +
                        '<div class="editing-title-area"></div>' +
                    '</h4>' +
                    '<a href="#" class="edit">' +
                        '<i class="fa fa-pencil-square-o"></i>' +
                    '</a>' +
                    '<a href="#modal-delete-negative-keyword" data-toggle="modal" data-target="#modal-delete-negative-keyword" class="remove-group">' +
                        '<i class="fa fa-trash"></i>' +
                    '</a>' +
                '</div>' +

                '<div class="drag-mid-info">' +
                    '<span class="drag-info">Proposed keyword</span>' +
                    '<div class="drag-list sortable">' +
                        phrases +
                        '<div class="negative-list">' + negativePhrases + '</div>' +
                    '</div>' +
                '</div>' +

                '<div class="drag-bot-info">' +
                    '<a href="#modal-add-keyword" data-toggle="modal" data-target="#modal-add-keyword" class="add-keyword">+ Add keyword</a>' +
                    '<a href="#modal-add-negative-keyword" data-toggle="modal" data-target="#modal-add-negative-keyword" class="add-negative-keyword">+ Add negative keyword</a>' +
                '</div>' +
            '</div>';
    }
};

$(document).ready(function() {

    $.fn.steps.setStep = function (step)
    {
        let currentIndex = $(this).steps('getCurrentIndex');
        for(let i = 0; i < Math.abs(step - currentIndex); i++){
            if(step > currentIndex) {
                $(this).steps('next');
            }
            else{
                $(this).steps('previous');
            }
        }
    };

    objGrouper.init();
});


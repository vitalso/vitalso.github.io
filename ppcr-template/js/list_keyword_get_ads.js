let isTableKeywords = $('#table-keywords').length,
    isTableSearchTerms = $('#table-search-terms').length;

if (isTableKeywords || isTableSearchTerms) {
    $('.get-ads').click(function (e) {
        e.preventDefault();

        let keywordId = $(this).data('keyword-id'),
            adGroupId = $(this).data('ad-group-id'),
            container = $(this).closest('tr');

        if (container.hasClass('opened')) {
            container.removeClass('opened');

            $('table').find('.footable-row-detail').remove();
        } else {
            $.ajax({
                url: '/keyword/ads',
                type: 'POST',
                data: {
                    keywordId: keywordId,
                    adGroupId: adGroupId
                },
                dataType: 'json',
                success: function (data) {

                    console.log(data);

                    let colspan = isTableKeywords ? 3 : 6;

                    container.addClass('opened');

                    let cols = [
                        'headline',
                        'description1',
                        'description2',
                        'headline1',
                        'headline2',
                        'description',
                        'path1',
                        'path2',
                    ];

                    let html = '';
                    for (const [key, item] of Object.entries(data)) {
                        if(item.ad_type != '') {
                            html += '<tr class="footable-row-detail">';
                            html += '<td colspan="' + colspan + '"></td>';
                            html += '<td colspan="9" class="ppcr-tbl-section-td-border-left-one">';

                            html += '<table class="table no-border-top">';
                            html += '<thead>';
                            html += '<th class="col-md-1">ID: ' + item.ad_id + '</th>';
                            html += '<th class="col-md-3">' + item.ad_type + '</th>';
                            html += '<th class="col-md-1">Exact Keyword</th>';
                            html += '<th class="col-md-1">Keyword Match (%)</th>';
                            html += '</tr>';
                            html += '</thead>';
                            html += '<tbody>';
                            html += '<tr>';

                            cols.forEach(function (name) {
                                let property = item[name];

                                if (property) {

                                    if (property.similarity >= 80) {
                                        var matchIcon = ' <i class="fa fa-trophy"></i>';
                                        var matchColor = 'text-navy';
                                    } else if (property.similarity <= 30) {
                                        var matchIcon = ' <i class="fa fa-flash"></i>';
                                        var matchColor = 'text-danger';
                                    } else {
                                        var matchIcon = ' <i class="fa fa-warning"></i>';
                                        var matchColor = 'text-warning';
                                    }

                                    if (typeof property === 'object') {

                                        var match = property.isIncluded ? '' : '<div class="pull-left" style="width:45px;">' + property.similarity.toFixed(1) + '%' + '</div><div class="pull-left text-center" style="width:20px;">' + matchIcon + '</div>';

                                        html += '<td>';
                                        html += name;
                                        html += '</td>';
                                        html += '<td>';
                                        html += property.value;
                                        html += '</td>';
                                        html += '<td>';
                                        html += property.isIncluded ? '<span class="text-navy">Included</span> <i class="fa fa-check-circle text-navy"></i>' : 'Not included';
                                        html += '</td>';
                                        html += '<td class="' + matchColor + '">';
                                        html += match;
                                        html += '</td>';
                                    } else {
                                        html += property;
                                    }

                                    html += '</tr>';

                                }
                            });

                            html += '</tbody>';
                            html += '</table>';

                            html += '</td>';
                            html += '<td class="ppcr-tbl-section-td-border-left-two text-center">' + item.clicks + '</td>';
                            html += '<td class="text-center">' + item.conversions + '</td>';
                            html += '</tr>';
                        }
                    }

                    $('table').find('.footable-row-detail').remove();

                    container.after(html);
                },
                error: function (xhr, status, error) {
                    console.log(status);
                    console.log(error);
                    console.log(xhr);
                }
            });
        }
    })
}
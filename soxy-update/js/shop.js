function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getFiltersUrl() {


    return buildFiltersUrl();
}

function buildFiltersUrl() {

    let q = getParameterByName('q');

    return (
        "?" +
        $("#filters-form").serialize() +
        "&sort=" +
        $("#filters-sort").val() + (q != null ? '&q=' + q : '')
    );
}

$(function () {
    $("#searchBrand").on("keyup", function () {
        if ($(this).val().length >= 3) {
            $.post(
                "/ajax/brands/search",
                {
                    brand: $(this).val(),
                    brands_filter: brands_filter,
                    url_prefix: url_prefix,
                    url_suffix: url_suffix,
                },
                function (data) {
                    $("#brandsNav").html("");
                    $.each(data.data, function (i, val) {
                        $("#brandsNav").append(
                            '<li class="list-styled-item mw-100"><a class="list-styled-link d-flex mw-100 collection__navlink" href="' +
                                val.url +
                                '"><span class="name">' +
                                val.name +
                                '</span><span class="ml-auto pt-1 px-4 px-md-2 px-md-4 font-size-xxs text-muted">' +
                                val.count +
                                "</span></a></li>"
                        );
                    });
                }
            );
        }
    });

    $("#searchBrand").on("search", function () {
        /*
        $.post('/ajax/brands/search', {brand: $(this).val(), brands_filter: brands_filter, url_prefix: url_prefix, url_suffix: url_suffix}, function(data){
            $('#brandsNav').html('');
            $.each(data.data, function(i,val){
                $('#brandsNav').append('<li class="list-styled-item mw-100"><a class="list-styled-link d-flex mw-100 collection__navlink" href="' + val.url + '"><span class="name">' + val.name + '</span><span class="ml-auto pt-1 px-4 px-md-2 px-md-4 font-size-xxs text-muted">' + val.count + '</span></a></li>');
            });
        });*/
    });


});

var preventSubmit = function (event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        return false;
    }
};
$("#searchBrand").on("keypress", preventSubmit);
$("#searchBrand").on("keydown", preventSubmit);
$("#searchBrand").on("keyup", preventSubmit);

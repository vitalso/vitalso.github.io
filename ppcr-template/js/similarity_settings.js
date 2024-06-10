
$(".select2_demo_2").select2();

/* Similarity settings */

const $languageId = $('#languageId');
if ($languageId.length) {
    setLists($languageId.val());
    $languageId.change(function () {
        let languageId = $(this).val();

        setLists(languageId);
    });
}

toggleStopWords();
$('#useStopWords').change(function() {
    toggleStopWords();
});

function toggleStopWords() {
    let checked = $('#useStopWords').is(':checked');

    if (checked) {
        $('#languageIdContainer').show();
        $('#listsIdsContainer').show();
    } else {
        $('#languageIdContainer').hide();
        $('#listsIdsContainer').hide();
    }
}

function setLists(languageId)
{
    let lists = JSON.parse($('#lists').html()),
        selectedIds = JSON.parse($('#selectedListsIds').html()),
        listsIdsContainer = $('#listsIds'),
        options = [];

    selectedIds.forEach(function(value, key) {
        selectedIds[key] = parseInt(value);
    });

    lists.forEach(function(item) {
        if (parseInt(languageId) === parseInt(item.similarity_language_id)) {
            options.push(item);
        }
    });

    let html = '';
    options.forEach(function(option) {
        if (selectedIds.includes(option.id)) {
            html += '<option value="' + option.id + '" selected="selected">' + option.name + '</option>';
        } else {
            html += '<option value="' + option.id + '">' + option.name + '</option>';
        }
    });

    listsIdsContainer.html(html);
    listsIdsContainer.select2();
}



/* Similarity stop words languages */

const similarityLanguages = $('#similarity_languages');
if (similarityLanguages.length) {
    setSimilarityLanguages();
}

function setSimilarityLanguages() {
    let list = [];
    $('#list_stop_word_language').find('button').each(function (key, item) {
        let $item = $(item),
            id = $item.attr('data-id'),
            name = $item.attr('data-name').trim();

        list.push({
            id: id,
            name: name
        });
    });

    similarityLanguages.val(JSON.stringify(list));
}

$('#add_btn_language').click(function () {
    let input = $('#add_stop_word_language'),
        name = input.val().trim(),
        html;

    input.val('');

    if (name) {
        html =
            '<li class="list-group-item">' +
            '<button ' +
            'data-id="0" ' +
            'data-name="' + name + '" ' +
            'class="btn btn-danger btn-xs listelement pull-right delete_btn_language"' +
            '>&times;</button>' + name +
            '</li>';

        $('#list_stop_word_language').append(html);

        setSimilarityLanguages();
    }
});

$('#delete_all_btn_language').click(function () {
    if (confirm("Do you really want to delete all Languages?")) {
        $('#list_stop_word_language').find('li').remove();

        setSimilarityLanguages();
    }
});

$('#list_stop_word_language').on('click', '.delete_btn_language', function() {
    $(this).closest('li').remove();

    setSimilarityLanguages();
});




/* Similarity stop words lists */
const $swLanguageId = $('#stop_words_list_language_id');
if ($swLanguageId.length) {

    $('#stop_words_lists_input').val($('#stop_words_lists').html());

    setStopWords($swLanguageId.val());
    $swLanguageId.change(function () {
        let languageId = $(this).val();

        setStopWords(languageId);
    });
}

function setStopWords(languageId)
{
    let stopWordsLists = JSON.parse($('#stop_words_lists').html()),
        stopWords = stopWordsLists[languageId];

    let html = '';

    if (stopWords) {
        for (const [key, item] of Object.entries(stopWords)) {
            html += renderStopWordHtml(item.id, item.name);
        }
    }

    $('#list_stop_words').html(html);
}
$('#add_btn_stop_word').click(function () {
    let input = $('#add_stop_word');
    let words = input.val().trim().split(/\r?\n/); // Split the input by new lines
    input.val(''); // Clear the textarea after adding the words

    words.forEach(function(name) {
        name = name.trim();
        if (name) {
            let html = renderStopWordHtml(0, name);
            $('#list_stop_words').prepend(html);
        }
    });

    updateStopWordsListsContainer();
});

$('#list_stop_words').on('click', '.delete_btn_stop_word', function() {
    $(this).closest('li').remove();

    updateStopWordsListsContainer();
});

$('#delete_all_btn_list').click(function () {
    if (confirm("Do you really want to delete all Stop words lists?")) {
        $('#list_stop_words').find('li').remove();

        updateStopWordsListsContainer();
    }
});

function renderStopWordHtml(id, name) {
    let html =
            '<li class="list-group-item">' +
            '<button type="button" ' +
            'data-id="' + id + '" ' +
            'data-name="' + name + '" ' +
            'class="btn btn-danger btn-xs listelement pull-right delete_btn_stop_word"' +
            '>&times;</button>' + name +
            '<input type="hidden" name="stop_words[]" value="' + name + '">' + // Include a hidden input for each stop word
            '</li>';

    return html;
}

function updateStopWordsListsContainer() {
    let languageId = $('#stop_words_list_language_id').val(),
            list = [];

    $('#list_stop_words').find('button').each(function() {
        let $item = $(this),
                id = $item.data('id'),
                name = $item.data('name');

        list.push({
            id: id,
            name: name
        });
    });

    let container = $('#stop_words_lists'),
            stopWordsLists = JSON.parse(container.html() || '{}'); // Ensure existing data is an object

    stopWordsLists[languageId] = list;

    container.html(JSON.stringify(stopWordsLists));
    $('#stop_words_lists_input').val(JSON.stringify(stopWordsLists));
}

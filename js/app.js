'use strict'
let keywords = [];
let renderArr = [];
let id = $('#temp');
let tester1 = true;
let tester2;




function Items(item) {
    this.image = item.image_url;
    this.title = item.title;
    this.description = item.description;
    this.keyword = item.keyword;
    this.horn = item.horns;

    keywords.push(this.keyword);
    renderArr.push(this);

}



Items.prototype.render = function() {
    let template = $(id).html();
    $("main").append(Mustache.render(template, this));
}



const ajaxSettings = {
    method: 'get',
    dataType: 'json'

}

function showPage1() {
    tester1 = true;
    tester2 = false;
    keywords = [];
    uniquekeyWords = [];
    renderArr = [];
    $('main').empty();
    $.ajax('data/page-1.json', ajaxSettings)
        .then(data => {
            data.forEach(item => {
                let newItemPage1 = new Items(item);
                // console.log(newItem);
                newItemPage1.render();
            })
            removeDuplicates();
            appendKeywords();

        })

}


$('document').ready(showPage1);


let uniquekeyWords = [];

function removeDuplicates() {

    $.each(keywords, function(i, el) {
        if ($.inArray(el, uniquekeyWords) === -1) uniquekeyWords.push(el);

    });
}

function appendKeywords() {
    $('select').empty();
    $('select').append(`<option value="default">Filter by Keyword </option>`);
    for (let i = 0; i < uniquekeyWords.length; i++) {
        let keyValue = uniquekeyWords[i];
        $('select').append(`<option>${keyValue}</option>`);
        console.log(keyValue)
    }

}

let filtering = (event) => {
    $('main').empty();
    let selectKeyWord = event.target.value;
    renderArr.forEach(elem => {
        if (elem.keyword == selectKeyWord) {
            elem.render();
            console.log(renderArr);
        }
    })
};

$('select').on('change', filtering);

function showPage2() {
    tester2 = true;
    tester1 = false;
    keywords = [];
    uniquekeyWords = [];
    renderArr = [];
    $('main').empty();
    $.ajax('data/page-2.json', ajaxSettings).
    then(data => {
        data.forEach(item => {
            // console.log(item)
            let newItemPage2 = new Items(item);
            // console.log(newItemPage2)
            newItemPage2.render();
        });
        removeDuplicates();
        appendKeywords();
        $('select').on('change', filtering);

    });
}

$('#secondpage').on('click', showPage2);
$('#firstpage').on('click', showPage1);

function sortHorns(data) {
    data.sort((a, b) => {
        console.log(a.horns - b.horns)
        return a.horns - b.horns;

    });
    // console.log(data);
};

function sortTitle(data) {
    data.sort((a, b) => {
        return (a.title > b.title) ? 1 : -1;
    })
};

function showHorns() {
    $('main').empty();
    if (tester1) {
        $.ajax('data/page-1.json', ajaxSettings)
            .then(data => {
                sortHorns(data);
                console.log(data);
                data.forEach(item => {
                    let neWsortedhorns = new Items(item);
                    neWsortedhorns.render();
                });
            })
    }
    if (tester2) {
        $.ajax('data/page-2.json', ajaxSettings)
            .then(data => {
                sortHorns(data);
                data.forEach(item => {
                    let neWsortedHorns = new Items(item)
                    neWsortedHorns.render();
                });

            })
    }
    removeDuplicates();
    appendKeywords();
}



function showTitle() {
    $('main').empty();
    if (tester1) {
        $.ajax('data/page-1.json', ajaxSettings)
            .then(data => {
                sortTitle(data);
                console.log(data);
                data.forEach(item => {
                    let neWsortedTitle = new Items(item);
                    neWsortedTitle.render();
                });
            })
    }
    if (tester2) {
        $.ajax('data/page-2.json', ajaxSettings)
            .then(data => {
                sortTitle(data);
                data.forEach(item => {
                    let neWsortedTitle = new Items(item)
                    neWsortedTitle.render();
                });

            })
    }
    removeDuplicates();
    appendKeywords();
}

64

function checkingHorns() {
    if ($('#horns').is(':checked')) {
        showHorns();
    } else {
        if (tester1) {
            showPage1();
        }
        if (tester2) {
            showPage2();
        }
    }
}

function checkingTitle() {
    if ($('#title').is(':checked')) {
        showTitle();
    } else {
        if (tester1) {
            showPage1();
        }
        if (tester2) {
            showPage2();
        }
    }
}


// this $('#checkboxId').is(':checked') for verify if is checked

// & this $("#checkboxId").prop('checked', true) to check

// & this $("#checkboxId").prop('checked', false) to uncheck

$('#horns').on('change', checkingHorns);
$('#title').on('click', checkingTitle);
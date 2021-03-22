'use strict'

function Items(item) {
    this.image = item.image_url;
    this.title = item.title;
    this.description = item.description;
    this.keyword = item.keyword;
    this.horn = item.horns;

}

Items.prototype.render = function() {
    // let photo_template = $('#photo-template').clone();
    // $('main').append(photo_template);
    // photo_template.find('h2').text(this.title);
    // photo_template.find('img').attr('src', this.image);
    // photo_template.find('p').text(this.description);
    // photo_template.remove('#photo-template');
    // photo_template.attr('id', this.keyword);
    // console.log(this.keyword);
    let temp = `<div id="${this.keyword}">
    <h2>${this.title}</h2>
    <img src="${this.image}" alt="${this.title}">
    <p>${this.description}</p>
  </div>`

    $('main').append(temp)

}


const ajaxSettings = {
    method: 'get',
    dataType: 'json'

}

$.ajax('data/page-1.json', ajaxSettings)
    .then(data => {
        data.forEach(item => {
            let newItem = new Items(item);
            console.log(newItem);
            newItem.render();
        });
    })
function createNode(element) {
  return document.createElement(element);
}

function append(parent, el){
  return parent.appendChild(el);
}

function getAlbum(number_album, gallery){

  const url = 'http://jsonplaceholder.typicode.com/albums/';

  var count_albums;

  if(number_album == undefined)
    number_album = 1;

  if(gallery == undefined)
    gallery = "gallery";

  var gallery_container = document.querySelector('.'+gallery);

  var album_container = gallery_container.querySelector('.album');

  var title = gallery_container.querySelector('.title');

  var button_next = gallery_container.querySelector('.button_next_album');

  var button_prev = gallery_container.querySelector('.button_prev_album');

  album_container.innerHTML = '';

  fetch(url)
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    count_albums = data.length;
  })
  .catch(function(error) {
    title.innerHTML = "Ошибка подключения к галереи!";
    title.classList.add('error');
  });

  fetch(url + number_album)
  .then(function(response){
    return response.json();
  })
  .then(function(data){
      title.innerHTML = data.title + ' #' + data.id;

      button_prev.onclick = function(){
        if(data.id == 1)
          getAlbum(count_albums, gallery);
        else
          getAlbum(data.id - 1, gallery);
      };
      button_next.onclick = function(){
        if(data.id == count_albums)
          getAlbum(1, gallery);
        else
          getAlbum(data.id + 1, gallery);
      };
  })
  .catch(function(error) {
    title.innerHTML = "Ошибка подключения к галереи!";
    title.classList.add('error');
  });

  fetch(url + number_album + '/photos')
  .then(function(response){
    return response.json();
  })
  .then(function(data){

    return data.map(function(image){

      var block = createNode('div'),
      img = createNode('img');

      block.classList.add('album_image');
      img.src = image.thumbnailUrl;
      img.setAttribute('data-fullimage', image.url);
      img.onclick = function(){
        openImage(this);
      };
      append(block, img);
      append(album_container, block);
    })
  })
  .catch(function(error) {
    title.innerHTML = "Ошибка подключения к галереи!";
    title.classList.add('error');
  });
}

function openImage(item){
  console.log(item.getAttribute('data-fullimage'));
  document.querySelector('.fullSize').src = item.getAttribute('data-fullimage');
  document.querySelector('.overlay').classList.add('active');
}

document.querySelector('.overlay').onclick = function(){
  this.classList.remove('active');
}

getAlbum();
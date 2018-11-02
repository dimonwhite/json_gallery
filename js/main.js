function createNode(element) {
  return document.createElement(element);
}

function append(parent, el){
  return parent.appendChild(el);
}

function showAlbum(number_album, gallery){

  var url = 'http://jsonplaceholder.typicode.com/albums/';

  var count_albums;

  if(number_album == undefined)
    number_album = 1;

  if(gallery == undefined)
    gallery = "gallery";

  gallery_container = document.querySelector('.'+gallery);

  var album_container = gallery_container.querySelector('.album');

  var title = gallery_container.querySelector('.title');

  var button_next = gallery_container.querySelector('.button_next_album');

  var button_prev = gallery_container.querySelector('.button_prev_album');

  var prev;
    var next;

  album_container.innerHTML = '';

  fetch(url)
  .then(response => response.json())
  .then(function(data){
    count_albums = data.length;
    console.log(count_albums);

    if(number_album > count_albums)
      number_album = count_albums;

    url += number_album;

    fetch(url)
    .then(response => response.json())
    .then(function(data){
        title.innerHTML = data.title + ' #' + data.id;

        prev = data.id-1;
        if(prev <= 0)
          prev = 1;
        next = data.id+1;
        
    });

    url += '/photos';

    fetch(url)
    .then(response => response.json())
    .then(function(data){

      return data.map(function(image){

        var block = createNode('div'),
        img = createNode('img');

        img.src = image.thumbnailUrl;
        img.setAttribute('data-fullimage', image.url);
        img.onclick = function(){
          showImage(this);
        };

        append(block, img);

        append(album_container, block);

      })
    });

  });

  button_prev.onclick = function(){
    showAlbum(prev, gallery);
  };
  button_next.onclick = function(){
    showAlbum(next, gallery);
  };


}

function showImage(item){
  console.log(item.getAttribute('data-fullimage'));
  document.querySelector('.fullSize').src = item.getAttribute('data-fullimage');
  document.querySelector('.overlay').style.display = 'block';
}

document.querySelector('.overlay').onclick = function(){
  hideImage(this)
};

function hideImage(item){
  item.style.display = 'none';
}

showAlbum(1);
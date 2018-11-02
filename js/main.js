function createNode(element) {
  return document.createElement(element);
}

function append(parent, el){
  return parent.appendChild(el);
}

var container = document.querySelector('.album');

var title = document.querySelector('.title');

var button_next = document.querySelector('.button_next_album');

var button_prev = document.querySelector('.button_prev_album');

var url = 'https://jsonplaceholder.typicode.com/albums/';

var count_albums;

fetch(url)
.then(response => response.json())
.then(function(data){
    count_albums = data.length;
});

function showAlbum(number_album){

  container.innerHTML = '';

  url = 'https://jsonplaceholder.typicode.com/albums/';

  if(number_album > count_albums)
    number_album = count_albums;

  url += number_album;

  fetch(url)
  .then(response => response.json())
  .then(function(data){
      title.innerHTML = data.title;

      prev = data.id-1;
      if(prev <= 0)
        prev = 1;
      button_prev.setAttribute('onclick', 'showAlbum('+prev+')');

      next = data.id+1;
      button_next.setAttribute('onclick', 'showAlbum('+next+')');
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
      img.setAttribute('onclick', 'showImage(this)');

      append(block, img);

      append(container, block);

    })
  });
}

function showImage(item){
  console.log(item.getAttribute('data-fullimage'));
  document.querySelector('.fullSize').src = item.getAttribute('data-fullimage');
  document.querySelector('.overlay').style.display = 'block';
}

document.querySelector('.overlay').setAttribute('onclick', 'hideImage(this)');

function hideImage(item){
  item.style.display = 'none';
}

showAlbum(1);
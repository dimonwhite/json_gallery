function createNode(element) {
  return document.createElement(element);
}

function append(parent, el){
  return parent.appendChild(el);
}

function getGallery(gallery){

  const url = 'http://jsonplaceholder.typicode.com/albums/';

  var count_albums;

  number_album = 1;

  if(gallery == undefined)
    gallery = "gallery";

  var gallery_container = document.querySelector('.' + gallery);
  var album_container = gallery_container.querySelector('.album');
  var title = gallery_container.querySelector('.title');
  var button_next = gallery_container.querySelector('.button_next_album');
  var button_prev = gallery_container.querySelector('.button_prev_album');

  if(title.classList.contains('error')){
    title.classList.remove('error');
    number_album = 1;
  }

  button_prev.addEventListener("click", prevAlbum, false);

  button_next.addEventListener("click", nextAlbum, false);

  function prevAlbum(){
    if(number_album == 1){
      id_album = count_albums;
    }
    else{
      id_album = number_album - 1;
    }
    getTitleAlbum(id_album);
    getAlbum(id_album);
  }

  function nextAlbum(){
    if(number_album == count_albums){
      id_album = 1;
    }
    else{
      id_album = number_album + 1;
    }
    getTitleAlbum(id_album);
    getAlbum(id_album);
  }

  function getTitleAlbum(id_album){
    fetch(url)
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      count_albums = data.length;
      title.innerHTML = data[id_album-1].title + ' #' + id_album;      
    })
    .catch(function(error) {
      title.innerHTML = "Ошибка подключения к галереи!";
      title.classList.add('error');
    });
  };

  function getAlbum(id_album){
    number_album = id_album;
    console.log(number_album);
    fetch(url + number_album + '/photos')
    .then(function(response){
      return response.json();
    })
    .then(function(data){

      album_container.innerHTML = '';

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
  };

  getTitleAlbum(number_album);
  getAlbum(number_album);
}

function openImage(item){
  console.log(item.getAttribute('data-fullimage'));
  document.querySelector('.fullSize').src = item.getAttribute('data-fullimage');
  document.querySelector('.overlay').classList.add('active');
}

document.querySelector('.overlay').onclick = function(){
  this.classList.remove('active');
}

getGallery();
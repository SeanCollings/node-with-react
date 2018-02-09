/* IGNORE - just notes*/

// write a function to retreive a blob of json
// make an ajax request! Use the 'fetch' function.
// http://rallycoding.herokuapp.com/api/music_albums


/* Old syntax */
function fetchAlbums() {
  fetch('http://rallycoding.herokuapp.com/api/music_albums')
    .then(res => res.json())
    .then(json => console.log(json));
}


/* New 2017 syntax */
async function fetchAlbums() {
  const res = await fetch('http://rallycoding.herokuapp.com/api/music_albums')
  const json = await res.json()

  console.log(json);
}

// Or using arrow function
const fetchAlbums = async () => {
  const res = await fetch('http://rallycoding.herokuapp.com/api/music_albums')
  const json = await res.json()

  console.log(json);
}

fetchAlbums();
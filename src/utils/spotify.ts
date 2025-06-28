async function getSpotifyAuthToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa("47d629387eff4cc2a731e7f2c290302e:5bcf17b2ac36460480687f83171004ae")
      },
      body: 'grant_type=client_credentials'
    });
  
    const data = await response.json();
    return data.access_token;
}

export async function searchAlbum(name: String, banda: String) {
    const token = await getSpotifyAuthToken()

    const response = await fetch(`https://api.spotify.com/v1/search?q=${name}${banda}&type=album&limit=1`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })

    const data = await response.json()

    return data.albums.items[0]
}

export async function getBandImage(id: String){
    const token = await getSpotifyAuthToken()


    const response = await fetch(` https://api.spotify.com/v1/artists/${id}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })

    const data = await response.json()

    return data.images[0].url
}
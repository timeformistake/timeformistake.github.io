const API_URL = "https://jsonplaceholder.typicode.com";  

window.onload = loadUsersData;

async function loadUsersData() {
    const responseUsers = await fetch(`${API_URL}/users`);
    const responsePosts = await fetch(`${API_URL}/posts`);
    const responsePhotos = await fetch(`${API_URL}/photos`);
    
    const users = await responseUsers.json();
    const posts = await responsePosts.json();
    const photos = await responsePhotos.json();

    renderUsersProfile(users, posts, photos);
}


function renderUsersProfile(users, posts, photos) {
    const profileContainer = document.querySelector('.profile-container');

    users.forEach(user => {

        const postsId = posts.filter(post => post.userId === user.id);
        const firstPost = postsId[0].body;

        const photosId = photos.filter(photo => photo.albumId === user.id);

        const profileBlock = document.createElement('div');
        const userPhoto = document.createElement('img');
        const userInfo = document.createElement('div');
        const userPost = document.createElement('div')
        const postButton = document.createElement('button');
      
        profileBlock.classList.add('profile-block');
        userPhoto.classList.add('user-photo');
        postButton.classList.add('post-button');
      
        userInfo.innerHTML = `
          <strong>${user.username}</strong>
          <p>${user.name}</p>
          <p>${user.email}</p>
        `;
        userPost.innerHTML = firstPost;
        userPhoto.src = photosId[0].url;
        postButton.textContent = `View More`;
      
        postButton.addEventListener('click', () => {
          openNewWindowWithPosts(user.id);
        });
      
        profileBlock.append(userPhoto, userInfo, userPost, postButton);
        profileContainer.appendChild(profileBlock);
      })
}

function openNewWindowWithPosts(userId) {
    window.location.href = `user-posts.html#${userId}`;
}
















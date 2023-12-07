const API_URL = "https://jsonplaceholder.typicode.com";

document.addEventListener('DOMContentLoaded', () => {
    const userId = window.location.hash.substring(1);
    loadAndDisplayUserPosts(userId);

    document.getElementById('backButton').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});

async function loadAndDisplayUserPosts(userId) {
    const mainContainer = document.getElementById('main-container');
    const userPosts = document.getElementById('user-posts');
    const gallery = document.getElementById('gallery');

    const user = await loadUser(userId);
    const posts = await loadPostsForUser(userId);
    const photos = await loadPhotosForUser(userId);

    const userInfo = document.createElement('div');
    userInfo.classList.add('user-info');
    userInfo.innerHTML = `<p>Username: ${user.username}</p><p>Name: ${user.name}</p><p>Email: ${user.email}</p>`;
    userPosts.innerHTML = posts.map(post => `<strong>${post.title}</strong><p>${post.body}</p>`).join('');
    photos.forEach(photo => {
        const userPhotos = document.createElement('img');
        userPhotos.classList.add('user-photos');
        userPhotos.src = photo.url;
        gallery.appendChild(userPhotos);
    })

    mainContainer.insertBefore(userInfo, userPosts, gallery);
}

async function loadUser(userId) {
    const response = await fetch(`${API_URL}/users/${userId}`);
    const user = await response.json();
    return user;
}

async function loadPostsForUser(userId) {
    const response = await fetch(`${API_URL}/posts?userId=${userId}`);
    const posts = await response.json();
    return posts;
}

async function loadPhotosForUser(userId) {
    const response = await fetch(`${API_URL}/photos?albumId=${userId}`);
    const photos = await response.json();
    return photos;
}
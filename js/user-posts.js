const API_URL = "https://jsonplaceholder.typicode.com";

document.addEventListener('DOMContentLoaded', () => {
    // Отримати ідентифікатор користувача з анкора в URL 
    // Код, який має виконатися після завантаження DOM
    const userId = window.location.hash.substring(1);
    loadAndDisplayUserPosts(userId);

    
    document.getElementById('backButton').addEventListener('click', () => {
        // Повернення на головну сторінку
        window.location.href = 'index.html';
    });
});

async function loadAndDisplayUserPosts(userId) {
    const mainContainer = document.getElementById('main-container');
    const userPosts = document.getElementById('user-posts');

    const user = await loadUser(userId);

    const userInfo = document.createElement('div');
    userInfo.innerHTML = `<p>Username: ${user.username}</p><p>Name: ${user.name}</p><p>Email: ${user.email}</p>`;

    const posts = await loadPostsForUser(userId);
    userPosts.innerHTML = posts.map(post => `<p><strong>${post.title}</strong></p><p>${post.body}</p>`).join('');
    
    mainContainer.insertBefore(userInfo, userPosts);
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

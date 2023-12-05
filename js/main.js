const API_URL = "https://jsonplaceholder.typicode.com";  

window.onload = initializeUserProfile;

async function initializeUserProfile() {
  const users = await loadUsers();
  displayUserProfile(users);
}

async function loadUsers() {
  const response = await fetch(`${API_URL}/users`);
  return response.json();
}

async function displayUserProfile(users) {
  const profileContainer = document.querySelector('.profile-container');
  
  for (const user of users) {
    const userProfile = await createUserProfile(user);
    profileContainer.appendChild(userProfile);
  }
}

async function createUserProfile(user) {
  const profileBlock = document.createElement('div');
  const userPhoto = document.createElement('img');
  const userNickname = document.createElement('p');
  const userName = document.createElement('p');
  const userEmail = document.createElement('p');
  const userPost = document.createElement('p')
  const postButton = document.createElement('button');

  
  profileBlock.classList.add('profile-block');
  userPhoto.classList.add('user-photo');
  postButton.classList.add('post-button');

  userNickname.innerHTML = user.username;
  userName.innerHTML = user.name;
  userEmail.innerHTML = user.email;
  postButton.innerHTML = `View More`;

  const post = await loadPostForUser(user.id);
  userPost.innerHTML = post.body;

  const photo = await loadPhotoForUser(user.id);
  userPhoto.src = photo[0].url;

  postButton.addEventListener('click', () => {
    openNewWindowWithPosts(user.id);
  });

  profileBlock.append(userPhoto, userNickname, userName, userEmail, userPost, postButton);
  return profileBlock;
}

async function loadPhotoForUser(id) {
  const response = await fetch(`${API_URL}/photos?id=${id}`);
  const photos = response.json();
  return photos;
}

async function loadPostForUser(userId) {
  const response = await fetch(`${API_URL}/posts?userId=${userId}`);
  const posts = await response.json();
  return posts[0];
} 

async function openNewWindowWithPosts(userId) {
  window.location.href = `user-posts.html#${userId}`
}

















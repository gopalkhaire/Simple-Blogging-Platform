let posts = JSON.parse(localStorage.getItem("blogs")) || [];
let editingIndex = null;

// Publish or Update
function publishPost() {
  let title = titleInput.value;
  let content = contentInput.value;
  let tag = tagInput.value || "General";

  if (!title || !content) return alert("Fill all fields");

  if (editingIndex !== null) {
    posts[editingIndex].title = title;
    posts[editingIndex].content = content;
    posts[editingIndex].tag = tag;
    editingIndex = null;
  } else {
    posts.unshift({
      title,
      content,
      tag,
      likes: 0,
      date: new Date().toLocaleString()
    });
  }

  localStorage.setItem("blogs", JSON.stringify(posts));
  titleInput.value = contentInput.value = tagInput.value = "";
  render();
}

// Render Posts
function render(filter = "") {
  postsContainer.innerHTML = "";
  let filtered = posts.filter(p =>
    p.title.toLowerCase().includes(filter.toLowerCase())
  );

  count.innerText = `Total Blogs: ${filtered.length}`;

  filtered.forEach((p, i) => {
    let div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `
      <span class="tag">${p.tag}</span>
      <h2>${p.title}</h2>
      <small>${p.date}</small>
      <p>${p.content.slice(0,120)}...</p>
      <div class="actions">
        <button onclick="like(${i})">❤️ ${p.likes}</button>
        <div>
          <button onclick="edit(${i})">Edit</button>
          <button onclick="del(${i})">Delete</button>
        </div>
      </div>
    `;
    postsContainer.appendChild(div);
  });
}

// Like
function like(i) {
  posts[i].likes++;
  localStorage.setItem("blogs", JSON.stringify(posts));
  render(search.value);
}

// Edit
function edit(i) {
  titleInput.value = posts[i].title;
  contentInput.value = posts[i].content;
  tagInput.value = posts[i].tag;
  editingIndex = i;
}

// Delete
function del(i) {
  if (confirm("Delete blog?")) {
    posts.splice(i, 1);
    localStorage.setItem("blogs", JSON.stringify(posts));
    render(search.value);
  }
}

// Theme toggle
themeToggle.onclick = () => {
  document.body.classList.toggle("dark");
};

// Search
search.oninput = () => render(search.value);

// DOM refs
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const tagInput = document.getElementById("tag");
const postsContainer = document.getElementById("posts");
const search = document.getElementById("search");
const count = document.getElementById("count");
const themeToggle = document.getElementById("themeToggle");

render();

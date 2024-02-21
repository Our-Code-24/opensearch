const searchBar = document.getElementById('search-bar');

searchBar.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const searchQuery = searchBar.value;
    if (searchQuery) {
      window.location.href = `/search?q=${searchQuery}`;
    }
  }
});

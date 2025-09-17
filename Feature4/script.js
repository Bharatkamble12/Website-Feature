const searchBar = document.getElementById("searchBar");
const categoryFilter = document.getElementById("categoryFilter");
const minPrice = document.getElementById("minPrice");
const maxPrice = document.getElementById("maxPrice");
const cards = document.querySelectorAll(".card");

function applyFilters() {
    const searchValue = searchBar.value.toLowerCase();
    const categoryValue = categoryFilter.value;
    const min = minPrice.value ? parseInt(minPrice.value) : 0;
    const max = maxPrice.value ? parseInt(maxPrice.value) : Infinity;

    cards.forEach(card => {
        const name = card.dataset.name.toLowerCase();
        const category = card.dataset.category;
        const price = parseInt(card.dataset.price);

        const matchesSearch = name.includes(searchValue);
        const matchesCategory = categoryValue === "all" || category === categoryValue;
        const matchesPrice = price >= min && price <= max;

        if (matchesSearch && matchesCategory && matchesPrice) {
            card.classList.remove("hidden");
        } else {
            card.classList.add("hidden");
        }
    });
}
searchBar.addEventListener("keyup", applyFilters);
categoryFilter.addEventListener("change", applyFilters);
minPrice.addEventListener("input", applyFilters);
maxPrice.addEventListener("input", applyFilters);

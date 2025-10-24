const products = [
  {id:1, name:"Portfolio Website", category:"web", price:50, img:"https://picsum.photos/220?1", description:"A sleek and professional portfolio website template to showcase your work."},
  {id:2, name:"E-Commerce Template", category:"web", price:70, img:"https://picsum.photos/220?2", description:"Fully responsive e-commerce template with shopping cart and payment integration."},
  {id:3, name:"AI Chatbot UI", category:"ai", price:90, img:"https://picsum.photos/220?3", description:"User-friendly interface for AI-powered chatbots with customizable themes."},
  {id:4, name:"Logo Design Kit", category:"design", price:25, img:"https://picsum.photos/220?4", description:"Complete logo design kit including vector files and brand guidelines."},
  {id:5, name:"Landing Page", category:"web", price:40, img:"https://picsum.photos/220?5", description:"High-converting landing page template for marketing campaigns."},
  {id:6, name:"Poster Template", category:"design", price:15, img:"https://picsum.photos/220?6", description:"Editable poster template for events, promotions, and advertisements."},
  {id:7, name:"AI Image Generator", category:"ai", price:100, img:"https://picsum.photos/220?7", description:"Advanced AI tool for generating high-quality images from text prompts."},
  {id:8, name:"Figma Wireframes", category:"design", price:60, img:"https://picsum.photos/220?8", description:"Comprehensive wireframe kit for app and website design in Figma."},
  {id:9, name:"Mobile App UI", category:"web", price:80, img:"https://picsum.photos/220?9", description:"Modern mobile app UI kit with screens for various functionalities."},
  {id:10, name:"Data Visualization Tool", category:"ai", price:120, img:"https://picsum.photos/220?10", description:"Powerful tool for creating interactive data visualizations and charts."},
  {id:11, name:"Icon Pack", category:"design", price:30, img:"https://picsum.photos/220?11", description:"Extensive icon pack with over 500 vector icons in multiple formats."},
  {id:12, name:"Blog Template", category:"web", price:45, img:"https://picsum.photos/220?12", description:"Clean and SEO-friendly blog template with customizable layouts."},
  {id:13, name:"Voice Assistant", category:"ai", price:150, img:"https://picsum.photos/220?13", description:"Intelligent voice assistant with natural language processing capabilities."},
  {id:14, name:"Banner Design", category:"design", price:20, img:"https://picsum.photos/220?14", description:"Eye-catching banner designs for web and print media."},
  {id:15, name:"Dashboard UI", category:"web", price:65, img:"https://picsum.photos/220?15", description:"Analytics dashboard UI with charts, graphs, and data widgets."},
  {id:16, name:"Machine Learning Model", category:"ai", price:200, img:"https://picsum.photos/220?16", description:"Pre-trained machine learning model for predictive analytics."},
  {id:17, name:"Font Collection", category:"design", price:35, img:"https://picsum.photos/220?17", description:"Curated collection of premium fonts for design projects."},
  {id:18, name:"E-Learning Platform", category:"web", price:90, img:"https://picsum.photos/220?18", description:"Comprehensive e-learning platform with course management features."},
  {id:19, name:"Chatbot API", category:"ai", price:110, img:"https://picsum.photos/220?19", description:"RESTful API for integrating chatbot functionality into applications."},
  {id:20, name:"Infographic Template", category:"design", price:40, img:"https://picsum.photos/220?20", description:"Professional infographic templates for data presentation."},
  {id:21, name:"Social Media Kit", category:"design", price:55, img:"https://picsum.photos/220?21", description:"Complete social media design kit with posts, stories, and covers."},
  {id:22, name:"Web Scraper Tool", category:"ai", price:85, img:"https://picsum.photos/220?22", description:"Intelligent web scraping tool with AI-powered data extraction."},
  {id:23, name:"Portfolio Theme", category:"web", price:50, img:"https://picsum.photos/220?23", description:"Versatile portfolio theme with multiple layout options."},
  {id:24, name:"AI Content Generator", category:"ai", price:130, img:"https://picsum.photos/220?24", description:"AI-powered content generation tool for blogs and marketing."},
  {id:25, name:"Logo Mockup", category:"design", price:25, img:"https://picsum.photos/220?25", description:"High-quality logo mockups for presentation and branding."},
  {id:26, name:"SaaS Dashboard", category:"web", price:75, img:"https://picsum.photos/220?26", description:"SaaS application dashboard with user management and analytics."},
  {id:27, name:"NLP Library", category:"ai", price:95, img:"https://picsum.photos/220?27", description:"Natural language processing library for text analysis and understanding."},
  {id:28, name:"Presentation Template", category:"design", price:45, img:"https://picsum.photos/220?28", description:"Professional presentation templates for business and education."}
];

const productsList=document.getElementById("productList");
const searchInput=document.getElementById("serchInput");
const categoryFilter=document.getElementById("categoryFilter");
const priceRange=document.getElementById("priceRange");
const priceValue=document.getElementById("priceValue");
const sortFilter=document.getElementById("sortFilter");

function renderProducts(data){
productsList.innerHTML = "";
if(data.length===0){
    productsList.innerHTML="<p class='text-center text-[#EAD7C3] py-8'>No products found</p>";
    return;
}
productsList.className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6";
data.forEach(p => {
    const card=document.createElement("div");
    card.className="bg-[#1F1F1F] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300";
    card.innerHTML=`<img src="${p.img}" alt="${p.name}" class="w-full h-48 object-cover">
      <div class="p-4">
        <h3 class="text-lg font-semibold text-[#FFFFFF] mb-2">${p.name}</h3>
        <p class="text-sm text-[#EAD7C3] mb-2">${p.description}</p>
        <p class="text-xl font-bold text-[#BFA181] mb-2">₹${p.price}</p>
        <p class="text-sm text-[#EAD7C3] uppercase mb-4">${p.category}</p>
        <a href="https://b-portfoilio.netlify.app/" target="_blank" class="w-full bg-[#BFA181] hover:bg-[#EAD7C3] text-[#0D0D0D] font-semibold py-2 px-4 rounded-md transition-colors duration-200 text-center block">Live Demo</a>
      </div>
    `;
    productsList.appendChild(card);

});
}
function applyFilters() {
    let filteredProducts = [...products];

    // Search filter
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(searchTerm));
    }

    // Category filter
    const category = categoryFilter.value.toLowerCase();
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    // Price filter
    const maxPrice = parseInt(priceRange.value);
    filteredProducts = filteredProducts.filter(p => p.price <= maxPrice);

    // Sort filter
    const sortBy = sortFilter.value;
    if (sortBy === 'low-high') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high-low') {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'a-z') {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'z-a') {
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
    }

    renderProducts(filteredProducts);
}

// Event listeners
searchInput.addEventListener('input', applyFilters);
categoryFilter.addEventListener('change', applyFilters);
priceRange.addEventListener('input', () => {
    priceValue.textContent = priceRange.value;
    applyFilters();
});
sortFilter.addEventListener('change', applyFilters);

// Initial render
renderProducts(products);

function filterProducts(){
  let filtered=products.filter(p=>{
    const matchesSearch=p.name.toLowerCase().includes(searchInput.value.toLowerCase());
    const matchesCategory=categoryFilter.value==="all"||p.category===categoryFilter.value;
  const matchesprice=p.price<=priceRange.value;
return matchesSearch && matchesCategory && matchesprice;
});

const sortValue=sortFilter.value;
if(sortValue==="low-high")filtered.sort((a,b)=>a.price-b.price);
else if(sortValue==="high-low")filtered.sort((a,b)=>b.price-a.price);
else if(sortValue==="a-z")filtered.sort((a,b)=>a.name.localeCompare(b.name));
else if(sortValue==="z-a")filtered.sort((a,b)=>b.name.localeCompare(a.name));

renderProducts(filtered);
}
[searchInput,categoryFilter,priceRange,sortFilter].forEach(el=>{
  el.addEventListener("input",filterProducts);
});
priceRange.addEventListener("input",()=>{
  priceValue.textContent=priceRange.value;
});
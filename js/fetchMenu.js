document.addEventListener("DOMContentLoaded", () => {
    if (typeof menuData !== 'undefined') {
        renderMenu(menuData);
    } else {
        console.error("Error: menuData not found.");
    }
});

function renderMenu(menu) {
    const categoriesContainer = document.getElementById("menu-categories-container");
    const sectionsContainer = document.getElementById("menu-sections-container");

    menu.forEach(category => {
        // Build menu category links
        const catId = category.category.replace(/\s+/g, '');
        const catDiv = document.createElement("div");
        catDiv.className = "menu-category";
        catDiv.innerHTML = `
            <a href="#${catId}-section">${category.category}</a>
            <img src="./masks/mobileparagraphmask.svg" alt="">
        `;
        categoriesContainer.appendChild(catDiv);

        // Build sections
        const section = document.createElement("section");
        section.id = `${catId}-section`;
        section.className = "menu-section";

        // Convert absolute paths in json to relative, or use as is
        const imgSrc = category.image.startsWith('/') ? '.' + category.image : category.image;

        let html = `
        <div class="menu-category-header">
            <div class="featured-item">
                <img class="featured-image" src="${imgSrc}" alt="">
                <img class="featured-over-cloud" src="./masks/mobilefeaturedovercloud.svg" alt="">
                <img class="featured-under-cloud" src="./masks/mobilefeaturedundercloud.svg" alt="">
            </div>
            <h3 class="category-title" id="${category.category}">${category.category}</h3>
        </div>
        `;

        category.subcategories.forEach(subcategory => {
            html += `
            <div class="subcategory">
                <h3 class="subcategory-title">${subcategory.name}</h3>
                ${subcategory.note ? `<p class="subcategory-note">${subcategory.note}</p>` : ''}
                
                <div class="items-list">
            `;

            subcategory.items.forEach(item => {
                html += `
                        <div class="menu-item">
                            <div class="item-name">${item.name}</div>
                            <div class="item-price">
                `;

                if (item.price !== null && item.price !== undefined) {
                    html += `<span>${item.price}</span>`;
                } else if (item.priceML) {
                    const entries = Object.entries(item.priceML);
                    entries.forEach(([size, price], index) => {
                        html += `<span>${size}: ${price}</span>${index < entries.length - 1 ? ' | ' : ''}`;
                    });
                }

                html += `
                            </div>
                        </div>
                `;
            });

            html += `
                </div>
            </div>
            `;
        });

        section.innerHTML = html;
        sectionsContainer.appendChild(section);
    });
}

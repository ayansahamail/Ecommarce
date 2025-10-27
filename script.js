// Filter and highlight products by search text
(function(){
    const input = document.getElementById('site-search');
    const btn = document.getElementById('search-btn');
    const productsContainer = document.querySelector('.products');
    const products = Array.from(document.querySelectorAll('.products .product'));

    // Create not found message element
    const notFoundMsg = document.createElement('div');
    notFoundMsg.className = 'no-results';
    notFoundMsg.style.cssText = `
        display: none;
        text-align: center;
        padding: 20px;
        color: #666;
        font-size: 1.1em;
        width: 100%;
        grid-column: 1 / -1;
    `;
    notFoundMsg.innerHTML = '<p>Sorry, no products match your search. Try different keywords.</p>';
    productsContainer.appendChild(notFoundMsg);

    function updateMatches(){
        const searchText = input.value.trim().toLowerCase();
        let matchFound = false;

        // Reset all products and hide message
        products.forEach(p => {
            p.style.display = '';
            p.classList.remove('match');
        });
        notFoundMsg.style.display = 'none';

        if (!searchText) return;

        // Check each product
        products.forEach(p => {
            const productText = p.innerText.toLowerCase();
            if (productText.includes(searchText)) {
                p.classList.add('match');
                matchFound = true;
            } else {
                p.style.display = 'none';
            }
        });

        // Show message if no matches
        if (!matchFound) {
            notFoundMsg.style.display = 'block';
        }
    }

    // Event listeners
    input.addEventListener('input', updateMatches);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            input.value = '';
            updateMatches();
        }
        if (e.key === 'Enter') {
            updateMatches();
        }
    });
    btn.addEventListener('click', updateMatches);
})();


function updateMatches(){
    const searchText = input.value.trim().toLowerCase();
    let matchFound = false;

    // Reset all products and hide message
    products.forEach(p => {
        if (p.style.display === 'none') {
            p.style.opacity = '0';
            setTimeout(() => {
                p.style.display = '';
                requestAnimationFrame(() => {
                    p.style.opacity = '1';
                });
            }, 300);
        }
        p.classList.remove('match');
    });
    notFoundMsg.style.display = 'none';

    if (!searchText) return;

    // Check each product
    products.forEach(p => {
        const productText = p.innerText.toLowerCase();
        if (productText.includes(searchText)) {
            p.classList.add('match');
            matchFound = true;
        } else {
            p.style.opacity = '0';
            setTimeout(() => {
                p.style.display = 'none';
            }, 300);
        }
    });

    // Show message if no matches
    if (!matchFound) {
        setTimeout(() => {
            notFoundMsg.style.display = 'block';
        }, 300);
    }
}
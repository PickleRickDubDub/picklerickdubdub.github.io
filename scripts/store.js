const products = [
    { id: 1, name: "Egyptian Gods mat and sleeves.", price: 34.99, desc: "Display your cards on this duel mat styled after the most powerful cards in Battle City and keep them protected in one of this packs containing 40 sleeves each.", quantities: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], img: "images/product1.png" },
    
    { id: 2, name: "Dark Magician plushie.", price: 19.99, desc: "If you’re looking to bring some of the original series' magic to your collection, this Dark Magician plushie is the ultimate choice. As Yugi Muto’s most trusted ace monster, he isn't just a staple of the game—he’s a symbol of the 'Heart of the Cards'.", colors: ["Purple", "Red", "Blue", "Black", "Gray"], sizes: ["M", "L", "XL"], sizePrices: { "M": 19.99, "L": 24.99, "XL": 29.99 }, quantities: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], img: "images/product2.png" },
    
    { id: 3, name: "Blue Eyes White Dragon plushie.", price: 19.99, desc: "If you want the absolute peak of power and prestige for your collection, nothing beats the Blue-Eyes White Dragon plush. Known as the legendary engine of destruction, this dragon is the ultimate status symbol for any serious duelist.", colors: ["Original Blue", "Alternative White"], sizes: ["M", "L", "XL"], sizePrices: { "M": 19.99, "L": 24.99, "XL": 29.99 }, quantities: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], img: "images/product3.png" },
    
    { id: 4, name: "Red Eyes Black Dragon.", price: 19.99, desc: "If you're looking for a monster with 'potential' and pure, raw attitude, the Red-Eyes Black Dragon plush is the one for you. While Blue-Eyes represents power, Red-Eyes is the ultimate underdog icon—the card that proves a true Duelist can turn any spark into an inferno.", sizes: ["M", "L", "XL"], sizePrices: { "M": 19.99, "L": 24.99, "XL": 29.99 }, quantities: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], img: "images/product4.png" },
    
    { id: 5, name: "Legendary Duelists plushie set", price: 54.99, desc: "This set brings the three most iconic monsters together in one premium display. Includes Dark Magician, Blue-Eyes White Dragon, and Red-Eyes Black Dragon. The perfect way to own the 'Big Three' of the Yu-Gi-Oh! universe.", colors: ["Original", "Special"], quantities: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], img: "images/product5.png" },
    
    { id: 6, name: "Legendary Duelists booster packs.", price: 9.99, desc: "If you’re looking to pull the rarest cards in the game, the Legendary Duelists set is your ticket to a championship-level deck. Designed to give you the best chance at summoning history's most powerful monsters.", quantities: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], img: "images/product6.png" },
    
    { id: 7, name: "Structure Decks.", price: 15.99, desc: "Ready-to-play synergy. These sets give you a fully functional, tournament-ready strategy right out of the box! Choose from Ancient Gears, Dinosaurs, or Zombie World.", quantities: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], img: "images/product7.png" },
    
    { id: 8, name: "Egyptian Gods booster packs.", price: 19.99, desc: "To truly command the power of the original series, you need the Egyptian God Card Booster Packs. The ultimate prize for summoning Slifer, Obelisk, and Ra.", quantities: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], img: "images/product8.png" }
];

let cart = [];

// Initialize Catalog
function renderCatalog() {
    const catalog = document.getElementById('catalog');
    if(!catalog) return;
    catalog.innerHTML = "";
    products.forEach(p => {
        catalog.innerHTML += `
            <div class="card">
                <img src="${p.img}" alt="${p.name}" onerror="this.src='https://placeholder.com'">
                
                <div class="card-content">
                    <div class="product-info">
                        <h3>${p.name}</h3>
                        <p>${p.desc}</p>
                        <p><strong id="price-display-${p.id}">$${p.price}</strong></p>
                    </div>

                    <div class="product-controls">
                        ${p.colors ? `
                        <div class="control-group">
                            <label>Color:</label>
                            <select id="color-${p.id}">${p.colors.map(c => `<option>${c}</option>`).join('')}</select>
                        </div>` : ''}
                        
                        ${p.sizes ? `
						<div class="control-group">
							<label>Size:</label>
							<select id="size-${p.id}" onchange="updateProductPrice(${p.id})">
								${p.sizes.map(s => `<option value="${s}">${s}</option>`).join('')}
							</select>
						</div>` : ''}
                        
                        ${p.quantities ? `
                        <div class="control-group">
                            <label>Quantity:</label>
                            <select id="buy-qty-${p.id}">${p.quantities.map(q => `<option value="${q}">${q}</option>`).join('')}</select>
                        </div>` : ''}
                        
                        <!-- Added 'event' here so we can target the button directly -->
                        <button class="btn" onclick="addToCart(${p.id}, event)">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
    });
}

window.addToCart = function(id, event) {
    const p = products.find(prod => prod.id === id);
    const color = document.getElementById(`color-${id}`)?.value || 'N/A';
    const size = document.getElementById(`size-${id}`)?.value || 'N/A';
    const selectedQty = parseInt(document.getElementById(`buy-qty-${id}`)?.value) || 1;
    
    // 1. Add to the actual data array
    cart.push({ ...p, selectedColor: color, selectedSize: size, qty: selectedQty });
    updateCart();

    // 2. Visual Feedback (The Button Change)
    const btn = event.target; // This grabs the exact button clicked
    const originalColor = "#27ae60"; // Your green color
    const originalText = "Add to Cart";

    btn.style.backgroundColor = "#f1c40f"; // Turn Yellow
    btn.style.color = "black";             // Make text readable on yellow
    btn.innerText = "Added!"; 

    // 3. Reset after 1 second so they can add more if they want
    setTimeout(() => {
        btn.style.backgroundColor = originalColor;
        btn.style.color = "white";
        btn.innerText = originalText;
    }, 1000);
}



window.updateCart = function() {
    const countSpan = document.getElementById('cart-count');
    if(countSpan) countSpan.innerText = cart.length;
    
    const list = document.getElementById('cart-items');
    if(!list) return;
    
    let total = 0;
    list.innerHTML = "";

    cart.forEach((item, index) => {
        total += item.price * item.qty;
        
        // --- NEW LOGIC: Only show Color/Size if they aren't 'N/A' ---
        let details = "";
        if (item.selectedColor !== 'N/A' || item.selectedSize !== 'N/A') {
            const colorText = item.selectedColor !== 'N/A' ? item.selectedColor : "";
            const sizeText = item.selectedSize !== 'N/A' ? item.selectedSize : "";
            const separator = (colorText && sizeText) ? " / " : "";
            details = `(${colorText}${separator}${sizeText})`;
        }

        list.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong> ${details}<br>
                    $${item.price} each
                </div>
                <div>
                    <strong>Qty:</strong> <input type="number" value="${item.qty}" min="1" onchange="updateQty(${index}, this.value)" style="width:40px">
                    <button class="btn btn-danger" onclick="removeItem(${index})">Remove</button>
                </div>
            </div>`;
    });
    document.getElementById('cart-total').innerText = total.toFixed(2);
}


window.updateQty = function(idx, val) { cart[idx].qty = parseInt(val); updateCart(); }
window.removeItem = function(idx) { cart.splice(idx, 1); updateCart(); }

window.toggleCart = function() {
    document.getElementById('cart-view').classList.toggle('hidden');
    document.getElementById('catalog').classList.toggle('hidden');
}

window.showCheckout = function() {
    if(cart.length === 0) return alert("Cart is empty!");
    document.getElementById('cart-view').classList.add('hidden');
    document.getElementById('checkout-view').classList.remove('hidden');
    
    let summary = "<ul>";
    cart.forEach(i => summary += `<li>${i.qty}x ${i.name} (${i.selectedColor}) - $${(i.price * i.qty).toFixed(2)}</li>`);
    document.getElementById('order-summary').innerHTML = summary + `</ul><strong>Grand Total: $${document.getElementById('cart-total').innerText}</strong>`;
}

window.copyAddress = function() {
    if(document.getElementById('copy-addr').checked) {
        document.getElementById('ship-address').value = document.getElementById('bill-address').value;
    }
}

// Handle Form Submission
const form = document.getElementById('checkout-form');
if(form) {
    form.onsubmit = function(e) {
        e.preventDefault();
        let valid = true;

        if(document.getElementById('name').value.length < 2) {
            document.getElementById('name-err').innerText = "Enter your full name.";
            valid = false;
        } else { document.getElementById('name-err').innerText = ""; }

        if(!document.getElementById('email').value.includes('@')) {
            document.getElementById('email-err').innerText = "Valid email required.";
            valid = false;
        } else { document.getElementById('email-err').innerText = ""; }

        if(document.getElementById('bill-address').value.length < 5) {
            document.getElementById('addr-err').innerText = "Valid address required.";
            valid = false;
        } else { document.getElementById('addr-err').innerText = ""; }

        if(valid) {
            document.getElementById('checkout-view').classList.add('hidden');
            document.getElementById('final-msg').classList.remove('hidden');
        }
    };
}

renderCatalog();

window.updateProductPrice = function(id) {
    const p = products.find(prod => prod.id === id);
    const selectedSize = document.getElementById(`size-${id}`).value;
    
    // Check if this product has specific pricing for sizes
    if (p.sizePrices && p.sizePrices[selectedSize]) {
        const newPrice = p.sizePrices[selectedSize];
        
        // Update the text on the screen
        document.getElementById(`price-display-${id}`).innerText = `$${newPrice.toFixed(2)}`;
        
        // CRITICAL: Update the internal price so the correct amount goes to the cart
        p.price = newPrice;
    }
}

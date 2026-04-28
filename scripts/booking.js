let finalOrderTotal = 0;

function calculateTotal() {
    let subtotal = 0;
    const taxRate = 0.08;

    // 1. Get Dates
    const checkInStr = document.getElementById('checkIn').value;
    const checkOutStr = document.getElementById('checkOut').value;
    let nights = 0;

    if (checkInStr && checkOutStr) {
        const checkInDate = new Date(checkInStr);
        const checkOutDate = new Date(checkOutStr);
        
        // Calculate difference in days
        const diffTime = checkOutDate - checkInDate;
        nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        // Prevent negative nights
        if (nights < 0) nights = 0; 
    }
    
    document.getElementById('nightCount').innerText = "Nights: " + nights;

        // 2. Room Price Logic
    const roomSelection = document.getElementById('roomType');
    const roomPrice = parseFloat(roomSelection.value);

    // Calculate room cost only if a room is selected and nights > 0
    if (roomPrice > 0 && nights > 0) {
        subtotal += (roomPrice * nights);
    }


    // 3. Add Benefits (These now update even if nights = 0)
    if (document.getElementById('parking').checked) subtotal += 80;
    if (document.getElementById('review').checked) subtotal += 150;
    if (document.getElementById('vip').checked) subtotal += 200;

    // 4. Final Math
    let taxAmount = subtotal * taxRate;
    finalOrderTotal = subtotal + taxAmount;

    // 5. Update UI
    document.getElementById('subtotalDisplay').innerText = "Subtotal: $" + subtotal.toFixed(2);
    document.getElementById('taxDisplay').innerText = "Tax (8%): $" + taxAmount.toFixed(2);
    document.getElementById('totalDisplay').innerText = "Total: $" + finalOrderTotal.toFixed(2);

    // Show button only if there is a cost and at least 1 night
    const submitBtn = document.getElementById('submitBtn');
    if (subtotal > 0 && nights > 0) {
        submitBtn.style.display = "block";
    } else {
        submitBtn.style.display = "none";
    }
}


function submitOrder() {
    const guestName = document.getElementById('userName').value || "Guest";
    let confirmation = confirm("Hi " + guestName + ",\n\nAre you sure you want to book your stay at Battle City Inn for $" + finalOrderTotal.toFixed(2) + "?");
    
    if (confirmation) {
        alert("Success! Thank you for your reservation, " + guestName + ".");
        document.getElementById('calcForm').reset();
        calculateTotal();
    }
}

let finalOrderTotal = 0;

function calculateTotal() {
    let subtotal = 0;
    const taxRate = 0.08;

    const checkInStr = document.getElementById('checkIn').value;
    const checkOutStr = document.getElementById('checkOut').value;
    let nights = 0;

    if (checkInStr && checkOutStr) {
        const checkInDate = new Date(checkInStr);
        const checkOutDate = new Date(checkOutStr);
        if (checkOutDate > checkInDate) {
            const diffTime = Math.abs(checkOutDate - checkInDate);
            nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        }
    }
    document.getElementById('nightCount').innerText = "Nights: " + nights;

    const roomPrice = parseFloat(document.getElementById('roomType').value);
    subtotal += (roomPrice * nights);

    if (document.getElementById('parking').checked) subtotal += 80;
    if (document.getElementById('review').checked) subtotal += 150;
    if (document.getElementById('vip').checked) subtotal += 200;

    let taxAmount = subtotal * taxRate;
    finalOrderTotal = subtotal + taxAmount;

    document.getElementById('subtotalDisplay').innerText = "Subtotal: $" + subtotal.toFixed(2);
    document.getElementById('taxDisplay').innerText = "Tax (8%): $" + taxAmount.toFixed(2);
    document.getElementById('totalDisplay').innerText = "Total: $" + finalOrderTotal.toFixed(2);

    if (subtotal > 0 && nights > 0) {
        document.getElementById('submitBtn').style.display = "block";
    } else {
        document.getElementById('submitBtn').style.display = "none";
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

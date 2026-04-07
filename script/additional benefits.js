<script>
    function calculateTotal() {
        // 1. Calculation variables
        let subtotal = 0;
        const taxRate = 0.08; // Set your tax rate here (0.08 = 8%)

        // 2. Choose each benefit and add to subtotal
        if (document.getElementById('parking').checked) { 
            subtotal += 80; 
        }
        if (document.getElementById('review').checked) { 
            subtotal += 150; 
        }
        if (document.getElementById('vip').checked) { 
            subtotal += 200; 
        }

        // 3. Calculate tax and grand total
        let taxAmount = subtotal * taxRate;
        let grandTotal = subtotal + taxAmount;

        // 4. Update the HTML display
        document.getElementById('taxDisplay').innerText = "Tax: $" + taxAmount.toFixed(2);
        document.getElementById('totalDisplay').innerText = "Total: $" + grandTotal.toFixed(2);
    }
</script>

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('converter-form');
    const resultDiv = document.getElementById('result');
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');

    // Populate currency options
    const currencies = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "SEK", "NZD"];
    currencies.forEach(currency => {
        const optionFrom = document.createElement('option');
        optionFrom.value = currency;
        optionFrom.textContent = currency;
        fromCurrencySelect.appendChild(optionFrom);

        const optionTo = document.createElement('option');
        optionTo.value = currency;
        optionTo.textContent = currency;
        toCurrencySelect.appendChild(optionTo);
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const amount = document.getElementById('amount').value;
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        if (amount === '' || fromCurrency === '' || toCurrency === '') {
            alert('Please fill in all fields');
            return;
        }

        convertCurrency(amount, fromCurrency, toCurrency);
    });

    function convertCurrency(amount, fromCurrency, toCurrency) {
        const apiKey = 'YOUR_API_KEY'; // Replace with your own API key
        const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const rate = data.rates[toCurrency];
                const convertedAmount = (amount * rate).toFixed(2);
                resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
            })
            .catch(error => {
                console.error('Error fetching exchange rates:', error);
                resultDiv.textContent = 'Error fetching exchange rates. Please try again later.';
            });
    }
});

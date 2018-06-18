let quote, quoteBtn, store, error, counter, navToggle, quoteDisplay, displaying, message, holder, bg;

quote = document.getElementById('quote-content');
quoteBtn = document.getElementById('quoteBtn');
error = document.getElementById('error');
quoteDisplay = document.getElementById('quoteDisplay');
bg = document.getElementById('index');
message = document.getElementsByClassName('message');
holder = document.getElementsByClassName('displaying');
navToggle = document.getElementById('nav-toggle');
counter = 120;
store = [];

const handleAddQuote = () => {
	if (quote.value.length === 0) {
		error.innerHTML = "<p>You can't submit an empty form.</p>";
	} else {
		if (!store.includes(quote.value)) {
			store = [...store, quote.value];
			quote.value = '';
			navToggle.checked = false;
		} else {
			error.innerHTML = '<p>You have this quote already.</p>';
		}
	}
};

const handleDisplayQuote = () => {
	const rand = Math.floor(Math.random() * store.length);
	const randBg = Math.floor(Math.random() * 3 + 1);

	if (store.length > 0) {
		message['0'].style.display = 'none';
		holder['0'].style.display = 'block';
		holder['0'].children[1].innerHTML = store[rand];
		bg.style.background = "url('./imgs/bg" + randBg + ".png') no-repeat top left";
		bg.style.backgroundSize = 'cover';
		console.log(randBg);
	}
};

quote.addEventListener('input', () => {
	counter--;
	error.innerHTML = '<p>' + counter + '</p>';
});

quoteBtn.addEventListener('click', handleAddQuote);
quoteDisplay.addEventListener('click', handleDisplayQuote);

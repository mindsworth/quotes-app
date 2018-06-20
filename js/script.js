let quote,
	flashMessage,
	quoteBtn,
	copyIcon,
	localStore,
	store,
	error,
	counter,
	navToggle,
	quoteDisplay,
	displaying,
	message,
	holder,
	bg;

quote = document.querySelector('#quote-content');
quoteBtn = document.querySelector('#quoteBtn');
error = document.querySelector('#error');
counterBox = document.querySelector('.counter');
quoteDisplay = document.querySelector('#quoteDisplay');
bg = document.querySelector('#index');
copyIcon = document.querySelector('.copy-icon');
message = document.querySelector('.message');
holder = document.querySelector('.displaying');
navToggle = document.querySelector('#nav-toggle');
flashMessage = document.querySelector('.flash-message');
counter = 164;
store = !!localStorage.store ? JSON.parse(localStorage.getItem('store')) : [];
console.log(store);

copyIcon.addEventListener('click', handleCopyCommand);
document.addEventListener('copy', handleCopyQuote);
quote.addEventListener('input', handleOnInput);
quoteBtn.addEventListener('click', handleAddQuote);
quoteDisplay.addEventListener('click', handleDisplayQuote);

const handleAddQuote = () => {
	let text = quote.value.trim();
	error.style.display = 'block';

	if (text.length === 0) {
		error.innerHTML = "<p>You can't submit an empty form.</p>";
	} else {
		if (!store.includes(text)) {
			store = [...store, text];
			quote.value = '';
			navToggle.checked = false;
			counterBox.innerHTML = counter;
			localStorage.setItem('store', JSON.stringify(store));
			handleFlashMessage('New quote added');
		} else {
			error.innerHTML = '<p>You have this quote already.</p>';
		}
	}
};

const handleDisplayQuote = () => {
	const rand = Math.floor(Math.random() * store.length);
	const randBg = Math.floor(Math.random() * 4 + 1);

	if (store.length > 0) {
		message.style.display = 'none';
		holder.style.display = 'block';
		holder.children[1].innerHTML = store[rand];
		bg.style.background = "url('./imgs/bg" + randBg + ".png') no-repeat top left";
		bg.style.backgroundSize = 'cover';
		console.log(randBg);
	} else {
		handleFlashMessage('No quote to display.');
	}
};

const handleOnInput = e => {
	let elem = e.target.value;
	counterBox.innerHTML = counter - elem.length;
	error.style.display = 'none';

	if (counter - elem.length < 0) {
		counterBox.style.color = '#ff4081';
		quoteBtn.disabled = true;
		quoteBtn.style.cursor = 'not-allowed';
		quoteBtn.style.opacity = '.6';
	} else {
		counterBox.style.color = '#707070';
		quoteBtn.disabled = false;
		quoteBtn.style.cursor = 'pointer';
		quoteBtn.style.opacity = '1';
	}
};

const handleCopyQuote = e => {
	e.preventDefault();
	const text = holder.children[1].textContent.toString();
	if (e.clipboardData) {
		e.clipboardData.setData('text/plain', text);
	} else if (window.clipboardData) {
		window.clipboardData.setData('Text', text);
	}
};

const handleFlashMessage = text => {
	flashMessage.innerHTML = text;
	flashMessage.style.display = 'block';
	setTimeout(() => {
		flashMessage.style.display = 'none';
	}, 3000);
};

const handleCopyCommand = () => {
	document.execCommand('copy');
	handleFlashMessage('Quote copied.');
};

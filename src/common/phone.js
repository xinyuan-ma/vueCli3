let phoneLink
export default function callPhone(option = {}) {
	let phone = option.phoneNumber || '';

	if (!phoneLink) {
		phoneLink = document.createElement('a');
	}

	if (phone) {
		phoneLink.setAttribute('href', `tel:${phone}`);
		phoneLink.click();
	}
}

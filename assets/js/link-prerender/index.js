const prerenderOnHover = () => {
	Array.from(document.querySelectorAll('a')).forEach((link) => {
		let notEnteredYet = 1;
		link.addEventListener("mouseenter", () => {
			if (link.href && !--notEnteredYet) {
				const newPreLoadLink = document.createElement("link");
				newPreLoadLink.rel = "prefetch";
				newPreLoadLink.href = link.href;
				document.head.appendChild(newPreLoadLink);
			}
		});
	});
}
if (document.readyState !== "loading") {
	setTimeout(prerenderOnHover, 0)
} else {
	document.addEventListener('DOMContentLoaded', prerenderOnHover);
}

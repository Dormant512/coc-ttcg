function main() {
	const canvas = document.querySelector("#card-gen");
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
		const img = new Image();
		img.onload = function() {
			ctx.drawImage(img, 0, 0, 496, 693);
		};
        const btn = document.querySelector("#card-submit");
        const sb = document.querySelector("#card-type")
        btn.onclick = (event) => {
            event.preventDefault();
            //alert(sb.selectedIndex);
			const typeArray = ["adventurer"];
		};
		img.src = "visuals/templates/adventurer.png"
    };
}

function selectType(id) {
	
}

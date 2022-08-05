enableArray = [];

function previewDefault() {
    const ctx = document.querySelector("#card-gen").getContext("2d");
    const img = new Image();
	img.onload = function() {
		ctx.drawImage(img, 0, 0, 496, 693);
	};
    img.src = "visuals/templates/adventurer.png"
}

function typeofCard() {
    const cardType = document.querySelector("#card-type");
    const ans = cardType.value;

    // iterate over enableArray --> enable all options

    const form = document.querySelector("#card-options");
    form.reset();

    // iterate over enableArray --> disable unused by type options    

    return ans;
}

function modelCard(cardType) {
    const btn = document.querySelector("#card-submit");
    const cardName = document.querySelector("#card-name");
    const cardText = document.querySelector("#card-text");
    const cardAP = document.querySelector("#card-ap");
    const cardMagic = document.querySelector("#card-magic");
    const cardSpec1 = document.querySelector("#card-spec-1");
    const cardSpec2 = document.querySelector("#card-spec-2");
    const cardSpec3 = document.querySelector("#card-spec-3");
    const cardSpec4 = document.querySelector("#card-spec-4");
    const cardOr1 = document.querySelector("#card-or-1");
    const cardOr2 = document.querySelector("#card-or-2");
    const cardOr3 = document.querySelector("#card-or-3");
    const cardTribe = document.querySelector("#card-tribe");
    const patronAffect = document.querySelector("#patron-affect");
    const artifactCost = document.querySelector("#artifact-cost");
    const artifactMagic1 = document.querySelector("#artifact-magic-1");
    const artifactMagic2 = document.querySelector("#artifact-magic-2");
    const artifactMagic3 = document.querySelector("#artifact-magic-3");
    const artifactMagic4 = document.querySelector("#artifact-magic-4");
    const artifactMagic5 = document.querySelector("#artifact-magic-5");
    const planTrigger = document.querySelector("#plan-trigger");

    btn.onclick = (event) => {
        event.preventDefault();
        
	};
    return modelArray;
}

// function drawCard() {
//     return NaN;
// }

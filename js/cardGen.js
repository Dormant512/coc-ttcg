const COLORCODE = {
    "fighter": "#F7971C",
    "assassin": "#9452CF",
    "ranger": "#5CAE57",
    "mage": "#E3E3E3",
    "support": "#C73E40",
    "diplomat": "#E2D92A",
    "erudite": "#2D71C8",
    "priest": "#6CDAC5",
    "manipulator": "#333333",
    "generic": "#999999"};

function previewDefault() {
    const canvas = document.querySelector("#card-gen-back")
    const ctx = canvas.getContext("2d");
    const img = new Image();
	img.onload = function() {
		ctx.drawImage(img, 0, 0, 743, 1038);
	};
    img.src = "visuals/templates/adventurer.png";
}

function typeEnable() {
    const cardType = document.getElementById("card-type").value;

    if (cardType == "artifact") {
        document.getElementById("card-color-1").value = "artifact";
        document.getElementById("card-color-2").value = "artifact";
        document.getElementById("tribe-container").style.display = "none";
        document.getElementById("card-tribe").value = "";
        document.getElementById("artifact-cost-container").style.display = "block";
    } else {
        document.getElementById("card-color-1").value = "fighter";
        document.getElementById("card-color-2").value = "fighter";
        document.getElementById("tribe-container").style.display = "block";
        document.getElementById("artifact-cost-container").style.display = "none";
        document.getElementById("artifact-cost").value = "";
    }

    if (cardType == "adventurer" || cardType == "token" || cardType == "artifact") {
        document.getElementById("multi-magic-field").style.display = "block";
        document.getElementById("mono-magic").style.display = "none";
        document.getElementById("card-magic").value = "none";
    } else {
        document.getElementById("multi-magic-field").style.display = "none";
        document.getElementById("mono-magic").style.display = "block";
        document.getElementById("multi-magic-1").checked = false;
        document.getElementById("multi-magic-2").checked = false;
        document.getElementById("multi-magic-3").checked = false;
        document.getElementById("multi-magic-4").checked = false;
        document.getElementById("multi-magic-5").checked = false;
    }

    if (cardType == "artifact" || cardType == "patron") {
        document.getElementById("spec-field").style.display = "none";
        document.getElementById("spec-1").value = "none";
        document.getElementById("spec-2").value = "none";
        document.getElementById("spec-3").value = "none";
        document.getElementById("spec-4").value = "none";
    } else {
        document.getElementById("spec-field").style.display = "block";
    }

    if (cardType == "patron") {
        document.getElementById("patron-affect-container").style.display = "block";
    } else {
        document.getElementById("patron-affect-container").style.display = "none";
        document.getElementById("patron-affect").value = "";
    }

    if (cardType == "adventurer" || cardType == "action" || cardType == "action_preparation" || cardType == "token") {
        document.getElementById("card-ap-container").style.display = "block";
    } else {
        document.getElementById("card-ap-container").style.display = "none";
        document.getElementById("card-ap").value = "";
    }

    if (cardType == "plan") {
        document.getElementById("plan-trigger-container").style.display = "block";
    } else {
        document.getElementById("plan-trigger-container").style.display = "none";
        document.getElementById("plan-trigger").value = "";
    }
}

function syncColor() {
    const cardColor1 = document.getElementById("card-color-1").value;
    document.getElementById("card-color-2").value = cardColor1;
}

function printAt(context, text, x, y, lineHeight, fitWidth) {
    fitWidth = fitWidth || 0;
    if (fitWidth <= 0) {
        context.fillText(text, x, y);
        return;
    }
    for (let idx = 1; idx <= text.length; idx++) {
        let str = text.substr(0, idx);
        // console.log(str, context.measureText(str).width, fitWidth);
        if (context.measureText(str).width > fitWidth) {
            context.fillText( text.substr(0, idx-1), x, y );
            printAt(context, text.substr(idx-1), x, y + lineHeight, lineHeight, fitWidth);
            return;
        }
    }
    context.fillText( text, x, y );
}

function addPicture(ctx, dir, name, x, y, dx=743, dy=1038) {
    let base_image = new Image();
    base_image.src = `visuals/templates/${dir}/${name}.png`;
    base_image.onload = function() {
        ctx.drawImage(base_image, x, y, dx, dy);
    }
    // console.log(base_image.src);
}

function modelCard() {
    // const btn = document.getElementById("card-submit");
    const unique = document.getElementById("is-unique").checked;
    const cardType = document.getElementById("card-type").value;
    const cardColor1 = document.getElementById("card-color-1").value;
    const cardColor2 = document.getElementById("card-color-2").value;
    let cardName = document.getElementById("card-name").value;
    const cardText = document.getElementById("card-text");
    const cardAP = document.getElementById("card-ap").value;
    const cardMagic = document.getElementById("card-magic").value;
    const cardSpec = [
        document.getElementById("spec-1").value,
        document.getElementById("spec-2").value,
        document.getElementById("spec-3").value,
        document.getElementById("spec-4").value];
    const cardOr = [
        document.getElementById("card-or-1").checked,
        document.getElementById("card-or-2").checked,
        document.getElementById("card-or-3").checked];
    const cardTribe = document.getElementById("card-tribe").value;
    const patronAffect = document.getElementById("patron-affect").value;
    const artifactCost = document.getElementById("artifact-cost").value;
    const multiMagic = [
        ["order", document.getElementById("multi-magic-1").checked],
        ["life", document.getElementById("multi-magic-2").checked],
        ["pure", document.getElementById("multi-magic-3").checked],
        ["will", document.getElementById("multi-magic-4").checked],
        ["chaos", document.getElementById("multi-magic-5").checked]];
    const planTrigger = document.getElementById("plan-trigger").value;

    const canvas = document.querySelector("#card-gen-back")
    const ctx = canvas.getContext("2d");
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    addPicture(ctx, "backdrop", cardType, 0, 0);
    
    if (cardColor1 != "artifact" && cardColor2 != "artifact") {
        
        let grd = ctx.createLinearGradient(0, 0, 1038, 0);
        grd.addColorStop(0, COLORCODE[cardColor1]);
        grd.addColorStop(1, COLORCODE[cardColor2]);

        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, 743, 1038);
    }

    ctx.globalCompositeOperation = "hard-light";

    const canvasTop = document.querySelector("#card-gen-front")
    const ctxTop = canvasTop.getContext("2d");

    addPicture(ctxTop, "util", "borders_black", 0, 0);
    
    ctxTop.clearRect(0, 0, canvasTop.width, canvasTop.height);
    if (cardColor1 != cardColor2) {
        addPicture(ctxTop, "multi", cardType + "_multi_flag", 0, 0);
    } else {
        addPicture(ctxTop, "mono", cardType + "_mono_flag", 0, 0);
    }

    let prefix = "";
    
    if (cardType == "action" || cardType == "preparation" || cardType == "action_preparation") {
        prefix = "act_";
    } else if (cardType == "plan") {
        prefix = "plan_";
    } else if (cardType == "patron") {
        prefix = "pat_";
    } else if (cardType == "artifact") {
        prefix = "art_";
    } else if (cardType == "adventurer" || cardType == "token") {
        prefix = "adv_";
    }

    let shift = 0;
    let bottomShift = 0;

    for (let i=4; i>=0; i--) {
        if (prefix == "adv_") {
            if (cardType == "token") { bottomShift = 310 }
            if (multiMagic[i][1]) {
                addPicture(ctxTop, "magic", prefix + multiMagic[i][0], 660-shift, 472+bottomShift, 51, 96);
                shift += 60;
            }
        } else if (prefix == "art_" && multiMagic[i][1]) {
            addPicture(ctxTop, "magic", prefix + multiMagic[i][0], 0, 0);
        }
    }

    if (prefix != "adv_" && prefix != "art_" && cardMagic != "none") {
        addPicture(ctxTop, "magic", prefix + cardMagic, 0, 0);
    }

    const canvasText = document.querySelector("#card-gen-text")
    const ctxText = canvasText.getContext("2d");

    ctxText.clearRect(0, 0, canvasText.width, canvasText.height);

    let specShift = 0;
    let orShift = 0;
    if (cardType == "plan") {
        specShift = 148;
        orShift = 148;
    }

    if (cardType != "artifact" || cardType != "patron") {
        for (let j=0; j<3; j++) {
            if (cardOr[j]) {
                addPicture(ctxText, "util", "or", 12, 222+orShift, 82, 55);
                orShift += 97;
            }
        }

        for (let i=0; i<4; i++) {
            if (cardSpec[i] != "none") {
                addPicture(ctxText, "spec", cardSpec[i], 12, 160+specShift, 82, 82);
                specShift += 97;
            }
        }

    }

    if (unique) {
        cardName = "\u2730 " + cardName + " \u2730";
    }

    ctxText.font = "bold 48px roboto condensed";
    ctxText.textAlign = "center";
    if (cardType == "patron" || cardType == "plan") {
        ctxText.fillText(cardName, 372, 57, 640);
    } else if (cardName.length <= 20) {
        ctxText.fillText(cardName, 372, 57, 500);
    } else {
        ctxText.fillText(cardName, 400, 57, 500);
    }
    
    let typeShift = 0;

    if (cardType == "plan") {
        typeShift = 218;
    } else if (cardType == "token") {
        typeShift = 310;
    }

    if (cardType != "artifact") {
        ctxText.font = "40px roboto condensed";

        if (cardTribe.length <= 20) {
            ctxText.fillText(cardTribe, 372, 533+typeShift, 560);
        } else {
            ctxText.fillText(cardTribe, 400, 533+typeShift, 560);
        }
    } else {
        ctxText.font = "bold 72px roboto condensed";
        ctxText.fillText(artifactCost, 685, 1002, 100);
    }

    if (cardType == "patron") {
        ctxText.font = "bold 72px roboto condensed";
        ctxText.fillText(patronAffect, 50, 545, 80);
    }

    if (cardType == "adventurer" || cardType == "token") {
        ctxText.font = "bold 72px roboto condensed";
        ctxText.fillText(cardAP, 55, 80, 80);
    } else if (cardType == "action" || cardType == "action_preparation") {
        ctxText.font = "bold 72px roboto condensed";
        ctxText.fillText(cardAP, 55, 85, 80);
    }

    if (cardType == "plan") {
        ctxText.font = "30px serif";
        ctxText.textAlign = "left";

        let fitWidth = 660;
        let lineHeight = 35;

        let planStrings = Math.ceil(ctxText.measureText(planTrigger).width / fitWidth);
        let offsetPlan = (175 - lineHeight * planStrings) / 2;

        printAt(ctxText, planTrigger, 40, 115+offsetPlan, lineHeight, fitWidth)
        // ctxText.fillText(planTrigger, 50, 200, 560);
        // HERE HERE HERE HERE HERE HERE HERE HERE HERE 
    }
}


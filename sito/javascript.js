function gestoreMoveR() {
	try{
		slide_home(index +=1);
	} catch(e) {
		alert("gestoreMoveR" + e);
	}
}

function gestoreMoveL() {
	try{
		slide_home(index -=1);
	} catch(e) {
		alert("gestoreMoveL" + e);
	}
}

function slide_home(n) {
	try{
		var slides = document.getElementsByClassName("slider_item");

		if (n > slides.length-1) {
			index = 0;
		}
		else if (n < 0) {
			index = slides.length-1;
		}
		for (var i = 0; i < slides.length; i++) {
			slides[i].style.display = "none";
		}
		slides[index].style.display = "block";
	} catch(e) {
		alert("slide_home" + e);
	}
}

function gestoreCursor() {
	try {
		this.style.cursor = "pointer";
	} catch(e) {
		alert("gestoreCursor " + e);
	}
}

function imgZmIn() {
	try {
		this.style.height = imgHeight * 3 + "px";
		this.style.width = imgWidtht * 3 + "px";
		this.style.cursor = "zoom-out";
	} catch(e) {
		alert("imgZmIn " + e);
	}
}

function imgZmOut() {
	try {
		this.style.height = imgHeight + "px";
		this.style.wight = imgWidtht + "px";
		this.style.cursor = "none";
	} catch(e) {
		alert("imgZmOut " + e);
	}
}

function slider_keyboard(k) {
	try{
		switch (k.keyCode){
			case 37:
				return gestoreMoveL();
				break;
			case 39:
				return gestoreMoveR();
				break;
		};
	} catch(e){
		alert("slider-keyboard " + e);
	}
}

function gestoreDragStart(event) {
	try{
		event.dataTransfer.setData("text", this.id);
	} catch(e){
		alert("gestoreDragStart " + e);
	}
}

function gestoreDragEnter(event) {
	try{
		if (!this.classList.contains("onPlace")) {
			this.classList.add("place-hover");
		}
	} catch(e){
		alert("gestoreDragEnter " + e);
	}
}

function gestoreDragOver(event) {
	try{
		if (!this.classList.contains("onPlace")) {
			event.preventDefault();
		}
	} catch(e){
		alert("gestoreDragOver " + e);
	}
}

function gestoreDragLeave(event) {
	try{
		if (!this.classList.contains("onPlace")) {
			this.classList.remove("place-hover");
		}
	} catch(e){
		alert("gestoreDragLeave " + e);
	}
}

function gestoreDrop(event){
	try{
		event.preventDefault();
		this.classList.remove("place-hover");
		var symbolData = event.dataTransfer.getData("text");
		var placeData = this.getAttribute("data-symbols-id");
		var correctChoice = symbolData === placeData;
		if (correctChoice) {
			var symbol = document.getElementById(symbolData);
			this.classList.add("onPlace");
			symbol.classList.add("choice");
			symbol.setAttribute("draggable", "false");
			this.appendChild(document.getElementById(symbolData));
			correct++;
		}
		if (correct===nodoSymbols.length) {
			nodoOk.style.display = "block";
			};
	} catch(e){
		alert("gestoreDrop " + e);
	}
}

function gestoreTabNav() {
	try {
		var currentGroup = this.getAttribute("data-group");
		for (var i = 0; i < nodoTabsNav.length; i++) {
			if (nodoTabsNav[i].getAttribute("data-group") == currentGroup) {
				nodoTabsNav[i].classList.remove('is-active');
			}
		};
		this.classList.add('is-active');
		var tabName = this.getAttribute("data-name");
		gestoreTabContent(tabName, currentGroup);
	} catch(e) {
		alert("gestoreTabNav " + e);
	}
}

function gestoreTabContent(tabName, group) {
	try {
		for (var i = 0; i < nodoTabContent.length; i++) {
			if (nodoTabContent[i].classList.contains(group)) {
				if (nodoTabContent[i].classList.contains(tabName)) {
					nodoTabContent[i].classList.add('is-active');
					}
				else {
					nodoTabContent[i].classList.remove('is-active');
				}
			}
		}
	} catch(e) {
		alert("gestoreTabContent " + e);
	}
}

function gestoreInfoOn() { 
	try{
		nodoModal.style.display = "block";
	} catch(e) {
		alert("gestoreInfoOn" + e);
	}
}

function gestoreInfoOff() {
	try{
		nodoModal.style.display = "none";
	} catch(e) {
		alert("gestoreInfoOff" + e);
	}
}

var nodoMoveR;
var nodoMoveL;
var index = 0;
var moveCursor;
var nodoImgs;
var imgHeight;
var imgWidtht;
var nodoSymbols;
var nodoPlaces;
var nodoOk;
var correct = 0;
var nodoTabsNav;
var nodoTabContent;
var nodoInfoOn;
var nodoInfoOff;
var nodoModal;

function gestoreLoad() {
	try{
		nodoMoveR = document.getElementById("move_r");
		nodoMoveR.onclick = gestoreMoveR;

		nodoMoveL = document.getElementById("move_l");
		nodoMoveL.onclick = gestoreMoveL;
		
		moveCursor = document.getElementsByClassName("move");
		for (var i = 0; i < moveCursor.length; i++) {
			moveCursor[i].onmouseover = gestoreCursor
		};

		nodoImgs = document.getElementsByClassName("img_home");
		for (var i = 0; i < nodoImgs.length; i++) {
			nodoImgs[i].onmouseover = imgZmIn;
			nodoImgs[i].onclick = imgZmOut;
			imgHeight = nodoImgs[i].clientHeight;
			imgWidtht = nodoImgs[i].clientWight;
		};

		document.onkeydown = slider_keyboard;

		nodoSymbols = document.getElementsByClassName("symbols");
		for (var i = 0; i < nodoSymbols.length; i++) {
			nodoSymbols[i].onmouseover = gestoreCursor;
			nodoSymbols[i].ondragstart = gestoreDragStart;
		};

		nodoPlaces = document.getElementsByClassName("places");
		for (var i = 0; i < nodoPlaces.length; i++) {
			nodoPlaces[i].ondragenter = gestoreDragEnter;
			nodoPlaces[i].ondragover = gestoreDragOver;
			nodoPlaces[i].ondragleave = gestoreDragLeave;
			nodoPlaces[i].ondrop = gestoreDrop;
		};

		nodoOk = document.getElementById("ok");

		nodoTabsNav = document.getElementsByClassName("tabs-nav_item");
		for (var i = 0; i < nodoTabsNav.length; i++) {
			nodoTabsNav[i].onmouseover = gestoreCursor;
			nodoTabsNav[i].onclick = gestoreTabNav;
		};

		nodoTabContent = document.getElementsByClassName("tab");

		nodoInfoOn = document.getElementById("info");
		nodoInfoOn.onmouseover = gestoreCursor;
		nodoInfoOn.onclick = gestoreInfoOn;
		
		nodoInfoOff = document.getElementById("close");
		nodoInfoOff.onmouseover = gestoreCursor;
		nodoInfoOff.onclick = gestoreInfoOff;

		nodoModal = document.getElementById("infoModal");
	} catch(e) {
		alert("gestoreLoad" + e);
	}
};
window.onload = gestoreLoad;
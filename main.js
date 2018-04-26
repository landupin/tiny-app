var isAnimating = false,
showMenu = true;

document.querySelector('[aria-label="menu"').addEventListener("click", function (ev) {
if (isAnimating === true) {
    return false;
}


var animEndEventName = "animationend",
    $module = document.querySelector("nav");
//inClass = ["pt-page-moveFromBottom"];

showMenu = ($module.getAttribute("aria-hidden") === "true");
var inClass = showMenu ? getAnimation(3)[1] : getAnimation(4)[0];


if (showMenu) {
    $module.setAttribute("aria-hidden", "false");
    $module.style.visibility = "visible";
}

inClass.forEach(Class => {
    $module.classList.add(Class);
});

$module.addEventListener(animEndEventName, function () {
    $module.removeEventListener(animEndEventName, this);
    //onEndAnimation($nextPage, inClass, showMenu);
    if (!showMenu) {
        $module.setAttribute("aria-hidden", "true");
        $module.classList.remove("page-current");
    }

    resetPage($module, inClass);
    isAnimating = false;
});

function resetPage($inpage, inClass) {
    $inpage.style.visibility = "";
    inClass.forEach(Class => {
        $inpage.classList.remove(Class);
    });

    if (!$inpage.classList.contains("page-current")) {
        $inpage.classList.add("page-current")
    }
}
});

document.querySelector('[aria-label="next"]').addEventListener("click", function (ev) {
animate("next")
});

document.querySelector('[aria-label="previous"]').addEventListener("click", function (ev) {
animate("prev")
});

document.addEventListener("keydown", function (ev) {
switch (ev.key) {
    case "ArrowUp":
    case "ArrowLeft":
        animate("previous");
        break;

    case " ":
        document.querySelector('[aria-label="menu"]').click();
        break;
    case "ArrowDown":
    case "ArrowRight":
        //right Arrow => next
        animate("next");
}
});

function animate(to, animationKey) {
if (isAnimating) {
    return false;
}

isAnimating = true;

var animEndEventName = "animationend",
    $pages = document.querySelectorAll("article.page"),
    $currPage = document.querySelector(".page-current");

if (to === "next") {
    $nextPage = ($currPage !== $pages[$pages.length - 1]) ? $currPage.nextElementSibling : $pages[0];
} else {
    $nextPage = ($currPage !== $pages[0]) ? $currPage.previousElementSibling : $pages[$pages.length - 1];
}

if (animationKey === undefined) {
    animationKey = getRandomInt(67) + 1;
}

$nextPage.classList.add("page-current");

var outClass = getAnimation(animationKey)[0],
    inClass = getAnimation(animationKey)[1];

/***********************/

//$currPage.classList.add(outClass);
outClass.forEach(Class => {
    $currPage.classList.add(Class);
});

$currPage.addEventListener(animEndEventName, function () {
    $currPage.removeEventListener(animEndEventName, this);
    endCurrPage = true;
    onEndAnimation($currPage, $nextPage, outClass, inClass);
});

//$nextPage.classList.add(inClass);
inClass.forEach(Class => {
    $nextPage.classList.add(Class);
});
$nextPage.addEventListener(animEndEventName, function () {
    $nextPage.removeEventListener(animEndEventName, this);
    endNextPage = true;
    onEndAnimation($currPage, $nextPage, outClass, inClass);
});
}

function onEndAnimation($outpage, $inpage, outClass, inClass) {
endCurrPage = false;
endNextPage = false;
resetPage($outpage, outClass, $inpage, inClass);
isAnimating = false;
}

function resetPage($outpage, outClass, $inpage, inClass) {
$outpage.classList.remove("page-current");

//$outpage.classList.remove(outClass);
outClass.forEach(Class => {
    $outpage.classList.remove(Class);
});
//$inpage.classList.remove(inClass);
inClass.forEach(Class => {
    $inpage.classList.remove(Class);
});

if (!$inpage.classList.contains("page-current")) {
    $inpage.classList.add("page-current")
}
}

function getRandomInt(max) {
return Math.floor(Math.random() * Math.floor(max));
}
var isAnimating = false,
    isTouchDown = false,
    currentClass = "page-current",
    qCurrentClass = ".page-current",
    onPageClass = "page-onscreen",
    qOnPageClass = ".page-onscreen",
    animEndEventName = "animationend";

document.querySelector('[aria-label="menu"]').addEventListener("click", function (ev) {
    if (isAnimating === true) {
        return false;
    }

    isAnimating = true;

    var animEndEventName = "animationend",
        $nav = document.querySelector("nav"),
        isMenuUp = $nav.classList.contains(currentClass),
        moveClass = isMenuUp ? getAnimation(12)[0] : getAnimation(11)[1];

    function handleButtonClose(ev) {
        document.querySelector('[aria-label="menu"]').click();
    }

    if (isMenuUp) {
        document.querySelector("button.button-close").removeEventListener("click", handleButtonClose);
        animateMenu($nav, true, document.querySelector(qOnPageClass));
    } else {
        animateMenu(document.querySelector(qCurrentClass), false, $nav);
        document.querySelector("button.button-close").addEventListener("click", handleButtonClose);
    }

    function animateMenu($wasCurrent, removeMenu, $becomesCurrent) {
        //unmake wasCurrent currentPage
        $wasCurrent.classList.remove(currentClass);
        if (!removeMenu) {
            //put menu on screen
            $nav.classList.add(onPageClass);
        }
        //add animation classes
        moveClass.forEach(Class => {
            $nav.classList.add(Class);
        });
        //at the end of animation
        $nav.addEventListener(animEndEventName, function handleEndAnimation() {
            //remove this listener
            $nav.removeEventListener(animEndEventName, handleEndAnimation);
            if (removeMenu) {
                //remove menu from screen
                $nav.classList.remove(onPageClass);
            }
            //remove animation classes
            moveClass.forEach(Class => {
                $nav.classList.remove(Class);
            });
            //set nav as currentPage
            $becomesCurrent.classList.add(currentClass);
            isAnimating = false;
        });
    }
});

document.addEventListener("keydown", function (ev) {
    if (ev.key === " ") {
        document.querySelector('[aria-label="menu"]').click();
    }

    switch (ev.key) {
        case "Enter":
        case "ArrowDown":
        case "ArrowRight":
            document.querySelector('[aria-label="next"]').click();
            break;
        case "ArrowUp":
        case "ArrowLeft":
            document.querySelector('[aria-label="previous"]').click();
            break;
        case " ":
            document.querySelector('[aria-label="menu"]').click();
            break;
    }
});

document.querySelector('[aria-label="next"]').addEventListener("click", function (ev) {
    changePage(true);
});

document.querySelector('[aria-label="previous"]').addEventListener("click", function (ev) {
    changePage(false);
});

function changePage(toNext) {
    // abort if already animating or menu is open
    if (isAnimating || document.querySelector(qCurrentClass) === document.querySelector("nav")) {
        return false;
    }

    //block other animations
    isAnimating = true;

    var $currentPage = document.querySelector(qCurrentClass),
        $pages = document.querySelectorAll("article.page"),
        $upPage = undefined,
        animationKey = getRandomInt(67) + 1,
        outClass = getAnimation(animationKey)[0],
        inClass = getAnimation(animationKey)[1];

    //get upPage
    if (toNext) {
        $upPage = ($currentPage === $pages[$pages.length - 1]) ? $pages[0] : $currentPage.nextElementSibling;
    } else {
        $upPage = ($currentPage === $pages[0]) ? $pages[$pages.length - 1] : $currentPage.previousElementSibling;
    }

    //there is no current page
    $currentPage.classList.remove(currentClass);
    //both pages are onscreen for animation
    $upPage.classList.add(onPageClass);

    //add animation classes
    outClass.forEach(Class => {
        $currentPage.classList.add(Class);
    });
    $currentPage.addEventListener(animEndEventName, function handleEndAnimation() {
        //remove this eventListener
        $currentPage.removeEventListener(animEndEventName, handleEndAnimation);
        //remove animation classes
        outClass.forEach(Class => {
            $currentPage.classList.remove(Class);
        });
        //remove page from screen
        $currentPage.classList.remove(onPageClass);
        // free animating
        isAnimating = false;
    })

    inClass.forEach(Class => {
        $upPage.classList.add(Class);
    });
    $upPage.addEventListener(animEndEventName, function handleEndAnimation() {
        //remove this eventListener
        $upPage.removeEventListener(animEndEventName, handleEndAnimation);
        //remove animation classes
        inClass.forEach(Class => {
            $upPage.classList.remove(Class);
        });
        //set page as current page
        $upPage.classList.add(currentClass);
        // free animating
        isAnimating = false;
    })
}

//helper function
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


/**** TEST */
document.querySelectorAll("article.page").forEach(element => {
    element.addEventListener("touchstart", function handler(ev) {
        isTouchDown = true;
        document.querySelector('[aria-label="next"]').click();
    });
});

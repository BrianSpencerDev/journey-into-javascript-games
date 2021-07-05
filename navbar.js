function toggleNav() {

    console.log("you clicked");
    const navList = document.getElementById("nav-list");

    if (navList.style.display === "none") {
        navList.style.display = "flex";
    }
    else {
        navList.style.display = "none";
    }
}
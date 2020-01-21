$(document).ready(function(){
    // Sidebar initialization
    $('.sidenav').sidenav();

    // Tooltip initialization
    $('.tooltipped').tooltip();

    navEventListners();

});

function navEventListners() {
    const nav_user = document.getElementById('nav-user');
    nav_user.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        toggleLogoutOption();
    });

    document.addEventListener('click', function (e) {
      
        if (! e.target.closest('#nav-user')) {
            const logout_option = document.querySelector('.logout-option');

            if (logout_option.classList.contains('lg-active')) {
                logout_option.classList.remove('lg-active');
            }
        }
    });
}

function toggleLogoutOption (class_name='lg-active') {

    const logout_option = document.querySelector('.logout-option');

    if (! logout_option.classList.contains(class_name)) {
        logout_option.classList.add(class_name);
    } else {
        logout_option.classList.remove(class_name);
    }
}

window.onload = function() {

    const nav_user = document.getElementById('nav-user');
    console.log(nav_user);
    nav_user.addEventListener('click', function (e) {
        console.log('here');
        e.preventDefault();
       toggleLogoutOption();
    });

    document.onclick = function (e) {
        
        if (! e.closest('#nav-user')) {
            toggleLogoutOption();
        }
    }
}

function toggleLogoutOption () {

    const logout_option = document.querySelector('logout-option');

    if (! logout_option.classList.contains('active')) {
        logout_option.classList.add('active');
    } else {
        logout_option.classList.remove('active');
    }
]
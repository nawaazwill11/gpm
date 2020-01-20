window.onload = function () {

    activateListeners();
    
}


function activateListeners() {
    
    // tipClickListener();

    authClickListner();
}

function tipClickListener() {
    const close_tip = document.querySelector('.close-tip');
    close_tip.addEventListener('click', function () {
        const tip = document.querySelector('.tip');
        
        // Hide tip
        tip.classList.add('hide-tip');
        
        // Hide close button
        this.style.display = 'none';
    });
    
}

function authClickListner() {
    const authorize = document.querySelector('.authorize');
    const auth_button = authorize.querySelector('a');
    const auth_text = authorize.querySelector('span');
    const loader = authorize.querySelector('.loader');
    const connection = document.querySelector('.connection');

    function onRequest() {
        auth_button.classList.add('disabled');
        // Change button text
        auth_text.innerText = 'Authorizing';
        // Show loader
        loader.style.zIndex = 1;
        // Make a authorization request
        makeRequest(); 
    }

    function makeRequest() {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                onResponse(JSON.parse(xmlhttp.responseText));
            }
        };
        xmlhttp.open('GET', '/people/auth', true);
        xmlhttp.send();
    }
    
    function onResponse(response) {
        console.log(response);
        if (response.error) onError(response.error.error);
        else if(response.fresh) {
            redirect(response.url); // Redirect to signin.
            ping(); // Ping and wait for authorization.
        }
        else {
            onSuccess();
        }
    }

    function onSuccess() {
        setTimeout(function () {

            auth_button.classList.remove('disabled'); // Re-enable button
            loader.style.zIndex = 0; // Hide loader
            
            connection.children[1].innerText = 'Online';      
            // Change status color
            connection.children[0].style.backgroundColor = '#5cde61';
            // Change status text
            auth_text.innerText = 'Unauthorize'; // Change button text
            
            // Notify with a toast
            M.toast({html: 'Authentication complete.'})
            
        }, 4000);

        // Stop the ping.
        if (evt_source) evt_source.close();
    }
    function onError(error) {

        // Change status color
        connection.children[0].style.backgroundColor = 'orange';
        // Change status text
        auth_text.innerText = 'Reuthorize'; // Change button text
        // Notify with a toast
        M.toast({html: 'Authentication failed.'});
        // Throw error on console.
        console.error(error);
    }

    function redirect(url) {
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('target', '_blank');
        document.querySelector('body').appendChild(link);
        link.click();
        link.parentElement.removeChild(link);
    }

    function ping() {
        evt_source = new EventSource('/people/ping',  {withCredentials: true});
        // open connection
        evt_source.onopen = function (e) {
            console.log('opened');
        };
        // listen to messages
        evt_source.onmessage = function (e) {
            const response = JSON.parse(e.data);
            if (response.success) onSuccess();
            else if (response.error) onError(response.error.error);
            console.log(response);
        };
    }

    auth_button.addEventListener('click', function () {
        onRequest(); // Change components before request
    });
}

let evt_source;

window.onbeforeunload = function () {
    evt_source.close(); // close event stream. 
};
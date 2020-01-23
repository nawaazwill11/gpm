window.onload = function () {

    activateListeners();

    const submit = document.querySelector('#submit');
    submit.onclick = function () {
        changePassword();
    }

    setAuthorized();
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
            console.log(response.fresh);
            redirect(response.url); // Redirect to signin.
            ping(); // Ping and wait for authorization.
        }
        else {
            console.log('here');
            onSuccess();
        }
    }

    function onSuccess() {
        setTimeout(function () {

            auth_button.classList.remove('disabled'); // Re-enable button
            loader.style.zIndex = 0; // Hide loader
            
            setAuthButton(true);
            
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
        console.log('redirected', url);
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
        if (authorize.classList.contains('auth')) {
            removeAuth();
        }
        else {
            onRequest(); // Change components before request
        }
    });
}

function removeAuth() {

    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            setAuthButton(false);
        }
    }
    xmlhttp.open('GET', '/removeauth', true);
    xmlhttp.send();
}

function setAuthorized() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            isAuthorized(xmlhttp.responseText);
        }
    }
    xmlhttp.open('GET', '/getauth', true);
    xmlhttp.send();
}

function isAuthorized(response) {
    console.log('here');
    if (response == 'true') {
        setAuthButton(true);
    }
}

function setAuthButton(bool) {
    const authbutton = document.querySelector('.authorize a');
    const connection = document.querySelector('.connection');

    if (bool) {
        authbutton.parentElement.classList.add('auth');
        authbutton.children[1].innerText = 'Unauthorize';
        connection.children[1].innerText = 'Online';      
        connection.children[0].style.backgroundColor = '#5cde61';
    }
    else {
        authbutton.parentElement.classList.remove('auth');
        authbutton.children[1].innerText = 'Authorize';
        connection.children[1].innerText = 'Offline';      
        connection.children[0].style.backgroundColor = '#ff1744';
        M.toast({html: 'Google account unlinked'});
    }
}

let evt_source;

window.onbeforeunload = function () {
    evt_source.close(); // close event stream. 
};

/**
 * Form submission
 */

function changePassword() {

    const form = getForm();
    if (form) {
        submitForm(form);
    }
}

function getForm() {

    const form_inputs = getFormInputs();
    if (form_inputs) {
        const form = new FormData();
        form.append('form', JSON.stringify(form_inputs));
        return form;
    }
    else {
        invalidInput();
    }
}

function getFormInputs() {

    const old_pass = document.querySelector('#old_password');
    const new_pass = document.querySelector('#new_password');
    const re_pass = document.querySelector('#re_password');
    return objectify(['old', 'new', 're'], validate([old_pass, new_pass, re_pass]));
}

function validate(input_list) {
    console.log(input_list);
    let input_values = [];
    let tampered = false;

    for(let i = 0; i < input_list.length; i++) {
        const input = input_list[i];
        const value = $.trim(input.value);

        if (!value.match(/^.{8,}$/)) {
            input.style.borderBottom = '1px solid #ff1744';
            input.parentElement.children[2].innerText = 'Invalid: Should have atleast 8 characters.';
            tampered = true;
        }
        else {
            input_values.push(value);
        }
    }
    if (tampered) {
        return false;
    }
    return input_values;
}

function objectify(keys, values) {
    console.log(values);
    if (values) {
        let obj = {};
        for(let i = 0; i < keys.length; i++) {
            obj[keys[i]] = values[i];
        }
        return obj;
    }
    return false;
}

function submitForm(form) {
  
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                parseResponse(xmlhttp.responseText);
            }
        }
        xmlhttp.open('POST', '/reset', true);
        xmlhttp.setRequestHeader('X-CSRF-TOKEN', $('meta[name="csrf-token"]').attr('content'));
        xmlhttp.send(form);
      
}

function parseResponse(response) 
{
    if (response == 'true') {
        M.toast({html: 'Password changed!'});

        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.value = '';
            input.parentElement.children[2].innerText = '';
        });
    } else {
        console.log(response);
        showError(response);
    }
}

function showError(error) {
    M.toast({html: error});
}

function invalidInput() {
    
}
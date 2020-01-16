// Stores recently clicked card
var g_card = null;

window.onload = async function () {

    // Fetch contact-details list.
    let contacts = await fetchContactDetails();

    // Begin response unpacking and card manufacturing.
    initializeInterface(contacts);

    // Floating button initialization.
    $(document).ready(function(){
        $('.fixed-action-btn').floatingActionButton({
            toolbarEnabled: true
        });
    });

    // Tooltip initialization
    $(document).ready(function(){
        $('.tooltipped').tooltip();
      });
   
   
}

/**
 * Generate alphabetic levels with associative alphabet
 * and cards with corresponding cards names
 * 
 * @param {Object} contacts 
 */

function initializeInterface(contacts) {

    if (contacts) {
        // Initiate card loading process.
        generateLevels(contacts);

        // Add event listeners to cards.
        addListeners();
    }
}

/**
 * Fetches returns the complete contact-details object list.
 * 
 * @return {Array} contact_details
 */

function fetchContactDetails() {

    return new Promise((resolve, reject) => {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {

            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                resolve(JSON.parse(xmlhttp.responseText));
            }
        }   
        xmlhttp.open('GET', '/loadContacts', true);
        xmlhttp.send();
    })
    .then(data => {
        return data;
    })
    .catch(error => {
    });
   
    // return [{
    //     icon: 'img/office.jpg',
    //     name: 'Rabindranath Tagore',
    //     contact: {
    //         phone: ['+919737177329', '+919558484794'],
    //         email: ['mastermindjim@gmail.com']
    //     }
    // }];
}

/**
 * Returns sorted contacts and letters for creating levels.
 * 
 * @param {Array} contacts 
 */

function generateLevels(contacts) {

    contacts = contactNamesCapitalize(contacts);
    let contact_names = getContactNames(contacts);
    let {sorted_names, sorted_contacts} = sortContactsByName(contacts, contact_names);
    let letter_sequence = getUniqueAlphabets(sorted_names);
    let letter_paired_contacts = pairContactsWithLetters(sorted_contacts, letter_sequence);
    
    addColor(letter_paired_contacts);

    // Add to localstorage for future uses.
    storeLocally(letter_paired_contacts);

    loadLevels(letter_paired_contacts);
}


function storeLocally(contacts) {

    const contacts_strgy = JSON.stringify(contacts);
    window.localStorage.setItem('contacts', contacts_strgy);
}


/**
 * Capitalizes the first letter of all contact names and
 * returns contacts object.
 * 
 * @param {Array} contacts 
 * 
 * @return {Array}
 */

function contactNamesCapitalize(contacts) {
    
    for(let i = 0; i < contacts.length; i++) {
        contacts[i].name = contacts[i].name[0].toUpperCase() + contacts[i].name.slice(1, );
    }

    return contacts;
}

/**
 * Return non-empty contact names.
 * 
 * @param {Array} contacts
 * 
 * @return {Map} 
 */

function getContactNames(contacts) {

    return contacts.map(function (contact, index, c_list) {
        if (!$.trim(contact.name)) return 'empty';

        return contact.name;
    });
}

/**
 * Sorts contacts by name and returns 
 * a sorted names' list and 
 * name-sorted contact object list.
 * 
 * @param {Array} names 
 * 
 * @return {Object}
 */

function sortContactsByName(contacts, name_list) {

    let sorted_names = name_list.sort();
    let sorted_contacts = [];
    let empty_contacts = [];
    let numeric_contact_names = [];

    for(let i = 0; i < sorted_names.length; i++) {
        for(let j = 0; j < contacts.length; j++) {
            if (sorted_names[i] === contacts[j].name) {
                sorted_contacts.push(contacts[j]);
                contacts.splice(j, 1);
                break;
            }
        }
    }

    return {sorted_names: sorted_names, sorted_contacts: sorted_contacts};
}

/**
 * Return set of alphabets.
 * 
 * @param {Array} name_list 
 * 
 * @return {Array}
 */

function getUniqueAlphabets(name_list) {
    
    let unique_letters = [];
    name_list.forEach(name => {
        if(unique_letters.indexOf(name[0]) === -1) {
            unique_letters.push(name[0]);
        }
    });

    return unique_letters;
}

/**
 * Return a list of objects containing pair of
 * letters with associative contact object.
 * 
 * @param {Array} sorted_contacts 
 * @param {Array} letter_sequence 
 * 
 * @return {Array}
 */

function pairContactsWithLetters(sorted_contacts, letter_sequence) {

    let paired_contacts = [];
    letter_sequence.forEach(letter => {
        let pair = {
            letter: letter,
            contacts: []
        };
        sorted_contacts.forEach(contact=> {
            if (contact.name[0] === letter) {
                pair.contacts.push(contact);
            }
        });
        paired_contacts.push(pair);
    });

    return paired_contacts;
}

/**
 * Add rabdomly selected color atrribute to 
 * each contact bundle.
 * 
 * @param {Object} contacts 
 * 
 * @return {Object}
 */

function addColor(contacts) {
    const colors = [
        '#8e24aa', // purple
        '#d81b60', // pink
        '#e53935', // red
        '#1e88e5', // blue
        '#3949ab', // indigo
        '#00897b', // teal
        '#00acc1', // cyan
        '#039be5', // light-blue
        '#9e9d24', // lime
        '#558b2f', // light-green
        '#f57c00', // orange
        '#ff8f00', // amber
        '#757575', // gray
        '#6d4c41', // brown
        '#455a64', // gray-blue
    ];
    for (let i = 0; i < contacts.length; i++) {
        contacts[i]['color'] = colors[genRand(0, colors.length)];
    }
    consoler(contacts);
}

/**
 * Return a random number within a provided range.
 * 
 * @param {Integer} min 
 * @param {Integer} max 
 * 
 * @return {Integer}
 */

function genRand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Loads cards into view.
 * 
 * @param  {Array} contact_details
 * 
 */

function loadLevels(contact_details) {

    let element = document.querySelector('.contact-container');
    for (let i = 0; i < contact_details.length; i++) {
        let card_str = makeLevel(contact_details[i]);
        let card_html = new DOMParser().parseFromString(card_str, "text/html");
        let card_body = card_html.querySelector('body .alphabet-level');
        element.appendChild(card_body);
    }

    // Add event listeners to new cards
    addCardEventListeners();
}


/**
 * Adds cards to page under their associated letter.
 * 
 * @param {Array} contacts 
 */

function makeLevel(contact) {

    let alphabet_level = function () {
        let alphabet = function () {
            return '<div class="alphabet"><span class="alpha-name">' + contact.letter + '</span><span class="contact-count">(' + contact.contacts.length + ')</span></div>';
        }
        
        let divider = '<div class="divider"></div>';
        let card_container = function () {
            let row = function () {
                let cards = '';
                
                for (let i = 0; i < contact.contacts.length; i++) {
                    let card_str = makeCards(contact.contacts[i], {color:contact.color, letter: contact.letter});
                    cards += card_str;
                }
                
                return '<div class="row">' + cards + '</div>';
            }
            
            return '<div class="card-container">' + row() + '</div>';
        }
        
        return '<div class="alphabet-level">' + alphabet() + divider + card_container() + '</div>';
    }
    
    return alphabet_level();
}

/**
 * Returns a complete card html string.
 * 
 * @param  {Object} contact
 */
function makeCards(contact, icon_extras) {

    let card_panel = function () {
        let icon = function () {
           let content;
           if (contact.icon) {
               content = '<img src="img/' + contact.icon + '">'
           } else {
               content = icon_extras.letter;
           }
        
           return '<div class="card-image"><div class="icon-container " style="background-color: ' + icon_extras.color + '">' + content + '</div></div>';
        }
        
        let card_content = function () {
            let name = '<div class="contact-name"><span class="truncate">' + contact.name + '</span></div>';
            let phone_contact = contact.contact.phone;
            let mail_contact = contact.contact.email;
            let phone_count = phone_contact.length;
            let mail_count = mail_contact.length;
            let infograph = function () {
                function infoG(icon, count) {
                    return '<div class="info_g"><i class="material-icons prefix icon">' + icon + '</i><span class="count">' + count + ' </span></div>';
                }
                let info_g = infoG('phone', phone_count) + infoG('mail_outline', mail_count);
                return '<div class="infograph">' + info_g + '</div>'
            }
            let contact_details = function () {
                function info(icon, list, count) {
                    let info = '<div class="contact-content">';
                    for (let i = 0; i < count; i++) {
                        info += '<div class="info"><i class="material-icons prefix icon">' + icon + '</i><span class="contact">' + list[i] + '</span></div>';
                    }
                    return info + '</div>';
                }
                let phone_info = info('phone', phone_contact, phone_count);
                let mail_info = info('mail_outline', mail_contact, mail_count);
                return '<div class="contact-details">' + phone_info + mail_info + '</div>';
            }
            let close = '<div class="close red"><i class="material-icons prefix tooltipped-s" data-position="top" data-tooltip="Collapse">clear</i></div>';
            let fab = '<div class="fixed-action-btn toolbar menu"><a class="btn-floating red"><i class="material-icons">menu</i></a> <ul><li class="tooltipped menu-item item_edit" data-position="bottom" data-tooltip="Edit" data-itemname="item_edit"><a class="btn-floating"><i class="material-icons">edit</i></a></li><li class="tooltipped menu-item item_delete" data-position="bottom" data-tooltip="Delete" data-itemname="item_delete"><a class="btn-floating"><i class="material-icons">delete</i></a></li><li class="tooltipped menu-item item_download" data-position="bottom" data-tooltip="Download" data-itemname="item_download"><a class="btn-floating"><i class="material-icons">file_download</i></a></li><li class="tooltipped menu-item item_info" data-position="bottom" data-tooltip="More" data-itemname="item_info"><a class="btn-floating"><i class="material-icons">info</i></a></li></ul></div>';
            
            return '<div class="card-content">' + name + infograph() + contact_details() + close + fab +'</div>';
        }

        return '<div class="card-panel hoverable contact-card">' + icon() + card_content() + '</div>';
    }

    return '<div class="col x12 s12 m6 l4 xl3 card-parent">' + card_panel() + '</div>';
}

/**
 * Adds various event listeners to the document.
 */

function addListeners() {

    // Contact-card click event
    const cards = getCardPanels();
    cardClickEvent(cards);
    
    // Card collapse button click event
    closeClickEvent();
    
    // Loads event listeners on the document
    documentListeners();
}

/**
 * Returns all contact cards elements
 * 
 * @return NodeList[]
 */
function getCardPanels() {

    return document.querySelectorAll('.card-parent');
}

/**
 * Adds click events to cards elements.
 * 
 * @param  {HTMLElement} cards
 */
function cardClickEvent(cards) {

    cards.forEach(card => {
        card.addEventListener('click', function () {
            // Performs card click toggles: expand 
            // or collapse
            cardViewToggler(card, true);
        })
    });
}

/**
 * Adds click event on close button (icon) 
 * that collapses the card.
 */

function closeClickEvent() {

    const collapsor = document.querySelectorAll('.close');
    collapsor.forEach(close => {
        close.addEventListener('click', function (e) {
            e.stopPropagation();

            const parent_card = e.target.closest('.card-parent');
            
            cardViewToggler(parent_card);
            restoreCard(parent_card)
        });
    });
}

/**
 * Listens to clicks on the document
 */

function documentListeners() {

    document.addEventListener('click', function (e) {
        // Outside-card clicks
        outsideCardClick(e.target);
    });
}

/**
 * Closes card if clicked outside the card.
 * 
 * @param {HTMLElement} target 
 */

function outsideCardClick(target) {

    if (! target.closest('.contact-card')) {
        const opened_card = document.querySelector('.card-active');
        console.log(opened_card);
        // hide cards only if the clicked target is a card
        // else it'll through null error for card not found error.
        if (opened_card) {
            cardViewToggler(opened_card);
        }
    }
}

/**
 * Toggles cards collapse / expand state.
 * 
 * @param  {HTMLElement} card
 * @param  {Boolean} bool
 */
function cardViewToggler(card, bool) {

    // Close previously opened cards
    if (g_card) {
        closePreviousCard(card);
    }
    // Toggle contact-card view.
    let active = isActive(card, 'card-active');
    if (active) {
        if (bool) {
            consoler('active->ignoring');
            return '';
        }
        removeClass(card, 'card-active');
        toggleContactCardExpand(card, removeClass);
        consoler('active->deactivating');
    }
    else {
        addClass(card, 'card-active');
        toggleContactCardExpand(card, addClass);
        consoler('inactive->activating');
    }
}

/**
 * End-point function to print messages on console.
 * 
 * @param {String} msg 
 */

function consoler(msg) {

    console.log(msg);
}

/**
 * Closes the previously open card if any.
 * 
 * @param {HTMLElement} clicked_card 
 */

function closePreviousCard(clicked_card) {
    
    if (g_card !== null && !(clicked_card == g_card)) {
        cardViewToggler(g_card);
    }
    g_card = clicked_card;
}

/**
 * Checks if that card is expanded 
 * i.e.contains an active class.
 * 
 * @param  {HTMLElement} card
 * @param  {String} class_name
 * @param  {Boolean} bool
 * 
 * @return bool
 */
function isActive(card, class_name) {

    if (! card.classList.contains(class_name)) {
        return false
    }

    return true;
}


/**
 * Toggles contact-card element's view by modifying:
 * 1. flex-direction property to
 *    expanded on collapsed view and vice versa.
 * 
 * @param  {HTMLElement} card
 */
function toggleContactCardExpand(card, callback) {

    const contact_card = card.querySelector('.contact-card');
    callback(contact_card, 'card-expand');
    toggleCardImage(card, callback)
}


/**
 * Toggles card-image element's view by modifying:
 * 1. Content justification.
 * 2. Child img element's width.
 * 
 * @param  {HTMLElement} card
 */

function toggleCardImage(card, callback) {

    const card_image = card.querySelector('.card-image');
    const icon_container = card.querySelector('.icon-container');
    const icon_container_image = icon_container.children[0];
    
    callback(card_image, 'card-image-expand');
    callback(icon_container, 'icon-container-expand');

    if (icon_container_image) {
        callback(icon_container_image, '.card-image-expand');
    }

    toggleCardContent(card, callback);

}

/**
 * Toggles card-content view by modifying:.
 * 
 * @param  {HTMLElement} card
 */

function toggleCardContent(card, callback) {

    const card_content = card.querySelector('.card-content');
    const infograph = card.querySelector('.infograph');
    const contact_details = card.querySelector('.contact-details');

    if (callback(card_content, 'content-expand')) {
        card_content.children[0].style.flex = 0;
        infograph.style.display = 'none';
        contact_details.style.display = 'flex';
        assignGcard(card);
        toggleCollapseButton(card, true);
        toggleFAB(card, true);
    }
    else {
        card_content.children[0].style.flex = 1;
        infograph.style.display = 'flex';
        contact_details.style.display = 'none';
        nullifyGCard();
        toggleCollapseButton(card, false);
        toggleFAB(card, false);
    }
}

/**
 * Adds a class to HTML element.
 * 
 * @param {HTMLElement} elem 
 * @param {String} class_name 
 * 
 * @return {Boolean}
 */

function addClass(elem, class_name) {
    
    elem.classList.add(class_name);

    return true;
}

/**
 * Removes a class to HTML element.
 * 
 * @param {HTMLElement} elem 
 * @param {String} class_name 
 * 
 * @return {Boolean}
 */

function removeClass(elem, class_name) {

    elem.classList.remove(class_name);

    return false;
}

/**
 * Toggles class-list with provided class name.
 * 
 * @param {HTMLElement} element
 * @param {String} class_name 
 * 
 */

function toggleClass(element, class_name) {
    if (hasClass(element, class_name)) {
        removeClass(element, class_name);
    } else {
        addClass(element, class_name);
    }
}

/**
 * Checks if a class exists in an elements class-list 
 * 
 * @param {HTMLElement} element 
 * @param {String} class_name 
 */

function hasClass(element, class_name) {
    return element.classList.contains(class_name);
}

/**
 * Sets global card variable.
 * 
 * @param {HTMLElement} card 
 */

function assignGcard(card) {

    g_card = card;
}
/**
 * Toggle card collapse button's display prop.
 * @param  {Boolean} bool
 */

function toggleCollapseButton(card, bool) {

    const close = card.querySelector('.close');
    if (bool) {
        close.style.display = 'flex';
    } else {
        close.style.display = 'none';
    }
} 

/**
 * Toggles floating action button's display prop.
 * 
 * @param {HTMLElement} card 
 * @param {Boolean} bool 
 */

function toggleFAB(card, bool) {

    const fab = card.querySelector('.menu');
    if (bool) {
        fab.style.display = 'block';
    } else {
        fab.style.display = 'none';
    }
}

/**
 * Sets global g_card to null
 */

function nullifyGCard() {

    g_card = null;
}

/**
 * Adds event listening capabilities to cards.
 */

function addCardEventListeners() {
    
     // Copy contacts on click
     toastableContact();

    menuItemsEventListeners();
}

/**
 * Adds event listenr to all card menu items.
 */

function menuItemsEventListeners() {

    // Edit button.
    editClickListener();

    // Delete button.
    deleteClickListener();

    // Download button.
    downloadClickListener();

    // Info button.
    infoClickListener();

}

/**
 * Edit menu item click events.
 */

function editClickListener() {
    const edits = document.querySelectorAll('.item_edit');
    edits.forEach(edit => {
        edit.addEventListener('click', function (e) {
            e.stopPropagation();
            const parent_card = this.closest('.card-parent');
            
            cardViewToggler(parent_card);

            const alphabet_level = this.closest('.alphabet-level');
            const alphabet = alphabet_level.querySelector('.alpha-name').innerText;

            const contacts = JSON.parse(window.localStorage.getItem('contacts'));

            let match;
            for(let i = 0; i < contacts.length; i++) {
                if (contacts[i].letter === alphabet) {
                    match = contacts[i];
                    break;
                }
            }

            const contact_name = alphabet_level.querySelector('.contact-name span').innerText;
            
            let clicked_contact

            for(let i = 0; i < match.contacts.length; i++) {
                if (match.contacts[i].name == contact_name) {
                    clicked_contact = match.contacts[i];
                    break;
                }
            }

            clicked_contact['letter'] = match.letter;
            clicked_contact['color'] = match.color;
    
            
            loadEditPanel(clicked_contact);
        });
    });
}

/**
 * delete menu item click events.
 */

function deleteClickListener() {
    //
}

/**
 * Download menu item click events.
 */

function downloadClickListener() {
    //
}

/**
 * 'More' menu item click events.
 */

function infoClickListener() {

    const infos = document.querySelectorAll('.item_info');
    infos.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation(); // disbales on card click event.
            // Get the current card
            addClass(this, 'selected');
            const parent = this.closest('.card-parent');
            const name = this.dataset.itemname;
            menuClickEvent(parent, name);

            // Removing click menu item from menu list
            // and adding overlay closures.
            fabClosure(parent, name);
        });
    });
}

/**
 * Adds fullscreen view to cards.
 * 
 * @param {HTMLElement} parent 
 * @param {String} item 
 */

function menuClickEvent(parent, item) {
    // Capture present width
    function getCurrentWidth (element) {

        return window.getComputedStyle(element).width;
    }
    // Get client-rect properties.
    function getOffset(element) {
        
        const parent_rect = parent.getBoundingClientRect();
        const offsetX = window.innerWidth / 2  - parent_rect.width / 2;
        const offsetY = window.innerHeight / 2 - parent_rect.height / 2;

        return {X: offsetX, Y: offsetY};
    }
    // Create a mid-point offsets.
    // (Used to place the card at the center of the screen).
    // Create a new stylesheet to add a fullscreen style to the card.
    function attachStyleSheet() {
        const style = document.createElement('style');
        style.type = 'text/css';
        styleText = '.fullscreen {position: fixed;transition: all 0.5s ease 0s;z-index: 100;display: flex;justify-content: center;';
        style.innerHTML = styleText;
        // Add stylesheet to head.
        document.getElementsByTagName('head')[0].appendChild(style);

        return 'fullscreen';
    }

    // Get current width (use for restoring position on fs exit).
    const current_width = getCurrentWidth(parent);
    
    // Add css for fullscreen view. 
    attachStyleSheet()
    parent.classList.add('fullscreen');
    
    // Get cards current co-ordinates on screen.
    const offset = getOffset(parent);
    parent.style.top = offset.Y + 'px';
    // Card's left positioning according to device with
    if (window.innerWidth < 600) {
        parent.style.left = 0 ;
    } 
    else {
        parent.style.left = offset.X + 'px' ;
    }

    // Keeping card's width to before click width
    parent.children[0].style.width = current_width;
    
    addOverlay(parent);

}

/**
 * Remove clicked item from fab menu.
 * 
 * @param {HTMLElement} element 
 * @param {String} item 
 */ 

function fabClosure(element, name) {

    // Triggers fab close method.
    $('.fixed-action-btn').floatingActionButton('close');

    // Hides clicked menu item.
    toggleMenuItem(element, name);

}

/**
 * Toggles menu item display prop. 
 * 
 * @param {HTMLElement} parent 
 * @param {String} item 
 */

function toggleMenuItem(parent, name) {
    const elem = parent.querySelector('.'+ name +'');
    if (elem.style.display == 'none') {
        elem.style.display = 'block';
    } else {
        elem.style.display = 'none';
    }
}

/**
 * Adds an overlay under card.
 * 
 * @param {HTMLElement} parent 
 */

function addOverlay(parent) {

    const overlay = $('<div class="overlay">'); 
    $('body').append(overlay);
    overlay.css({
        position: 'absolute',
        height: '100%',
        width: '100%',
        left: 0,
        top: 0,
        backgroundColor: '#d3d3d3c2',
        position: 'fixed',
        overflow: 'hidden',
    });
    overlay.click(function () {
        restoreCard(parent);
    });
}

/**
 * Removes the overlay under card.
 * 
 * @param {HTMLElement} parent 
 */


function removeOverlay(parent) {

    const overlay = document.querySelector('.overlay');
    if (overlay) {
        overlay.parentElement.removeChild(overlay);
        parent.classList.remove('fullscreen');
        parent.children[0].style.width = 'initial';
    }
}

/**
 * Destroys overlay and restores card
 * 
 * @param {HTMLElement} parent 
 */

function restoreCard(parent) {

    const element = document.querySelector('.selected');
    console.log('selected', element);
    toggleMenuItem(parent, element.dataset.itemname);
    removeClass(parent, 'selected');
    removeOverlay(parent);
}

/**
 * Adds click events to contacts
 */

function toastableContact() {

    const infos = document.querySelectorAll('.info');
    infos.forEach(info => {
        info.addEventListener('click', function () {
            const contact = info.querySelector('.contact').innerText;
            contactToClipboard(contact);
        });
    })
}


/**
 * Copies contents to clipboard.
 * 
 * @param  {String} value
 */
function contactToClipboard(value) {

    let input = document.createElement('input');
    input.setAttribute('value', value);
    document.body.appendChild(input);
    input.select();
    let result = document.execCommand('copy');
    document.body.removeChild(input);
    M.toast({html: 'Copied to clipboard!', classes: 'rounded'});

    return result;
}

/**
 * 
 * Edit form
 * 
 */

function loadEditPanel(contact) {
    const element = document.querySelector('body');
    let panel = makeEditPanel(contact);
    let panel_html = new DOMParser().parseFromString(panel, "text/html");
    let panel_body = panel_html.querySelector('body .econtainer');
    element.appendChild(panel_body);

    addCloseEditPanelListeners();
    
    fieldAdderListeners();

    deleleEContentListeners();

    M.updateTextFields();

    saveClickListener();
}

function makeEditPanel(contact) {
    const econtainer = function () {
        const _form = function () {
            const efixed = function () {
                const eimage_container = function () {
                    const content = contact.icon ? '<img src="img/' + contact.icon + '"' : 
                    '<span>' + contact.letter + '</span>';
                    
                    return '<div class="eimage-container"><div class="eimage" style="background-color: ' + contact.color + '">' + content + '</div></div>';
                }

                return ' <div class="efixed-content"><div class="econtent-layer">' + eimage_container() + '<div class="eimage-controls"><a class="waves-effect waves-light btn econtrols change">Change</a><a class="waves-effect waves-light btn econtrols remove">Remove</a></div></div></div>';
            };

            const evarible = function () {
                const name_segment = function () {
                    const name = contact.name.split(' ');
                    const firstname = name[0] || '';
                    const lastname = name[1] || '';

                    return '<div class="segment noadd" data-type="name"><div class="seg-title"><span class="title"><i class="material-icons small waves-effect">person_outline</i>Name</span></div><div class="divider"></div><div class="econtent-layer"><div class="fieldbox"><div class="input-field noop"><input id="firstname" type="text" value="' + firstname + '"><label for="firstname">First Name</label></div><div class="side-icon delete-icon"><i class="material-icons waves-effect">remove_circle</i></div></div></div><div class="econtent-layer"><div class="fieldbox"><div class="input-field noop"><input id="lastname" type="text" value="' + lastname + '"><label for="lastname">Last Name</label></div><div class="side-icon delete-icon"><i class="material-icons waves-effect">remove_circle</i></div></div></div></div>';
                };
                const phone_segment = function () {
                    function phoneLayer(series=1, number=null) {
                        
                        return '<div class="econtent-layer" data-series=' + series + '><div class="fieldbox"><div class="input-field"><input id="phone_' + series + '" type="text" value="' + number + '"><label for="phone_' + series + '">Phone number</label></div><div class="side-icon delete-icon"><i class="material-icons waves-effect">remove_circle</i></div></div></div>';
                    }

                    let layers = '';
                    if (contact.contact.phone.length) {
                        let phones = contact.contact.phone;
                        for(let i = 0; i < phones.length; i++) {
                            layers += phoneLayer(i+1, phones[i]);
                        }
                    } else {
                        layers = phoneLayer();
                    }

                    return '<div class="segment" data-type="phone"><div class="seg-title"><span class="title"><i class="material-icons small waves-effect ">phone</i>Phone</span></div><div class="divider"></div><div class="bottom-icon"><div class="adder"><i class="material-icons small waves-effect">add_circle</i></div></div>' + layers + '</div>';
                }
                const mail_segment = function () {
                    function mailLayer(series=1, address=null) {
                        return '<div class="econtent-layer"><div class="fieldbox"><div class="input-field low-marg"><input id="email_' + series + '" type="email" class="validate" value="' + address + '"><label for="email_' + series + '">Email Address</label><span class="helper-text" data-error="Invalid" data-success="right"></span></div><div class="side-icon delete-icon"><i class="material-icons waves-effect">remove_circle</i></div></div></div>';
                    }

                    let layers = '';
                    if (contact.contact.email.length) {
                        const mails = contact.contact.email;
                        for(let i = 0; i < mails.length; i++) {
                            layers += mailLayer(i+1, mails[0]);
                        }
                    } else {
                        layers = mailLayer();
                    }

                    return '<div class="segment" data-type="mail"><div class="seg-title"><span class="title"><i class="material-icons small waves-effect ">mail_outline</i>Mail</span></div><div class="divider"></div><div class="bottom-icon"><div class="adder"><i class="material-icons small waves-effect">add_circle</i></div></div>' + layers + '</div>'
                }

                return '<div class="evariable-content">' + name_segment() + phone_segment() + mail_segment() + '</div>';

            };

            return ' <form id="eform" class="eform">' + efixed() + '<div class="progress"><div class="indeterminate"></div></div>' + evarible() + ' <div class="eform-control"><div class="fc-icon undo"><a class="btn-floating waves-effect red tooltipped" data-tooltip="Undo changes" data-position="left"><i class="material-icons">undo</i></a></div><div class="fc-icon save"><a class="btn-floating waves-effect red tooltipped" data-tooltip="Save changes" data-position="right"><i class="material-icons">save</i></a></div></div></form>';
        };

        return '<div class="container econtainer"><div class="epanel z-depth-2"><div class="econtent">' + _form() + '</div><div class="eclose"><i class="material-icons red">close</i></div></div></div>';
    };

    return econtainer();
}


function addCloseEditPanelListeners() {
    
    function closeEContainer() {
        const econtainer = document.querySelector('.econtainer');
        econtainer.parentNode.removeChild(econtainer);
    }
 
    const eclose = document.querySelector('.eclose');
    eclose.addEventListener('click', function () {
        closeEContainer();
    });
}

function deleleEContentListeners() {

    const delete_icons = document.querySelectorAll('.delete-icon');

    delete_icons.forEach(icon => {
        icon.addEventListener('click', function () {

            // Removes the corresponding layer.
            function removeLayer(layer) {
                const input_field = layer.querySelector('.input-field');
                if (! input_field.classList.contains('noop')) {
                    layer.parentNode.removeChild(layer);
                } else {
                    emptyInput(layer);
                }
            }

            // Empties corresponding input's value.
            function emptyInput(layer) {
                let input_field = layer.querySelector('.input-field')
                let input = input_field.querySelector('input')
                input.value = '';
                input.focus();
                input.blur();
            }

            const segment = this.closest('.segment'); // Parent segment
            const layer = this.closest('.econtent-layer'); // Current layer
            const layers = segment.querySelectorAll('.econtent-layer'); // Layers in a segment
            
            // Remove current layer if its not the last layer
            // else empty the input box's value.
            if (layers.length > 1) {
                removeLayer(layer);
            } else{
                emptyInput(layer);
            }
        });
    });
}


function fieldAdderListeners() {
    const adders = document.querySelectorAll('.adder');
    adders.forEach(adder => {
        adder.addEventListener('click', function () {

            const segment = this.closest('.segment');
        
            segment.appendChild(makeLayer(segment));

            deleleEContentListeners();
        });
});

}

// Add during edit panel creation.
// editPanelListeners();

function makeLayer(segment) {

    function getLayerCount(segment) {

        const layers = segment.querySelectorAll('.econtent-layer');
        let count = 1;
        layers.forEach(layer => {
            const number = Number(layer.dataset.series);
            if (count < number) {
                count = number;
            }
        });

        return ++count;
    }

    // Returns a econtent layer dom object based on
    // type of segment.
    function getDOMObject(segment) {

        const series = getLayerCount(segment);
        const type = segment.dataset.type;
        let eclass='', placeholder = 'Phone Number', itype = 'text', iclass = '', helper = '';
        
        if (type === 'mail') {
            eclass = 'low-marg';
            iclass = 'validate';
            itype = 'email';
            placeholder = 'Email Address';
            helper ='<span class="helper-text" data-error="Invalid" data-success="Valid"></span>';
        } 

        const layer_str = '<div class="econtent-layer" data-series="' + series + '"><div class="fieldbox"><div class="input-field ' + eclass + '"><input id="'+ type + '-' + series + '" class="' + iclass + '" type="' + itype  + '" value=""><label for="'+ type + '-' + series + '">' + placeholder + '</label>' + helper + '</div><div class="side-icon delete-icon"><i class="material-icons waves-effect">remove_circle</i></div></div></div>';

        
        const layer_html = new DOMParser().parseFromString(layer_str, "text/html");
        return layer_html.querySelector('body .econtent-layer');

    }

    return getDOMObject(segment);
}


function saveClickListener() {
    const save = document.querySelector('.eform-control .save');
    save.addEventListener('click', function () {
        const eform = this.closest('.eform');
        const progress = eform.querySelector('.progress');
        progress.style.display = 'block';
        setTimeout(() => {
            M.toast({html: 'Contact updated!', classes: 'rounded', displayLength: 2000});
            progress.style.display = 'none';
        }, 3000);
    });
}

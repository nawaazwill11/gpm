// Stores recently clicked card
var g_card = null;

window.onload = async function () {
    // Fetch contact-details list.
    let contacts = await fetchContactDetails();
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
   
    // Copy contacts on click
    toastableContact();

}

function initializeInterface(contacts) {
    if (contacts) {
        // Initiate card loading process.
        loadCards(contacts);
        
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
 * Loads cards into view.
 * 
 * @param  {Array} contact_details
 */

 function loadCards(contact_details) {
    let element = document.querySelector('.card-container .row');
    for (let i = 0; i < contact_details.length; i++) {
        let card_str = makeCards(contact_details[i]);
        let card_html = new DOMParser().parseFromString(card_str, "text/html");
        let card_body = card_html.querySelector('body .card-parent');
        // // let htm_str = '<div class="col x12 s12 m6 l4 xl3 card-parent"> <div class="card-panel hoverable contact-card"><div class="card-image"><img src="img/office.jpg" alt="icon"></div><div class="card-content"><div class="contact-name"><span class="truncate">Rabindranath Tagore</span></div><div class="infograph"><div class="info_g"><i class="material-icons prefix icon">phone</i><span class="phone-count">2  </span></div><div class="info_g"><i class="material-icons prefix icon">mail_outline</i><span class="mail-count">1</span></div></div><div class="contact-details"><div class="contact-content"><div class="info"><i class="material-icons prefix icon">phone</i><span class="phone contact">+919737177329</span></div></div><div class="contact-content"><div class="info"><i class="material-icons prefix icon">mail_outline</i><span class="mail contact">mastermindjim@gmail.com</span></div></div></div></div></div></div>';
        element.appendChild(card_body);
    }

    // Add event listeners to new cards
    addCardEventListeners();
}

/**
 * Returns a complete card html string.
 * 
 * @param  {Object} contact
 */
function makeCards(contact) {
    let card_panel = function () {
        let icon = '<div class="card-image"><img src="' + contact.icon + '" alt="icon"></div>';
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
            let fab = '<div class="fixed-action-btn toolbar menu"><a class="btn-floating red"><i class="material-icons">menu</i></a><ul><li class="tooltipped menu-item" data-position="bottom" data-tooltip="Edit"><a class="btn-floating"><i class="material-icons">edit</i></a></li><li class="tooltipped menu-item" data-position="bottom" data-tooltip="Delete"><a class="btn-floating"><i class="material-icons">delete</i></a></li><li class="tooltipped menu-item" data-position="bottom" data-tooltip="Download"><a class="btn-floating"><i class="material-icons">file_download</i></a></li><li class="tooltipped menu-item" data-position="bottom" data-tooltip="More"><a class="btn-floating"><i class="material-icons">info</i></a></li></ul></div>';
            
            return '<div class="card-content">' + name + infograph() + contact_details() + close + fab +'</div>';
        }
        return '<div class="card-panel hoverable contact-card">' + icon + card_content() + '</div>';
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
        const opened_card = document.querySelector('.active');
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
    let active = isActive(card);
    if (active) {
        if (bool) {
            consoler('active->ignoring');
            return '';
        }
        removeClass(card, 'active');
        toggleContactCardExpand(card, removeClass);
        consoler('active->deactivating');
    }
    else {
        addClass(card, 'active');
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
function isActive(card, class_name, bool) {
    if (! card.classList.contains('active')) {
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
    const card_image_image = card_image.children[0];
    
    callback(card_image, 'card-image-expand');
    callback(card_image_image, 'image-expand');

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


function addCardEventListeners() {
    
    menuItemsEventListeners();
}

function menuItemsEventListeners() {
    const menu_items = document.querySelectorAll('.menu-item');
    menu_items.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation(); // disbales on card click event.
            const parent = this.closest('.card-parent');
            const parent_rect = parent.getBoundingClientRect();
            const offsetX = parent_rect.left - window.innerWidth / 2 + parent_rect.width / 2;
            const offsetY = parent_rect.top - window.innerHeight / 2 + parent_rect.height / 2
            const style = document.createElement('style');
            style.type = 'text/css';
            styleText = '.fullscreen {position: absolute;transition: all 0.5s ease 0s;transform: translate3d(' + -offsetX + 'px, ' + -offsetY + 'px, 0);left: 0px !important;z-index: 100;display: flex;justify-content: center;width:'+ window.innerWidth +'px}';            
            style.innerHTML = styleText;
            document.getElementsByTagName('head')[0].appendChild(style);
            parent.classList.add('fullscreen');

            const overlay = $('<div class="overlay">');
            $('body').append(overlay);
            overlay.css({
                position: 'absolute',
                height: '-webkit-fill-available',
                width: '-webkit-fill-available',
                left: 0,
                top: 0,
                backgroundColor: '#d3d3d3c2',
                position: 'fixed',
            });
            overlay.click(function () {
                parent.classList.remove('fullscreen');
                this.remove();
            });
        });
    });
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
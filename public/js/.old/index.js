$(document).ready(function(){

    $('.search-autocomplete').autocomplete({
      data: {
        "Apple": null,
        "Microsoft": null,
        "Google": 'https://placehold.it/250x250'
      },
    });
  });
  var instances;
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    instances = M.Collapsible.init(elems);
  });

  cc = $('.cc')[0];
function makeCollapsible(times) {
    for (let i = 1; i <= times; i++) {
        collapse = '<div class="col l4 collapse"><ul class="collapsible popout"><li><div class="collapsible-header"><i class="material-icons">filter_drama</i>' + i + 'First</div><div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div></li><li><div class="collapsible-header"><i class="material-icons">place</i>Second</div><div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div></li><li><div class="collapsible-header"><i class="material-icons">whatshot</i>Third</div><div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div></li></ul></div>';
        colHTML = $.parseHTML(collapse)[0];
        cc.append(colHTML);
    }
}
makeCollapsible(10);

var collapsible = null;
$(document).click(function (e) {
    
    if (e.target.closest('.collapsible')) {
        let current_collapsible = e.target.closest('.collapsible');
        if (collapsible) {
            if (collapsible.parentElement !== current_collapsible.parentElement) {
                console.log('Different collapsible');
                let index;
                let active_c;
                for(let i = 0; i < collapsible.children.length; i++) {
                    let active_child = collapsible.children[i]
                    if (active_child.classList.contains('active')) {
                        // active_child.classList.remove('active');
                        // collapsible.children[i].close();
                        active_c = active_child;
                        index = i;
                        break;
                        // ac = active_child;
                        // console.log(instance);
                        // instance.close();
                    }
                }
                let instance = M.Collapsible.getInstance($(collapsible));
                console.log(instance, index);
                instance.close(index);
                console.log('closed');
            }
        }
        collapsible = current_collapsible;
        // console.log(current_collapsible.parentElement);
    }
    console.log();
  });

// // Card touch events
// document.querySelectorAll('.card').forEach(card => {
//   card.addEventListener('touchstart', function () {
//       card.style.cssText = "background-color: #ff8a80; color: white;";
//       // Changing icon color
//       let contact_details = card.querySelectorAll('.contact-details .infograph');
//       contact_details.forEach(element => {
//         element.children[0].style.color = 'white';
//       });
//   });
// });

// document.querySelectorAll('.card').forEach(card => {
//   card.addEventListener('touchend', function () {
//     setTimeout(function () {
//       card.style.cssText = "background-color: unset; color: rgba(0, 0, 0, 0.87);";
//       // Changing icon color
//       let contact_details = card.querySelectorAll('.contact-details .infograph');
//       contact_details.forEach(element => {
//         element.children[0].style.color = '#ff0000';
//       });
//     }, 200);
//   });
// });
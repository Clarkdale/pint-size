var curr;
function removeButton() {
    var input = document.getElementById("url-input");
    var button = document.getElementById('shorten_button');
    var form = document.getElementById("the_form");
    if (input.value != '') {
        let url = encodeURIComponent(input.value);
        button.onclick = function () {
            return false;
        }
        button.value = "Checking taps...";
        fetch("https://smllr.herokuapp.com/addUrl/" + url)
            .then(init => {
                if (init.status === 400) {
                    throw Error(init.text());
                } else {
                    return init.json();
                }
            })
            .then(response => {
                input.value = "http://pint.pw/" + response;
                curr = input.value;
                input.onkeydown = changeBack;
                input.onclick = input.select;
                form.className = "form-after";
                button.className = "button-after";
                input.className = "input-after";
                button.value = "Copy";
                button.onclick = function () {
                    input.select();
                    document.execCommand('copy');
                    window.getSelection().removeAllRanges();
                    button.value = "Copied to Clipboard!";
                    return false;
                }
            })
            .catch(e => {
                changeBack();
                input.className = "url-bad";
                input.placeholder = "Invalid URL";
                input.value = "";
                input.onkeydown = changeBack;
            });
    }
    return false;
}

function changeBack() {
    var input = document.getElementById("url-input");
    var button = document.getElementById('shorten_button');
    var form = document.getElementById("the_form");
    input.placeholder = "Your URL";
    if (input.value !== curr) {
        button.onclick = removeButton;
        form.className = "url-form";
        button.className = "url-submit";
        input.className = "url-input";
        button.value = "Shorten";
    }
}
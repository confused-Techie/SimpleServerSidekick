const electron = require('electron');
const appData = (electron.app || electron.remote.app).getPath('appData');
const { BrowserWindow } = electron;
const settings = require('electron-settings');
const fetch = require('node-fetch');

// All handling of data for json should be handled in just a few functions, so that its easy to migrate to an API model, later.
// Except checking weather the app needs setup.

//========================================================================
//=========================== TODO ======================================
// Add required Http or Https question


function initFunction() {
  // this is the common startpoint.

  //check if the app needs a setup. Or if the current setup is broken.
  // the setup should include the server IP for the api calls.
  if (!settings.hasSync('server-ip')) {
    //ip not setup
    document.getElementById('app').innerHTML = welcomeScreen_Page();
  } else {
    // ip is setup
  }
}


function ipEnter() {
  console.log(document.getElementById("ipText").value);

  var url = document.getElementById("ipText").value;
  if (validateUrl(url)) {
    try {
      fetch(`${url}/statuscheck`)
        .then(res => res.json())
        .then(json => {
          if (json.status) {
            //status was successful, save data

            console.log("Successfully contacted API, saving...");
            var tempTime = new Date();
            var currentTime = tempTime.getTime();
            try {
              if (false) {//temp if to block saving.
              settings.setSync('server-ip', {
                ip: url+"",
                timeSet: currentTime
              });
              }
            } catch(ex) {
              // Error saving the url
              console.log("Error saving the URL");
            }
          } else {
            // The API Server sent back a bad status.
            console.log("The API Server sent back a bad status");
          }
        });
    } catch(ex) {
      // Something went wrong contacting the server.
      console.log("Something went wrong contacting the server: "+ex);
    }

  } else {
    // IP|URL is not valid
    console.log("IP|URL is not valid.");
  }
}

function ipTextKeyPress(e) {
  e=e||window.event;
  var key = e.keyCode;
  if (key == 13) {
    e.preventDefault();
    ipEnter();
  }
}

function validateUrl(value) {
  // because this seems to fail for local host these needs to be reworked, and I'm to tired currently.
  return true;
  //return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
}

// =============================================================================
// ======== Page Declarations. For my sanity, and pseudo-reactjs components ====
// =============================================================================
function welcomeScreen_Page() {
  return `
    <form>
      <label for="ipText">Please enter the Server's IP Address:</label><br>
      <input type="text" id="ipText" name"ipText" onkeypress="ipTextKeyPress(event)"><br>
      <button type="button" onclick="return ipEnter();">Submit</button>
    </form>
    `;
}

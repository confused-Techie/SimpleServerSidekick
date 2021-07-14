const electron = require('electron');
const appData = (electron.app || electron.remote.app).getPath('appData');
const { BrowserWindow } = electron;
const settings = require('electron-settings');

// All handling of data for json should be handled in just a few functions, so that its easy to migrate to an API model, later.
// Except checking weather the app needs setup.

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
  console.log("hello world");
  console.log(document.getElementById("ipText").value);
}



// =============================================================================
// ======== Page Declarations. For my sanity, and pseudo-reactjs components ====
// =============================================================================
function welcomeScreen_Page() {
  return `
    <form>
      <label for="ipText">Please enter the Server's IP Address:</label><br>
      <input type="text" id="ipText" name"ipText"><br>
      <button type="button" onclick="return ipEnter();">Submit</button>
    </form>
    `;
}

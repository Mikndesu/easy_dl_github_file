async function get_current_tab() {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  return tabs[0];
}

function get_filename(str) {
  return str.split("/").pop();
}
function getExtension(str) {
  const last_element = get_filename(str);
  if (!last_element.includes(".")) {
    return null;
  }
  return last_element.split(".").pop();
}

const target_extensions = ["cpp", "md"];

const menu = {
  title: "download this file",
  type: "normal",
  contexts: ["selection"],
  documentUrlPatterns: ["*://github.com/*"],
  onclick: () => {
    get_current_tab().then((result) => {
      var extension = getExtension(result.url);
      console.log(extension);
      if (extension == null) {
        browser.tabs.sendMessage(
          result.id,
          { message: "pop_up_alert" },
          function () {}
        );
      }
      browser.tabs.sendMessage(
        result.id,
        { message: "get_raw_url" },
        function (response) {
          browser.downloads.download({
            url: response,
            filename: get_filename(result.url),
          });
        }
      );
    });
  },
};

browser.menus.create(menu);

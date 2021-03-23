browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message == "pop_up_alert") {
    window.alert(`
        Cannot download a file.
        Make sure you are opening a file(which surely has a　filename extension) on Github.
        `);
  }
  if (request.message == "get_raw_url") {
    var url = "https://github.com" + $("#raw-url").attr("href");
    sendResponse(url);
  }
});

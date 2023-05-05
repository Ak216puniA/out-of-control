// chrome.app.runtime.onLaunched.addListener(function (launchData) {
//     chrome.app.window.create(
//       // Url
//       '/editor.html',
//       // CreateWindowOptions
//       {
//               'width': 400,
//               'height': 500
//       },
//       // Callback
//       function(win) {
//           win.contentWindow.launchData = launchData;
//           win.maximize();
//           win.show();
//       });
//   });
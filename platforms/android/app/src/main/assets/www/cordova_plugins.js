cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "es6-promise-plugin.Promise",
      "file": "plugins/es6-promise-plugin/www/promise.js",
      "pluginId": "es6-promise-plugin",
      "runs": true
    },
    {
      "id": "cordova-plugin-x-socialsharing-android12.SocialSharing",
      "file": "plugins/cordova-plugin-x-socialsharing-android12/www/SocialSharing.js",
      "pluginId": "cordova-plugin-x-socialsharing-android12",
      "clobbers": [
        "window.plugins.socialsharing"
      ]
    }
  ];
  module.exports.metadata = {
    "es6-promise-plugin": "4.2.2",
    "cordova-plugin-x-socialsharing-android12": "6.0.5"
  };
});
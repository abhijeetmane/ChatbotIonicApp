cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-device.device",
        "file": "plugins/cordova-plugin-device/www/device.js",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "pluginId": "cordova-plugin-splashscreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "id": "cordova-plugin-statusbar.statusbar",
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "pluginId": "cordova-plugin-statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "id": "ionic-plugin-keyboard.keyboard",
        "file": "plugins/ionic-plugin-keyboard/www/android/keyboard.js",
        "pluginId": "ionic-plugin-keyboard",
        "clobbers": [
            "cordova.plugins.Keyboard"
        ],
        "runs": true
    },
    {
        "id": "ai.api.apiaiplugin.Q",
        "file": "plugins/ai.api.apiaiplugin/www/lib/q.js",
        "pluginId": "ai.api.apiaiplugin",
        "runs": true
    },
    {
        "id": "ai.api.apiaiplugin.ApiAIPlugin",
        "file": "plugins/ai.api.apiaiplugin/www/ApiAIPlugin.js",
        "pluginId": "ai.api.apiaiplugin",
        "clobbers": [
            "window.ApiAIPlugin"
        ]
    },
    {
        "id": "ai.api.apiaiplugin.ApiAIPromises",
        "file": "plugins/ai.api.apiaiplugin/www/ApiAIPromises.js",
        "pluginId": "ai.api.apiaiplugin",
        "clobbers": [
            "window.ApiAIPromises"
        ]
    },
    {
        "id": "cordova-plugin-tts.tts",
        "file": "plugins/cordova-plugin-tts/www/tts.js",
        "pluginId": "cordova-plugin-tts",
        "clobbers": [
            "TTS"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-console": "1.0.5",
    "cordova-plugin-device": "1.1.4",
    "cordova-plugin-splashscreen": "4.0.3",
    "cordova-plugin-statusbar": "2.2.1",
    "cordova-plugin-whitelist": "1.3.1",
    "ionic-plugin-keyboard": "2.2.1",
    "android.support.v4": "21.0.1",
    "ai.api.apiaiplugin": "1.4.3",
    "cordova-plugin-tts": "0.2.3"
};
// BOTTOM OF METADATA
});
/**
 * Created by retyk on 16/02/14.
 */

require("./../lib/app.js").run({
    "run": {
        "devices": [
            {
                "disable": false,
                "type": "localpc",
                "runner": {
                    "name": "chrome",
                    "address": "/",
                    "options": {"instances": 4}
                }
            },
            {
                "disable": false,
                "type": "localpc",
                "runner": {
                    "name": "firefox",
                    "address": "/",
                    "options": {"instances": 4}
                }
            },
            {
                "disable": false,
                "type": "android",
                "id": "all",
                "runner": {
                    "name": "apk",
                    "options": {"path" :".lib/resources/catrunner.apk"}
                }
            },
            {
                "disable": true,
                "type": "iphone",
                "id": "all",
                "runner": {
                    "name": "agent",
                    "options": {"ip": "192.168.1.107", "port": "54321", "path": "/cat"}
                }
            }
        ]
    },
    "runningEnvironment": {
        "type": "local|lab",
        "host": "",
        "authtoken": ""
    },
    "server": {
        "_host" : "localhost",
        "host" : "auto",
        "port" : "8089",
        "_autostart" : {
            "args": ["-s"],
            "nodeStartFile": "catcli.cmd",
            "_cwd": "/home/user/catgh/CATCore/test/sencha/cat-project",
            "cwd": "c:/catgithub/CATCore/test/sencha/cat-project"
        }
    }
});
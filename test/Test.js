/**
 * Created by retyk on 16/02/14.
 */


var _config = {
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
                        "options": {"path": ".lib/resources/catrunner.apk"}
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
        "server": {
            "host": "auto",
            "port": "8089"

        },       
        
        "callback": function (data) {

            console.log("--------------", data.length);
            data.forEach(function(item) {
                console.log(item.type, (("cp" in item && item.cp && item.cp.pid) ? item.cp.pid : " -- ") ,item.me.getError()) ;
            });
        } 
    },
    _test = function (test, description) {

        console.log("[Mobile Runner] Test: ", description);
        if (!test) {
            console.error("[Mobile Runner] Test failed");
            throw new Error(description);
        }

    },
    _info,
    _mrunner = require("./../lib/app.js"),
    _mrunnerinfo;

_info = _mrunner.init(_config);
_mrunnerinfo = _mrunner.info();

console.log("\n[Mobile Runner] Testing...");
console.log("[Mobile Runner] Info data: ", _mrunnerinfo, " \n");
_test(_mrunnerinfo.getTotalByType("chrome") === 4, " Info tests chrome === 4 ");
_test(_mrunnerinfo.getTotalLocalPC() === 8, " Info tests localpc  === 8 ");
_test(_mrunnerinfo.getTotal() === 9, " Info tests all  === 9 ");
console.log("\n[Mobile Runner] Running sample configuration ");

_mrunner.run();


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
                        "options": {"instances": 2}
                    }
                },
                {
                    "disable": false,
                    "type": "localpc",
                    "runner": {
                        "name": "firefox",
                        "address": "/",
                        "options": {"instances": 2}
                    }
                },
                {
                    "disable": false,
                    "type": "android",
                    "id": "all",
                    "runner": {
                        "name": "apk",
                        "options": {"path": ".src/resources/catrunner.apk"}
                    }
                },
                {
                    "disable": false,
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
        
        "callback": function (info) {
            
            var runinfo,
                errors = info.errors();
            
            if (info) {
                console.log("[Mobile Runner] Validating the actual running processes against the configuration.... ");

                console.log("[Mobile Runner] Global test, info against the runnable: ", (!info.test() ? " Test Failed ": " Test Succeeded "));
                console.log("[Mobile Runner] Error messages: ", (errors ? errors.print() : "No Errors") );
                
                runinfo = info.getRunnableInfo();
                _test(info.size() === runinfo.size(), "[Mobile Runner] Total running processes 6 === 6 ");
                
            }
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
    _mrunner = require("./../src/app.js"),
    _mrunnerinfo;

_mrunner.init(_config);
_mrunnerinfo = _mrunner.info();

console.log("\n[Mobile Runner] Testing...");
console.log("[Mobile Runner] Info data: ", _mrunnerinfo, " \n");
_test(_mrunnerinfo.getSizeByType("chrome") === 2, " Info tests chrome === 2 ");
_test(_mrunnerinfo.getLocalPCSize() === 4, " Info tests localpc  === 4 ");
_test(_mrunnerinfo.size() === 6, " Info tests all  === 6 ");
console.log("\n[Mobile Runner] Running sample configuration ");

_mrunner.run();


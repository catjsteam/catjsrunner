/**
 * Created by retyk on 19/03/14.
 */

var os = require('os'),
    fs = require('fs'),

    base = require('./base'),
    browserRunner = function (spec) {

        var that = base(spec);

        function getCommandLineFromNameForLinux(name) {
            switch (name) {
                case 'chrome':
                case 'google-chrome':
                    return 'google-chrome';
                case 'safari':
                    return 'safari';
                case 'firefox':
                    return 'firefox';
                case 'opera':
                    return 'opera';

            }
        }

        function getCommandLineFromNameForWin32(name) {
            var programFilesFolder;
            if (os.arch() === 'x64'){
                programFilesFolder = "{PROGRAMFILES(X86)}"
            } else {
                programFilesFolder = "{PROGRAMFILES}"
            }

            switch (name) {
                case 'chrome':
                case 'google-chrome':
                    var defaultPaths = [
                        '{LOCALAPPDATA}/Google/Chrome/Application/chrome.exe',
                        programFilesFolder + '/Google/Chrome/Application/chrome.exe'
                    ];
                    var path = 'chrome.exe'; //default
                    defaultPaths.forEach(function(item){
                        var itemReplaced = item.replace(/{([^}]+)}/g, function (_, n) {
                            return process.env[n];
                        })
                        console.log('Looking for from chrome at ' + item);
                        if(fs.existsSync(itemReplaced)){
                            console.log(itemReplaced + ' found');
                            path = itemReplaced;
                            return;
                        }
                        console.log (itemReplaced + ' not found');
                    })
                    return path;
                case 'safari':
                    return 'safari';
                case 'firefox':
                    return programFilesFolder + '/Mozilla Firefox/firefox.exe';
                case 'opera':
                    return 'opera';

            }
        }

        function getCommandLineFromNameForDarwin(name) {
            return getCommandLineFromNameForLinux(name);
        }

        function getCommandLineFromName(name) {

            var platform = os.platform();

            switch (platform) {
                case 'linux':
                    return getCommandLineFromNameForLinux(name);
                case 'win32':
                    return getCommandLineFromNameForWin32(name);
                case 'darwin' :
                    return getCommandLineFromNameForDarwin(name);
            }
        }

        that.internalRun = function () {
            console.log("running on pc " + that.getRunnerConfig().name);

            var spawn = require('child_process').spawn,
                browserCommandLine;
            var browserPath;

            if (that.getRunnerConfig() && that.getRunnerConfig().options && that.getRunnerConfig().options.path) {
                browserPath = that.getRunnerConfig().options.path;

            } else {
                browserPath = getCommandLineFromName(that.getRunnerConfig().name)
            }

            browserCommandLine = browserPath.replace(/{([^}]+)}/g, function (_, n) {
                return process.env[n];
            })

            var url = 'http://' + that.getServerStarter().getHost() + ':' + that.getServerStarter().getPort() + that.getRunnerConfig().address;


            var ls = spawn(browserCommandLine, [url], { env: process.env});

            ls.stdout.on('data', function (data) {
                console.log('stdout: ' + data);
            });

            ls.on('error', function (data) {
                console.error('Error: trying to run on localpc:' + data);
            });
        }

        return that;
    }

module.exports = browserRunner;

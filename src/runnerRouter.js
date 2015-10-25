function RunnerRouter() {
    function getRunner(key) {
        switch (key) {
            case 'localpc':
                return  require('./runners/browserRunner');
            case 'android':
                return require('./runners/androidRunner');
            case 'androidBrowser':
                return require('./runners/androidBrowserRunner');
            case 'iphone':
                return  require('./runners/iPhoneRunner');
        }
    }

    return    {
        run: function (key, serverStarter, opt) {
            var runner = getRunner(key.type);
            var options = {
                runnerConfig: key.runner,
                id: key.id,
                serverStarter: serverStarter};
            runner(options).run(opt);
        }
    }
};


module.exports = RunnerRouter();
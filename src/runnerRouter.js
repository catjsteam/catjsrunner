function RunnerRouter() {
    function getRunner(key) {
        switch (key) {
            case 'localpc':
                return  require('./runners/browserRunner');
            case 'android':
                return require('./runners/androidRunner');
            case 'iphone':
                return  require('./runners/iPhoneRunner');
        }
    }

    return    {
        run: function (key, serverStarter) {
            var runner = getRunner(key.type);
            var options = {
                runnerConfig: key.runner,
                id: key.id,
                serverStarter: serverStarter};
            runner(options).run();
        }
    }
};


module.exports = RunnerRouter();
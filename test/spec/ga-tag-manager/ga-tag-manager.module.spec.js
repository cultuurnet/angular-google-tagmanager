'use strict';

describe('Module: GaTagManager', function () {

    var googleAnalyticsService, $window, $document;

    function Tracker(name) {
        this.name = name;
        this.get = function(key) {
            return name;
        }
    }

    beforeEach(inject(function (_$window_, _$document_) {
        $window = _$window_;
        $document = _$document_;
        googleAnalyticsService = new GoogleAnalyticsService();

        window.ga = function() {}
        window.ga.getAll = function() {
            return [
                new Tracker('trackerA'),
                new Tracker('trackerB')
            ];
        }

    }));

    function enableTagManager() {
        var appConfig = {
            'gaTagManager': {
                'containerId': 'test'
            }
        };
        var myModule = angular.module('cultuurnet.ga-tag-manager');
        var runBlock = myModule._runBlocks[0];
        runBlock[3](appConfig, $window, $document);
    }

    it('called the tag manager', function () {
        var spy = spyOn(window, 'initGaTagManager');
        enableTagManager();
        expect(spy).toHaveBeenCalled();
    });

    it('it does not call tag manager', function () {

        var spy = spyOn(window, 'initGaTagManager');
        var appConfig = {
            'gaTagManager': {
                'containerId': ''
            }
        };
        var myModule = angular.module('cultuurnet.ga-tag-manager');
        var runBlock = myModule._runBlocks[0];
        runBlock[3](appConfig, $window, $document);
        expect(spy).not.toHaveBeenCalled();
    });

    it('correctly marks ga as active', function () {
        enableTagManager();
        expect(googleAnalyticsService.isEnabled(), true);
    });

    it('correctly sets ga variables for a given tracker name', function () {

        enableTagManager();

        var spy = spyOn(window, 'ga');

        googleAnalyticsService.setVariable('testvar', 'testval', 'test');
        expect(spy).toHaveBeenCalledWith('test.set', 'testvar', 'testval');
    });

    it('correctly sets ga variables for all tracker names', function () {

        enableTagManager();

        var spy = spyOn(window, 'ga');

        googleAnalyticsService.setVariable('testvar', 'testval');
        expect(spy).toHaveBeenCalledWith('trackerA.set', 'testvar', 'testval');
        expect(spy).toHaveBeenCalledWith('trackerB.set', 'testvar', 'testval');
    });

    it('correctly sends ga events for a given tracker name', function () {

        enableTagManager();

        var spy = spyOn(window, 'ga');

        googleAnalyticsService.sendEvent('testevent', 'test');
        expect(spy).toHaveBeenCalledWith('test.send', 'testevent');
    });

    it('correctly sends ga events for all trackers', function () {

        enableTagManager();

        var spy = spyOn(window, 'ga');

        googleAnalyticsService.sendEvent('testevent');
        expect(spy).toHaveBeenCalledWith('trackerA.send', 'testevent');
        expect(spy).toHaveBeenCalledWith('trackerB.send', 'testevent');
    });

});

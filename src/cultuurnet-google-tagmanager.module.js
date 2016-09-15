'use strict';

/**
 * @ngdoc function
 * @name cultuurnet.module:GA Tag Manager
 * @description
 * # GA Tag Manager
 */
angular
  .module('cultuurnet.ga-tag-manager', [])
  .run([
    'appConfig',
    '$window',
    '$document',
    function (appConfig, $window, $document) {
      // Load Google Tag Manager only when the key is not empty
      var containerId = _.get(appConfig, 'gaTagManager.containerId');
      if (containerId) {
        initGaTagManager($window, $document, containerId);
      }
    }
  ])
  .service('GoogleAnalyticsService', GoogleAnalyticsService);

/* @ngInject */
function GoogleAnalyticsService() {

  /*jshint validthis: true */
  var service = this;

  /**
   * Return all installed trackers.
   */
  service.getTrackers = function() {
    return ga.getAll();
  };

  /**
   * Is google analytics enabled.
   */
  service.isEnabled = function () {
    return (typeof ga === 'function');
  };

  /**
   * Set a GA variable.
   */
  service.setVariable = function(trackerName, variableName, value) {
    ga(trackerName + '.set', variableName, value);
  };

  /**
   * Set a GA variable.
   */
  service.sendEvent = function(trackerName, event) {
    ga(trackerName + '.send', event);
  };
}

/**
 * Init the google tag manager.
 */
function initGaTagManager(window, document, containerId) {
  /* istanbul ignore next */
  document.ready(function () {
    (function (w, d, s, l, i) {
      w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

      if (d) {
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l !== 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src = '//www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
      }

    })(window, document[0], 'script', 'tm', containerId);
  });
}

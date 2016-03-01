/*jshint asi: false, bitwise: true, boss: false, curly: true, eqeqeq: true, eqnull: false, evil: false, forin: false, immed: true, laxbreak: false, newcap: true, noarg: true, noempty: true, nonew: false, nomen: false, onevar: true, plusplus: false, regexp: false, undef: true, sub: false, strict: false, white: false */
/*jshint browser: true, maxerr: 50, passfail: false */
/*global define: false, console: false */

(function () {
  var body, style, userAgent = navigator.userAgent, agentVersion, compatVersion, results = [], agentMatches;

  try {
    body = document.body;
    style = body.style;

    if (/android|iphone|ipad|ipod/i.test(userAgent)) {
      results.push('mobile');
    } else {
      results.push('no-mobile');
    }

    if (window.devicePixelRatio && 1 < window.devicePixelRatio) {
      results.push('retina');
    } else {
      results.push('no-retina');
    }

    if (/windows nt/i.test(userAgent)) {
      results.push('windows');
      try { results.push('windows' + userAgent.match(/windows nt ([\d\.]+)/i)[1].replace('.', '_')); } catch (e) {}
    } else if (/ipad|iphone|ipod/i.test(userAgent)) {
      results.push('ios');
      try { results.push('ios' + userAgent.match(/cpu (?:\w+ )?os ([\d_]+)/i)[1]); } catch (e) {}
    } else if (/mac\s?os\s?x/i.test(userAgent)) {
      results.push('mac');
      try { results.push('mac' + userAgent.match(/mac\s?os\s?x\s?(\d+.\d+)/i)[1]); } catch (e) {}
    } else if (/Android.*AppleWebKit\/([\d.]+)/.test(userAgent)) {
      results.push('android');
      if (/Gilt\/Android/.test(userAgent)) {
        results.push('gilt-native-android-app')
      }
      try { results.push('android' + navigator.userAgent.match(/; Android.\d[\.]\d[\.]?\d?/)[0].replace(/; /g, '').replace(/[.]/g, '_').split(' ')[1]); } catch (e) {}
    } else if (/linux/i.test(userAgent)) {
      results.push('linux');
    }

    if (/chromeframe/i.test(userAgent)) {
      results.push('chromeframe');
    } else if (undefined !== style.scrollbar3dLightColor) {
      results.push('ie');

      try {
        agentMatches = userAgent.match(/(ms|\b)?(ie|rv) (\d+)/i);
        agentVersion = agentMatches[agentMatches.length - 1];
      } catch (e) {}

      if ((typeof AnyFunction !== 'undefined' && AnyFunction.isPrototypeOf) || typeof ActiveXObject === 'undefined') { // since there are no compat tables as yet, this is enough to detect the preview version.
        compatVersion = '11';
      } else if (undefined !== style.transition) {
        compatVersion = '10';

        if (('msIsSiteMode' in window.external) && window.external.msIsSiteMode()) {
          results.push('pinned');
        }
      } else if (undefined !== style.opacity) {
        compatVersion = '9';

        if (('msIsSiteMode' in window.external) && window.external.msIsSiteMode()) {
          results.push('pinned');
        }
      } else if (undefined !== style.msBlockProgression) {
        compatVersion = '8';
      } else if (undefined !== style.msInterpolationMode) {
        compatVersion = '7';
      } else if (undefined !== style.textOverflow) {
        compatVersion = '6';
      }

      results.push('ie' + agentVersion);
      if (compatVersion !== agentVersion) {
        results.push('compatibilitymode');
        results.push('iecm' + compatVersion);
      }
    } else if (/Android.*AppleWebKit\/([\d.]+)/.test(userAgent) && userAgent.match(/Android.*AppleWebKit\/([\d.]+)/)[1] < 537) {
      results.push('android_browser');
      // example user-agent android
      // "Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 5 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19"
    } else if (window.chrome && body.dataset) {
      results.push('chrome');
      try { results.push('chrome' + userAgent.match(/(?:chrome|crios)\/(\d+)/i)[1]); } catch (e) {}
    } else if (undefined !== navigator.mozIsLocallyAvailable) {
      results.push('ff');
      try { results.push('ff' + userAgent.match(/firefox\/(\d+)/i)[1]); } catch (e) {}
    } else if (undefined !== window.opera) {
      results.push('opera');
      try { results.push('opera' + userAgent.match(/(version|opera)[\/ ](\d+)/i)[2]); } catch (e) {}
    } else if (/safari/i.test(userAgent)) {
      results.push('safari');
      try { results.push('safari' + userAgent.match(/version\/(\d+)/i)[1]); } catch (e) {} // will fail on Safari 2 or below
    }

    document.documentElement.className += ' ' + results.join(' ');
  } catch (e) {
    if (window.console && console.error) {
      console.error(e, e.stack);
    }
  }
}());

define('app',['exports', 'aurelia-fetch-client'], function (exports, _aureliaFetchClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.activate = function activate() {
      var client = new _aureliaFetchClient.HttpClient();
      var json_file = '/config.json';
      client.fetch(json_file).then(function (response) {
        return response.json();
      }).then(function (data) {
        for (var _iterator = data.servers, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
          }

          var elem = _ref;

          localStorage.setItem(elem.id, JSON.stringify(elem));
        }
      });
    };

    App.prototype.attached = function attached() {
      if (localStorage.getItem('siri-profile') == null) {
        localStorage.setItem('siri-profile', document.getElementById('siri-profile').value);
      }
    };

    App.prototype.configureRouter = function configureRouter(config, router) {
      config.title = 'Irys - Démonstrateur';
      config.options.pushState = true;
      config.options.root = '/';
      config.map([{ route: ['', 'home'], name: 'home', moduleId: './home', nav: true, title: 'Accueil' }, { route: 'stop-monitoring', name: 'stopMonitoring', moduleId: './services/stop-monitoring', nav: true, title: 'Service Stop Monitoring' }, { route: 'general-message', name: 'generalMessage', moduleId: './services/general-message', nav: true, title: 'Service General Message' }, { route: 'discovery', name: 'discovery', moduleId: './services/discovery', nav: true, title: 'Service Discovery' }, { route: 'status', name: 'status', moduleId: './services/status', nav: true, title: 'Check Status' }, { route: 'autres-services', name: 'servicesOthers', moduleId: './services/others', nav: true, title: 'Autres services' }]);

      this.router = router;
      localStorage.setItem('autoCompleteAlready', false);
      localStorage.removeItem('currentPanel');
    };

    return App;
  }();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('footer-view',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var FooterView = exports.FooterView = function FooterView() {
    _classCallCheck(this, FooterView);
  };
});
define('home',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Home = exports.Home = function () {
    function Home() {
      _classCallCheck(this, Home);
    }

    Home.prototype.attached = function attached() {
      $('.right-panel-wrapper').hide();
    };

    return Home;
  }();
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('nav-bar',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NavBar = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _desc, _value, _class, _descriptor, _descriptor2;

  var NavBar = exports.NavBar = (_class = function () {
    function NavBar() {
      _classCallCheck(this, NavBar);

      _initDefineProp(this, 'siriProfile', _descriptor, this);

      _initDefineProp(this, 'router', _descriptor2, this);
    }

    NavBar.prototype.siriProfileChanged = function siriProfileChanged(newVal) {
      if (newVal == '2.2') {
        $(".siri_24").hide();
      } else {
        $(".siri_24").show();
      }
      window.localStorage.setItem('siri-profile', newVal);
    };

    NavBar.prototype.closePanel = function closePanel() {
      $('.right-panel-wrapper').removeClass('open');
      return true;
    };

    return NavBar;
  }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'siriProfile', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: function initializer() {
      return window.localStorage.getItem('siri-profile');
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'router', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return null;
    }
  })), _class);
});
define('right-panel',["exports", "tools"], function (exports, _tools) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.RightPanel = undefined;

  var tools = _interopRequireWildcard(_tools);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var RightPanel = exports.RightPanel = function () {
    function RightPanel() {
      _classCallCheck(this, RightPanel);
    }

    RightPanel.prototype.attached = function attached() {
      document.onkeydown = function (evt) {
        evt = evt || window.event;
        var isEscape = false;
        if ("key" in evt) {
          isEscape = evt.key == "Escape" || evt.key == "Esc";
        } else {
          isEscape = evt.keyCode == 27;
        }
        if (isEscape) {
          tools.Tools.prototype.togglePanel();
        }
      };
    };

    RightPanel.prototype.togglePanel = function togglePanel() {
      tools.Tools.prototype.togglePanel();
    };

    RightPanel.prototype.stopMonitoring = function stopMonitoring() {
      localStorage.setItem('currentPanel', '#stop-monitoring-form-wrapper');
      $("#response > .panel, #fancy-response .fancy-stop-wrapper").remove();

      var regEx = /^\d{8}/;

      if (regEx.exec($('#stopName').val())) {
        $("#stopId").val("NINOXE:StopPoint:SPOR:" + $('#stopName').val() + ":LOC");
      } else if ($('#stopName').val() == "") {
        $("#stopId").val("");
      }

      if ($('#lineName').val() == "") {
        $("#lineId").val("");
      }

      var request = this.getRequestForProfile();
      var xmlRequest = request.getStopMonitoring('#stop-monitoring-form');
      var responseCard = new stopMonitoringCard();
      console.log(xmlRequest);
      request.sendRequest(xmlRequest, request.handleStopMonitoringResponse, responseCard, $('#stop-monitoring-form-wrapper'));
    };

    RightPanel.prototype.generalMessage = function generalMessage() {
      localStorage.setItem('currentPanel', '#get-general-message-form-wrapper');
      var regEx = /^\d{8}/;

      if (regEx.exec($('#stopName').val())) {
        $("#stopId").val("NINOXE:StopPoint:SPOR:" + $('#stopName').val() + ":LOC");
      } else if ($('#stopName').val() == "") {
        $("#stopId").val("");
      }

      if ($('#lineName').val() == "") {
        $("#lineId").val("");
      }

      $("#response > .panel, #fancy-response .fancy-stop-wrapper").remove();
      var request = this.getRequestForProfile();
      var responseCard = new stopMonitoringCard();
      var generalMessageRequest = request.getGeneralMessage('#canned-requests');
      request.sendRequest(generalMessageRequest, request.handleGeneralMessageResponse, responseCard, $('#get-general-message-form-wrapper'));
    };

    RightPanel.prototype.stopDiscovery = function stopDiscovery() {
      localStorage.setItem('currentPanel', '#service-discovery-form-wrapper');
      $("#response > .panel, #fancy-response .fancy-stop-wrapper").remove();
      var request = this.getRequestForProfile();
      var responseCard = new stopMonitoringCard();
      var stopDscRequest = request.getStopDiscovery();
      request.sendRequest(stopDscRequest, request.handleStopDiscoveryResponseDisplay, responseCard, $('#service-discovery-form-wrapper'));
    };

    RightPanel.prototype.lineDiscovery = function lineDiscovery() {
      localStorage.setItem('currentPanel', '#service-discovery-form-wrapper');
      $("#response > .panel, #fancy-response > fancy-stop-wrapper").remove();
      var request = this.getRequestForProfile();
      var responseCard = new stopMonitoringCard();
      var lineDscRequest = request.getLineDiscovery();
      request.sendRequest(lineDscRequest, request.handleLineDiscoveryResponseDisplay, responseCard, $('#service-discovery-form-wrapper'));
    };

    RightPanel.prototype.checkStatus = function checkStatus() {
      localStorage.setItem('currentPanel', '#check-status-form-wrapper');
      $("#response > .panel, #fancy-response .fancy-stop-wrapper").remove();
      var request = this.getRequestForProfile();
      var responseCard = new stopMonitoringCard();
      var checkStatusRequest = request.getCheckStatus();
      request.sendRequest(checkStatusRequest, request.handleCheckStatusResponse, responseCard, $('#check-status-form-wrapper'));
    };

    RightPanel.prototype.xmlFormWrapper = function xmlFormWrapper() {
      localStorage.setItem('currentPanel', '#stop-monitoring-form-wrapper');
      $('#stop-monitoring-form-wrapper').removeClass('i-m-there');
      $('#stop-monitoring-xml-form-wrapper').addClass('i-m-there');
    };

    RightPanel.prototype.smartRequest = function smartRequest() {
      $("#response > .panel, #fancy-response > fancy-stop-wrapper").remove();

      var dataForRequest = $("#xml-request-textarea").val();
      var request = new stopMonitoringRequest();
      var responseCard = new stopMonitoringCard();

      request.sendRequest(dataForRequest, request.handleStopMonitoringResponse, responseCard, $('#stop-monitoring-xml-form-wrapper'));
    };

    RightPanel.prototype.vueView = function vueView(target) {
      $('#response-wrapper').find('.i-m-there').removeClass('i-m-there');
      $('#' + target + 'response-panel-wrapper').addClass('i-m-there');
    };

    RightPanel.prototype.goBack = function goBack() {
      $('#right-panel-wrapper').find('.i-m-there').each(function (index, el) {
        $(el).removeClass('i-m-there');
      });
      this.superToggle();
    };

    RightPanel.prototype.superToggle = function superToggle() {
      var target = localStorage.getItem('currentPanel');
      if ($(target).hasClass('i-m-there')) {
        $(target).removeClass('i-m-there');
      } else {
        $(target).addClass('i-m-there');
      }
    };

    RightPanel.prototype.resetStopId = function resetStopId(event) {
      var parent = $(event.target).closest('form');
      parent.find('#stopId').val('');
      parent.find('#stopName').val('');
    };

    RightPanel.prototype.resetDestinationId = function resetDestinationId(event) {
      var parent = $(event.target).parentsUntil('form');
      parent.find('#destinationId').val('');
      parent.find('#destinationName').val('');
    };

    RightPanel.prototype.resetLineId = function resetLineId(event) {
      var parent = $(event.target).parentsUntil('form');
      parent.find('#lineId').val('');
      parent.find('#lineName').val('');
    };

    RightPanel.prototype.getRequestForProfile = function getRequestForProfile() {
      var request = new stopMonitoringRequest();
      var siri_profile = JSON.parse(localStorage.getItem('siri-' + localStorage.getItem('siri-profile')));
      request.siriVersionAPI = siri_profile.version;
      request.requestorRef = siri_profile.requestor;
      return request;
    };

    return RightPanel;
  }();
});
define('tools',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Tools = exports.Tools = function () {
    function Tools() {
      _classCallCheck(this, Tools);
    }

    Tools.prototype.togglePanel = function togglePanel() {
      $('#right-panel-wrapper > #forms-wrapper > *').removeClass('i-m-there');
      $('#response-wrapper > *').removeClass('i-m-there');
      $('#' + localStorage.getItem('right-panel') + '-form-wrapper').addClass('i-m-there');
      $('.right-panel-wrapper').toggleClass('open');
      if (localStorage.getItem('autoCompleteAlready') == 'false') Tools.autoComplete();
    };

    Tools.autoComplete = function autoComplete() {
      var request = new stopMonitoringRequest();
      var siri_profile = JSON.parse(localStorage.getItem('siri-' + localStorage.getItem('siri-profile')));
      request.siriVersionAPI = siri_profile.version;
      request.requestorRef = siri_profile.requestor;
      var response = new stopDiscoveryResponse();
      request.sendRequest(request.getStopDiscovery(), request.handleStopDiscoveryResponse, response);
      request.sendRequest(request.getLineDiscovery(), request.handleLineDiscoveryResponse, response);
      localStorage.setItem('autoCompleteAlready', true);
    };

    return Tools;
  }();
});
define('resources/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {
    config.globalResources(['./elements/loading-indicator']);
  }
});
define('services/discovery',['exports', 'tools'], function (exports, _tools) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Discovery = undefined;

  var tools = _interopRequireWildcard(_tools);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Discovery = exports.Discovery = function () {
    function Discovery() {
      _classCallCheck(this, Discovery);

      $('.right-panel-wrapper').show();
      $('.fancy-view').hide();
      localStorage.setItem('right-panel', 'service-discovery');
    }

    Discovery.prototype.togglePanel = function togglePanel() {
      tools.Tools.prototype.togglePanel();
    };

    return Discovery;
  }();
});
define('services/general-message',['exports', 'tools'], function (exports, _tools) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.GeneralMessage = undefined;

  var tools = _interopRequireWildcard(_tools);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var GeneralMessage = exports.GeneralMessage = function () {
    function GeneralMessage() {
      _classCallCheck(this, GeneralMessage);

      $('.right-panel-wrapper').show();
      $('.fancy-view').show();
      localStorage.setItem('right-panel', 'get-general-message');
    }

    GeneralMessage.prototype.togglePanel = function togglePanel() {
      tools.Tools.prototype.togglePanel();
    };

    return GeneralMessage;
  }();
});
define('services/others',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Others = exports.Others = function Others() {
    _classCallCheck(this, Others);

    $('.right-panel-wrapper').hide();
  };
});
define('services/status',['exports', 'tools'], function (exports, _tools) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Status = undefined;

  var tools = _interopRequireWildcard(_tools);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Status = exports.Status = function () {
    function Status() {
      _classCallCheck(this, Status);

      $('.right-panel-wrapper').show();
      localStorage.setItem('right-panel', 'check-status');
    }

    Status.prototype.togglePanel = function togglePanel() {
      tools.Tools.prototype.togglePanel();
    };

    return Status;
  }();
});
define('services/stop-monitoring',['exports', 'tools'], function (exports, _tools) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.StopMonitoring = undefined;

  var tools = _interopRequireWildcard(_tools);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var StopMonitoring = exports.StopMonitoring = function () {
    function StopMonitoring() {
      _classCallCheck(this, StopMonitoring);

      $('.right-panel-wrapper').show();
      $('.fancy-view').show();
      localStorage.setItem('right-panel', 'stop-monitoring');
    }

    StopMonitoring.prototype.togglePanel = function togglePanel() {
      tools.Tools.prototype.togglePanel();
    };

    return StopMonitoring;
  }();
});
define('resources/elements/loading-indicator',['exports', 'nprogress', 'aurelia-framework'], function (exports, _nprogress, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.LoadingIndicator = undefined;

  var nprogress = _interopRequireWildcard(_nprogress);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var LoadingIndicator = exports.LoadingIndicator = (0, _aureliaFramework.decorators)((0, _aureliaFramework.noView)(['nprogress/nprogress.css']), (0, _aureliaFramework.bindable)({ name: 'loading', defaultValue: false })).on(function () {
    function _class() {
      _classCallCheck(this, _class);
    }

    _class.prototype.loadingChanged = function loadingChanged(newValue) {
      if (newValue) {
        nprogress.start();
      } else {
        nprogress.done();
      }
    };

    return _class;
  }());
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./nav-bar\"></require>\n  <require from=\"./footer-view\"></require>\n  <require from=\"./modal-data.html\"></require>\n  <require from=\"./right-panel\"></require>\n  <require from=\"sass/layout.css\"></require>\n\n  <nav-bar router.bind=\"router\"></nav-bar>\n\n  <loading-indicator loading.bind=\"router.isNavigating\"></loading-indicator>\n  <div class=\"page-wrapper\">\n    <p class=\"id-description\">\n      Le site est un démonstrateur de SIRI : la norme de données transport en commun pour les échanges temps réel.\n    </p>\n    <div class=\"page-content\">\n      <div class=\"container\" id=\"explaination-texts\">\n        <router-view></router-view>\n      </div>\n      <right-panel></right-panel>\n    </div>\n\n    <footer-view></footer-view>\n    <modal-data></modal-data>\n  </div>\n</template>\n"; });
define('text!footer-view.html', ['module'], function(module) { module.exports = "<template>\n  <footer>\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col-md-3\">\n          <a href=\"http://www.chouette.mobi/irys/\" class=\"allow-request-action\" id=\"open-slider\">\n            <img src=\"/images/logo_afimb.jpg\" class=\"afimb-logo\">\n          </a>\n        </div>\n        <div class=\"col-md-3\">\n          <ul>\n            <li>\n              <h4>Démonstrateur</h4>\n              <ul>\n                <li>\n                  <a href=\"http://www.cecill.info/licences/Licence_CeCILL-B_V1-fr.html\" target=\"_blank\">Licence</a>\n                </li>\n                <li>\n                  <a href=\"https://github.com/afimb/irys-demo\" target=\"_blank\">Code Source</a>\n                </li>\n                <li>\n                  <a href=\"http://www.chouette.mobi/les-utilisateurs/club-utilisateur-des-outils-chouette-et-irys/\" target=\"_blank\">Club utilisateur</a>\n                </li>\n                <li>\n                  <a href=\"#myModal\" data-toggle=\"modal\" data-target=\"#myModal\">Données</a>\n                </li>\n              </ul>\n            </li>\n          </ul>\n        </div>\n        <div class=\"col-md-3\">\n          <ul>\n            <li>\n              <h4>Support</h4>\n              <ul>\n                <li>\n                  <a href=\"http://www.chouette.mobi/contact-support/\" target=\"_blank\">Contactez nous</a>\n                </li>\n                <li>\n                  <a href=\"http://www.chouette.mobi/club-utilisateurs/newsletter/\" target=\"newsletter\">Lettre d'information</a>\n                </li>\n                <li>\n                  <a href=\"http://forum.chouette.mobi/\" target=\"forum\">Forum</a>\n                </li>\n              </ul>\n            </li>\n          </ul>\n        </div>\n        <div class=\"modal fade\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\n          <div class=\"modal-dialog\" role=\"document\">\n            <div class=\"modal-content\">\n              <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                  <span aria-hidden=\"true\">×</span>\n                </button>\n                <h4 class=\"modal-title\" id=\"myModalLabel\">Données</h4>\n              </div>\n              <div class=\"modal-body\">\n                Le site de démonstration utilise uniquement des données de simulation.\n                Ces données sont produites à partir d'une offre planifiée de test à laquelle sont appliqués des changements aléatoires pour simuler un état temps réel de l'offre de transport.\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </footer>\n</template>\n"; });
define('text!home.html', ['module'], function(module) { module.exports = "<template>\n  <div id='siri-description' class=\"i-m-there\">\n    <div class=\"app-wrapper\">\n      <div class=\"text-wrapper\">\n        <div class=\"explaination-text container\">\n          <div class=\"row\">\n            <div class=\"col-sm-12\">\n              <h2 class=\"text-center mb-lg\">Démonstrateur Siri</h2>\n              <p>\n                Depuis votre navigateur WEB, vous pouvez interroger des\n                serveurs SIRI qui implémentent les services Discovery, Check\n                Status, Stop Monitoring, General Message selon les profils\n                STIF 2.2 ou 2.4, en mode requête/réponse. Le site s'appuie\n                sur des logiciels libres : <a\n                  href=\"https://github.com/afimb/irys-demo\">un client\n                  html/js</a>, un <a href=\"https://github.com/afimb/irys-chouette\">\n                  serveur IRYS</a> qui fournit l'offre temps réel de transport à\n                partir de données de simulation.\n              </p>\n\n              <p>\n                D'autres services seront implémentés dans de prochaines\n                versions. D'autres travaux sont aussi <a\n                  href=\"http://www.chouette.mobi/irys/pourquoi-irys-2/feuille-de-route/\">en\n                  cours autour de SIRI</a> : contactez nous pour toute question,\n                merci !\n              </p>\n              <div class=\"row\">\n                <div class=\"col-xs-12 col-sm-4\">\n                  <p class=\"mt-lg text-center\">\n                    <a class=\"btn btn-danger btn-lg\" route-href=\"route: stopMonitoring\"\n                      id=\"first-SM-request\"> Faire une requête Stop\n                      Monitoring</a>\n                  </p>\n                </div>\n                <div class=\"col-xs-12 col-sm-4\">\n                  <p class=\"mt-lg text-center\">\n                    <a class=\"btn btn-warning btn-lg\" route-href=\"route: generalMessage\"\n                       id=\"/services/first-GM-request\">\n                      Faire une requête General Message</a>\n                  </p>\n                </div>\n                <div class=\"col-xs-12 col-sm-4\">\n                  <p class=\"mt-lg text-center\">\n                    <a class=\"btn btn-success btn-lg\" route-href=\"route: discovery\"\n                       id=\"first-SD-request\"> Faire une requête Service\n                      Discovery</a>\n                  </p>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n</template>\n"; });
define('text!sass/layout.css', ['module'], function(module) { module.exports = ".id-description {\n  text-align: center;\n  padding: 4px 0;\n  margin-top: 20px; }\n\nfooter {\n  margin-top: 45px;\n  padding: 20px;\n  background-color: #222;\n  color: #777;\n  font-size: 12px;\n  min-height: 200px; }\n  footer ul, footer li {\n    margin: 0;\n    padding: 0; }\n  footer li {\n    list-style: none; }\n  footer h4 {\n    color: #777; }\n  footer a {\n    color: #FFF; }\n\nbutton.badge {\n  cursor: pointer;\n  border: none; }\n\n.navbar {\n  background-color: #222;\n  min-height: 52px; }\n\n.navbar-default .navbar-nav > li > a {\n  color: #9d9d9d; }\n  .navbar-default .navbar-nav > li > a:focus, .navbar-default .navbar-nav > li > a:hover, .navbar-default .navbar-nav > li > a:active {\n    color: #fff; }\n\n.navbar-default .navbar-nav > li.active {\n  font-weight: bold; }\n\n.navbar-default .navbar-brand {\n  color: #fff; }\n  .navbar-default .navbar-brand:focus, .navbar-default .navbar-brand:hover, .navbar-default .navbar-brand:active {\n    color: #fff; }\n\n.navbar-siri-profile > li {\n  padding-top: 15px; }\n  .navbar-siri-profile > li #form-siri-profile label {\n    color: #fff; }\n\n.page-wrapper {\n  margin-top: 52px;\n  background: url(\"/images/tramway_white.jpg\") no-repeat center top/cover transparent; }\n\n.mt-xs {\n  margin-top: 5px; }\n\n.mt-sm {\n  margin-top: 10px; }\n\n.mt-md {\n  margin-top: 20px; }\n\n.mt-lg {\n  margin-top: 40px; }\n\n.mb-xs {\n  margin-bottom: 5px; }\n\n.mb-sm {\n  margin-bottom: 10px; }\n\n.mb-md {\n  margin-bottom: 20px; }\n\n.mb-lg {\n  margin-bottom: 40px; }\n\n/*-- GO! --*/\n#forms-wrapper > *, #response-wrapper > * {\n  display: none; }\n  #forms-wrapper > *.i-m-there, #response-wrapper > *.i-m-there {\n    display: block; }\n\n#stop-monitoring-form, #canned-requests, .xml-validation-form {\n  margin-bottom: 10px;\n  overflow: hidden;\n  margin-left: auto;\n  margin-right: auto;\n  max-width: 600px; }\n\n.hero-banner {\n  min-height: 300px;\n  max-height: 50%;\n  width: 100%;\n  position: relative; }\n  .hero-banner .hero-banner-wrapper {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0; }\n    .hero-banner .hero-banner-wrapper .hero-banner-pic {\n      background: url(../images/tramway.png) no-repeat center 25%;\n      -webkit-background-size: cover;\n      -moz-background-size: cover;\n      -o-background-size: cover;\n      background-size: cover;\n      height: 100%;\n      width: 100%; }\n    .hero-banner .hero-banner-wrapper .hero-banner-hollow {\n      background-color: rgba(120, 120, 120, 0.7);\n      height: 100%;\n      width: 100%;\n      position: absolute;\n      top: 0; }\n    .hero-banner .hero-banner-wrapper .hero-text {\n      position: absolute;\n      top: 100px;\n      margin: auto;\n      max-width: 80%;\n      left: 0;\n      right: 0;\n      color: white; }\n      .hero-banner .hero-banner-wrapper .hero-text h3 {\n        font-style: normal;\n        font-weight: 200; }\n      .hero-banner .hero-banner-wrapper .hero-text a {\n        color: dodgerblue; }\n        .hero-banner .hero-banner-wrapper .hero-text a:hover {\n          color: lightblue; }\n    .hero-banner .hero-banner-wrapper .picture-credit {\n      position: absolute;\n      bottom: 0;\n      right: 0;\n      color: white;\n      font-size: 0.85em;\n      padding-right: 10px; }\n\n.explaination-text {\n  font-weight: 300;\n  color: grey; }\n  .explaination-text h2 {\n    color: #333; }\n  .explaination-text h5 {\n    color: #333;\n    margin: 20px 0 10px;\n    padding-bottom: 5px;\n    text-transform: uppercase;\n    border-bottom: 1px dotted; }\n\n.page-wrapper {\n  overflow: hidden; }\n\n:app-wrapper {\n  height: 100%; }\n\n.app-wrapper {\n  position: relative; }\n\n.open-right-panel {\n  text-align: center; }\n\n.page-content {\n  position: relative;\n  white-space: nowrap; }\n  .page-content .container, .page-content right-panel {\n    display: inline-block;\n    vertical-align: top;\n    white-space: normal; }\n    .page-content .container#explaination-texts, .page-content right-panel#explaination-texts {\n      width: 100%; }\n  .page-content .explaination-text.container {\n    display: block; }\n\n.right-panel-wrapper {\n  position: relative;\n  margin-left: -15px;\n  -webkit-transition: ease-out 0.25s;\n  -o-transition: ease-out 0.25s;\n  transition: ease-out 0.25s;\n  width: 800px; }\n  .right-panel-wrapper.open {\n    margin-left: -800px; }\n\n#right-panel-wrapper .pannel-trigger {\n  border: none;\n  display: block;\n  position: absolute;\n  left: -19px;\n  top: 40px;\n  z-index: 6;\n  width: 20px;\n  height: 80px;\n  background-color: #333;\n  color: #fff;\n  line-height: 80px;\n  text-align: center;\n  -webkit-border-radius: 4px 0px 0px 4px;\n  -moz-border-radius: 4px 0px 0px 4px;\n  -ms-border-radius: 4px 0px 0px 4px;\n  border-radius: 4px 0px 0px 4px;\n  -webkit-box-shadow: -1px 0 2px 0 rgba(0, 0, 0, 0.5);\n  box-shadow: -1px 0 2px 0 rgba(0, 0, 0, 0.5); }\n  #right-panel-wrapper .pannel-trigger.open {\n    left: -4px; }\n\n#right-panel-wrapper .right-app-panel {\n  background-color: #333;\n  color: #fff;\n  -webkit-border-radius: 4px 0px 0px 4px;\n  -moz-border-radius: 4px 0px 0px 4px;\n  -ms-border-radius: 4px 0px 0px 4px;\n  border-radius: 4px 0px 0px 4px;\n  -webkit-box-shadow: -1px 0 4px 0 rgba(0, 0, 0, 0.5);\n  box-shadow: -1px 0 4px 0 rgba(0, 0, 0, 0.5);\n  padding: 20px 40px; }\n  #right-panel-wrapper .right-app-panel legend {\n    color: #fff; }\n  #right-panel-wrapper .right-app-panel .form-group p {\n    margin: 5px 0; }\n  #right-panel-wrapper .right-app-panel .form-group .btn[type='submit'] {\n    margin-top: 30px; }\n  #right-panel-wrapper .right-app-panel .form-group textarea {\n    width: calc(100% - 30px);\n    max-width: 100%; }\n  #right-panel-wrapper .right-app-panel .form-group > .text-right {\n    margin: 0 15px; }\n  #right-panel-wrapper .right-app-panel #response .siri-version-display {\n    margin-bottom: 20px; }\n  #right-panel-wrapper .right-app-panel #response .stop-wrapper {\n    width: auto;\n    max-width: 100%;\n    margin-left: 0;\n    margin-right: 0; }\n  #right-panel-wrapper .right-app-panel > form {\n    margin-left: 0;\n    margin-right: 0;\n    max-width: none; }\n  #right-panel-wrapper .right-app-panel .backlinking {\n    height: 20px;\n    margin-bottom: 40px; }\n    #right-panel-wrapper .right-app-panel .backlinking a {\n      color: #fff; }\n      #right-panel-wrapper .right-app-panel .backlinking a:hover, #right-panel-wrapper .right-app-panel .backlinking a:focus {\n        text-decoration: none;\n        border-bottom: 1px dotted; }\n    #right-panel-wrapper .right-app-panel .backlinking .pull-right + .pull-right {\n      margin-right: 10px; }\n  #right-panel-wrapper .right-app-panel .badge.badge-white {\n    background-color: #fff;\n    color: #3c3c3c; }\n    #right-panel-wrapper .right-app-panel .badge.badge-white:hover, #right-panel-wrapper .right-app-panel .badge.badge-white:focus {\n      border: none; }\n\n#right-panel-wrapper .panel-body {\n  color: #555; }\n\ntextarea.xml-paste-zone {\n  height: 400px;\n  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.75) inset;\n  max-width: 600px;\n  margin: auto;\n  border: none; }\n  textarea.xml-paste-zone:focus {\n    border: none;\n    background-color: #f7f7f7;\n    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.75) inset; }\n\n#close-slider {\n  position: asolute;\n  top: 5px;\n  left: 5px; }\n\n.slider-action-area {\n  position: relative;\n  height: 100%;\n  text-align: center; }\n\n.afimb-action-man {\n  height: 50px;\n  margin: auto; }\n\n.browsehappy {\n  margin: 0.2em 0;\n  background: #eee;\n  color: #000;\n  padding: 0.2em 0; }\n\n/* Everything but the jumbotron gets side spacing for mobile first views */\n.header,\n.marketing,\n.footer {\n  padding-left: 15px;\n  padding-right: 15px; }\n\n/* Custom page header */\n.header {\n  border-bottom: 1px solid #e5e5e5;\n  /* Make the masthead heading the same height as the navigation */ }\n  .header h3 {\n    margin-top: 0;\n    margin-bottom: 0;\n    line-height: 40px;\n    padding-bottom: 19px; }\n\n/* Custom page footer */\n.footer {\n  padding-top: 19px;\n  color: #777;\n  border-top: 1px solid #e5e5e5;\n  height: 60px; }\n\n.container-narrow > hr {\n  margin: 30px 0; }\n\n/* Main marketing message and sign up button */\n.jumbotron {\n  text-align: center;\n  border-bottom: 1px solid #e5e5e5; }\n  .jumbotron .btn {\n    font-size: 21px;\n    padding: 14px 24px; }\n\n/* Supporting marketing content */\n.marketing {\n  margin: 40px 0; }\n  .marketing p + h4 {\n    margin-top: 28px; }\n\n.fancy-header {\n  border: none;\n  position: relative;\n  z-index: 5;\n  background-color: rgba(255, 255, 255, 0.8); }\n  .fancy-header .container {\n    padding-top: 10px;\n    padding-bottom: 10px;\n    height: 80px; }\n    .fancy-header .container:before, .fancy-header .container:after {\n      content: \"\";\n      display: table; }\n    .fancy-header .container:after {\n      clear: both; }\n  .fancy-header h3 {\n    float: left;\n    margin: 0;\n    padding: 0;\n    line-height: 60px;\n    color: #3c3c3c; }\n\n.afimb-action-man a {\n  display: block; }\n  .afimb-action-man a .afimb-logo {\n    height: 60px;\n    width: auto; }\n\n.notice-wrapper {\n  position: relative;\n  z-index: 10;\n  width: 100%;\n  height: 30px;\n  background-color: dodgerblue;\n  color: #fff;\n  -webkit-box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.75);\n  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.75);\n  padding-top: 4px; }\n  .notice-wrapper a {\n    color: inherit;\n    border-bottom: 1px dotted; }\n\n.fancy-navbar {\n  border: none;\n  -webkit-border-radius: 0;\n  -moz-border-radius: 0;\n  -ms-border-radius: 0;\n  border-radius: 0; }\n  .fancy-navbar .dropdown-menu {\n    border: none;\n    -webkit-border-radius: 0;\n    -moz-border-radius: 0;\n    -ms-border-radius: 0;\n    border-radius: 0;\n    padding: 0; }\n    .fancy-navbar .dropdown-menu > li > a {\n      padding: 10px 20px; }\n\n.dropdown-inverse > .dropdown-menu {\n  background-color: #222; }\n  .dropdown-inverse > .dropdown-menu > li > a {\n    color: #9d9d9d; }\n    .dropdown-inverse > .dropdown-menu > li > a:hover {\n      background-color: #090909;\n      color: #fff; }\n\n.panel-info .panel-heading {\n  padding: 15px; }\n  .panel-info .panel-heading .panel-title {\n    font-size: 20px; }\n\n.panel-info dl.panel-body {\n  padding: 0;\n  margin: 0;\n  letter-spacing: -0.31em;\n  text-rendering: optimizespeed; }\n  .panel-info dl.panel-body dt, .panel-info dl.panel-body dd {\n    position: relative;\n    display: inline-block;\n    vertical-align: top;\n    padding: 10px 15px;\n    letter-spacing: normal;\n    text-rendering: auto;\n    border-top: 1px solid #bce8f1; }\n  .panel-info dl.panel-body dt:first-child, .panel-info dl.panel-body dt:first-child + dd {\n    border-top: none; }\n  .panel-info dl.panel-body dt {\n    width: 25%;\n    background-color: #f7fcfd;\n    color: #31708f;\n    font-weight: normal;\n    text-transform: uppercase;\n    font-size: 0.85em;\n    line-height: 20px; }\n    .panel-info dl.panel-body dt:before {\n      content: '';\n      display: block;\n      width: 0;\n      height: 0;\n      position: absolute;\n      right: -20px;\n      top: 0;\n      bottom: 0;\n      z-index: 1;\n      border-left: 20px solid #f7fcfd;\n      border-top: 20px solid transparent;\n      border-bottom: 20px solid transparent; }\n    .panel-info dl.panel-body dt:after {\n      content: '';\n      display: block;\n      width: 0;\n      height: 0;\n      position: absolute;\n      right: -20.5px;\n      top: 0;\n      bottom: 0;\n      z-index: 0;\n      border-left: 20px solid #bce8f1;\n      border-top: 20px solid transparent;\n      border-bottom: 20px solid transparent; }\n  .panel-info dl.panel-body dd {\n    width: 75%;\n    padding-left: 30px; }\n\n.request-form-opener {\n  font-size: 1.25em; }\n\n#footer {\n  margin-top: 45px;\n  padding: 20px;\n  background-color: #222222;\n  color: #777777;\n  font-size: 12px;\n  min-height: 200px; }\n  #footer ul {\n    list-style-type: none; }\n  #footer a {\n    color: #fefefe; }\n\n#response .line-4 {\n  border-color: #e9daf0; }\n  #response .line-4 .panel-heading {\n    background-color: #BE90D4;\n    color: white;\n    border-color: #e9daf0; }\n  #response .line-4 .panel-body {\n    color: black; }\n\n#response .line-1 {\n  border-color: #d3eef4; }\n  #response .line-1 .panel-heading {\n    background-color: #81CFE0;\n    color: white;\n    border-color: #d3eef4; }\n\n#response .line-2 {\n  border-color: #7ee2a8; }\n  #response .line-2 .panel-heading {\n    background-color: #2ECC71;\n    color: white;\n    border-color: #7ee2a8; }\n\n#response .line-3 {\n  border-color: #fad396; }\n  #response .line-3 .panel-heading {\n    background-color: #F5AB35;\n    color: black;\n    border-color: #fad396; }\n\n#response .line-5 {\n  border-color: #ff3645; }\n  #response .line-5 .panel-heading {\n    background-color: #CF000F;\n    color: black;\n    border-color: #ff3645; }\n\n#response .line-6 {\n  border-color: #fad396; }\n  #response .line-6 .panel-heading {\n    background-color: #F5AB35;\n    color: black;\n    border-color: #fad396; }\n\n#response .line-7 {\n  border-color: #fba772; }\n  #response .line-7 .panel-heading {\n    background-color: #F9690E;\n    color: black;\n    border-color: #fba772; }\n\n.stop-wrapper {\n  width: 80%;\n  max-width: 600px;\n  overflow: hidden;\n  background: white;\n  box-shadow: 1px 2px 2px #ccc;\n  margin-left: auto;\n  margin-right: auto; }\n  .stop-wrapper .info-ribbon {\n    height: 30px;\n    background: #eee;\n    width: 100%; }\n\n.alert-wrapper {\n  position: relative;\n  top: 80px;\n  width: 80%;\n  text-align: center;\n  margin-left: auto;\n  margin-right: auto;\n  top: 0;\n  left: 0;\n  right: 0; }\n\n#xml-response {\n  height: auto;\n  color: black;\n  min-height: 700px; }\n\n.indented-response {\n  margin-left: 20px; }\n\n.fancy-container {\n  padding-right: 20px;\n  padding-left: 20px;\n  margin-right: auto;\n  margin-left: auto; }\n\n.fancy-wrapper {\n  position: relative;\n  margin: 20px 0 0 0;\n  padding: 0; }\n  .fancy-wrapper .fancy-stop-wrapper {\n    display: block;\n    margin-top: 20px; }\n    .fancy-wrapper .fancy-stop-wrapper:before, .fancy-wrapper .fancy-stop-wrapper:after {\n      content: \"\";\n      display: table; }\n    .fancy-wrapper .fancy-stop-wrapper:after {\n      clear: both; }\n    .fancy-wrapper .fancy-stop-wrapper:first-child {\n      margin-top: 0; }\n    .fancy-wrapper .fancy-stop-wrapper.line-1 .line-header, .fancy-wrapper .fancy-stop-wrapper.line-1 .fancy-stop-wrapper > .line-header {\n      background-color: #81CFE0;\n      color: #fff; }\n    .fancy-wrapper .fancy-stop-wrapper.line-1 .fancy-stop-wrapper > .line-header:before {\n      border-top: 40px solid #81CFE0; }\n    .fancy-wrapper .fancy-stop-wrapper.line-1 .stop-info-property {\n      background-color: #d3eef4;\n      color: #44b8d1; }\n    .fancy-wrapper .fancy-stop-wrapper.line-1 .stop-info-value {\n      background-color: #f2fafc;\n      color: #6dc7db; }\n    .fancy-wrapper .fancy-stop-wrapper.line-2 .line-header, .fancy-wrapper .fancy-stop-wrapper.line-2 .fancy-stop-wrapper > .line-header {\n      background-color: #2ECC71;\n      color: #fff; }\n    .fancy-wrapper .fancy-stop-wrapper.line-2 .fancy-stop-wrapper > .line-header:before {\n      border-top: 40px solid #2ECC71; }\n    .fancy-wrapper .fancy-stop-wrapper.line-2 .stop-info-property {\n      background-color: #7ee2a8;\n      color: #176437; }\n    .fancy-wrapper .fancy-stop-wrapper.line-2 .stop-info-value {\n      background-color: #9de9bd;\n      color: #208e4e; }\n    .fancy-wrapper .fancy-stop-wrapper.line-3 .line-header, .fancy-wrapper .fancy-stop-wrapper.line-3 .fancy-stop-wrapper > .line-header {\n      background-color: #F5AB35; }\n    .fancy-wrapper .fancy-stop-wrapper.line-3 .fancy-stop-wrapper > .line-header:before {\n      border-top: 40px solid #F5AB35; }\n    .fancy-wrapper .fancy-stop-wrapper.line-3 .stop-info-property {\n      background-color: #fad396; }\n    .fancy-wrapper .fancy-stop-wrapper.line-3 .stop-info-value {\n      background-color: #fce3bb; }\n    .fancy-wrapper .fancy-stop-wrapper.line-4 .line-header, .fancy-wrapper .fancy-stop-wrapper.line-4 .fancy-stop-wrapper > .line-header {\n      background-color: #BE90D4;\n      color: #fff; }\n    .fancy-wrapper .fancy-stop-wrapper.line-4 .fancy-stop-wrapper > .line-header:before {\n      border-top: 40px solid #BE90D4; }\n    .fancy-wrapper .fancy-stop-wrapper.line-4 .stop-info-property {\n      background-color: #e9daf0;\n      color: #9e59bf; }\n    .fancy-wrapper .fancy-stop-wrapper.line-4 .stop-info-value {\n      background-color: #f9f5fb;\n      color: #b37ecd; }\n    .fancy-wrapper .fancy-stop-wrapper.line-5 .line-header, .fancy-wrapper .fancy-stop-wrapper.line-5 .fancy-stop-wrapper > .line-header {\n      background-color: #CF000F; }\n    .fancy-wrapper .fancy-stop-wrapper.line-5 .fancy-stop-wrapper > .line-header:before {\n      border-top: 40px solid #CF000F; }\n    .fancy-wrapper .fancy-stop-wrapper.line-5 .stop-info-property {\n      background-color: #ff3645; }\n    .fancy-wrapper .fancy-stop-wrapper.line-5 .stop-info-value {\n      background-color: #ff5c68; }\n    .fancy-wrapper .fancy-stop-wrapper.line-6 .line-header, .fancy-wrapper .fancy-stop-wrapper.line-6 .fancy-stop-wrapper > .line-header {\n      background-color: #F5AB35; }\n    .fancy-wrapper .fancy-stop-wrapper.line-6 .fancy-stop-wrapper > .line-header:before {\n      border-top: 40px solid #F5AB35; }\n    .fancy-wrapper .fancy-stop-wrapper.line-6 .stop-info-property {\n      background-color: #fad396; }\n    .fancy-wrapper .fancy-stop-wrapper.line-6 .stop-info-value {\n      background-color: #fce3bb; }\n    .fancy-wrapper .fancy-stop-wrapper.line-7 .line-header, .fancy-wrapper .fancy-stop-wrapper.line-7 .fancy-stop-wrapper > .line-header {\n      background-color: #F9690E; }\n    .fancy-wrapper .fancy-stop-wrapper.line-7 .fancy-stop-wrapper > .line-header:before {\n      border-top: 40px solid #F9690E; }\n    .fancy-wrapper .fancy-stop-wrapper.line-7 .stop-info-property {\n      background-color: #fba772; }\n    .fancy-wrapper .fancy-stop-wrapper.line-7 .stop-info-value {\n      background-color: #fcbe97; }\n    .fancy-wrapper .fancy-stop-wrapper .line-header {\n      padding: 10px; }\n      .fancy-wrapper .fancy-stop-wrapper .line-header > h4 {\n        margin: 0; }\n    .fancy-wrapper .fancy-stop-wrapper .stop-info[class*='col'], .fancy-wrapper .fancy-stop-wrapper .stop-info[class^='col'] {\n      padding: 0;\n      border-left: 1px solid #fff; }\n      .fancy-wrapper .fancy-stop-wrapper .stop-info[class*='col']:first-child, .fancy-wrapper .fancy-stop-wrapper .stop-info[class^='col']:first-child {\n        padding-left: 15px;\n        border-left: none; }\n      .fancy-wrapper .fancy-stop-wrapper .stop-info[class*='col']:last-child, .fancy-wrapper .fancy-stop-wrapper .stop-info[class^='col']:last-child {\n        padding-right: 15px; }\n    .fancy-wrapper .fancy-stop-wrapper .stop-info .stop-info-property {\n      text-transform: uppercase; }\n      .fancy-wrapper .fancy-stop-wrapper .stop-info .stop-info-property .glyphicon + span {\n        margin-left: 0.25em; }\n    .fancy-wrapper .fancy-stop-wrapper .stop-info .stop-info-property, .fancy-wrapper .fancy-stop-wrapper .stop-info .stop-info-value {\n      text-align: center;\n      font-size: 1em;\n      padding: 7px 4px 4px 4px; }\n      .fancy-wrapper .fancy-stop-wrapper .stop-info .stop-info-property > p, .fancy-wrapper .fancy-stop-wrapper .stop-info .stop-info-value > p {\n        margin: 0; }\n    .fancy-wrapper .fancy-stop-wrapper .stop-info .stop-info-property {\n      font-size: 0.85em; }\n    .fancy-wrapper .fancy-stop-wrapper .stop-info .stop-info-value.delayed {\n      color: orange; }\n    .fancy-wrapper .fancy-stop-wrapper .stop-info .stop-info-value.canceled {\n      color: red; }\n    .fancy-wrapper .fancy-stop-wrapper .stop-info .stop-info-value.early {\n      color: green; }\n  .fancy-wrapper .fancy-wrapper.onwards {\n    clear: both;\n    margin-top: 0; }\n    .fancy-wrapper .fancy-wrapper.onwards .fancy-stop-wrapper {\n      padding-left: 40px;\n      margin-top: 20px; }\n    .fancy-wrapper .fancy-wrapper.onwards .fancy-stop-wrapper .line-header {\n      position: relative; }\n      .fancy-wrapper .fancy-wrapper.onwards .fancy-stop-wrapper .line-header:before {\n        content: '';\n        position: absolute;\n        left: -20px;\n        top: 0;\n        display: block;\n        width: 0px;\n        height: 0px;\n        border-left: 20px solid transparent; }\n\n#check-status-response-wrapper .alert {\n  width: 100%;\n  min-height: 100%;\n  border: none;\n  text-align: center; }\n"; });
define('text!modal-data.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"modal fade\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\n    <div class=\"modal-dialog\" role=\"document\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\"\n            aria-label=\"Close\">\n            <span aria-hidden=\"true\">&times;</span>\n          </button>\n          <h4 class=\"modal-title\" id=\"myModalLabel\">Données</h4>\n        </div>\n        <div class=\"modal-body\">Le site de démonstration utilise\n          uniquement des données de simulation. Ces données sont produites\n          à partir d'une offre planifiée de test à laquelle sont appliqués\n          des changements aléatoires pour simuler un état temps réel de\n          l'offre de transport.</div>\n      </div>\n    </div>\n  </div>\n</template>\n"; });
define('text!sass/main.css', ['module'], function(module) { module.exports = ".mt-xs {\n  margin-top: 5px; }\n\n.mt-sm {\n  margin-top: 10px; }\n\n.mt-md {\n  margin-top: 20px; }\n\n.mt-lg {\n  margin-top: 40px; }\n\n.mb-xs {\n  margin-bottom: 5px; }\n\n.mb-sm {\n  margin-bottom: 10px; }\n\n.mb-md {\n  margin-bottom: 20px; }\n\n.mb-lg {\n  margin-bottom: 40px; }\n\n/*-- GO! --*/\n#forms-wrapper > *, #response-wrapper > * {\n  display: none; }\n  #forms-wrapper > *.i-m-there, #response-wrapper > *.i-m-there {\n    display: block; }\n\n#stop-monitoring-form, #canned-requests, .xml-validation-form {\n  margin-bottom: 10px;\n  overflow: hidden;\n  margin-left: auto;\n  margin-right: auto;\n  max-width: 600px; }\n\n.hero-banner {\n  min-height: 300px;\n  max-height: 50%;\n  width: 100%;\n  position: relative; }\n  .hero-banner .hero-banner-wrapper {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0; }\n    .hero-banner .hero-banner-wrapper .hero-banner-pic {\n      background: url(../images/tramway.png) no-repeat center 25%;\n      -webkit-background-size: cover;\n      -moz-background-size: cover;\n      -o-background-size: cover;\n      background-size: cover;\n      height: 100%;\n      width: 100%; }\n    .hero-banner .hero-banner-wrapper .hero-banner-hollow {\n      background-color: rgba(120, 120, 120, 0.7);\n      height: 100%;\n      width: 100%;\n      position: absolute;\n      top: 0; }\n    .hero-banner .hero-banner-wrapper .hero-text {\n      position: absolute;\n      top: 100px;\n      margin: auto;\n      max-width: 80%;\n      left: 0;\n      right: 0;\n      color: white; }\n      .hero-banner .hero-banner-wrapper .hero-text h3 {\n        font-style: normal;\n        font-weight: 200; }\n      .hero-banner .hero-banner-wrapper .hero-text a {\n        color: dodgerblue; }\n        .hero-banner .hero-banner-wrapper .hero-text a:hover {\n          color: lightblue; }\n    .hero-banner .hero-banner-wrapper .picture-credit {\n      position: absolute;\n      bottom: 0;\n      right: 0;\n      color: white;\n      font-size: 0.85em;\n      padding-right: 10px; }\n\n.explaination-text {\n  font-weight: 300;\n  color: grey; }\n  .explaination-text h2 {\n    color: #333; }\n  .explaination-text h5 {\n    color: #333;\n    margin: 20px 0 10px;\n    padding-bottom: 5px;\n    text-transform: uppercase;\n    border-bottom: 1px dotted; }\n\n.page-wrapper {\n  overflow: hidden; }\n\n:app-wrapper {\n  height: 100%; }\n\n.app-wrapper {\n  position: relative; }\n\n.open-right-panel {\n  text-align: center; }\n\n.page-content {\n  position: relative;\n  white-space: nowrap; }\n  .page-content .container, .page-content right-panel {\n    display: inline-block;\n    vertical-align: top;\n    white-space: normal; }\n    .page-content .container#explaination-texts, .page-content right-panel#explaination-texts {\n      width: 100%; }\n  .page-content .explaination-text.container {\n    display: block; }\n\n.right-panel-wrapper {\n  position: relative;\n  margin-left: -15px;\n  -webkit-transition: ease-out 0.25s;\n  -o-transition: ease-out 0.25s;\n  transition: ease-out 0.25s;\n  width: 800px; }\n  .right-panel-wrapper.open {\n    margin-left: -800px; }\n\n#right-panel-wrapper .pannel-trigger {\n  border: none;\n  display: block;\n  position: absolute;\n  left: -19px;\n  top: 40px;\n  z-index: 6;\n  width: 20px;\n  height: 80px;\n  background-color: #333;\n  color: #fff;\n  line-height: 80px;\n  text-align: center;\n  -webkit-border-radius: 4px 0px 0px 4px;\n  -moz-border-radius: 4px 0px 0px 4px;\n  -ms-border-radius: 4px 0px 0px 4px;\n  border-radius: 4px 0px 0px 4px;\n  -webkit-box-shadow: -1px 0 2px 0 rgba(0, 0, 0, 0.5);\n  box-shadow: -1px 0 2px 0 rgba(0, 0, 0, 0.5); }\n  #right-panel-wrapper .pannel-trigger.open {\n    left: -4px; }\n\n#right-panel-wrapper .right-app-panel {\n  background-color: #333;\n  color: #fff;\n  -webkit-border-radius: 4px 0px 0px 4px;\n  -moz-border-radius: 4px 0px 0px 4px;\n  -ms-border-radius: 4px 0px 0px 4px;\n  border-radius: 4px 0px 0px 4px;\n  -webkit-box-shadow: -1px 0 4px 0 rgba(0, 0, 0, 0.5);\n  box-shadow: -1px 0 4px 0 rgba(0, 0, 0, 0.5);\n  padding: 20px 40px; }\n  #right-panel-wrapper .right-app-panel legend {\n    color: #fff; }\n  #right-panel-wrapper .right-app-panel .form-group p {\n    margin: 5px 0; }\n  #right-panel-wrapper .right-app-panel .form-group .btn[type='submit'] {\n    margin-top: 30px; }\n  #right-panel-wrapper .right-app-panel .form-group textarea {\n    width: calc(100% - 30px);\n    max-width: 100%; }\n  #right-panel-wrapper .right-app-panel .form-group > .text-right {\n    margin: 0 15px; }\n  #right-panel-wrapper .right-app-panel #response .siri-version-display {\n    margin-bottom: 20px; }\n  #right-panel-wrapper .right-app-panel #response .stop-wrapper {\n    width: auto;\n    max-width: 100%;\n    margin-left: 0;\n    margin-right: 0; }\n  #right-panel-wrapper .right-app-panel > form {\n    margin-left: 0;\n    margin-right: 0;\n    max-width: none; }\n  #right-panel-wrapper .right-app-panel .backlinking {\n    height: 20px;\n    margin-bottom: 40px; }\n    #right-panel-wrapper .right-app-panel .backlinking a {\n      color: #fff; }\n      #right-panel-wrapper .right-app-panel .backlinking a:hover, #right-panel-wrapper .right-app-panel .backlinking a:focus {\n        text-decoration: none;\n        border-bottom: 1px dotted; }\n    #right-panel-wrapper .right-app-panel .backlinking .pull-right + .pull-right {\n      margin-right: 10px; }\n  #right-panel-wrapper .right-app-panel .badge.badge-white {\n    background-color: #fff;\n    color: #3c3c3c; }\n    #right-panel-wrapper .right-app-panel .badge.badge-white:hover, #right-panel-wrapper .right-app-panel .badge.badge-white:focus {\n      border: none; }\n\n#right-panel-wrapper .panel-body {\n  color: #555; }\n\ntextarea.xml-paste-zone {\n  height: 400px;\n  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.75) inset;\n  max-width: 600px;\n  margin: auto;\n  border: none; }\n  textarea.xml-paste-zone:focus {\n    border: none;\n    background-color: #f7f7f7;\n    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.75) inset; }\n\n#close-slider {\n  position: asolute;\n  top: 5px;\n  left: 5px; }\n\n.slider-action-area {\n  position: relative;\n  height: 100%;\n  text-align: center; }\n\n.afimb-action-man {\n  height: 50px;\n  margin: auto; }\n\n.browsehappy {\n  margin: 0.2em 0;\n  background: #eee;\n  color: #000;\n  padding: 0.2em 0; }\n\n/* Everything but the jumbotron gets side spacing for mobile first views */\n.header,\n.marketing,\n.footer {\n  padding-left: 15px;\n  padding-right: 15px; }\n\n/* Custom page header */\n.header {\n  border-bottom: 1px solid #e5e5e5;\n  /* Make the masthead heading the same height as the navigation */ }\n  .header h3 {\n    margin-top: 0;\n    margin-bottom: 0;\n    line-height: 40px;\n    padding-bottom: 19px; }\n\n/* Custom page footer */\n.footer {\n  padding-top: 19px;\n  color: #777;\n  border-top: 1px solid #e5e5e5;\n  height: 60px; }\n\n.container-narrow > hr {\n  margin: 30px 0; }\n\n/* Main marketing message and sign up button */\n.jumbotron {\n  text-align: center;\n  border-bottom: 1px solid #e5e5e5; }\n  .jumbotron .btn {\n    font-size: 21px;\n    padding: 14px 24px; }\n\n/* Supporting marketing content */\n.marketing {\n  margin: 40px 0; }\n  .marketing p + h4 {\n    margin-top: 28px; }\n\n.fancy-header {\n  border: none;\n  position: relative;\n  z-index: 5;\n  background-color: rgba(255, 255, 255, 0.8); }\n  .fancy-header .container {\n    padding-top: 10px;\n    padding-bottom: 10px;\n    height: 80px; }\n    .fancy-header .container:before, .fancy-header .container:after {\n      content: \"\";\n      display: table; }\n    .fancy-header .container:after {\n      clear: both; }\n  .fancy-header h3 {\n    float: left;\n    margin: 0;\n    padding: 0;\n    line-height: 60px;\n    color: #3c3c3c; }\n\n.afimb-action-man a {\n  display: block; }\n  .afimb-action-man a .afimb-logo {\n    height: 60px;\n    width: auto; }\n\n.notice-wrapper {\n  position: relative;\n  z-index: 10;\n  width: 100%;\n  height: 30px;\n  background-color: dodgerblue;\n  color: #fff;\n  -webkit-box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.75);\n  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.75);\n  padding-top: 4px; }\n  .notice-wrapper a {\n    color: inherit;\n    border-bottom: 1px dotted; }\n\n.fancy-navbar {\n  border: none;\n  -webkit-border-radius: 0;\n  -moz-border-radius: 0;\n  -ms-border-radius: 0;\n  border-radius: 0; }\n  .fancy-navbar .dropdown-menu {\n    border: none;\n    -webkit-border-radius: 0;\n    -moz-border-radius: 0;\n    -ms-border-radius: 0;\n    border-radius: 0;\n    padding: 0; }\n    .fancy-navbar .dropdown-menu > li > a {\n      padding: 10px 20px; }\n\n.dropdown-inverse > .dropdown-menu {\n  background-color: #222; }\n  .dropdown-inverse > .dropdown-menu > li > a {\n    color: #9d9d9d; }\n    .dropdown-inverse > .dropdown-menu > li > a:hover {\n      background-color: #090909;\n      color: #fff; }\n\n.panel-info .panel-heading {\n  padding: 15px; }\n  .panel-info .panel-heading .panel-title {\n    font-size: 20px; }\n\n.panel-info dl.panel-body {\n  padding: 0;\n  margin: 0;\n  letter-spacing: -0.31em;\n  text-rendering: optimizespeed; }\n  .panel-info dl.panel-body dt, .panel-info dl.panel-body dd {\n    position: relative;\n    display: inline-block;\n    vertical-align: top;\n    padding: 10px 15px;\n    letter-spacing: normal;\n    text-rendering: auto;\n    border-top: 1px solid #bce8f1; }\n  .panel-info dl.panel-body dt:first-child, .panel-info dl.panel-body dt:first-child + dd {\n    border-top: none; }\n  .panel-info dl.panel-body dt {\n    width: 25%;\n    background-color: #f7fcfd;\n    color: #31708f;\n    font-weight: normal;\n    text-transform: uppercase;\n    font-size: 0.85em;\n    line-height: 20px; }\n    .panel-info dl.panel-body dt:before {\n      content: '';\n      display: block;\n      width: 0;\n      height: 0;\n      position: absolute;\n      right: -20px;\n      top: 0;\n      bottom: 0;\n      z-index: 1;\n      border-left: 20px solid #f7fcfd;\n      border-top: 20px solid transparent;\n      border-bottom: 20px solid transparent; }\n    .panel-info dl.panel-body dt:after {\n      content: '';\n      display: block;\n      width: 0;\n      height: 0;\n      position: absolute;\n      right: -20.5px;\n      top: 0;\n      bottom: 0;\n      z-index: 0;\n      border-left: 20px solid #bce8f1;\n      border-top: 20px solid transparent;\n      border-bottom: 20px solid transparent; }\n  .panel-info dl.panel-body dd {\n    width: 75%;\n    padding-left: 30px; }\n\n.request-form-opener {\n  font-size: 1.25em; }\n\n#footer {\n  margin-top: 45px;\n  padding: 20px;\n  background-color: #222222;\n  color: #777777;\n  font-size: 12px;\n  min-height: 200px; }\n  #footer ul {\n    list-style-type: none; }\n  #footer a {\n    color: #fefefe; }\n"; });
define('text!nav-bar.html', ['module'], function(module) { module.exports = "<template bindable=\"router\">\n  <nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\">\n    <div class=\"container\">\n      <div class=\"navbar-header\">\n        <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#skeleton-navigation-navbar-collapse\">\n          <span class=\"sr-only\">Afficher la navigation</span>\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n        </button>\n        <a class=\"navbar-brand\" href=\"/\">\n          <i class=\"fa fa-home\"></i>\n          <span>${router.title}</span>\n        </a>\n      </div>\n\n      <div class=\"collapse navbar-collapse\" id=\"skeleton-navigation-navbar-collapse\">\n        <ul class=\"nav navbar-nav\">\n          <li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\">\n            <a data-toggle=\"collapse\" data-target=\"#skeleton-navigation-navbar-collapse.in\" href.bind=\"row.href\" click.delegate=\"closePanel()\">${row.title}</a>\n          </li>\n        </ul>\n\n        <ul class=\"nav navbar-nav navbar-right navbar-siri-profile\">\n          <li>\n            <form id=\"form-siri-profile\">\n              <label for=\"siri-profile\">SIRI Profile</label>\n              <select id=\"siri-profile\" value.bind=\"siriProfile\">\n                <option value=\"2.2\">2.2</option>\n                <option value=\"2.4\">2.4</option>\n              </select>\n            </form>\n          </li>\n        </ul>\n\n        <ul class=\"nav navbar-nav navbar-right\">\n          <li class=\"loader\" if.bind=\"router.isNavigating\">\n            <i class=\"fa fa-spinner fa-spin fa-2x\"></i>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </nav>\n</template>\n"; });
define('text!sass/mixin.css', ['module'], function(module) { module.exports = ""; });
define('text!right-panel.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"right-panel-wrapper\" id=\"right-panel-wrapper\">\n    <div id=\"forms-wrapper\">\n      <button class=\"pannel-trigger\" click.delegate=\"togglePanel()\">\n        <span class=\"glyphicon glyphicon-option-vertical\"></span>\n      </button>\n\n      <div id=\"stop-monitoring-form-wrapper\" class=\"i-m-there\">\n        <div class=\"right-app-panel\">\n          <div class=\"backlinking\">\n            <div class=\"pull-right\">\n              <button class=\"btn btn-default btn-xs\" click.delegate=\"xmlFormWrapper()\">Requête XML</button>\n            </div>\n          </div>\n\n          <form class=\"form-horizontal\" id=\"stop-monitoring-form\" submit.delegate=\"stopMonitoring()\">\n            <fieldset>\n              <legend>Construire votre requête Stop Monitoring</legend>\n              <div class=\"form-group\">\n                <label for=\"stopName\" class=\"col-lg-4 control-label\">Nom\n                  arrêt</label>\n                <div class=\"col-lg-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"stopName\"\n                    placeholder=\"Nom de l'arrêt ou id\">\n                  <p>Utilise les données d'autocompletion issues du service\n                    stop discovery</p>\n                  <button class=\"btn btn-default btn-xs\" click.delegate=\"resetStopId($event)\">\n                    Remettre à zéro\n                  </button>\n                </div>\n              </div>\n              <div class=\"form-group hidden\">\n                <label for=\"stopId\" class=\"col-lg-4 control-label\">StopId</label>\n                <div class=\"col-lg-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"stopId\"\n                    placeholder=\"Nom de l'arrêt ou id\">\n                </div>\n              </div>\n              <!--  [DSU] -->\n              <div class=\"form-group siri_24\">\n                <label for=\"destinationName\" class=\"col-lg-4 control-label\">Destination</label>\n                <div class=\"col-lg-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"destinationName\"\n                    placeholder=\"Nom de l'arrêt ou id\">\n                  <p>Utilise les données d'autocompletion issues du service\n                    stop discovery</p>\n                  <button class=\"btn btn-default btn-xs\" click.delegate=\"resetDestinationId($event)\">\n                    Remettre à zéro\n                  </button>\n                </div>\n              </div>\n              <div class=\"form-group hidden\">\n                <label for=\"destinationId\" class=\"col-lg-4 control-label\">DestinationId</label>\n                <div class=\"col-lg-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"destinationId\"\n                    placeholder=\"Nom de l'arrêt ou id\">\n                </div>\n              </div>\n              <!--  [DSU] -->\n              <div class=\"form-group\">\n                <label for=\"lineName\" class=\"col-lg-4 control-label\">Nom\n                  de la ligne</label>\n                <div class=\"col-lg-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"lineName\"\n                    placeholder=\"id de la ligne\">\n                  <p>Utilise les données d'autocompletion issues du service\n                    line discovery</p>\n                  <button class=\"btn btn-default btn-xs\" click.delegate=\"resetLineId($event)\">\n                    Remettre à zéro\n                  </button>\n                </div>\n              </div>\n              <div class=\"form-group hidden\">\n                <label for=\"lineId\" class=\"col-lg-4 control-label\">LineId</label>\n                <div class=\"col-lg-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"lineId\"\n                    placeholder=\"id de la ligne\">\n                </div>\n              </div>\n              <div class=\"form-group\">\n                <label for=\"start\" class=\"col-lg-4 control-label\">Heure</label>\n                <div class=\"col-lg-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"start\"\n                    placeholder=\"Heure de départ (HH:MM)\">\n                </div>\n              </div>\n              <div class=\"form-group\">\n                <label for=\"typeVisit\" class=\"col-lg-4 control-label\">Type\n                  d'arrêt</label>\n                <div class=\"col-lg-8\">\n                  <select class=\"form-control\" id=\"typeVisit\">\n                    <option value=\"arrivals\">Arrivées</option>\n                    <option value=\"departures\">Départs</option>\n                    <option value=\"all\">Tous</option>\n                  </select>\n                </div>\n              </div>\n              <div class=\"form-group\">\n                <label for=\"preview\" class=\"col-lg-4 control-label\">Intervalle\n                  temporel (mn)</label>\n                <div class=\"col-lg-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"preview\"\n                    list=\"time-span-list\" placeholder=\"Intervalle temporel\">\n                  <datalist id=\"time-span-list\">\n                    <option>0</option>\n                    <option>30</option>\n                    <option>60</option>\n                    <option>90</option>\n                    <option>120</option>\n                    <option>150</option>\n                    <option>180</option>\n                  </datalist>\n                </div>\n              </div>\n              <div class=\"form-group\">\n                <label for=\"maxStop\" class=\"col-lg-4 control-label\">Limite\n                  de passages</label>\n                <div class=\"col-lg-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"maxStop\"\n                    list=\"max-stop-list\" placeholder=\"Nombre maxi d'arrets\">\n                  <datalist id=\"max-stop-list\">\n                    <option>0</option>\n                    <option>1</option>\n                    <option>2</option>\n                    <option>3</option>\n                    <option>4</option>\n                    <option>5</option>\n                    <option>6</option>\n                  </datalist>\n                </div>\n              </div>\n              <div class=\"form-group\">\n                <label for=\"minStLine\" class=\"col-lg-4 control-label\">Minimum\n                  d'arrêts par ligne</label>\n                <div class=\"col-lg-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"minStLine\"\n                    list=\"minStLine-list\"\n                    placeholder=\"Nombre d'arrets mini par ligne\">\n                  <datalist id=\"minStLine-list\">\n                    <option>1</option>\n                    <option>2</option>\n                    <option>3</option>\n                    <option>4</option>\n                    <option>5</option>\n                  </datalist>\n                </div>\n              </div>\n              <!--  [DSU] -->\n              <div class=\"form-group siri_24\">\n                <label for=\"minimumStopVisitPerLineVia\"\n                  class=\"col-lg-4 control-label\">Minimum de passages\n                  par itinéraire</label>\n                <div class=\"col-lg-8\">\n                  <input type=\"text\" class=\"form-control\"\n                    id=\"minimumStopVisitPerLineVia\"\n                    placeholder=\"Minimum de passages par itinéraire\">\n                </div>\n              </div>\n              <!--  [DSU] -->\n              <div class=\"form-group\">\n                <label for=\"onward\" class=\"col-lg-4 control-label\">Arrêts\n                  suivants</label>\n                <div class=\"col-lg-4\">\n                  <input type=\"text\" class=\"form-control\" id=\"onward\"\n                    list=\"time-span-list\" placeholder=\"nbs\">\n                  <datalist id=\"time-span-list\">\n                    <option>1</option>\n                    <option>2</option>\n                    <option>3</option>\n                    <option>4</option>\n                    <option>5</option>\n                  </datalist>\n                </div>\n                <p class=\"col-lg-4\">passages suivants\n              </div>\n              <div class=\"form-group\">\n                <div class=\"alert-wrapper\"></div>\n                <div class=\"text-right\">\n                  <button type=\"submit\" class=\"btn btn-success\">Envoyer la requête</button>\n                </div>\n              </div>\n            </fieldset>\n          </form>\n        </div>\n      </div>\n\n      <div id=\"stop-monitoring-xml-form-wrapper\">\n        <div class=\"right-app-panel\">\n         <div class=\"backlinking\">\n           <div class=\"pull-left\">\n             <button class=\"btn btn-default btn-xs\" click.delegate=\"goBack()\">\n              <span class=\"glyphicon glyphicon-chevron-left\"></span>\n               <span>Retourner au formulaire</span>\n             </button>\n           </div>\n         </div>\n         <form class=\"form-horizontal xml-validation-form\"\n           id=\"smart-request-form\" submit.delegate=\"smartRequest()\">\n           <legend>Requête XML</legend>\n           <div class=\"form-group\">\n             <textarea class=\"form-control xml-paste-zone\"\n               id=\"xml-request-textarea\"\n               placeholder=\"Copier votre requête xml\"></textarea>\n           </div>\n           <div class=\"form-group\">\n             <div class=\"text-right\">\n               <button type=\"submit\" class=\"btn btn-success\"\n                 id=\"smart-request-submit\">Envoyer la requête</button>\n             </div>\n           </div>\n         </form>\n        </div>\n      </div>\n\n      <div id=\"get-general-message-form-wrapper\">\n        <div class=\"right-app-panel\">\n          <form class=\"form-horizontal\" id=\"canned-requests\" submit.delegate=\"generalMessage()\">\n            <legend class=\"\">Construire votre requête General Message</legend>\n            <fieldset>\n              <div class=\"form-group\">\n                <label for=\"stopName\" class=\"col-lg-4 control-label\">Nom\n                  arrêt</label>\n                <div class=\"col-lg-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"stopName\"\n                    placeholder=\"Nom de l'arrêt ou id\">\n                  <p>Utilise les données d'autocompletion issues du service\n                    stop discovery</p>\n                  <button class=\"btn btn-default btn-xs\" click.delegate=\"resetStopId($event)\">\n                    Remettre à zéro\n                  </button>\n                </div>\n              </div>\n\n              <div class=\"form-group hidden\">\n                <label for=\"stopId\" class=\"col-lg-4 control-label\">StopId</label>\n                <div class=\"col-lg-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"stopId\"\n                    placeholder=\"Nom de l'arrêt ou id\">\n                </div>\n              </div>\n              <div class=\"form-group\">\n                <label for=\"lineName\" class=\"col-lg-4 control-label\">Nom\n                  de la ligne</label>\n                <div class=\"col-lg-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"lineName\"\n                    placeholder=\"Nom de la ligne\">\n                  <p>Utilise les données d'autocompletion issues du service\n                    line discovery</p>\n                  <button class=\"btn btn-default btn-xs\" click.delegate=\"resetLineId($event)\">\n                    Remettre à zéro\n                  </button>\n                </div>\n              </div>\n              <div class=\"form-group hidden\">\n                <label for=\"lineId\" class=\"col-lg-4 control-label\">LineId</label>\n                <div class=\"col-lg-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"lineId\"\n                    placeholder=\"id de la ligne\">\n                </div>\n              </div>\n              <div class=\"form-group\">\n                <label for=\"perturbationType\" class=\"col-lg-4 control-label\">Type\n                  de perturbation</label>\n                <div class=\"col-lg-8\">\n                  <select class=\"form-control\" id=\"perturbationType\">\n                    <option value=\"\">Tous</option>\n                    <option value=\"Perturbation\">Perturbation</option>\n                    <option value=\"Information\">Information</option>\n                    <option value=\"Commercial\">Commercial</option>\n                  </select>\n                </div>\n              </div>\n              <div class=\"form-group\">\n                <div class=\"alert-wrapper\"></div>\n                <div class=\"col-xs-4\">\n                  <button type=\"submit\" class=\"btn btn-warning\"\n                    id=\"get-general-message\">Get General Message</button>\n                </div>\n              </div>\n            </fieldset>\n          </form>\n        </div>\n      </div>\n\n      <div id=\"service-discovery-form-wrapper\">\n        <div class=\"right-app-panel\">\n          <form class=\"form-horizontal\" id=\"canned-requests\">\n            <legend class=\"\"> Construire votre requête Stop\n              Discovery ou Line Discovery</legend>\n            <fieldset>\n              <div class=\"form-group\">\n                <div class=\"col-xs-4\">\n                  <button type=\"button\" class=\"btn btn-primary\"\n                    id=\"stop-discovery-button\" click.delegate=\"stopDiscovery()\">Stop Discovery</button>\n                </div>\n                <div class=\"col-xs-4\">\n                  <button type=\"button\" class=\"btn btn-info\"\n                    id=\"line-discovery-button\" click.delegate=\"lineDiscovery()\">Line Discovery</button>\n                </div>\n              </div>\n            </fieldset>\n          </form>\n        </div>\n      </div>\n      <div id=\"check-status-form-wrapper\">\n        <div class=\"right-app-panel\">\n          <form class=\"form-horizontal\" id=\"check-status\" submit.delegate=\"checkStatus()\">\n            <legend class=\"\"> Construire votre requête Check Status</legend>\n            <fieldset>\n              <div class=\"form-group\">\n                <div class=\"col-xs-4\">\n                  <button type=\"button\" class=\"btn btn-primary\"\n                    id=\"check-status-button\" click.delegate=\"checkStatus()\">Check Status</button>\n                </div>\n              </div>\n            </fieldset>\n          </form>\n        </div>\n      </div>\n    </div>\n\n    <div id=\"response-wrapper\">\n      <div id=\"response-panel-wrapper\">\n        <div class=\"right-app-panel\">\n          <div id=\"response\">\n            <div class=\"backlinking\">\n              <div class=\"pull-left\">\n                <button id=\"backlink-form-from-response\" class=\"btn btn-default btn-xs\" click.delegate=\"goBack()\">\n                  <span class=\"glyphicon glyphicon-chevron-left\"></span>\n                  <span>Retourner au formulaire</span>\n                </button>\n              </div>\n\n              <div class=\"pull-right\">\n                <button class=\"badge badge-white\" click.delegate=\"vueView('xml-')\">Vue xml</button>\n              </div>\n              <div class=\"pull-right fancy-view\">\n                <button class=\"badge badge-white\" click.delegate=\"vueView('fancy-')\">Vue synthetique</button>\n              </div>\n            </div>\n\n            <h4 class=\"response-counter\"></h4>\n            <h4 class=\"siri-version-display\"></h4>\n            <div id=\"check-status-response-wrapper\"></div>\n          </div>\n        </div>\n      </div>\n\n      <div id=\"fancy-response-panel-wrapper\">\n        <div class=\"right-app-panel\">\n          <div class=\"backlinking\">\n            <div class=\"pull-left\">\n              <button id=\"fancy-backlink-form-from-response\" class=\"btn btn-default btn-xs\" click.delegate=\"goBack()\">\n                <span class=\"glyphicon glyphicon-chevron-left\"></span>\n                <span>Retourner au formulaire</span>\n              </button>\n            </div>\n            <div class=\"pull-right\">\n              <button class=\"badge badge-white\" click.delegate=\"vueView('xml-')\">Vue xml</button>\n            </div>\n            <div class=\"pull-right\">\n              <button class=\"badge badge-white\" click.delegate=\"vueView('')\">Vue complète</button>\n            </div>\n          </div>\n          <div id=\"fancy-response\">\n            <h4 class=\"response-counter\"></h4>\n            <h4 class=\"siri-version-display\"></h4>\n            <ul class=\"fancy-wrapper\" id=\"fancy-wrapper\"></ul>\n          </div>\n        </div>\n      </div>\n\n      <div id=\"xml-response-panel-wrapper\">\n        <div class=\"right-app-panel\">\n          <div class=\"backlinking\">\n            <div class=\"pull-left\">\n              <button id=\"xml-backlink-form-from-response\" class=\"btn btn-default btn-xs\" click.delegate=\"goBack()\">\n                <span class=\"glyphicon glyphicon-chevron-left\"></span>\n                <span>Retourner au formulaire</span>\n              </button>\n            </div>\n\n            <div class=\"pull-right\">\n              <button class=\"badge badge-white\" click.delegate=\"vueView('')\">Vue complète</button>\n            </div>\n            <div class=\"pull-right fancy-view\">\n              <button class=\"badge badge-white\" click.delegate=\"vueView('fancy-')\">Vue synthetique</button>\n            </div>\n          </div>\n          <div id=\"xml-response\">\n            <div>\n              <textarea rows=\"20\" cols=\"40\" id=\"xml-response-wrapper\"\n                class=\"col-xs-12\"></textarea>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n"; });
define('text!sass/stop-results.css', ['module'], function(module) { module.exports = "#response .line-4 {\n  border-color: #e9daf0; }\n  #response .line-4 .panel-heading {\n    background-color: #BE90D4;\n    color: white;\n    border-color: #e9daf0; }\n  #response .line-4 .panel-body {\n    color: black; }\n\n#response .line-1 {\n  border-color: #d3eef4; }\n  #response .line-1 .panel-heading {\n    background-color: #81CFE0;\n    color: white;\n    border-color: #d3eef4; }\n\n#response .line-2 {\n  border-color: #7ee2a8; }\n  #response .line-2 .panel-heading {\n    background-color: #2ECC71;\n    color: white;\n    border-color: #7ee2a8; }\n\n#response .line-3 {\n  border-color: #fad396; }\n  #response .line-3 .panel-heading {\n    background-color: #F5AB35;\n    color: black;\n    border-color: #fad396; }\n\n#response .line-5 {\n  border-color: #ff3645; }\n  #response .line-5 .panel-heading {\n    background-color: #CF000F;\n    color: black;\n    border-color: #ff3645; }\n\n#response .line-6 {\n  border-color: #fad396; }\n  #response .line-6 .panel-heading {\n    background-color: #F5AB35;\n    color: black;\n    border-color: #fad396; }\n\n#response .line-7 {\n  border-color: #fba772; }\n  #response .line-7 .panel-heading {\n    background-color: #F9690E;\n    color: black;\n    border-color: #fba772; }\n\n.stop-wrapper {\n  width: 80%;\n  max-width: 600px;\n  overflow: hidden;\n  background: white;\n  box-shadow: 1px 2px 2px #ccc;\n  margin-left: auto;\n  margin-right: auto; }\n  .stop-wrapper .info-ribbon {\n    height: 30px;\n    background: #eee;\n    width: 100%; }\n\n.alert-wrapper {\n  position: relative;\n  top: 80px;\n  width: 80%;\n  text-align: center;\n  margin-left: auto;\n  margin-right: auto;\n  top: 0;\n  left: 0;\n  right: 0; }\n\n#xml-response {\n  height: auto;\n  color: black;\n  min-height: 700px; }\n\n.indented-response {\n  margin-left: 20px; }\n\n.fancy-container {\n  padding-right: 20px;\n  padding-left: 20px;\n  margin-right: auto;\n  margin-left: auto; }\n\n.fancy-wrapper {\n  position: relative;\n  margin: 20px 0 0 0;\n  padding: 0; }\n  .fancy-wrapper .fancy-stop-wrapper {\n    display: block;\n    margin-top: 20px; }\n    .fancy-wrapper .fancy-stop-wrapper:before, .fancy-wrapper .fancy-stop-wrapper:after {\n      content: \"\";\n      display: table; }\n    .fancy-wrapper .fancy-stop-wrapper:after {\n      clear: both; }\n    .fancy-wrapper .fancy-stop-wrapper:first-child {\n      margin-top: 0; }\n    .fancy-wrapper .fancy-stop-wrapper.line-1 .line-header, .fancy-wrapper .fancy-stop-wrapper.line-1 .fancy-stop-wrapper > .line-header {\n      background-color: #81CFE0;\n      color: #fff; }\n    .fancy-wrapper .fancy-stop-wrapper.line-1 .fancy-stop-wrapper > .line-header:before {\n      border-top: 40px solid #81CFE0; }\n    .fancy-wrapper .fancy-stop-wrapper.line-1 .stop-info-property {\n      background-color: #d3eef4;\n      color: #44b8d1; }\n    .fancy-wrapper .fancy-stop-wrapper.line-1 .stop-info-value {\n      background-color: #f2fafc;\n      color: #6dc7db; }\n    .fancy-wrapper .fancy-stop-wrapper.line-2 .line-header, .fancy-wrapper .fancy-stop-wrapper.line-2 .fancy-stop-wrapper > .line-header {\n      background-color: #2ECC71;\n      color: #fff; }\n    .fancy-wrapper .fancy-stop-wrapper.line-2 .fancy-stop-wrapper > .line-header:before {\n      border-top: 40px solid #2ECC71; }\n    .fancy-wrapper .fancy-stop-wrapper.line-2 .stop-info-property {\n      background-color: #7ee2a8;\n      color: #176437; }\n    .fancy-wrapper .fancy-stop-wrapper.line-2 .stop-info-value {\n      background-color: #9de9bd;\n      color: #208e4e; }\n    .fancy-wrapper .fancy-stop-wrapper.line-3 .line-header, .fancy-wrapper .fancy-stop-wrapper.line-3 .fancy-stop-wrapper > .line-header {\n      background-color: #F5AB35; }\n    .fancy-wrapper .fancy-stop-wrapper.line-3 .fancy-stop-wrapper > .line-header:before {\n      border-top: 40px solid #F5AB35; }\n    .fancy-wrapper .fancy-stop-wrapper.line-3 .stop-info-property {\n      background-color: #fad396; }\n    .fancy-wrapper .fancy-stop-wrapper.line-3 .stop-info-value {\n      background-color: #fce3bb; }\n    .fancy-wrapper .fancy-stop-wrapper.line-4 .line-header, .fancy-wrapper .fancy-stop-wrapper.line-4 .fancy-stop-wrapper > .line-header {\n      background-color: #BE90D4;\n      color: #fff; }\n    .fancy-wrapper .fancy-stop-wrapper.line-4 .fancy-stop-wrapper > .line-header:before {\n      border-top: 40px solid #BE90D4; }\n    .fancy-wrapper .fancy-stop-wrapper.line-4 .stop-info-property {\n      background-color: #e9daf0;\n      color: #9e59bf; }\n    .fancy-wrapper .fancy-stop-wrapper.line-4 .stop-info-value {\n      background-color: #f9f5fb;\n      color: #b37ecd; }\n    .fancy-wrapper .fancy-stop-wrapper.line-5 .line-header, .fancy-wrapper .fancy-stop-wrapper.line-5 .fancy-stop-wrapper > .line-header {\n      background-color: #CF000F; }\n    .fancy-wrapper .fancy-stop-wrapper.line-5 .fancy-stop-wrapper > .line-header:before {\n      border-top: 40px solid #CF000F; }\n    .fancy-wrapper .fancy-stop-wrapper.line-5 .stop-info-property {\n      background-color: #ff3645; }\n    .fancy-wrapper .fancy-stop-wrapper.line-5 .stop-info-value {\n      background-color: #ff5c68; }\n    .fancy-wrapper .fancy-stop-wrapper.line-6 .line-header, .fancy-wrapper .fancy-stop-wrapper.line-6 .fancy-stop-wrapper > .line-header {\n      background-color: #F5AB35; }\n    .fancy-wrapper .fancy-stop-wrapper.line-6 .fancy-stop-wrapper > .line-header:before {\n      border-top: 40px solid #F5AB35; }\n    .fancy-wrapper .fancy-stop-wrapper.line-6 .stop-info-property {\n      background-color: #fad396; }\n    .fancy-wrapper .fancy-stop-wrapper.line-6 .stop-info-value {\n      background-color: #fce3bb; }\n    .fancy-wrapper .fancy-stop-wrapper.line-7 .line-header, .fancy-wrapper .fancy-stop-wrapper.line-7 .fancy-stop-wrapper > .line-header {\n      background-color: #F9690E; }\n    .fancy-wrapper .fancy-stop-wrapper.line-7 .fancy-stop-wrapper > .line-header:before {\n      border-top: 40px solid #F9690E; }\n    .fancy-wrapper .fancy-stop-wrapper.line-7 .stop-info-property {\n      background-color: #fba772; }\n    .fancy-wrapper .fancy-stop-wrapper.line-7 .stop-info-value {\n      background-color: #fcbe97; }\n    .fancy-wrapper .fancy-stop-wrapper .line-header {\n      padding: 10px; }\n      .fancy-wrapper .fancy-stop-wrapper .line-header > h4 {\n        margin: 0; }\n    .fancy-wrapper .fancy-stop-wrapper .stop-info[class*='col'], .fancy-wrapper .fancy-stop-wrapper .stop-info[class^='col'] {\n      padding: 0;\n      border-left: 1px solid #fff; }\n      .fancy-wrapper .fancy-stop-wrapper .stop-info[class*='col']:first-child, .fancy-wrapper .fancy-stop-wrapper .stop-info[class^='col']:first-child {\n        padding-left: 15px;\n        border-left: none; }\n      .fancy-wrapper .fancy-stop-wrapper .stop-info[class*='col']:last-child, .fancy-wrapper .fancy-stop-wrapper .stop-info[class^='col']:last-child {\n        padding-right: 15px; }\n    .fancy-wrapper .fancy-stop-wrapper .stop-info .stop-info-property {\n      text-transform: uppercase; }\n      .fancy-wrapper .fancy-stop-wrapper .stop-info .stop-info-property .glyphicon + span {\n        margin-left: 0.25em; }\n    .fancy-wrapper .fancy-stop-wrapper .stop-info .stop-info-property, .fancy-wrapper .fancy-stop-wrapper .stop-info .stop-info-value {\n      text-align: center;\n      font-size: 1em;\n      padding: 7px 4px 4px 4px; }\n      .fancy-wrapper .fancy-stop-wrapper .stop-info .stop-info-property > p, .fancy-wrapper .fancy-stop-wrapper .stop-info .stop-info-value > p {\n        margin: 0; }\n    .fancy-wrapper .fancy-stop-wrapper .stop-info .stop-info-property {\n      font-size: 0.85em; }\n    .fancy-wrapper .fancy-stop-wrapper .stop-info .stop-info-value.delayed {\n      color: orange; }\n    .fancy-wrapper .fancy-stop-wrapper .stop-info .stop-info-value.canceled {\n      color: red; }\n    .fancy-wrapper .fancy-stop-wrapper .stop-info .stop-info-value.early {\n      color: green; }\n  .fancy-wrapper .fancy-wrapper.onwards {\n    clear: both;\n    margin-top: 0; }\n    .fancy-wrapper .fancy-wrapper.onwards .fancy-stop-wrapper {\n      padding-left: 40px;\n      margin-top: 20px; }\n    .fancy-wrapper .fancy-wrapper.onwards .fancy-stop-wrapper .line-header {\n      position: relative; }\n      .fancy-wrapper .fancy-wrapper.onwards .fancy-stop-wrapper .line-header:before {\n        content: '';\n        position: absolute;\n        left: -20px;\n        top: 0;\n        display: block;\n        width: 0px;\n        height: 0px;\n        border-left: 20px solid transparent; }\n\n#check-status-response-wrapper .alert {\n  width: 100%;\n  min-height: 100%;\n  border: none;\n  text-align: center; }\n"; });
define('text!services/discovery.html', ['module'], function(module) { module.exports = "<template>\n  <div id='service-discovery'>\n    <div class=\"app-wrapper\">\n      <div class=\"text-wrapper\">\n        <div class=\"explaination-text container\">\n          <div class=\"row\">\n            <div class=\"col-sm-12\">\n              <h2 class=\"text-center mb-lg\">Service Discovery</h2>\n              <p>\n                Les services de découverte des données d'application sont\n                spécifiques au contenu correspondant des Services\n                fonctionnels SIRI. Ils permettent par exemple d'identifier\n                les arrêts gérés par un service SIRI Stop Monitoring donné ou\n                de connaître les codes de Catégorie de produit utilisés. Ces\n                services de découverte peuvent s'avérer particulièrement\n                utiles à l'heure de réduire les coûts d'approvisionnement et\n                de réapprovisionnement. En général, un service de couverture\n                implique une demande simple, parfois exécutée par le client,\n                visant à identifier les valeurs des données de référence\n                pouvant être reprises dans les demandes. Il s'agit entre\n                autres des emplacements, des points ou des ensembles de\n                données de référence (LIGNES ou DESTINATIONS prises en charge\n                par exemple). Avec SIRI, les services de découverte sont\n                facultatifs et sont traités dans le cadre d'un type de\n                service spécifique. Les données reçues sont utilisées pour\n                assurer l'autocompletion des formulaires.\n              </p>\n              <p class=\"open-right-panel\">\n                <button class=\"btn btn-primary\" click.delegate=\"togglePanel('service-discovery')\">Accéder au formulaire</button>\n              </p>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n"; });
define('text!services/general-message.html', ['module'], function(module) { module.exports = "<template>\n  <div id='get-general-message'>\n    <div class=\"app-wrapper\">\n      <div class=\"text-wrapper\">\n        <div class=\"explaination-text container\">\n          <div class=\"row\">\n            <div class=\"col-sm-12\">\n              <h2 class=\"text-center mb-lg\">Service General Message\n                (GM)</h2>\n              <p>\n                Le service SIRI General Message est utilisé pour échanger des\n                messages informatifs entre des individus identifiés dans un\n                format structuré libre ou arbitraire. Il permet l'envoi et la\n                révocation des messages. En plus du contenu réel, des\n                périodes de validité sont affectées aux messages.\n              </p>\n              <p class=\"open-right-panel\">\n                <button class=\"btn btn-primary\" click.delegate=\"togglePanel('general-message')\">Accéder au formulaire</button>\n              </p>\n            </div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-sm-12\">\n              <div class=\"panel panel-info mt-lg\">\n                <div class=\"panel-heading text-center\">\n                  <h3 class=\"panel-title\">Mode d'emploi</h3>\n                </div>\n                <dl class=\"panel-body\">\n                  <dt>Nom de l'arrêt</dt>\n                  <dd>Filtre les résultats pour l'arrêt choisi.\n                    Renseigner soit le nom de l'arrêt, soit son identifiant\n                    SIRI</dd>\n                  <dt>Nom de la ligne</dt>\n                  <dd>Filtre les résultats pour la ligne choisie.\n                    Renseigner soit le nom de la ligne, soit son identifiant\n                    SIRI</dd>\n                  <dt>Canal d'information</dt>\n                  <dd>Filtre les résultats pour un canal de messages</dd>\n                </dl>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n"; });
define('text!services/others.html', ['module'], function(module) { module.exports = "<template>\n  <div id='other-services-explaination-text'>\n    <div class=\"app-wrapper\">\n      <div class=\"text-wrapper\">\n        <div class=\"explaination-text container\">\n          <div class=\"row\">\n            <div class=\"col-sm-12\">\n              <h2 class=\"text-center mb-lg\">Stop Timetable</h2>\n              <p>Le service SIRI Stop Timetable fournit une vue centrée\n                sur l'arrêt concernant les arrivées et les départs de\n                véhicules graphiqués à un arrêt désigné. Il peut être utilisé\n                pour réduire le volume d'informations à transmettre en temps\n                réel aux arrêts et aux affichages en tant que données de\n                référence pour le service Stop Monitoring, ainsi que pour\n                fournir un flux de données aux horaires statiques.</p>\n              <h2 class=\"text-center mb-lg\">Service Estimated Timetable</h2>\n              <p>Le service SIRI Estimated Timetable permet la diffusion\n                d'informations concernant la progression réelle des Courses\n                suivant les lignes d'un service spécifique, en détaillant les\n                heures de départ et d'arrivée prévues à des arrêts\n                spécifiques sur un itinéraire planifié. Les informations\n                comprendront des données enregistrées pour les arrêts qui ont\n                été passés, ainsi que des données prévues pour les arrêts qui\n                n'ont pas encore été passés. En outre, le service Estimated\n                Timetable permet d'annuler, d'ajouter ou de modifier des\n                Courses.</p>\n              <h2 class=\"text-center mb-lg\">Service Production\n                Timetable</h2>\n              <p>Le service SIRI Production Timetable permet la\n                diffusion d'informations concernant la progression planifiée\n                de véhicules exploitant un service spécifique, identifiée par\n                l'heure d'arrivée et de départ des véhicules à des arrêts\n                spécifiques sur un itinéraire planifié pour un jour\n                d'exploitation particulier.</p>\n              <h2 class=\"text-center mb-lg\">Service Stop Timetable</h2>\n              <p>Le service SIRI Stop Timetable fournit une vue centrée\n                sur l'arrêt concernant les arrivées et les départs de\n                véhicules graphiqués à un arrêt désigné. Il peut être utilisé\n                pour réduire le volume d'informations à transmettre en temps\n                réel aux arrêts et aux affichages en tant que données de\n                référence pour le service Stop Monitoring, ainsi que pour\n                fournir un flux de données aux horaires statiques.</p>\n              <h2 class=\"text-center mb-lg\">Service Connection\n                Timetable</h2>\n              <p>Le service SIRI Connection Timetable peut être utilisé\n                pour fournir des informations concernant les arrivées\n                planifiées d'un véhicule amenant à l'exploitant d'un service\n                partant de correspondance. L'exploitant du service partant\n                peut alors planifier comment garantir la correspondance, soit\n                par rapport au véhicule prévu soit par rapport à un véhicule\n                différent.</p>\n              <h2 class=\"text-center mb-lg\">Service Connection\n                Monitoring</h2>\n              <p>Le service SIRI Connection Monitoring est utilisé pour\n                fournir des informations concernant les arrivées planifiées\n                d'un véhicule amenant à l'exploitant d'un service partant de\n                correspondance. L'exploitant du service partant peut alors\n                gérer le service de manière à garantir la correspondance, en\n                se basant sur la marche actuelle du véhicule.</p>\n              <h2 class=\"text-center mb-lg\">Service Facility Monitoring</h2>\n              <p>Le service SIRI Facility Monitoring permet la mise à\n                jour des informations d'état des équipements et des services\n                (disponibilité des ascenseurs, des escaliers mécaniques, des\n                guichets automatiques, des palettes dans les bus, etc.)</p>\n              <h2 class=\"text-center mb-lg\">Service Situation Exchange</h2>\n              <p>Le service SIRI Situation Exchange permet de diffuser\n                des informations détaillées et structurées sur les\n                perturbations (cause et conséquences), aussi bien pour les\n                perturbations planifiées (travaux, manifestation, etc.) que\n                pour les perturbations intervenant en cours d'exploitation\n                (incident voyageur, accident sur le réseau routier,\n                conditions météo, etc.).</p>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n"; });
define('text!services/status.html', ['module'], function(module) { module.exports = "<template>\n  <div id=\"check-status\">\n    <div class=\"app-wrapper\">\n      <div class=\"text-wrapper\">\n        <div class=\"explaination-text container\">\n          <div class=\"row\">\n            <div class=\"col-sm-12\">\n              <h2 class=\"text-center mb-lg\">Check Status</h2>\n              <p> Requête premettant de vérifier le bon fonctionnement du serveur SIRI.\n              </p>\n              <p class=\"open-right-panel\">\n                <button class=\"btn btn-primary\" click.delegate=\"togglePanel('status')\">Accéder au formulaire</button>\n              </p>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n"; });
define('text!services/stop-monitoring.html', ['module'], function(module) { module.exports = "<template>\n  <div id='stop-monitoring'>\n    <div class=\"app-wrapper\">\n      <div class=\"text-wrapper\">\n        <div class=\"explaination-text container\">\n          <div class=\"row\">\n            <div class=\"col-sm-12\">\n              <h2 class=\"text-center mb-lg\">Service Stop Monitoring</h2>\n              <p>\n                Le service SIRI Stop Monitoring fournit une vue centrée sur\n                l'arrêt concernant les arrivées et les départs de véhicules à\n                un arrêt désigné. Il peut être utilisé par les systèmes\n                d'affichage et les services de présentation divers en vue de\n                fournir en temps réel les informations relatives aux horaires\n                et aux courses sur les panneaux de départ et les autres\n                systèmes d'affichage au niveau de l'arrêt et à distance.\n              </p>\n              <p class=\"open-right-panel\">\n                <button class=\"btn btn-primary\" click.delegate=\"togglePanel('stop-monitoring')\">Accéder au formulaire</button>\n              </p>\n            </div>\n          </div>\n\n          <div class=\"row\">\n            <div class=\"col-sm-12\">\n              <div class=\"panel panel-info mt-lg\">\n                <div class=\"panel-heading text-center\">\n                  <h3 class=\"panel-title\">Mode d'emploi</h3>\n                </div>\n                <dl class=\"panel-body\">\n                  <dt>Nom de l'arrêt</dt>\n                  <dd>Arrêt de référence pour la requête. Renseigner soit\n                    le nom de l'arrêt, soit son identifiant SIRI</dd>\n                  <dt>Nom de la ligne</dt>\n                  <dd>Filtre les résultats pour la ligne choisie.\n                    Renseigner soit le nom de la ligne, soit son identifiant\n                    SIRI</dd>\n                  <dt>Heure</dt>\n                  <dd>Heure de début de la plage horaire observée (non\n                    renseignée = heure courante)</dd>\n                  <dt>Type d'horaires</dt>\n                  <dd>Filtre les résultats sur le type d'horaire retourné\n                    (arrivée, départ ou les 2)</dd>\n                  <dt>Intervalle Temporel</dt>\n                  <dd>Durée de la plage horaire observée (non renseignée\n                    = jusqu'à fin de service)</dd>\n                  <dt>Limite de passages</dt>\n                  <dd>Nombre de passages à l'arrêt de référence maximum\n                    affichés</dd>\n                  <dt>Minimum de passages par ligne</dt>\n                  <dd>Nombre de passages à l'arrêt de référence répartis\n                    par lignes</dd>\n                  <dt>Arrêts suivants</dt>\n                  <dd>Nombre d'arrêts au dela de l'arrêt de référence à\n                    retourner par course.</dd>\n                  <dt>Arrêt de destination</dt>\n                  <dd>Filtre les résultats pour la destination choisie.\n                    Renseigner soit le nom de l'arrêt, soit son identifiant\n                    SIRI</dd>\n                  <dt>Minimum de passages par via</dt>\n                  <dd>Nombre de passages à l'arrêt de référence répartis\n                    par alternatives de trajets</dd>\n                </dl>\n              </div>\n            </div>\n\n            <!-- <h3 class = \"text-center\">Mode d'emploi</h3>\n              <div class=\"col-sm-5 col-sm-offset-1\">\n                <h5>Nom Arrêt</h5>\n                <p>Arrêt de référence pour la requête. Renseigner soit le nom de l'arrêt, soit son id (8 chiffres)</p>\n                <h5>Nom de la ligne</h5>\n                <p>Filtre les résultats pour la ligne choisie. Renseigner soit le nom de la ligne, soit son id (8 chiffres)</p>\n                <h5>Heure</h5>\n                <p>Heure de début de la requête</p>\n                <h5>Type d'arrêt</h5>\n                <p>Filtre les résultats sur le type d'arrête sélectionné</p>\n              </div>\n\n              <div class=\"col-sm-5\">\n                <h5>Intervalle Temporel</h5>\n                <p>Filtre les résultats sur le le laps de temps voulu. Le poit de départ est soit l'instant de la requête, soit l'heure choisie</p>\n                <h5>Limite de passages</h5>\n                <p>Nombre de passages maximums affichés</p>\n                <h5>Minimum d'arrêts par ligne</h5>\n                <p>Nombre minimum d'arrêts par ligne</p>\n                <h5>Arrêts suivants</h5>\n                <p>Nombre d'onwards par arrêt</p>\n              </div> -->\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map
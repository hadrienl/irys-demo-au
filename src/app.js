import {HttpClient, json} from 'aurelia-fetch-client';

export class App {
  activate() {
    let client = new HttpClient();
    var json_file = '/config.json';
    client.fetch(json_file)
      .then(response => response.json())
      .then(data => {
        for (const elem of data.servers) {
          localStorage.setItem(elem.id, JSON.stringify(elem));
        }
      });
  }

  attached() {
    if (localStorage.getItem('siri-profile') == null) {
      localStorage.setItem('siri-profile', document.getElementById('siri-profile').value);
    }
  }

  configureRouter(config, router) {
    config.title = 'Irys - Démonstrateur';
    config.options.pushState = true;
    config.options.root = '/';
    config.map([
      { route: ['', 'home'], name: 'home',  moduleId: './home',  nav: true, title: 'Accueil' },
      { route: 'stop-monitoring', name: 'stopMonitoring', moduleId: './services/stop-monitoring', nav: true, title: 'Service Stop Monitoring' },
      { route: 'general-message', name: 'generalMessage', moduleId: './services/general-message', nav: true, title: 'Service General Message' },
      { route: 'discovery', name: 'discovery', moduleId: './services/discovery', nav: true, title: 'Service Discovery' },
      { route: 'status', name: 'status', moduleId: './services/status', nav: true, title: 'Check Status' },
      { route: 'autres-services', name: 'servicesOthers', moduleId: './services/others', nav: true, title: 'Autres services' }
    ]);

    this.router = router;
    localStorage.setItem('autoCompleteAlready', false);
    localStorage.removeItem('currentPanel');
  }
}

angular.module('starter.services', [])

/*
 * Load the specific JSON file for the model of camera you want to use
 */
.factory('CameraModelLoader', ['$resource', function($resource) {
  return $resource('js/models/:file'); // Note the full endpoint address
}])

.factory('CameraConfigLoader', ['$resource', 'CameraModelLoader', 'CameraUrlBuilder', '$q', function($resource, CameraModelLoader, CameraUrlBuilder, $q) {

  return {
    get: function(config, callback) {
      var deferred = $q.defer();
      var resource = (config ? $resource('js/configs/' + config) : $resource('js/configs/config.json'));

      resource.get({
        file: config
      }, function(config_data) {

        if (!config_data.hasOwnProperty('model')) {
          console.error('define a model in your config.json');
          return;
        }

        CameraModelLoader.get({
          file: config_data.model
        }, function(data) {

          CameraUrlBuilder.hydrate(config_data, data.commands).then(function(){
            deferred.resolve();
          });

        }, function(error) {
          console.error('Model ' + config_data.model + ' not found in /model directory');
        });
      });
      return deferred.promise;
    }
  };
}])

.factory('CameraUrlBuilder', ['$http', '$q', function($http, $q) {
  var _password = '';
  var _username = '';
  var _ip = '';
  var _port = '';
  var obj_command = {};
  return {

    getCommands: function() {
      return obj_command;
    },

    setCommand: function(command_name, url) {
      this.getCommands()[command_name] = url;
    },

    doCommand: function(command_name) {
      return obj_command[command_name];
    },

    hydrate: function(config, commands) {
      var deferred = $q.defer();
      var _password = config.password;
      var _username = config.user;
      var _port = config.port;
      var _ip = config.ip;

      //distill all the commands into a single object referenced by key
      angular.forEach(commands, function(command, key) {
        Object.keys(command[Object.getOwnPropertyNames(command)]).forEach(function(key) {
          var command_url = 'http://' + _ip + ':' + _port + '/' + Object.getOwnPropertyNames(command) + '?' + command[Object.getOwnPropertyNames(command)][key] + '&pwd=' + _password + '&user=' + _username;
          var commands = this.setCommand(key, command_url);
        }.bind(this));
      }.bind(this));
      deferred.resolve();
      return deferred.promise;
    }
  };
}]);
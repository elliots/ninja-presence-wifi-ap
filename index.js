var Presence = require('ninja-presence-base');
var wifiLocation = require('wifi_location');

module.exports = Presence;

Presence.prototype.G = 'wifi';
Presence.prototype.name = 'Presence - Wifi AP';
Presence.prototype.V = 0;
Presence.prototype.D = 261;

Presence.prototype.scan = function() {
  var self = this;

  wifiLocation.wifiTowers(function(err, towers) {
    if (err) {
      self._app.log.warn('Failed to get Wifi access points', err);
    } else {
      towers.forEach(function(tower) {
          self.see({
                name: tower.ssid,
                id: tower.mac_address,
                distance: Math.abs(tower.signal_strength)
          });
      });
    }

    self.scanComplete();
  });

};

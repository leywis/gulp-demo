function Archiver() {
    var temperature = null;
    var archive = [];
    Object.defineProperty(this, 'temperature', {
      get: function() {
        console.log('get!');
        return temperature;
      },
      set: function(value) {
        console.log('set:', value);
        temperature = value;
        archive.push({ val: temperature });
      }
    });
    this.getArchive = function() { return archive; };
  }
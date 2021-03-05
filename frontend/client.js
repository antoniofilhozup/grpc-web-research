const {TimeRequest, TimeResponse} = require('./grpc/api/time_pb.js');
const {TimeServiceClient} = require('./grpc/api/time_grpc_web_pb.js');

var client = new TimeServiceClient('http://' + window.location.host);

var table = document.querySelector("table");
while(table.hasChildNodes()) {
  table.removeChild(table.firstChild)
}

window.getTime = function() {
  var request = new TimeRequest();

  client.get_time(request, {}, (err, response) => {    
    if (err) {
      var lb = document.getElementById("error")
      lb.innerText = err
    } else {
      var header = table.insertRow(0);
      var h1 = header.insertCell(0);
      var h2 = header.insertCell(1);
      h1.innerHTML = "UNIX";
      h2.innerHTML = "UTC";

      var row = table.insertRow(1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell1.innerHTML = response.getUnix();
      cell2.innerHTML = response.getUtc();
    }
  });
};

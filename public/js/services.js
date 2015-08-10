var httpRequest;
function makeRequest(url,successCallback,errorCallback) {
  if (window.XMLHttpRequest) { // Mozilla, Safari, ...
    httpRequest = new XMLHttpRequest();
  } else if (window.ActiveXObject) { // IE
    try {
      httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
    } 
    catch (e) {
      try {
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
      } 
      catch (e) {}
    }
  }

  if (!httpRequest) {
    alert('Giving up :( Cannot create an XMLHTTP instance');
    return false;
  }
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        successCallback(JSON.parse(httpRequest.responseText));
      } else {
        errorCallback('There was a problem with the request.');
      }
    }
  };
  httpRequest.open('GET', '/api/'+url);
  httpRequest.send();
}
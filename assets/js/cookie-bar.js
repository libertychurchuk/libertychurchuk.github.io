(function() {
  "use strict";
  var root = this;
  if (typeof root.LIBERTY === "undefined") {
    root.LIBERTY = {};
  }

  LIBERTY.cookie = function(name, value, options) {
    if (typeof value !== "undefined") {
      if (value === false || value === null) {
        return LIBERTY.setCookie(name, "", { days: -1 });
      } else {
        return LIBERTY.setCookie(name, value, options);
      }
    } else {
      return LIBERTY.getCookie(name);
    }
  };

  LIBERTY.setCookie = function(name, value, options) {
    if (typeof options === "undefined") {
      options = {};
    }
    var cookieString = name + "=" + value + "; path=/";
    if (options.days) {
      var date = new Date();
      date.setTime(date.getTime() + options.days * 24 * 60 * 60 * 1000);
      cookieString = cookieString + "; expires=" + date.toGMTString();
    }
    if (document.location.protocol == "https:") {
      cookieString = cookieString + "; Secure";
    }
    document.cookie = cookieString;
  };

  LIBERTY.getCookie = function(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(";");
    for (var i = 0, len = cookies.length; i < len; i++) {
      var cookie = cookies[i];
      while (cookie.charAt(0) == " ") {
        cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(cookie.substring(nameEQ.length));
      }
    }
    return null;
  };
}.call(this));

// Display cookie bar message

(function() {
  "use strict";
  var root = this;
  if (typeof root.LIBERTY === "undefined") {
    root.LIBERTY = {};
  }

  LIBERTY.addCookieMessage = function() {
    var message = document.getElementById("cookie-message"),
      hasCookieMessage =
        message && LIBERTY.cookie("seen_cookie_message") === null;

    if (hasCookieMessage) {
      message.style.display = "block";
      LIBERTY.cookie("seen_cookie_message", "yes", { days: 28 });
    }
  };
}.call(this));

// Add cookie message

(function() {
  "use strict";
  if (window.LIBERTY && LIBERTY.addCookieMessage) {
    LIBERTY.addCookieMessage();
  }
}.call(this));

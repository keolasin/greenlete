(window.webpackJsonp = window.webpackJsonp || []).push([
  [0],
  {
    23: function(e, t, n) {
      e.exports = n(34);
    },
    28: function(e, t, n) {},
    29: function(e, t, n) {},
    34: function(e, t, n) {
      "use strict";
      n.r(t);
      var a = n(0),
        c = n.n(a),
        r = n(20),
        l = n.n(r),
        o = n(10),
        i = (n(28), n(5)),
        s = n(6),
        u = n(8),
        m = n(7),
        h = n(9),
        b = n(11),
        f =
          (n(29),
          (function(e) {
            function t() {
              return (
                Object(i.a)(this, t),
                Object(u.a)(this, Object(m.a)(t).apply(this, arguments))
              );
            }
            return (
              Object(h.a)(t, e),
              Object(s.a)(t, [
                {
                  key: "render",
                  value: function() {
                    return c.a.createElement(
                      "header",
                      { className: "navbar" },
                      c.a.createElement(
                        o.b,
                        { to: "/", id: "main-site-name" },
                        "Greenlete"
                      ),
                      c.a.createElement(
                        o.b,
                        { to: "/sign_up", className: "sign-up-button" },
                        "Join"
                      )
                    );
                  }
                }
              ]),
              t
            );
          })(a.Component)),
        p = (function(e) {
          function t(e) {
            var n;
            return (
              Object(i.a)(this, t),
              ((n = Object(u.a)(this, Object(m.a)(t).call(this, e))).state = {
                litterCount: 0,
                milesCovered: 0
              }),
              n
            );
          }
          return (
            Object(h.a)(t, e),
            Object(s.a)(t, [
              {
                key: "render",
                value: function() {
                  return c.a.createElement(
                    "section",
                    { className: "tracker-bar" },
                    c.a.createElement(
                      "h4",
                      { className: "global-tracker" },
                      c.a.createElement(
                        "strong",
                        null,
                        this.state.litterCount,
                        " "
                      ),
                      "pieces of trash picked up,",
                      c.a.createElement(
                        "strong",
                        null,
                        " ",
                        this.state.milesCovered,
                        " "
                      ),
                      "miles covered"
                    )
                  );
                }
              }
            ]),
            t
          );
        })(a.Component),
        d = (function(e) {
          function t(e) {
            return (
              Object(i.a)(this, t),
              Object(u.a)(this, Object(m.a)(t).call(this, e))
            );
          }
          return (
            Object(h.a)(t, e),
            Object(s.a)(t, [
              {
                key: "render",
                value: function() {
                  return c.a.createElement(
                    "article",
                    { className: "landing-main" },
                    c.a.createElement(
                      "header",
                      { className: "site-splash" },
                      c.a.createElement(
                        "h1",
                        null,
                        "Healthy you, healthy planet"
                      )
                    ),
                    c.a.createElement(
                      "section",
                      { className: "img-container" },
                      c.a.createElement("img", {
                        className: "welcome-image",
                        src:
                          "https://greenlete.s3-us-west-1.amazonaws.com/assets/IMG_20190618_181554256_HDR.jpg",
                        alt: "Trash"
                      })
                    ),
                    c.a.createElement(p, null)
                  );
                }
              }
            ]),
            t
          );
        })(a.Component),
        j = (function(e) {
          function t() {
            return (
              Object(i.a)(this, t),
              Object(u.a)(this, Object(m.a)(t).apply(this, arguments))
            );
          }
          return (
            Object(h.a)(t, e),
            Object(s.a)(t, [
              {
                key: "render",
                value: function() {
                  return c.a.createElement(
                    "footer",
                    null,
                    c.a.createElement(o.b, { to: "/mission" }, "Mission")
                  );
                }
              }
            ]),
            t
          );
        })(a.Component),
        O = (function(e) {
          function t(e) {
            var n;
            return (
              Object(i.a)(this, t),
              ((n = Object(u.a)(this, Object(m.a)(t).call(this, e))).state = {
                data: []
              }),
              n
            );
          }
          return (
            Object(h.a)(t, e),
            Object(s.a)(t, [
              {
                key: "callAPI",
                value: function() {
                  var e = this;
                  fetch("/testApi")
                    .then(function(e) {
                      return e.json();
                    })
                    .then(function(t) {
                      return e.setState({ data: t }, function() {
                        console.log("State updated successfully");
                      });
                    });
                }
              },
              {
                key: "componentDidMount",
                value: function() {
                  this.callAPI();
                }
              },
              {
                key: "render",
                value: function() {
                  return c.a.createElement(
                    "div",
                    { className: "App" },
                    c.a.createElement(f, null),
                    c.a.createElement(
                      "main",
                      null,
                      c.a.createElement(b.a, {
                        exact: !0,
                        path: "/",
                        render: function(e) {
                          return c.a.createElement(d, e);
                        }
                      })
                    ),
                    c.a.createElement(j, null)
                  );
                }
              }
            ]),
            t
          );
        })(a.Component);
      Boolean(
        "localhost" === window.location.hostname ||
          "[::1]" === window.location.hostname ||
          window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
          )
      );
      l.a.render(
        c.a.createElement(o.a, null, c.a.createElement(O, null)),
        document.getElementById("root")
      ),
        "serviceWorker" in navigator &&
          navigator.serviceWorker.ready.then(function(e) {
            e.unregister();
          });
    }
  },
  [[23, 1, 2]]
]);
//# sourceMappingURL=main.ac359d1d.chunk.js.map

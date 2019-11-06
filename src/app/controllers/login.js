var ladmin = {};
var loginCtrl = {};
Phink.DOM.ready(function () {

    ladmin = Phink.Web.Application.create(window.location.hostname, 'LAdmin');
    ladmin.createView('login');
    loginCtrl = ladmin.createController('login', 'login')
        .onload(function () {
            $('#authenticate').on('click', function () {
                loginCtrl.authenticate();
            })
            $('#logo').on('click', function () {
                loginCtrl.authenticate();
            })
        })
        .actions({
            //origin : Phink.Registry.item('/login.html').origin
            authenticate: function () {
                var pageName = 'login.html';

                //this.origin = Phink.Registry.item('/login.html').origin + '/';
                loginCtrl.origin = Phink.Registry.origin;
                this.origin = Phink.Registry.origin;
                //(login.origin !== undefined) ? loginCtrl.origin + '/' + pageName : 
                var the = this;
                console.log(the);

                the.getJSON(pageName, {
                    "action": 'authenticate'
                    , "login": $("#login").val()
                    , "password": $("#password").val()
                    , "container": '#core'
                }
                    , function (data) {
                        try {
                            if (data.return === 200) {

                                window.location.href = data.redirect + '&token=!' + data.token
                            //     the.parseViewResponse(data.master, function (resp) {
                            //         TUtils.html64(document.body, resp.view);
                            //         the.parseViewResponse(data.page, function (resp) {
                            //             TUtils.html64(data.container, resp.view);
                            //         });
                            //     });

                            //     //$.jPhink.getScripts(data);
                            } else if (data.return === 403) {
                                $('#message').html('Login error');
                            }
                            // } else if (data.return === 202) {
                                //the.attachView('master.html', document.body, function(data) {
                                // the.getSimpleView('master.html', function (data) {
                                //     $('#adminContent').html(data.view);
                                //     the.getSimpleView('home.html', function (data) {
                                //         $('#core').html(data.view);
                                //     })
                                // });
                            // }
                        }
                        catch (e) {
                            debugLog(e);
                        }
                    });

                return false;
            }
        });
});

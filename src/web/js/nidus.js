// var main = TController.create()
// .onload(function () {
//         //this.origin = TRegistry.item('main').origin + '/';
//         var the = this;
//         the.getView('master.html', function(data) {
//             TRegistry.item('master').view = data.view;
//             $(document.body).html(data.view);
//             the.getView('home.html', function(data) {
//                 TRegistry.item('home').view = data.view;
//                 $('#homeContent').html(data.view);
//             })
//         });
//     }
 
// );

var APP_NAME = "nidus";
var nidus = {};
var nidusHost = (window.location.href.indexOf('localhost') > -1) ? 'localhost:80' : 'nidus.loc';
Phink.DOM.ready(function () {

    nidus = Phink.Web.Application.create(nidusHost, 'nidus', true);
    nidus.createView('main');
    var mainCtrl = nidus.createController('main', 'main')
    .actions({
        goHome: function () {
            mainCtrl.getSimpleView('master.html', function (data) {
                $(document.body).html(data.view);
                mainCtrl.attachView('home.html', '#homeContent');
            });
        }
    })
    .onload(function () {
        mainCtrl = this;
        mainCtrl.goHome();
        //sodminIndex.bindEvents();
    });
});

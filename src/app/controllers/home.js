nidus.createView('home');
var home = nidus.createController('home', 'home')
    .actions({
        showToken: function () {
            var token = Phink.Registry.item(home.name).token;

            home.getPartialView('token.html', 'showToken', '#token', { 'token': token }, function (data) {
                $("#tokenLink").on("click", function () {
                    home.showToken();
                });

            });
            return false;
        }
        , showArtist: function (name) {
            $('#wikipedia').attr('src', 'https://en.wikipedia.org/wiki/' + name);
        }
        , showAlbum: function (name) {
            $('#wikipedia').attr('src', 'https://en.wikipedia.org/wiki/' + name);
        }
        , showTitle: function (id) {
            $("#vikipedia").html("Title #" + id);
        }
        , getData: function (count, index, anchor) {

            home.getJSON('grid.html'
                , {
                    'action': "getData"
                    , 'pagecount': count
                    , 'pagenum': index
                    //, 'token'
                }
                , function (data) {
                    Phink.Web.UI.Accordion.create().bind('#grid', data.grid, function () {
                        $(anchor).html(index);
                        $(".accordion").multiaccordion({ defaultIcon: "ui-icon-plusthick", activeIcon: "ui-icon-minusthick" });
                        home.dragAndDrop(data.grid);
                    });

                }
            );

            return false;
        }
        , dragAndDrop: function (data) {
            $("div[name='draggable']").each(function () {
                var id = $(this).data('draghelperid');
                var index = data.names.indexOf('TitleId');
                var dragValues = Phink.Utils.find(data.values, index, id);

                var dragIndex = $(this).data('draghelperindex');
                var dragTemplate = Phink.Web.UI.Plugin.applyDragHelper(data.templates, dragValues, dragIndex);

                var dragHelper = function (e) {
                    return dragTemplate;
                }

                $(this).draggable({
                    cursor: 'move'
                    , containment: 'document'
                    , stack: '#grid div'
                    , helper: dragHelper
                });
            });
        }
        , bindPlayables: function () {
            $("a[name='playable']").each(function () {
                $(this).on('click', function () {
                    var path = 'https://media.loc/Music/iTunes/iTunes%20Media/Music' + $(this).data('trackpath');
                    //                path = path.replace('./Users/David/Music', 'media/music');
                    //                $('#player').html(path);
                    $('#audio').attr('src', path);
                });
            });

        }
        , playTitle: function (link) {
            //iTunes
            // var path = 'http://media.loc/Music/iTunes/iTunes%20Media/Apple%20Music' + link.dataset['trackpath'];
            //OneDrive
            var path = 'https://media.loc/Musique' + link.dataset['trackpath'];
            path = path.replace('./Users/David/Music', '');
            $('#player').html(path);
            $('#playerControl').attr('src', path);
        }
    }).onload(function () {
        home = this;
        var origin = home.origin;
        Phink.Registry.item(home.name).token = home.token;

        Phink.Web.Object.getCSS('css/accordion.css');
        $.getScript((origin !== undefined) ? origin + '/js/accordion.js' : 'js/accordion.js')
            .done(function (script, textStatus) {
                $('.accordion').multiaccordion({ defaultIcon: "ui-icon-plusthick", activeIcon: "ui-icon-minusthick" });
                home.showToken();
                home.dragAndDrop(gridData);

                var handleDrop = function (e, ui) {

                    var element = ui.draggable.clone();
                    // element.removeClass('ui-draggable');
                    // element.removeClass('ui-draggable-handle');
                    // element.attr('name', 'playable');
                    var a = element.find('a[name="playable"]');
                    a.on('click' , function() {
                        home.playTitle(this);
                    });
                    element.appendTo($(this));
                    element.draggable({
                        cancel: "a.ui-icon",
                        revert: "invalid",
                        containment: "#dropper",
                        helper: "clone",
                        cursor: "move"
                    });
                };

                $("#dropper").droppable({
                    accept: '#grid div'
                    , drop: handleDrop
                });
            })
            .fail(function (jqxhr, settings, exception) {
                console.log(exception);
            });
    });
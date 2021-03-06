/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function include(file) {
    var myScript =  document.createElement("script");
    myScript.src = file;
    myScript.type = "text/javascript";
    document.body.appendChild(myScript);
};


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var TRegistry = (function() {
    
    var F = function() {
        this.registry = {};
    }

    F.prototype.write = function(item, key, value) {

        if (this.registry[item] === undefined) {
            this.registry[item] = {};
        }
        this.registry[item][key] = value;

    }

    F.prototype.read = function(item, key, defaultValue) {
        var result = null;

        if (this.registry[item] !== undefined) {
            result = (this.registry[item][key] !== undefined) ? this.registry[item][key] : ((defaultValue !== undefined) ? defaultValue : null);
        }

        return result;
    }

    F.prototype.item = function(item) {
        if(item === '' || item === undefined) return null;

        if(this.registry[item] !== undefined) {
            return this.registry[item];
        } else {
            this.registry[item] = {};
            return this.registry[item];
        }
    }
    
    F.prototype.items = function() {
        return this.registry;
    }

    F.prototype.clear = function() {
        this.registry = {};
    }
    
    F.prototype.setToken = function(value) {
        this.registry['token'] = value;
    
        return this;
    };

    F.prototype.getToken = function() {
        return this.registry['token'];
    };

    F.prototype.setOrigin = function(value) {
        this.registry['origin'] = value;
    
        return this;
    };

    F.prototype.getOrigin = function() {
        return this.registry['origin'];
    };

    return new F();
})();/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//TUtils.grep = function(haystack, key, needle){
//    return $.grep(haystack, function(n, i){
//        return n[key] == needle;
//    });
//};

var TUtils = function() {
    
};

//TUtils.needleIndexOf = function(vector, needle) {
//    var result = -1;
//
//    if(vector.length === 0) return result;
//    
//    for(var k = 0; k < vector.length; ++k) {
//        if(needle === vector[k]) {
//            result = k;
//            break;
//        }
//    }        
//
//    return result;
//};

TUtils.find = function(haystack, index, needle) {
    var result = [];

    if(haystack.length === 0) return result;
    var first = JSON.parse(haystack[0]);
    if(first.length < index - 1) return result;

    for( var k = 0; k < haystack.length; ++k ) {
        var row = JSON.parse(haystack[k]);
        if( needle == row[index] ) {
            result = row;
            break;
        }
    }        

    return result;
};

/**
 * 
 * @param {type} haystack
 * @param {type} key
 * @param {type} needle
 * @returns {Array|TUtils.grep.haystack}
 */
TUtils.grep = function(haystack, key, needle) {
    var result = [];

    if(haystack.length === 0) return result;
    var first = JSON.parse(haystack[0]);
    if(!first.hasOwnProperty(key)) return result;

    for( var k = 0; k < haystack.length; ++k ) {
        var row = JSON.parse(haystack[k]);
        if( needle == row[key] ) {
            result = row;
            break;
        }
    }        

    return result;
};

TUtils.resizeIframe = function(ui) {
    ui.style.height = ui.contentWindow.document.body.scrollHeight + 'px';
};

TUtils.html64 = function(container, html) {
    $(container).html(base64_decode(html));
};

function debugLog(message) {
    alert(message);
}/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var TObject = function() {
    this.id = '';
    this.name = '';
    
};

TObject.prototype.setId = function(value) {
    this.id = value;
    
    return this;
};

TObject.prototype.getId = function() {
    return this.id;
};

TObject.prototype.setName = function(value) {
    this.name = value;
    
    return this;
};

TObject.prototype.getName = function() {
    return this.name;
};/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var TWebApplication = function() {
    
};

TWebApplication.create = function() {

};/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var TWebObject = function() {
	TObject.call(this);
	  
    this.origin = '';
    this.url = {};
    this.token = '';
};

TWebObject.prototype = new TObject();
TWebObject.prototype.constructor = TWebObject;

TWebObject.prototype.setOrigin = function(value) {
    this.origin = value;
    
    return this;
};

TWebObject.prototype.getOrigin = function() {
    return this.origin;
};


TWebObject.prototype.setToken = function(value) {
    this.token = value;
    
    return this;
};

TWebObject.prototype.getToken = function() {
    return this.token;
};

TWebObject.parseUrl = function (url) {

    console.log('url : ' + url);
    var result = {};

    var protocol = (url.search('://') > -1) ? url.substring(0, url.search('://')) : null;
    var page = window.location.pathname;
    var domain = url;
    var port = '80';
    var isRelative = false;
    
    if(protocol === null) {
        page = url;

        isRelative = true;
        result.protocol = window.location.protocol;
        result.domain = window.location.hostname;
        result.port = window.location.port;
        //url = window.location.href.substring(0, window.location.href.search('/'));
    } else {
        
        url = url.replace(protocol + '://', '');
        var domainLimit = url.search('/');
        
        if(domainLimit > -1) {
            domain = url.substring(0, domainLimit);
            url = url.replace(domain, '');
        }

        if(domain.search(':') > -1) {
            port = domain.substring(domain.search(':'));
            url = url.replace(':' + port, '');
        }

        if(domain.search('localhost') > -1) {
            domain = 'localhost';
            url = url.replace(domain, '');
        }
        
        page = url;
        if(page.substring(0,1) === '/') {
            page = page.substring(1);
        }

        result.protocol = protocol;
        result.domain = domain;
        result.port = port;
        
    }

    var queryString = '';
    if(page.search(/\?/) > -1) {
        queryString = page.substring(page.search(/\?/));
    }
    
    result.page = page; //url.replace('.html', '');
    result.queryString = queryString;
    result.isRelative = isRelative;

    console.log(result);
    this.url = result;

    return result;
};


TWebObject.prototype.getUrl = function() {
    return this.url;
};

TWebObject.prototype.getJSON = function(
    url, // Url du webService
    postData, // Tableau JSON des donn�es � poster au webserice
    callBack // fonction qui g�re le retour du webservice
) {
    //$("body").toggleClass('onLoad');
//        spinner.spin();
    postData.token = TRegistry.getToken();
    var the = this;
    
    this.origin = TRegistry.getOrigin();
//    if(this.origin !== undefined) {
        var url = TWebObject.parseUrl(url);
        url = this.origin + '/' + url.page;
//    }
    console.log(url);
    
    $.ajax({
        type: 'POST',
        url: url,
        data: postData,
        dataType: 'json',
        async: true
    }).done(function(data, textStatus, xhr) {
        try 
        {
            TRegistry.setToken(data.token);
            url = TWebObject.parseUrl(url);
//            TRegistry.item(the.name).origin = xhr.getResponseHeader('origin');
            TRegistry.setOrigin(xhr.getResponseHeader('origin'));
            if($.isFunction(callBack)) {
                callBack.call(this, data, textStatus, xhr);
            }

        }
        catch(e)
        {
            debugLog(e);
        }
    }).fail(function(xhr, options, message) {
        debugLog("Satus : " + xhr.status + "\r\n" +
                "Options : " + options + "\r\n" +
                "Message : " + message);
    });
};

TWebObject.prototype.getJSONP = function(url, postData, callBack) {
    postData.token = this.token;

    $.ajax({
        type: 'POST',
        url: url + "&callback=?", // retour en JSONP
        data: postData,
        dataType: 'json',
        async: true
    }).done(function(data, textStatus, xhr) {
        try {
            this.token = data.token;
            url = TWebObject.parseUrl(url);
            TRegistry.item(url.page).origin = xhr.getResponseHeader('origin');

            if($.isFunction(callBack)) {
                callBack.call(this, data, textStatus, xhr);
            }
        }
        catch(e) {
            debugLog(e);
        }
    }).fail(function(xhr, options, message) {
        debugLog("Satus : " + xhr.status + "\r\n" +
            "Options : " + options + "\r\n" +
            "Message : " + message);
    });
};


/*
* jQuery getCSS Plugin
* Copyright 2013, intesso
* MIT license.
*
* cross browser function to dynamically load an external css file.
* see: [github page](http://intesso.github.com/jquery-getCSS/)
*
*/

/*
arguments: attributes
attributes can be a string: then it goes directly inside the href attribute.
e.g.: $.getCSS("fresh.css")

attributes can also be an objcet.
e.g.: $.getCSS({href:"cool.css", media:"print"})
or: $.getCSS({href:"/styles/forest.css", media:"screen"})
*/
TWebObject.getCSS = function(attributes) {
    // setting default attributes
    if(typeof attributes === "string") {
        var href = attributes;
        if(this.origin !== undefined) {
            href = this.origin + '/' + href;
        }
        
        attributes = {
            href: href
        };
    }
    if(!attributes.rel) {
        attributes.rel = "stylesheet"
    }
    // appending the stylesheet
    // no jQuery stuff here, just plain dom manipulations
    var styleSheet = document.createElement("link");
    for(var key in attributes) {
        styleSheet.setAttribute(key, attributes[key]);
    }
    var head = document.getElementsByTagName("head")[0];
        head.appendChild(styleSheet);
};/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var TPlugin = function() {
    TWebObject.call(this);
    
};

TPlugin.prototype = new TWebObject();
TPlugin.prototype.constructor = TPlugin;

TPlugin.create = function() {
    return new TPlugin();
};

TPlugin.applyTemplate = function(templates, row, i) {
    var html = row[i];
    
    if(templates[i].content !== '' && templates[i].enabled) {
        html = templates[i].content;
        var event = templates[i].event;
        var e = event.split('#');
        if(e[0] === 'href') {
            event = 'javascript:' + e[1];
        } else {
            event = e[0] + '="' + e[1] + '"'; 
        }
        for (var m = 0; m < row.length; m++) {
            html = html.replace('<% ' + templates[m].name + ' %>', row[m]);
            html = html.replace('<% ' + templates[m].name + ':index %>', m);
            event = event.replace(templates[m].name, "'" + row[m] + "'");
            html = html.replace('<% &' + templates[m].name + ' %>', event);
        }   
    }
    
    return html;
};

TPlugin.applyDragHelper = function(templates, row, i) {
    var html = row[i];
    
    if(templates[i].dragHelper !== '' && templates[i].enabled) {
        html = templates[i].dragHelper;
        var event = templates[i].event;
        var e = event.split('#');
        if(e[0] === 'href') {
            event = 'javascript:' + e[1];
        } else {
            event = e[0] + '="' + e[1] + '"'; 
        }
        for (var m = 0; m < row.length; m++) {
            html = html.replace('<% ' + templates[m].name + ' %>', row[m]);
            html = html.replace('<% ' + templates[m].name + ':index %>', m);
            event = event.replace(templates[m].name, "'" + row[m] + "'");
            html = html.replace('<% &' + templates[m].name + ' %>', event);
        }   
    }

    return html;
};

TPlugin.prototype.dataBind = function(tableId, values, templates) {
    var colNum = templates.length;
    var rowNum = values.length;
    for(var j=0; j < rowNum; j++) {
        var row = JSON.parse(values[j]);
        for (var i=0; i < colNum; i++) {
            var template = templates[i];
            var html = row[i];

            if(template.content !== null && template.enabled) {
                html = template.content;
                var event = template.event;
                var e = event.split('#');
                if(e[0] === 'href') {
                    event = 'javascript:' + e[1];
                } else {
                    event = e[0] + '="' + e[1] + '"'; 
                }
                for (var m = 0; m < colNum; m++) {
                    html = html.replace('<% ' + templates[m].name + ' %>', row[m]);
                    event = event.replace(templates[m].name, row[m]);
                    html = html.replace('<% &' + templates[m].name + ' %>', event);
                }    
            }
            if(template.enabled) {
                $(tableId + 'td' + (i + colNum * j).toString()).html(html);
            }
        }
    }
};/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var TAccordion = function() {
    TPlugin.call(this);
    
    
};

TAccordion.prototype = new TPlugin();
TAccordion.prototype.constructor = TAccordion;

TAccordion.create = function() {
    return new TAccordion();
};


TAccordion.prototype.bind = function(accordionId, names, values, templates, elements) {
    var templateNum = templates.length;
    var colNum = names.length;
    var rowNum = values.length;

    var result = '';
    var html = '';
    var level = 0;
    var row = 0;
    var index = 0;
    var canBind = 0;
    var bound = [false, false, false];

    num = 0;
    var oldValues = Array.apply(null, Array(colNum)).map(String.prototype.valueOf, '!#');

    for(var k = 0; k < templateNum; k++) {
        for(j = 0; j < colNum; j++) {
            if(templates[k].name === names[j]) {
                templates[k].index = j;
            }
        }
    }

    for(var i = 0; i < rowNum; i++) {

        row = (values[i] !== null) ? JSON.parse(values[i]) : Array.apply(null, Array(colNum)).map(String.prototype.valueOf, '&nbsp;');
        for(var j = 0; j < templateNum; j++) {
             if(j === 0) {
                level = 0;
            }
            if(!templates[j].enabled) continue;
            index = templates[j].index;
            canBind = row[index] !== oldValues[j];

            if(!canBind) {
                bound[level] = canBind;
                level++;
                oldValues[j] = row[index];
                continue;
            }
            //html = this.applyTemplate(templates[j], colNum, row, i);
            //html = row[index];
            html = TPlugin.applyTemplate(templates, row, j);

            if(level === 0) {
                if(i > 0) {
                    result += elements[2].closing + elements[0].closing;
                    result += elements[2].closing + elements[0].closing;
                    oldValues = Array.apply(null, Array(colNum)).map(String.prototype.valueOf, '!#');
                }
                result += str_replace('%s', 'blue', elements[0].opening);
                result += elements[1].opening + html + elements[1].closing;
                result += elements[2].opening;
            }
            else if(level === 1) {
                if(i > 0 && !bound[level - 1]) {
                    result += elements[2].closing + elements[0].closing;
                } else {

                }
                result += str_replace('%s', 'odd', elements[0].opening);
                result += elements[1].opening + html + elements[1].closing;
                result += elements[2].opening;
            }
            else if(level === 2) {
                result += str_replace('%s', '', elements[2].opening) + html + elements[2].closing;
            }                
            bound[level] = canBind;
            level++;
            oldValues[j] = row[index];
        }
    }
    result += elements[2].closing;
    result += elements[0].closing;
    result += elements[2].closing;
    result += elements[0].closing;

    $(accordionId).html("&nbsp;");
    $(accordionId).html(result);
};


    
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var TTable = function() {
    TPlugin.call(this);
};

TTable.prototype = new TPlugin();
TTable.prototype.constructor = TTable;

TTable.create = function() {
    return new TTable();
};
    
TTable.prototype.bind = function(tableId, values, templates) {
    var colNum = templates.length;
    var rowNum = values.length;
    for(var j=0; j < rowNum; j++) {
        var row = JSON.parse(values[j]);
        for (var i=0; i < colNum; i++) {
            var template = templates[i];
            var html = TPlugin.applyTemplate(templates, row, i);
            if(template.enabled) {
                $(tableId + 'td' + (i + colNum * j).toString()).html(html);
            }
        }
    }
};

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var TController = function(name) {
    TWebObject.call(this);

    this.view = null;
    this.setName(name);

};

TController.prototype = new TWebObject();
TController.prototype.constructor = TController;

TController.create = function(name) {
    if (name === undefined) {
        name = 'ctrl' + Date.now();
    }
    return new TController(name);
};

TController.prototype.oninit = function (callback) {

    if(typeof callback === 'function') {
        callback.call(this);
    }
    
    return this;
};

TController.prototype.onload = function (callback) {

    if(typeof callback === 'function') {
        callback.call(this);
    }
    
    return this;
};

TController.prototype.render = function () {

    if(typeof this.oninit === 'function') {
        this.oninit();
    }   
    if(typeof this.onload === 'function') {
        this.onload();
    }
};

TController.prototype.actions = function (actions) {

    for(var key in actions) {
        this[key] = actions[key];
    }

    this.render();

    return this;
};

TController.prototype.getView = function (pageName, callback) {
    console.log(pageName);
    
    var the = this;
    var token = TRegistry.getToken();
    var uri = TWebObject.parseUrl(pageName);
    var urls = (uri.isRelative) ? TRegistry.getOrigin() + '/' + pageName : pageName;

    $('body').append('relative=' + uri.isRelative + '<br />') ;
    $('body').append('urls=' + urls + '<br />') ;


    $.ajax({
        type: 'POST',
        url: urls,
        data: {"action" : 'getViewHtml', "token" : token},
        dataType: 'json',
        async: true,
        headers: {
            "Accept" : "application/json, text/javascript, request/view, */*; q=0.01"
//            ,   "X-Token:" : myToken
        }
    }).done(function(data, textStatus, xhr) {
        try {
//            var url = TWebObject.parseUrl(pageName);
//            TRegistry.item(the.name).origin = xhr.getResponseHeader('origin');
            TRegistry.setOrigin(xhr.getResponseHeader('origin'));
            TRegistry.setToken(data.token);

            var l = data.scripts.length;
            for(i = 0; i < l; i++) {
                $.getScript(data.scripts[i]);
            }

            data.view = base64_decode(data.view);
            if(typeof callback === 'function') {
                callback.call(this, data);
            } else {
                $(document.body).html(data.view);

            }
            
        }
        catch(e) {
            $.jPhink.debugLog(e);
        }
    }).fail(function(xhr, options, message) {
        $.jPhink.debugLog("Satus : " + xhr.status + "\r\n" +
            "Options : " + options + "\r\n" +
            "Message : " + message);
    });
};

TController.prototype.getPartialView = function (pageName, action, attach, postData, callBack) {

    var the = this;
    var token = TRegistry.getToken();
    var uri = TWebObject.parseUrl(pageName);
    var urls = (uri.isRelative) ? TRegistry.getOrigin() + '/' + pageName : pageName;

    postData = postData || {};
    
    postData.action = action;
    postData.token = token;

    var the = this;
    $.ajax({
        type: 'POST',
        url: (this.origin !== undefined) ? this.origin + '/' + pageName : pageName,
        data: postData,
        dataType: 'json',
        async: true,
        headers: {
            "Accept" : "application/json, text/javascript, request/partialview, */*; q=0.01"
//            ,   "X-Token:" : myToken
        }
    }).done(function(data, textStatus, xhr) {
        try 
        {
            TRegistry.setToken(data.token);

            var url = TWebObject.parseUrl(pageName);
//            TRegistry.item(the.name).origin = xhr.getResponseHeader('origin');
            TRegistry.setOrigin(xhr.getResponseHeader('origin'));

            var l = data.scripts.length;
            for(i = 0; i < l; i++) {
                $.getScript(data.scripts[i]);
            }

            var html = base64_decode(data.view);
            $(attach).html(html);
            
            if(typeof callBack === 'function') {
                callBack.call(this, data);
            }            
        }
        catch(e)
        {
            $.jPhink.debugLog(e);
        }
    }).fail(function(xhr, options, message) {
        $.jPhink.debugLog("Satus : " + xhr.status + "\r\n" +
                "Options : " + options + "\r\n" +
                "Message : " + message);
    });
};

TController.prototype.attachWindow = function (pageName, anchor) {
    this.getView(pageName, function(data) {
        if(anchor !== undefined) {
            $(anchor).html(data.view);
        } else {
            $(document.body).html(data.view);
        }
    });
};

TController.prototype.attachView = function (pageName, anchor) {
    var myToken = TRegistry.getToken();
    this.getJSON('' + pageName, {"action" : 'getViewHtml', "token" : myToken}, function(data) {
        try {
            TRegistry.setToken(data.token);

            var l = data.scripts.length;
            for(i = 0; i < l; i++) {
                $.getScript(data.scripts[i]);
        }

            var html = base64_decode(data.view);
            $(anchor).html(html);                
        }
        catch(e) {
            debugLog(e);
        }
    });
};

    
TController.prototype.attachIframe = function(id, src, anchor) {
//    var iframe = document.createElement('iframe');
//    iframe.frameBorder = 0;
//    iframe.width = "100%";
//    iframe.height = "100%";
//    iframe.id = id;
//    iframe.setAttribute("src", src);
//    document.getElementById(anchor).appendChild(iframe);

    $(anchor).html('');
    $('<iframe>', {
        src: src,
        id:  id,
        frameborder: 0,
        scrolling: 'no'
    }).appendTo(anchor);

};/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//
var TView = function(name) {
    TWebObject.call(this);
    
    this.setOrigin(TRegistry.item(name).origin);
    
    this.view = null;
    this.token = '';
    this.name = name;
};

TView.prototype = new TWebObject();
TView.prototype.constructor = TView;

TView.create = function(name) {
    return new TView(name);
};


var app = {

    fontSize: 16,
    pageNum: 0,

    initialize: function() {
        document.addEventListener("deviceready", this.onDeviceReady, false);

        this.initDialogs();
        this.initButtonHandlers();

        var attachFastClick = require('fastclick');
        attachFastClick(document.body);

        var myregex = /kafisma(\d+)/g;
        var num = parseInt(myregex.exec(document.URL)[1]);

        this.pageNum = num;
        this.save();

        $("#mypanel ul li:nth-child(" + (num+1).toString() + ") a").addClass("ui-btn-active");
    },

    redirect: function() {
        window.location = './kafisma' + this.pageNum.toString() + '.html';
    },

    initButtonHandlers: function() {
        var that=this;

        $("#toc").tap(function() {
            $("#mypanel").panel("open");
            return false;
        });

        $("#buttonExit").tap(function() {
            $("#popupExit").popup("open"); 
            return false;
        });

        $("#exitYes").click(function(e) {
            onBackKeyDown();
        });

        $("#fontinc").tap(function(diff) {
            that.changeFontSize(1);
            return false;
        });

        $("#fontdec").tap(function() {
            that.changeFontSize(-1);
            return false;
        });

    },

    initDialogs: function() {

        // create panel
        $("#header").before(panel1);
        $("#mypanel").panel();
        $("#mypanel a").addClass('ui-btn ui-btn-c"');
        $("#mypanel ul").addClass('ui-listview ui-listview-inset ui-corner-all ui-shadow');
        $("#mypanel").trigger( "updatelayout" );

        // popup exit
        $('body').prepend(dialog1);
        $("#popupExit").popup();
        $("#popupExit a").addClass("ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b");

    },

    onDeviceReady: function() {
        document.addEventListener("backbutton", function() { $("#popupExit").popup("open");  }, false);

        document.addEventListener("menubutton", 
                    function(e) {$(".ui-footer").toggle();return false;}, false);

    },

    changeFontSize: function(diff) {
        var fontSize = $("#content").css("font-size").replace("px", "");
        var newFontSize = (parseInt(fontSize)+diff) + "px";
        $("#content").css("font-size", newFontSize); 

        this.fontSize = newFontSize;
        this.save();
    },

    load: function() {
        if (localStorage['psaltirchinese'] == null) {
            this.save();

        } else {
          var saved = JSON.parse(localStorage['psaltirchinese']);
          this.fontSize = saved['fontSize'];
          this.pageNum = saved['pageNum'];
        }

        document.getElementById("content").style.fontSize = this.fontSize;

    },

    save: function() {
      localStorage['psaltirchinese'] = JSON.stringify({'fontSize': this.fontSize, 'pageNum': this.pageNum });
    }

};

app.load();


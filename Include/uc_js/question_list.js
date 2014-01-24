    var MathJaxLoading = loadJavascript({'id': 'MathJax', 'path': 'Include/js/mathjax/MathJax.js?config=default.js'});
    if(!MathJaxLoading)MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    loadJavascript({'id': 'lazyloader', 'path': 'Include/uc_js/3rd/jquery.mobile.lazyloader.js'});
    loadJavascript({'id': 'json2html', 'path': 'Include/js/3rd/json2html.min.js'});

    $('body').append('<div id="lazyloaderDiv"></div>');
    $( "#lazyloaderDiv" ).lazyloader();

    function startLazyloader( no, $ ){
        //console.log('startLazyloader '+no);
        var type = $('#listForm'+no+' input[name=type]:checked').val() || 0;
        var threshold = $( window ).height()*0.8;
        //$( "#list" ).lazyloader( "reset", "list" );

        // Set up the variable options to pass to the lazyloader reinitialize function
        var options = {
            "threshold" : threshold,
            "retrieve"  : 10,
            "retrieved" : 10,
            "bubbles"   : true,
            "offset"    : 0
        };

        // Set up the page specific settings to pass to the lazyloader reinitialize function
        var settings = {
            "pageId"            : "list"+no,
            "templateType"      : "json2html",
            "templateId"        : "templateId"+no,
            "template"          : {'tag':'li','html':'<a href="single_practice?id=${id}&type='+type+'" onclick="saveLastQuestion(this);"><h4>${title}</h4><p>${desc}</p></a>'},
            //"templatePrecompiled"   : true,
            "mainId"            : "questionListView"+no,
            "progressDivId"     : "lazyloaderProgressDiv"+no,//讀取中的顯示區域
            "moreUrl"           : "question_list_sub",
            //"clearUrl"          : "/home/clear_session",
            'callback'          : function(){ MathJax.Hub.Queue(["Typeset",MathJax.Hub]); }
        };

        // Set up the post parameters to pass to the lazyloader reinitialize function
        var listSearch = $('#listSearch'+no).val();
        var parameters = {
            "retrieve"  : options.retrieve,
            "retrieved" : options.retrieved,
            "offset"    : options.offset,
            'type'      :type,
            'listSearch':listSearch
        };

        // Reinitialize the lazyloader so that it correctly handles the listview on the artists page
        $( "#lazyloaderDiv" ).lazyloader( "reset", settings.pageId );
        $( "#lazyloaderDiv" ).lazyloader( "reInitialize", options, settings, parameters );
    }

    function toogleListTool(e){
        var e = $(e);
        if( e.attr('data-icon')=='plus' ){//要打開
            e.buttonMarkup({ icon: "minus" });
            e.next().show();
        }else{
            e.buttonMarkup({ icon: "plus" });
            e.next().hide();
        }
    }

    function saveLastQuestion( e ){
        window.LastQuestion = e;
        window.LastScrollY = scrollY;
    }
    function goLastQuestion(){
        var e = window.LastQuestion, h = window.innerHeight/2;
        if(e){
            e.focus();
            scrollY = window.LastScrollY;
            //window.scrollBy(0,h);
        }
    }

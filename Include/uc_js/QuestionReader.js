var QuestionReader = function($){
    var xmlDOM, questions, questionNo, questionType, nowQuestion, answerNode, nowPageElement, id,
        questiontextElement,
        questionNumber,
        Scope_2,
        pageIdString,
        isReview,
        preparedNO = [],
        questionResultForm,// review 專用
        examStartTime,
        questionStartTime,
        href,
        answerFontSize = {2:'12.5px',3:'15px'},
        needRemoveFirstPage,// 重新整理後的第一頁會一直佔著 需刪掉
        _this = {};

    _this.init = function(XMLString, pageIdString0 ,isReview0 ){
        var i;
        //_this.xmlDOM = xmlDOM = $(XMLString);
        _this.xmlDOM = xmlDOM = parseXMLStringToDOM(XMLString);

        isReview = isReview0 || false;
        pageIdString = '#'+pageIdString0+'_';
        Scope_2 = $('Scope_2', xmlDOM).html();//科目
        questions = $('Question', xmlDOM);
        questionNumber = parseInt( $('Number', xmlDOM).text() );
        examStartTime = new Date();

        if( isReview ){
            questionResultForm = $('#questionResultForm');
            href = "question_review";//?no="+questionNo
        }else{
            questionNo = 0;
            nowQuestion = questions.eq(questionNo);
            id = nowQuestion.prop('id');
            href = 'question_practice';
        }

        _this.nowQuestion = nowQuestion;
        needRemoveFirstPage = true;
    }

    function parseXMLStringToDOM(xmlString) {
        var xmlDOM;
        if (window.DOMParser) {
            var parser = new DOMParser();
            xmlDOM = parser.parseFromString(xmlString, "text/xml");
        } else {
            // for Internet Explorer
            xmlDOM = new ActiveXObject("Microsoft.XMLDOM");
            xmlDOM.async = false;
            xmlDOM.loadXML(xmlString);
        }
        return xmlDOM;
    }

    //result 用 往個別頁面
    _this.goQuestion = function(no){
        var id, Random, para, reload;

        if(no=='-1' && questionNo==0)return;//沒有上一題
        if(no=='+1' && questionNo>=(questionNumber-1) )return;//沒有下一題

        if(!isReview)saveQuestionDom();//記錄目前狀況

        if(no=='-1'){
            questionNo--;
        }else if(no=='+1'){
            questionNo++;
        }else{
            if(questionNo == no-1){
                return;//目前問題很多 先停用
                reload=true;// 點題號 reload
            }
            questionNo = no-1;
        }

        if( questionNo==0 && needRemoveFirstPage ){
            needRemoveFirstPage = false;
            $( pageIdString+questionNo ).remove();
        }

        nowQuestion = questions.eq(questionNo);
        id = nowQuestion.prop('id') || nowQuestion.attr('id');

        Random = getRandom();

        para = {'no':questionNo, 'id':id,};
        if(Random)para.Random = Random;
        if(reload){
            $.mobile.changePage(href, {reloadPage:true, 'data': para});
        }else
            $.mobile.changePage(href, {'data': para});//, 'type':'post'
    }

    function getRandom(){
        var Random=null;
        answerNode = $('Answer', nowQuestion);
        questionType = answerNode.attr('type');

        if( questionType ){//已答過 要傳出 RandomString
            if(questionType=='groupchoice'){//題組
                Random = '';
                $('Random Sub', nowQuestion).each( function(i, node){
                    Random += node.innerHTML+';';
                });

                //$('input[name=Random]', questionResultForm).val(Random);
            }else if(questionType=='multichoice'){//多選
                Random = $('Random', nowQuestion).text();
                //$('input[name=Random]', questionResultForm).val(Random);
            }
        }

        return Random;
    }


    function loadQuestionDom(){// 從 xmlDom 取資料顯示頁面上
        var j, s, domAnswerNode;

        //左上正確錯誤顯示
        var resultButton = $( 'input.resultButton', nowPageElement ),
            Result = $('Result', nowQuestion).html();
        if( Result=='Correct' ){
            resultButton.attr('data-iconpos','right').attr('data-icon','check');
        }else if( Result=='Error' ){
            resultButton.attr('data-iconpos','right').attr('data-icon','delete');
        }else{
            //resultButton.attr('data-iconpos','none').attr('data-icon',null);
        }

        if( $('Status', nowQuestion).attr('love')=='true' ){//有收藏
            $('#love_'+questionNo).attr('data-theme','e');
        }

        //處理回顧
            function setAnswerToHtml( parentNode, subNo ){
                var ans = $('#ansDiv_'+subNo+'_'+questionNo+' input[type!=button]');// UI 上的 選項

                $('Choose[check=true]', parentNode).each( function(i, node){
                    ans.eq( $(node).attr('id') ).prop('checked',true);
                });
            }

            //處理使用者的答案
            if(questionType=='groupchoice'){//題組
                $('Sub', answerNode).each( function(i, node){
                    setAnswerToHtml(node, i);
                });
            }else if(questionType=='multichoice'){//選擇
                setAnswerToHtml(answerNode, 0);
            }else if(questionType=='cloze'){//填空
                domAnswerNode = $('Ans', answerNode);
                j=0;

                //填空 存入 html
                $( 'input', questiontextElement).each(function(i, e){//處理 input 類型的選項
                    e = $(e);
                    v = domAnswerNode.eq(j++).attr('value');//使用者的答案
                    v2 = e.val();

                    if(isReview){
                        if ( v != v2 ) {//答錯時
                            e.after( '<span style="background-color:#BBF5B8;">【正解：'+v2+'】</span><br/>' ).attr('value',v);
                        }
                        e.prop('disabled', true);//禁止修改
                    }else{
                        e.attr('value',v);
                    }
                });

                $( 'select', questiontextElement).each(function(i, e){
                    e = $(e);
                    v = domAnswerNode.eq(j++).attr('value') || 0;//使用者的答案
                    v2 = e.val();

                    if(isReview){
                        e2 = $('option', e);
                        if ( v != v2 ) {//答錯時
                            //jqm v1.3.1 selectmenu 轉換時只依據 option 的 selected bug?
                            s = 'value="'+v+'"';
                            s = e.html().replace('selected=""', '').replace( s, s+' selected' );
                            e.after( '<span style="background-color:#BBF5B8;">【正解：'+e2.eq(v2).html()+'】</span><br/>' ).html(s);//.val(v)
                        }
                        $('option', e).prop('disabled', true);//禁止修改
                    }else{
                        try{
                            e.val(v).selectmenu( "refresh" );
                        }catch(err) {
                            s = 'value="'+v+'"';
                            s = e.html().replace('selected=""', '').replace( s, s+' selected' );
                            e.html(s);//.val(v)
                        }
                    }
                });
            }
        //處理回顧 end
    }

    _this.showQuestion = function(questionNo0){
        var title = Scope_2 || '';
        questionNo = questionNo0;
        nowPageElement = $( pageIdString+questionNo ).on('pageinit', _this.changeFontSize);

        //準備可能用到的資料
        nowQuestion = questions.eq(questionNo);
        id = nowQuestion.prop('id');
        questiontextElement = $( 'font.questiontext', nowPageElement );
        answerNode = $('Answer', nowQuestion);
        questionType = answerNode.attr('type');

        title += ' '+ window.QUESTION_SOURCE_TYPE;
        title = title.replace(/[《》]/g,'').replace('(指考)','').replace('(學測)','');
        $('div[data-role=header] h5', nowPageElement).html(title);//上方科目

        if( $('Status', nowQuestion).length==0 ){
            newQuestionDom();
        }else{
            loadQuestionDom();
        }
        //prepareNextQuestion();
        questionStartTime = new Date();

        //處理題目內容
        nl2br(questiontextElement);
        pictureResize();// 需在處理換行之後
        $( document ).one( "pageinit", pageIdString+questionNo, function() {
            nowPageElement = $(pageIdString+questionNo);
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);// 轉換 latex
        });


        $( 'select.latex', questiontextElement ).change( function(event){
            var select = $(this),
                e= select.prev(),
                v = $(this).val();

            function setValue(){
                e = $('span.latex',e);// 顯示的 selectmenu 的值
                v = $( 'option', select).eq(v).html();
                e.html(v);
            }

            setTimeout( setValue, 10);
            ;
        });

        if(questionNo==0)$('a[data-icon=arrow-l]').hide();//沒有上一題
        if(questionNo>=(questionNumber-1) )$('a[data-icon=arrow-r]').hide();//沒有下一題
    }

    function prepareNextQuestion(){
        var id,
            nextNo = questionNo+1;
        if(!isReview && nextNo<questionNumber && !preparedNO[nextNo] ){
            preparedNO[nextNo] = true;

            $( document ).on( "pageinit", pageIdString+questionNo, function() {
                id = questions.eq(nextNo).prop('id');
                var para = {'id':id};

                $.mobile.loadPage( "?no="+nextNo, {'data': para, 'type':'post'} );
            });
        }
    }

    _this.clickLove = function(e, saveNow){
        var isLove, examId;
        e = $(e);
        isLove = e.attr('data-theme')!='e';// 點下去後是否收藏
        e.button({ theme: isLove ? 'e' : 'c' });
        $('Status', nowQuestion).attr('love', isLove);

        if( saveNow ){
            e.button('disable');
            examId = $('Exam', xmlDOM).attr('id');

            $.post( 'Question/saveLove', {'id':id, 'examId':examId, 'questionNo':questionNo }, function(response, status){
                testAjaxStatus(response, status);
                e.button('enable');
                rebuildResult();// 因 #question_result 頁有 cache 要處理
            });
        }
    }

    function rebuildResult(){
        $('#question_result').remove();
    }

    function newQuestionDom(){
        var domString='';

        //答案相關
        domString = window.domString;//來自 question_content.php ，多選 題組 此時已處理好

        if(domString=='cloze'){
            domString = '';

            n = $( 'input, select', questiontextElement ).length;
            for(i=0; i<n; i++)
                domString += '<Ans id="'+i+'" value=""/>';
            domString = '<Answer type="cloze">'+domString+'</Answer>';
        }


        domString =
            '<Status guess="false" love="false"/>'+
            '<StartTime>'+new Date().format("yyyy-MM-dd hh:mm:ss")+'</StartTime>'+
            '<AnsTime>0</AnsTime>'+
            '<Highlight><Title/></Highlight>'+
            domString+
            '<Result></Result>'+
            '<Whiteboard/>';
        //nowQuestion.html( $(domString) );

        // mobile safari 用 $( domString ) 會出問題
        domString = '<div>'+domString+'</div>'
         e=parseXMLStringToDOM(domString);
         e = $('div', e).contents();
         nowQuestion.append(e);
    }

    function stringToDom( inputString ){
            e= $( xmlDOM.createElement("AnsTime") );
    }



    function saveQuestionDom(){// 從 頁面上 取資料存入 xmlDom

        var usedTime = new Date() - questionStartTime + $( 'AnsTime', nowQuestion ).text().toInt();
        usedTime = Math.floor( usedTime/1000 );//目前捨去取整
        $( 'AnsTime', nowQuestion ).text(usedTime);

        nowPageElement = $( pageIdString+questionNo );
        answerNode = $('Answer', nowQuestion);
        questionType = answerNode.attr('type');


            function getAnswerFromHtml( parentNode, subNo ){
                var ans = $('#ansDiv_'+subNo+'_'+questionNo+' input[type!=button]');// UI 上的 選項
                var choose = $('Choose', parentNode);// dom 上的 選項

                ans.each( function(i, node){
                    choose.eq(i).attr('check',node.checked);
                });
            }

            //處理使用者的答案
            if(questionType=='groupchoice'){//題組
                $('Sub', answerNode).each( function(i, node){
                    getAnswerFromHtml(node, i);
                });
            }else if(questionType=='multichoice'){//選擇
                getAnswerFromHtml(answerNode, 0);
            }else if(questionType=='cloze'){//填空
                var domAnswerNode = $('Ans', answerNode);
                var j=0;

                //填空 存入 dom
                $( 'input', questiontextElement).each(function(i, e){//處理 input 類型的選項
                    e = $(e);
                    v2 = e.val();
                    v = domAnswerNode.eq(j++).attr('value', v2);//存入 dom
                });

                $( 'select', questiontextElement).each(function(i, e){
                    e = $(e);
                    v2 = e.val();
                    v = domAnswerNode.eq(j++).attr('value', v2);//存入 dom
                });
            }
    }

    _this.changeFontSize = function( i ){
        if( typeof i =='number'){//使用者改變文字大小
            sessionStorage.fontSize = i;
        }else{//讀取題目時時改變文字大小
            i = sessionStorage.fontSize || 2;
            $( '#fontSize'+i+'_'+questionNo ).prop('checked', true );
            $( '#fontSize2_'+questionNo + ', #fontSize3_'+questionNo ).checkboxradio( "refresh" );
        }
        $( 'font' ,nowPageElement).prop('size', i);
        $( 'div.ansDiv span.ui-btn-text' ,nowPageElement).css('fontSize', answerFontSize[i] );
    }

    _this.finishExam = function(){
        var xmlString, url = 'question_result';
        saveQuestionDom();
        xmlString = new XMLSerializer().serializeToString(xmlDOM);

        examAnsTime = new Date() - examStartTime
        examAnsTime = Math.floor( examAnsTime/1000 );//目前捨去取整
        para = { 'xmlString': xmlString, 'examAnsTime': examAnsTime };


        para = { transition: "fade", type: "post",  data: para };
        $.mobile.changePage( url, para ); // 可能呼叫 loadPage ， 顯現目標

        return;
    }

    _this.finishQuestion = function(){
        var Random, q2, para = { 'isReview':1 };
        Random = getRandom();
        if(Random)para.Random=Random;

        isReview = true;
        saveQuestionDom();

        // 避免 html id 搞混 , review 用 no 2 , dom 因此要放 no 2
        q2 = nowQuestion.clone();
        nowQuestion.after(q2);
        questions = $('Question', xmlDOM);

        para = { transition: "fade", type: "get",  data: para };
        $.mobile.changePage( '', para ); // 可能呼叫 loadPage ， 顯現目標
        return;
    }

    _this.getQuestions = function(){
        return questions;
    }
    _this.getQuestionNo = function(){
        return questionNo;
    }


    //處理 換行
    function nl2 (str, replace ) {
        if (replace === undefined)replace='<br>';
        return str.replace(/(\r\n|\n\r|\r|\n)/g, replace );
    }

    function nl2br( qa ){
        var i, v, patt, n = qa.length;
            var x,imgs,img,img2,svgs,svg,svg2;
        // img 會自動去掉換行 不需處理



        // nl 換成 空白
        for( i=0; i<n; i++ ){
            qa2 = $(qa[i]);
            //p( qa[i] );
            v = qa2.html();

            // 處理 svg
            patt = new RegExp('<svg[^]+?</svg>','igm');
            imgs = v.match(patt);//p(imgs);
            for( x in imgs ){
                img = imgs[x];
                img2 = nl2(img,' ');
                v = v.replace( img,img2 );
            }

            // 處理 latex
            patt = new RegExp('\\$\\$[^]+?\\$\\$','igm');
            svgs = v.match(patt);//p(imgs);
            for( x in svgs ){
                svg = svgs[x];
                if( svg.indexOf('\n')!=-1 || svg.indexOf('\r')!=-1 ){
                    svg2 = nl2(svg,' ').replace(/\$/g,'$$$$');// replace 第二個參數 $$ 是一個真正的 $
                    v = v.replace( svg,svg2 );
                }
            }

            qa2.html( v );
        }

        //td 內要換成 br
        $('td',qa).each( function(i,e){
            v = $(e).html();
            $(e).html( nl2(v) );
        } );
        //table 內 td 外 要去掉
        $('table',qa).each( function(i,e){
            v = $(e).html();
            $(e).html( nl2(v,'') );
        } );

        //剩下的 ln2br
        for( i=0; i<n; i++ ){
            qa2 = $(qa[i]);
            v = qa2.html();
            qa2.html( nl2(v) );
        }
    }
    //處理 換行 end

    function pictureResize(){//areaName, max
        var imgs = $( 'img', questiontextElement);
        //max = max || 800;
        var max = window.innerWidth-30;
        imgs.each( function(i,e){
            if(!e.width){
                setTimeout( pictureResize, 1000);
                return false;
            }
            if(e.width<=max)return true;

            var w = e.width;//圖片原大小
            e = $(e).css( 'width','100%');//.css( 'cursor', 'url("../../Include/images/cursor/zoom_in.gif"),auto' )

            if( e.next().html()!='放大圖片' ){// 預防翻轉前已有 放大圖片 的連結
                var a = $('<a href="bigGraph.html" data-role="button" data-rel="dialog" data-prefetch data-icon="plus" data-inline="true"  data-mini="true">放大圖片</a>').click( function(){bigGraph(this,w);} );
                e.after(a);

                // jqm 已處理過時要自行 button();
                try {
                    a.button('refresh');
                } catch(err) {
                    a.button();
                }
            }
        });//處理每張圖片 end

        function bigGraph( e,w ){
            var g = $(e).prev().clone().css( 'width', w );//.css( 'cursor', 'url("../../Include/images/cursor/zoom_out.gif"),auto' ).click( smallGraph )

            function appendImage(){// 等待 $('#bigImage2') 載入後貼上圖
                var target = $('#bigImage2');
                if(target.length==0){
                    setTimeout( appendImage, 1000);
                }else{
                    target.empty().append( g ).css( 'overflow', 'scroll' );
                }
            }

            appendImage();
        }
        function smallGraph(){
            $('#bigImage').dialog( "close" );
        }
    }
    $( window ).on( "orientationchange", pictureResize );

    return _this;
}(jQuery);


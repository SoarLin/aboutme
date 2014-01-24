var QuestionSelect = function($){
    //固定資料
        this.opitonName = {0:"", 1327:"《國文》", 1328:"《英文》", 1329:"《數學》", 1332:"《數學甲》(指考)", 1333:"《數學乙》(指考)", 1330:"《自然》(學測)", 1334:"《物理》", 1335:"《化學》", 1336:"《生物》", 1629:"《地科》", 1331:"《社會》(學測)", 1337:"《歷史》", 1338:"《地理》", 1339:"《公民與社會》"};

        var questionCount={"97":2213,"98":2313,"102":178,"103":172,"160":239,"161":246,"164":178,"165":175,"166":182,"167":182,"168":173,"413":178,"414":176,"415":354,"416":183,"2635":239,"2636":182,"2637":241,"2638":191,"2639":193,"2640":191,"2641":191,"2642":204,"2644":238,"2688":40,"1327":{"102":21,"103":20,"160":21,"161":22,"164":20,"165":20,"166":21,"167":21,"168":23,"413":20,"414":19,"415":35,"416":19,"2635":21,"2636":21,"2637":23,"2638":22,"2639":24,"2640":24,"2641":22,"2642":25,"2644":26,"2688":22,"97":252,"98":260},"1328":{"102":23,"103":23,"160":18,"161":18,"164":23,"165":23,"166":23,"167":23,"168":23,"413":23,"414":23,"415":54,"416":26,"2635":18,"2636":23,"2637":18,"2638":19,"2639":19,"2640":19,"2641":19,"2642":23,"2644":22,"2688":18,"97":211,"98":310},"1329":{"102":20,"103":20,"160":21,"161":21,"164":20,"165":20,"166":20,"167":20,"168":20,"413":20,"414":20,"415":39,"416":20,"2635":21,"2636":20,"2637":20,"2638":20,"2639":21,"2640":20,"2641":20,"2642":21,"2644":26,"97":211,"98":259},"1330":{"102":57,"103":51,"164":56,"165":49,"166":54,"167":57,"168":44,"413":50,"414":46,"415":99,"416":50,"2636":58,"98":671},"1331":{"102":57,"103":58,"164":59,"165":63,"166":64,"167":61,"168":63,"413":65,"414":68,"415":127,"416":68,"2636":60,"98":813},"1332":{"160":11,"161":11,"2635":11,"2637":10,"2638":10,"2639":11,"2640":11,"2641":11,"2642":10,"2644":12,"97":108},"1333":{"160":10,"161":10,"2635":10,"2637":10,"2638":10,"2639":10,"2640":10,"2641":9,"2642":11,"2644":15,"97":105},"1334":{"102":15,"103":13,"160":22,"161":23,"164":15,"165":11,"166":14,"167":15,"168":12,"413":12,"414":13,"415":24,"416":13,"2635":23,"2636":13,"2637":23,"2638":18,"2639":18,"2640":18,"2641":17,"2642":18,"2644":22,"97":202,"98":170},"1335":{"102":15,"103":12,"160":22,"161":23,"164":15,"165":14,"166":13,"167":14,"168":10,"413":13,"414":11,"415":27,"416":10,"2635":23,"2636":13,"2637":22,"2638":22,"2639":19,"2640":15,"2641":23,"2642":22,"2644":20,"97":211,"98":167},"1336":{"102":13,"103":15,"160":36,"161":37,"164":13,"165":11,"166":14,"167":14,"168":12,"413":13,"414":11,"415":28,"416":16,"2635":37,"2636":15,"2637":37,"2638":35,"2639":36,"2640":36,"2641":34,"2642":36,"2644":45,"97":369,"98":175},"1337":{"102":22,"103":23,"160":37,"161":40,"164":23,"165":23,"166":24,"167":25,"168":24,"413":23,"414":24,"415":44,"416":1,"2635":40,"2636":21,"2637":40,"2638":40,"2639":40,"2640":40,"2641":40,"2642":40,"2644":45,"97":402,"98":277},"1338":{"102":11,"103":14,"160":23,"161":19,"164":17,"165":20,"166":20,"167":16,"168":17,"413":21,"414":23,"415":34,"416":3,"2635":16,"2636":14,"2637":22,"2638":15,"2639":16,"2640":18,"2641":16,"2642":19,"2644":31,"97":195,"98":210},"1339":{"102":22,"103":21,"160":39,"161":43,"164":18,"165":20,"166":19,"167":20,"168":21,"413":21,"414":19,"415":41,"416":1,"2635":40,"2636":21,"2637":36,"97":158,"98":244},"1629":{"102":15,"103":14,"164":15,"165":11,"166":12,"167":13,"168":6,"413":9,"414":10,"415":15,"416":10,"2636":16,"98":146}};

        var yearToId={};
        yearToId["102年"]={98:2636, 97:2688};
        yearToId["101年"]={98:102, 97:161};
        yearToId["100年"]={97:160, 98:103};
        yearToId["99年"]={98:164, 97:2635};
        yearToId["98年"]={97:2637, 98:165};
        yearToId["97年"]={98:166, 97:2638};
        yearToId["96年"]={97:2639, 98:167};
        yearToId["95年"]={98:168, 97:2640};
        yearToId["94年"]={97:2641, 98:413};
        yearToId["93年"]={98:414, 97:2642};
        yearToId["92年"]={97:2644, 98:415};
        yearToId["91年"]={98:416};
        yearToId["0"]={97:0, 98:0};// 此處假的

        var Level_2 = {};
        Level_2[98] = {
            1327:'《國文》',
            1328:'《英文》',
            1329:'《數學》',
            1330:'《自然》(學測)',
            1331:'《社會》(學測)'
        };//學測
        Level_2[97] = {
            1327:'《國文》',
            1328:'《英文》',
            1332:'《數學甲》(指考)',
            1333:'《數學乙》(指考)',
            1334:'《物理》',
            1335:'《化學》',
            1336:'《生物》',
            1629:'《地科》',
            1337:'《歷史》',
            1338:'《地理》',
            1339:'《公民與社會》'
        };//指考
        Level_2[2] = {
            1327:'《國文》',
            1328:'《英文》',
            1329:'《數學》',
            1332:'《數學甲》(指考)',
            1333:'《數學乙》(指考)',
            1330:'《自然》(學測)',
            1334:'《物理》',
            1335:'《化學》',
            1336:'《生物》',
            1629:'《地科》',
            1331:'《社會》(學測)',
            1337:'《歷史》',
            1338:'《地理》',
            1339:'《公民與社會》'
        };// 學測 且 指考 暫存這裡
    //固定資料 end

    function QuestionSelect(){
        var _this = this;
    }


    this.init = function (pageId, no, startCheck ){
        var _this = new QuestionSelect();
        var _set = _this.set;

        _set.page = $('#'+pageId);
        _set.no = no;

        _set.form = $('#questionSelectForm'+no);
        _set.EXAM_STUDY_TITLE = $( 'input[name=EXAM_STUDY_TITLE]', _set.form );

        //來源
        _set.sourceArea = $( '#sourceArea'+no );
        _set.qst98 = $( '#qst98'+no )
        _set.sourceInput = $('input[type=checkbox][name="QUESTION_SOURCE_TYPE_1[]"]', _set.sourceArea ).on( 'change', function(){_this.sourceChange();} );
        _set.sourceSelected = _set.sourceInput.filter(':checked');

        //年度
        _set.yearSelect = $('#yearSelect'+no).on( 'change', function(){_this.yearChange();} );
        _set.year0 = $('option[value=0]', _set.yearSelect);
        _set.year0Selected = _set.year0.prop('selected');//是否不限
        _set.yearSelect.on( 'click', function(){p('yearSelect click');} );

        //科目
        _set.EXAM_LEVEL_2 = $('#EXAM_LEVEL_2'+no).on( 'change', function(){_this.level2Change();} );
        _set.EXAM_LEVEL_2.on( 'click', function(){p('EXAM_LEVEL_2 click');} );

        //題數
        _set.nArea = $('#nArea'+no);


        if(typeof startCheck == 'function')_this.startCheck = startCheck;

        _set.startExamDiv = $('#startExamDiv'+no);
        _set.startButton = $('input[type=submit]', _set.startExamDiv);
        _set.count = $('input[name=count]', _set.startExamDiv);

        return _this;
    }

    QuestionSelect.prototype = {
        set: {},
        sourceChange: function (){//出處
            var _set = this.set
            _set.sourceSelected = _set.sourceInput.filter(':checked');

            // renewYear();//更新年度表示
            if(_set.sourceSelected.length==0){
                stateDisable('year', _set);
            }else{
                //學測應比職考多 91年
                if( _set.qst98.prop('checked') ){// 有選學測
                    if( $('option[value=91年]', _set.yearSelect).length==0 ){//沒有 91年 時
                        $('optgroup', _set.yearSelect).append('<option value="91年">91年</option>');
                    }
                }else{
                    $('option[value=91年]', _set.yearSelect).remove();
                }

                _set.yearSelect.selectmenu("enable").selectmenu("refresh");
                this.yearChange();
            }
        },
        yearChange : function(){
            var _set = this.set
            var e, v, target;

            if( _set.year0Selected ){//原有勾不限
                _set.year0.prop('selected', false);
                _set.yearSelect.selectmenu("refresh");
                _set.year0Selected = false;
            }else{//原沒有勾不限 勾選不限時
                v = _set.yearSelect.val();
                if( v && v[0]==0 ){
                    $('option[value]', _set.yearSelect).prop('selected', false);
                    _set.year0.prop('selected', true);
                    _set.yearSelect.selectmenu("refresh");
                    _set.year0Selected = true;
                }
            }

            e = _set.sourceSelected;
            v = (e.length==2) ? 2 : e.val();
            target = _set.EXAM_LEVEL_2;//科目：

            yearIdChange(_set);
            renewLevel(target,v, _set);//科目

            stateDisable('nArea', _set);
        },
        level2Change: function (){
            var _set = this.set
            var id = _set.EXAM_LEVEL_2.val();
            var c=0;
            /*
            if( id==0 )
                //c=levelTotal[1];
            else*/
                c = getCount( id );
            renewNumber(c,_set);
            _set.count.val( c );
            this.startCheck();
        },
        startCheck: function( set ){
            var _set = this.set
            if( set===true )return _set.startButton.button('enable');
            if( set===false )return _set.startButton.button('disable');
            if(_set.EXAM_LEVEL_2.val()==0 || _set.count.val()==0)return _set.startButton.button('disable');
            return _set.startButton.button('enable');
        },
        yearToHiddenInput: function (ver) {//傳到下一頁前 xx年換成代碼
            var set = this.set;
            var inputString='';
            if(set.year0.prop('checked'))return;//年不限時

            if( ver==2){// 給 ajax 用
                var out = [];
                for( i in yearId ){
                    out.push( yearId[i] );
                }
                return out;
            }else{//一般 post
                for( i in yearId ){
                    inputString += "<input type='hidden' name='QUESTION_SOURCE_TYPE_2[]' value='"+yearId[i]+"'>";// xx年 換成 option_id
                }
                $('#qst2Div').remove();
                set.form.prepend('<div id="qst2Div">' +inputString+ '</div>');

                return (set.EXAM_LEVEL_2.val()>0);
            }
        }
    }




    function stateDisable( from, _set ){
        switch(from) {
            case 'year':
                _set.yearSelect.selectmenu("disable");
            case 'EXAM_LEVEL_2':
                _set.EXAM_LEVEL_2.selectmenu('disable');
            case 'nArea':
                $( 'input', _set.nArea ).checkboxradio('disable');
            case 'start':
                _set.startButton.button('disable');
            //default:
        }
    }

    var levelTotal=[];
    var yearId=[];// 配合 level 計算 筆數 ， 選題目時也要
    function yearIdChange(_set){// 更新 yearId ， 出處 年度 改變時會做的動作之一
        // 取 出處 的代碼
        var e = _set.sourceSelected;
        var source = [];
        e.each(function(i,v){
            source.push( v.value );
        });
        //p(source);

        // 取 xx年 的代碼 依 出處
        e = _set.yearSelect.val();
        yearId=[];

        for( i in e ){
            for (j in source){
                if(yearToId[e[i]])yearId.push( yearToId[e[i]][ source[j] ] );
            }
        }
        //p('yearId');
        //p(yearId);
    }

    //現在筆數
    function getCount( id ){// id : Level_x 的值
        var t = questionCount[id];
        var c=0;
        //p('t'+t);

        for (i in yearId){
            if(yearId[i]===0)return 99999;//假的
            c += (t&&t[ yearId[i] ]) || 0;
        }
        return c;
    }

    function renewLevel( e, v, _set ){
        if(!e)return 0;
        v = Level_2[v];

        var c = 0, t, optionString;
        if( v==null ){//下層空的
            e.val(0);
        }else{
            optionString = '<option value="0">選擇科目</option>';

            for (x in v){// x 是 option_id
                c += t = getCount(x);//這個 option_id 範圍的 question 數量
                if(t>0)optionString += '<option value="'+x+'">'+v[x]+'</option>';
            }

            e.html(optionString);
        }
        (c>0) ? e.selectmenu("enable").selectmenu("refresh") : e.selectmenu("disable"); // 顯示 隱藏
        _set.count.val( c );
        return levelTotal[1] = c;
    }

    function renewNumber(max,_set){//題數
        var out='', i, nArea=_set.nArea, no=_set.no;
        if( max>20 )max=20;
        for(i=10; i<=max; i+=10){
            out+="<input type='radio' name='EXAM_TOTAL_NUM' id='EXAM_TOTAL_NUM"+i+no+"' value='"+i+"'><label for='EXAM_TOTAL_NUM"+i+no+"'>"+i+"題</label>";
        }
        if( max%10>0 )out+="<input type='radio' name='EXAM_TOTAL_NUM' id='EXAM_TOTAL_NUM"+max+no+"' value='"+max+"'><label for='EXAM_TOTAL_NUM"+max+no+"'>"+max+"題</label>";

        out = nArea.controlgroup( "container" ).html(out);

        if( $('input', nArea).length>=2 ){
            $('input:eq(1)', nArea).prop('checked',true);
        }else{
            $('input:eq(0)', nArea).prop('checked',true);
        }

        $('input', nArea).checkboxradio();
        nArea.controlgroup( "refresh" );
    }


    return this;
}(jQuery);


var qs_1;
$( document ).on( "pagecreate", "#selectPage", function() {
    changeHtmlId( 'selectPage', '_1' );
    if(!qs_1)qs_1 = QuestionSelect.init( 'selectPage', '_1' );
});
$( document ).on( "pageinit", "#selectPage", function() {
    qs_1.sourceChange();
});

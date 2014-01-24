var QuestionSelect=function(e){this.opitonName={0:"",1327:"《國文》",1328:"《英文》",1329:"《數學》",1332:"《數學甲》(指考)",1333:"《數學乙》(指考)",1330:"《自然》(學測)",1334:"《物理》",1335:"《化學》",1336:"《生物》",1629:"《地科》",1331:"《社會》(學測)",1337:"《歷史》",1338:"《地理》",1339:"《公民與社會》"};var t={97:2213,98:2313,102:178,103:172,160:239,161:246,164:178,165:175,166:182,167:182,168:173,413:178,414:176,415:354,416:183,2635:239,2636:182,2637:241,2638:191,2639:193,2640:191,2641:191,2642:204,2644:238,2688:40,1327:{102:21,103:20,160:21,161:22,164:20,165:20,166:21,167:21,168:23,413:20,414:19,415:35,416:19,2635:21,2636:21,2637:23,2638:22,2639:24,2640:24,2641:22,2642:25,2644:26,2688:22,97:252,98:260},1328:{102:23,103:23,160:18,161:18,164:23,165:23,166:23,167:23,168:23,413:23,414:23,415:54,416:26,2635:18,2636:23,2637:18,2638:19,2639:19,2640:19,2641:19,2642:23,2644:22,2688:18,97:211,98:310},1329:{102:20,103:20,160:21,161:21,164:20,165:20,166:20,167:20,168:20,413:20,414:20,415:39,416:20,2635:21,2636:20,2637:20,2638:20,2639:21,2640:20,2641:20,2642:21,2644:26,97:211,98:259},1330:{102:57,103:51,164:56,165:49,166:54,167:57,168:44,413:50,414:46,415:99,416:50,2636:58,98:671},1331:{102:57,103:58,164:59,165:63,166:64,167:61,168:63,413:65,414:68,415:127,416:68,2636:60,98:813},1332:{160:11,161:11,2635:11,2637:10,2638:10,2639:11,2640:11,2641:11,2642:10,2644:12,97:108},1333:{160:10,161:10,2635:10,2637:10,2638:10,2639:10,2640:10,2641:9,2642:11,2644:15,97:105},1334:{102:15,103:13,160:22,161:23,164:15,165:11,166:14,167:15,168:12,413:12,414:13,415:24,416:13,2635:23,2636:13,2637:23,2638:18,2639:18,2640:18,2641:17,2642:18,2644:22,97:202,98:170},1335:{102:15,103:12,160:22,161:23,164:15,165:14,166:13,167:14,168:10,413:13,414:11,415:27,416:10,2635:23,2636:13,2637:22,2638:22,2639:19,2640:15,2641:23,2642:22,2644:20,97:211,98:167},1336:{102:13,103:15,160:36,161:37,164:13,165:11,166:14,167:14,168:12,413:13,414:11,415:28,416:16,2635:37,2636:15,2637:37,2638:35,2639:36,2640:36,2641:34,2642:36,2644:45,97:369,98:175},1337:{102:22,103:23,160:37,161:40,164:23,165:23,166:24,167:25,168:24,413:23,414:24,415:44,416:1,2635:40,2636:21,2637:40,2638:40,2639:40,2640:40,2641:40,2642:40,2644:45,97:402,98:277},1338:{102:11,103:14,160:23,161:19,164:17,165:20,166:20,167:16,168:17,413:21,414:23,415:34,416:3,2635:16,2636:14,2637:22,2638:15,2639:16,2640:18,2641:16,2642:19,2644:31,97:195,98:210},1339:{102:22,103:21,160:39,161:43,164:18,165:20,166:19,167:20,168:21,413:21,414:19,415:41,416:1,2635:40,2636:21,2637:36,97:158,98:244},1629:{102:15,103:14,164:15,165:11,166:12,167:13,168:6,413:9,414:10,415:15,416:10,2636:16,98:146}};var n={};n["102年"]={98:2636,97:2688};n["101年"]={98:102,97:161};n["100年"]={97:160,98:103};n["99年"]={98:164,97:2635};n["98年"]={97:2637,98:165};n["97年"]={98:166,97:2638};n["96年"]={97:2639,98:167};n["95年"]={98:168,97:2640};n["94年"]={97:2641,98:413};n["93年"]={98:414,97:2642};n["92年"]={97:2644,98:415};n["91年"]={98:416};n["0"]={97:0,98:0};var r={};r[98]={1327:"《國文》",1328:"《英文》",1329:"《數學》",1330:"《自然》(學測)",1331:"《社會》(學測)"};r[97]={1327:"《國文》",1328:"《英文》",1332:"《數學甲》(指考)",1333:"《數學乙》(指考)",1334:"《物理》",1335:"《化學》",1336:"《生物》",1629:"《地科》",1337:"《歷史》",1338:"《地理》",1339:"《公民與社會》"};r[2]={1327:"《國文》",1328:"《英文》",1329:"《數學》",1332:"《數學甲》(指考)",1333:"《數學乙》(指考)",1330:"《自然》(學測)",1334:"《物理》",1335:"《化學》",1336:"《生物》",1629:"《地科》",1331:"《社會》(學測)",1337:"《歷史》",1338:"《地理》",1339:"《公民與社會》"};function a(){var e=this}this.init=function(t,n,r){var i=new a;var o=i.set;o.page=e("#"+t);o.no=n;o.form=e("#questionSelectForm"+n);o.EXAM_STUDY_TITLE=e("input[name=EXAM_STUDY_TITLE]",o.form);o.sourceArea=e("#sourceArea"+n);o.qst98=e("#qst98"+n);o.sourceInput=e('input[type=checkbox][name="QUESTION_SOURCE_TYPE_1[]"]',o.sourceArea).on("change",function(){i.sourceChange()});o.sourceSelected=o.sourceInput.filter(":checked");o.yearSelect=e("#yearSelect"+n).on("change",function(){i.yearChange()});o.year0=e("option[value=0]",o.yearSelect);o.year0Selected=o.year0.prop("selected");o.yearSelect.on("click",function(){p("yearSelect click")});o.EXAM_LEVEL_2=e("#EXAM_LEVEL_2"+n).on("change",function(){i.level2Change()});o.EXAM_LEVEL_2.on("click",function(){p("EXAM_LEVEL_2 click")});o.nArea=e("#nArea"+n);if(typeof r=="function")i.startCheck=r;o.startExamDiv=e("#startExamDiv"+n);o.startButton=e("input[type=submit]",o.startExamDiv);o.count=e("input[name=count]",o.startExamDiv);return i};a.prototype={set:{},sourceChange:function(){var t=this.set;t.sourceSelected=t.sourceInput.filter(":checked");if(t.sourceSelected.length==0){o("year",t)}else{if(e("#qst98").prop("checked")){if(e("option[value=91年]",t.yearSelect).length==0){e("option[value=0]",t.yearSelect).after('<option value="91年">91年</option>')}}else{e("option[value=91年]",t.yearSelect).remove()}t.yearSelect.selectmenu("enable").selectmenu("refresh");this.yearChange()}},yearChange:function(){var t=this.set;var n,r,a;if(t.year0Selected){t.year0.prop("selected",false);t.yearSelect.selectmenu("refresh");t.year0Selected=false}else{r=t.yearSelect.val();if(r&&r[0]==0){e("option[value]",t.yearSelect).prop("selected",false);t.year0.prop("selected",true);t.yearSelect.selectmenu("refresh");t.year0Selected=true}}n=t.sourceSelected;r=n.length==2?2:n.val();a=t.EXAM_LEVEL_2;l(t);f(a,r,t);o("nArea",t)},level2Change:function(){p("level2Change");var e=this.set;var t=e.EXAM_LEVEL_2.val();var n=0;n=s(t);v(n,e);e.count.val(n);this.startCheck()},startCheck:function(e){var t=this.set;if(e===true)return t.startButton.button("enable");if(e===false)return t.startButton.button("disable");if(t.EXAM_LEVEL_2.val()==0||t.count.val()==0)return t.startButton.button("disable");return t.startButton.button("enable")},yearToHiddenInput:function(t){var n=this.set;var r="";if(n.year0.prop("checked"))return;if(t==2){var a=[];for(i in u){a.push(u[i])}return a}else{for(i in u){r+="<input type='hidden' name='QUESTION_SOURCE_TYPE_2[]' value='"+u[i]+"'>"}e("#qst2Div").remove();n.form.prepend('<div id="qst2Div">'+r+"</div>");return n.EXAM_LEVEL_2.val()>0}}};function o(t,n){switch(t){case"year":n.yearSelect.selectmenu("disable");case"EXAM_LEVEL_2":n.EXAM_LEVEL_2.selectmenu("disable");case"nArea":e("input",n.nArea).checkboxradio("disable");case"start":n.startButton.button("disable")}}var c=[];var u=[];function l(e){var t=e.sourceSelected;var r=[];t.each(function(e,t){r.push(t.value)});t=e.yearSelect.val();u=[];for(i in t){for(j in r){if(n[t[i]])u.push(n[t[i]][r[j]])}}}function s(e){var n=t[e];var r=0;for(i in u){if(u[i]===0)return 99999;r+=n&&n[u[i]]||0}return r}function f(e,t,n){if(!e)return 0;t=r[t];var a=0,i,o;if(t==null){e.val(0)}else{o='<option value="0">選擇科目</option>';for(x in t){a+=i=s(x);if(i>0)o+='<option value="'+x+'">'+t[x]+"</option>"}e.html(o)}a>0?e.selectmenu("enable").selectmenu("refresh"):e.selectmenu("disable");n.count.val(a);return c[1]=a}function v(t,n){var r="",a,i=n.nArea,o=n.no;if(t>20)t=20;for(a=10;a<=t;a+=10){r+="<input type='radio' name='EXAM_TOTAL_NUM' id='EXAM_TOTAL_NUM"+a+o+"' value='"+a+"'><label for='EXAM_TOTAL_NUM"+a+o+"'>"+a+"題</label>"}if(t%10>0)r+="<input type='radio' name='EXAM_TOTAL_NUM' id='EXAM_TOTAL_NUM"+t+o+"' value='"+t+"'><label for='EXAM_TOTAL_NUM"+t+o+"'>"+t+"題</label>";r=i.controlgroup("container").html(r);if(e("input",i).length>=2){e("input:eq(1)",i).prop("checked",true)}else{e("input:eq(0)",i).prop("checked",true)}e("input",i).checkboxradio();i.controlgroup("refresh")}return this}(jQuery);var qs_1;$(document).on("pagecreate","#selectPage",function(){changeHtmlId("selectPage","_1");if(!qs_1)qs_1=QuestionSelect.init("selectPage","_1")});$(document).on("pageinit","#selectPage",function(){qs_1.sourceChange()});
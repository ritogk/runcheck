function btnClick_MultiPlay(){var e=navigator.userAgent;(e.indexOf("iPhone")>0||e.indexOf("iPod")>0||e.indexOf("Android")>0&&e.indexOf("Mobile")>0||e.indexOf("iPad")>0||e.indexOf("Android")>0)&&(document.getElementById("videoLocal1").muted=!0,document.getElementById("videoLocal2").muted=!0);var t=document.getElementById("playLocal1"),l=document.getElementById("playLocal2");t.click(),l.click()}function btnClick_MultiPause(){var e=document.getElementById("pauseLocal1"),t=document.getElementById("pauseLocal2");e.click(),t.click()}function btnClick_MultiSlow(){var e=document.getElementById("videoLocal1"),t=document.getElementById("videoLocal2");e.playbackRate-=.25,t.playbackRate-=.25}function btnClick_MultiFast(){var e=document.getElementById("videoLocal1"),t=document.getElementById("videoLocal2");e.playbackRate+=.25,t.playbackRate+=.25}function btnClick_MultiMuteRe(){var e=document.getElementById("videoLocal1"),t=document.getElementById("videoLocal2");multeReleaseLocal(e),window.setTimeout(multeReleaseLocal(t),500)}function multeReleaseLocal(e){e.muted=!1}function btnClick_MultiSave(){""==$("#video1_time_st").val()&&($("#video1_time_st").val(getPlayerIndex(0).currentTime),$("#video1_url").val($("#fileSelLocal1").val())),""==$("#video2_time_st").val()&&($("#video2_time_st").val(getPlayerIndex(1).currentTime),$("#video2_url").val($("#fileSelLocal2").val()))}function btnClick_MultiSet(){$("#video1_time_st").val(getPlayerIndex(0).currentTime),$("#video1_url").val($("#fileSelLocal1").val()),$("#video2_time_st").val(getPlayerIndex(1).currentTime),$("#video2_url").val($("#fileSelLocal2").val()),$("#range_filed").show(),$("#multiSave").show(),$("#buttonsLocal1").hide(),$("#buttonsLocal2").hide()}function btnClick_MultiAgain(){btnClick_MultiPause(),getPlayerIndex(0).currentTime=$("#video1_time_st").val(),getPlayerIndex(1).currentTime=$("#video2_time_st").val()}function read(e){setTimeout((function(){$.ajax({type:"GET",url:"/on_data_get/"+e}).done((function(e,t,l){$("#video1_time_st").val(e.video1_time_st),setTimeout((function(){document.getElementById("pauseLocal1").click(),getPlayerIndex(0).currentTime=e.video1_time_st}),1300),$("#video2_time_st").val(e.video2_time_st),setTimeout((function(){document.getElementById("pauseLocal2").click(),getPlayerIndex(1).currentTime=e.video2_time_st}),1300),$("#memoPanel").show(),$("#memo_disp").html(e.memo),$("#title_disp").html(e.title),$("#select2_read_category").val(e.id),$("#range_filed").show(),$("#fileSelLocal1_label").show(),$("#fileSelLocal2_label").show(),$("#buttonsLocal1").hide(),$("#buttonsLocal2").hide(),$("#readModal").modal("hide")})).fail((function(e,t,l){}))}),1e3)}function dispChange(e){"block"==$(e).css("display")?$(e).hide():$(e).show()}window.onload=function(){$.ajax({type:"GET",url:"/analysis/access_locallocal"}),$("#select2_read_category").select2({dropdownAutoWidth:!0,width:"100%",placeholder:"選択してください。"}),$("#select2_save_category").select2({tags:!0,dropdownAutoWidth:!0,width:"100%",placeholder:"選択してください。",dropdownParent:$("#saveModal .modal-content")}),global_read_id&&read(global_read_id);var e=window.navigator.userAgent;-1==e.indexOf("iPhone")&&-1==e.indexOf("iPod")&&-1==e.indexOf("iPad")||-1==e.indexOf("CriOS")&&(document.getElementById("multiSlow").disabled=!0,document.getElementById("multiFast").disabled=!0)},$((function(e){e(".slider").on("input",(function(){let t=e(this).val(),l=(getPlayerIndex(0).duration-e("#video1_time_st").val())/100;getPlayerIndex(0).duration>getPlayerIndex(1).duration&&(l=(getPlayerIndex(1).duration-e("#video2_time_st").val())/100),document.getElementById("pauseLocal1").click(),document.getElementById("pauseLocal2").click(),getPlayerIndex(0).currentTime=Number(e("#video1_time_st").val())+l*t,getPlayerIndex(1).currentTime=Number(e("#video2_time_st").val())+l*t})),e("#fileSelLocal1").on("change",(function(){""===e("#fileSelLocal1").val()?e("#fileSelLocal1_label").show():e("#fileSelLocal1_label").hide()})),e("#fileSelLocal2").on("change",(function(){""===e("#fileSelLocal2").val()?e("#fileSelLocal2_label").show():e("#fileSelLocal2_label").hide()}))}));var vlData=[{document:document,area:"videoLocal1",input:"fileSelLocal1",message:"messageLocal1"},{document:document,area:"videoLocal2",input:"fileSelLocal2",message:"messageLocal2"}];function init(){vlData[0][0]=document.getElementById("videoLocal1"),vlData[1][0]=document.getElementById("videoLocal2")}function getVideo(){return getPlayer(event.target.parentNode)}function muteLocal(){vlData[0][0].muted=!0,vlData[1][0].muted=!1}function getPlayer(e){var t,l=e.parentNode.getAttribute("id");return"videoLocalBord1"==l?t=vlData[0][0]:"videoLocalBord2"==l&&(t=vlData[1][0]),t}function getPlayerIndex(e){return player=0===e?vlData[0][0]:vlData[1][0],player}function getMessage(e){var t,l=e.parentNode.getAttribute("id");return"videoLocalBord1"==l?t=document.querySelector("#"+vlData[0].message):"videoLocalBord2"==l&&(t=document.querySelector("#"+vlData[1].message)),t}document.addEventListener("DOMContentLoaded",init,!1),window.addEventListener("DOMContentLoaded",(function(){!function(e){playSelectedFile=function(e){var t=e.target.files[0],l=t.type,a=getPlayer(e.target),o=a.canPlayType(l);o=""===o?"no":o;"no"===o||(a.src=URL.createObjectURL(t),a.pause())};var t=document.querySelector('input[id="fileSelLocal1"]'),l=document.querySelector('input[id="fileSelLocal2"]');t.addEventListener("change",playSelectedFile,!1),l.addEventListener("change",playSelectedFile,!1)}(window)}));

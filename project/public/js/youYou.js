function btnClick_MultiPlay(){if(3!=getPlayer(0).getPlayerState()&&5!=getPlayer(0).getPlayerState()&&3!=getPlayer(1).getPlayerState()&&5!=getPlayer(1).getPlayerState()){var e=navigator.userAgent;(e.indexOf("iPhone")>0||e.indexOf("iPod")>0||e.indexOf("Android")>0&&e.indexOf("Mobile")>0||e.indexOf("iPad")>0||e.indexOf("Android")>0)&&youMute();var t=document.getElementById("play"),i=document.getElementById("play_2");t.click(),i.click()}}function btnClick_MultiPause(){var e=document.getElementById("pause"),t=document.getElementById("pause_2");e.click(),t.click()}function btnClick_MultiSlow(){youTubeSpeedControl(-.25)}function btnClick_MultiFast(){youTubeSpeedControl(.25)}function btnClick_MultiMuteRe(){youMuteRelease()}function btnClick_MultiSave(){""==$("#video1_time_st").val()&&($("#video1_time_st").val(getPlayer(0).getCurrentTime()),$("#video1_url").val($("#idYou1").val())),""==$("#video2_time_st").val()&&($("#video2_time_st").val(getPlayer(1).getCurrentTime()),$("#video2_url").val($("#idYou2").val()))}function btnClick_MultiSet(){$("#video1_time_st").val(getPlayer(0).getCurrentTime()),$("#video1_url").val($("#idYou1").val()),$("#video2_time_st").val(getPlayer(1).getCurrentTime()),$("#video2_url").val($("#idYou2").val()),$("#range_filed").show(),$("#multiSave").show(),$("#buttonsYou").hide(),$("#buttonsYou2").hide()}function btnClick_MultiAgain(){btnClick_MultiPause(),getPlayer(0).seekTo($("#video1_time_st").val()),getPlayer(1).seekTo($("#video2_time_st").val())}function read(e){setTimeout((function(){$.ajax({type:"GET",url:"/ajax/find-comparsion/"+e}).done((function(e,t,i){$("#idYou1").val(e.video1_url),$("#videoSelct").click(),$("#video1_time_st").val(e.video1_time_st),setTimeout((function(){document.getElementById("pause").click(),getPlayer(0).seekTo(e.video1_time_st)}),1300),$("#idYou2").val(e.video2_url),$("#videoSelct2").click(),$("#video2_time_st").val(e.video2_time_st),setTimeout((function(){document.getElementById("pause_2").click(),getPlayer(1).seekTo(e.video2_time_st)}),1300),$("#memoPanel").show(),$("#memo_disp").html(e.memo),$("#title_disp").html(e.title),$("#select2_read_category").val(e.id),$("#range_filed").show(),$("#buttonsYou").hide(),$("#buttonsYou2").hide(),$("#readModal").modal("hide")})).fail((function(e,t,i){}))}),1e3)}function youBtnDispChange(e){"block"==$(e).css("display")?$(e).hide():$(e).show()}window.onload=function(){$.ajax({type:"GET",url:"/analysis/access_youyou"}),$("#select2_read_category").select2({dropdownAutoWidth:!0,width:"100%",placeholder:"選択してください。"}),$("#select2_save_category").select2({tags:!0,width:"100%",placeholder:"選択してください。",dropdownAutoWidth:!0,dropdownParent:$("#saveModal .modal-content")}),global_read_id&&read(global_read_id);var e=window.navigator.userAgent;-1==e.indexOf("iPhone")&&-1==e.indexOf("iPod")&&-1==e.indexOf("iPad")||-1==e.indexOf("CriOS")&&(document.getElementById("multiSlow").disabled=!0,document.getElementById("multiFast").disabled=!0)},$((function(e){e(".slider").on("input",(function(){let t=e(this).val(),i=(getPlayer(0).getDuration()-e("#video1_time_st").val())/100;getPlayer(0).getDuration()>getPlayer(1).getDuration()&&(i=(getPlayer(1).getDuration()-e("#video2_time_st").val())/100),document.getElementById("pause").click(),document.getElementById("pause_2").click(),getPlayer(0).seekTo(Number(e("#video1_time_st").val())+i*t),getPlayer(1).seekTo(Number(e("#video2_time_st").val())+i*t)}))}));var tag=document.createElement("script");tag.src="https://www.youtube.com/iframe_api";var firstScriptTag=document.getElementsByTagName("script")[0];firstScriptTag.parentNode.insertBefore(tag,firstScriptTag);var ytPlayer=[],ytData=[{id:"",area:"sampleVideo1"},{id:"",area:"sampleVideo2"}];function onYouTubeIframeAPIReady(){ytPlayer[0]=new YT.Player(ytData[0].area,{width:300,height:150,playerVars:{autoplay:0,playsinline:1,rel:0,showinfo:0,controls:1}}),ytPlayer[1]=new YT.Player(ytData[1].area,{width:300,height:150,playerVars:{autoplay:0,playsinline:1,rel:0,showinfo:0,controls:1}})}function youTubeSpeedControl(e){var t=ytPlayer[0].getPlaybackRate();ytPlayer[0].setPlaybackRate(t+e),t=ytPlayer[1].getPlaybackRate(),ytPlayer[1].setPlaybackRate(t+e)}function youMute(){ytPlayer[0].mute(),ytPlayer[1].mute()}function youMuteRelease(){ytPlayer[0].unMute(),ytPlayer[1].unMute()}function getPlayer(e){return ytPlayer[e]}$((function(){function e(e){e.playVideo()}function t(e){e.pauseVideo()}function i(e,t){var i=e.getCurrentTime();e.seekTo(i+t)}function n(e,t){t?e.mute():e.unMute()}function o(){var e=$(window).width(),t=9/16*$(window).width();ytPlayer[0].setSize(e,t),ytPlayer[1].setSize(e,t)}function a(e){return e.length>11?e.substring(e.length-11,e.length):e}function l(e){var t,i=e.target.parentNode.getAttribute("id");return"buttonsYou"==i?t=ytPlayer[0]:"buttonsYou2"==i&&(t=ytPlayer[1]),t}$("#play").click((function(){e(l(event))})),$("#play_2").click((function(){e(l(event))})),$("#pause").click((function(){t(l(event))})),$("#pause_2").click((function(){t(l(event))})),$("#prev100").click((function(){i(l(event),-1)})),$("#prev100_2").click((function(){i(l(event),-1)})),$("#next100").click((function(){i(l(event),1)})),$("#next100_2").click((function(){i(l(event),1)})),$("#prev050").click((function(){i(l(event),-.5)})),$("#prev050_2").click((function(){i(l(event),-.5)})),$("#next050").click((function(){i(l(event),.5)})),$("#next050_2").click((function(){i(l(event),.5)})),$("#prev010").click((function(){i(l(event),-.1)})),$("#prev010_2").click((function(){i(l(event),-.1)})),$("#prev005").click((function(){i(l(event),-.05)})),$("#prev005_2").click((function(){i(l(event),-.05)})),$("#next010").click((function(){i(l(event),.1)})),$("#next010_2").click((function(){i(l(event),.1)})),$("#next005").click((function(){i(l(event),.05)})),$("#next005_2").click((function(){i(l(event),.05)})),$("#muteRelease").click((function(){n(l(event),!1)})),$("#muteRelease_2").click((function(){n(l(event),!1)})),$("#videoSelct").click((function(){$(window).width(),$(window).width();var e=a(document.getElementById("idYou1").value);""!=e&&(ytData[0].id=e,ytPlayer[0].loadVideoById(e),o())})),$("#videoSelct2").click((function(){$(window).width(),$(window).width();var e=a(document.getElementById("idYou2").value);""!=e&&(ytData[1].id=e,ytPlayer[1].loadVideoById(e),o())})),window.onresize=function(){o()}}));

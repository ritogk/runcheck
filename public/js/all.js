// IFrame Player API の読み込み
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 各プレーヤーの格納
var ytPlayer = [];
// 各動画情報
var ytData = [
    {
        id: '',
        area: 'sampleVideo1'
    }, {
        id: '',
        area: 'sampleVideo2'
    }
];

function onYouTubeIframeAPIReady() {
   ytPlayer[0] = new YT.Player(ytData[0]['area'], {
            width: 300,
            height: 150,
            //videoId: ytData[0]['id'],
            playerVars: {
                 playsinline: 1,   // インライン再生
                 rel:0,            // 関連動画の有無(default:1)
                 showinfo:0,       // 動画情報表示(default:1)
                 controls:1        // コントロール有無(default:1)
            }
        });
   ytPlayer[1] = new YT.Player(ytData[1]['area'], {
            width: 300,
            height: 150,
            //videoId: ytData[1]['id'],
            playerVars: {
                 playsinline: 1,   // インライン再生
                 rel:0,            // 関連動画の有無(default:1)
                 showinfo:0,       // 動画情報表示(default:1)
                 controls:1        // コントロール有無(default:1)
            }
       });
}

// 再生速度
function youTubeSpeedControl(num){
   var speed =  ytPlayer[0].getPlaybackRate();
   ytPlayer[0].setPlaybackRate(speed + num);
   speed =  ytPlayer[1].getPlaybackRate();
   ytPlayer[1].setPlaybackRate(speed + num);
}
// ミュート
function youMute(){
   ytPlayer[0].mute();
   ytPlayer[1].mute();
};
// ミュート解除
function youMuteRelease(){
   ytPlayer[0].unMute();
   ytPlayer[1].unMute();
};

// html画面のボタン動作
$(function() {
   // ボタンクリック【再生(1)】
   $('#play').click(function() {
     youtubePlay(getPlayer(event));
   });
   // ボタンクリック【再生(2)】
   $('#play_2').click(function() {
     youtubePlay(getPlayer(event));
   });
   
   // ボタンクリック【一時停止(1)】
   $('#pause').click(function() {
      youtubePause(getPlayer(event));
   });
   // ボタンクリック【一時停止(2)】
   $('#pause_2').click(function() {
      youtubePause(getPlayer(event));
   });

   // ボタンクリック【1秒前へ(1)】
   $('#prev100').click(function() {
      youtubeaTime(getPlayer(event), -1);
   });
   // ボタンクリック【1秒前へ(2)】
   $('#prev100_2').click(function() {
      youtubeaTime(getPlayer(event), -1);
   });
   
   // ボタンクリック【1秒先へ(1)】
   $('#next100').click(function() {
      youtubeaTime(getPlayer(event), 1);
   });
   // ボタンクリック【1秒先へ(2)】
   $('#next100_2').click(function() {
      youtubeaTime(getPlayer(event), 1);
   });

   // ボタンクリック【0.5秒前へ(1)】
   $('#prev050').click(function() {
      youtubeaTime(getPlayer(event), -0.5);
   });
   // ボタンクリック【0.5秒前へ(2)】
   $('#prev050_2').click(function() {
      youtubeaTime(getPlayer(event), -0.5);
   });

   // ボタンクリック【0.5秒先へ(1)】
   $('#next050').click(function() {
      youtubeaTime(getPlayer(event), 0.5);
   });
   // ボタンクリック【0.5秒先へ(2)】
   $('#next050_2').click(function() {
      youtubeaTime(getPlayer(event), 0.5);
   });
   
   // ボタンクリック【0.5秒先へ(1)】
   $('#prev010').click(function() {
      youtubeaTime(getPlayer(event), -0.1);
   });
   // ボタンクリック【0.5秒先へ(2)】
   $('#prev010_2').click(function() {
      youtubeaTime(getPlayer(event), -0.1);
   });
   
   // ボタンクリック【0.5秒前へ(1)】
   $('#next010').click(function() {
      youtubeaTime(getPlayer(event), 0.1);
   });
   // ボタンクリック【0.5秒前へ(2)】
   $('#next010_2').click(function() {
      youtubeaTime(getPlayer(event), 0.1);
   });
   
   // ボタンクリック【ミュート解除(1)】
   $('#muteRelease').click(function() {
      muteControl(getPlayer(event), false)
   });
   // ボタンクリック【ミュート解除(2)】
   $('#muteRelease_2').click(function() {
      muteControl(getPlayer(event), false)
   });
   
   // 再生
   function youtubePlay(player){
      player.playVideo();
   }
   // 一時停止
   function youtubePause(player){
      player.pauseVideo();
   }
   // 時間制御
   function youtubeaTime(player, second){
      var currentTime = player.getCurrentTime();
      player.seekTo(currentTime + second);
   }

   // ミュートコントロール
   function muteControl(player, muteFlg){
      if(muteFlg){
         player.mute();
      }else{
         player.unMute();
      }
   }

   // 対象動画選択
   $('#videoSelct').click(function() {
        var vdWidth = $(window).width();
        var vdHeight = (9/16) * $(window).width();
        
        var youtubeId = getYoutubeId(document.getElementById( 'idYou1' ).value);
        if(youtubeId != ""){
           ytData[0]['id'] = youtubeId;
           ytPlayer[0].loadVideoById(youtubeId);
           resize();
        }
   });
   
   // 対象動画選択
   $('#videoSelct2').click(function() {
        var vdWidth = $(window).width();
        var vdHeight = (9/16) * $(window).width();
        
        var youtubeId = getYoutubeId(document.getElementById( 'idYou2' ).value);
        if(youtubeId != ""){
           ytData[1]['id'] = youtubeId;
           ytPlayer[1].loadVideoById(youtubeId);
           resize();
        }
   });
   
   // リサイズ
   function resize(){
      var vdWidth = $(window).width();
      var vdHeight = (9/16) * $(window).width();
      ytPlayer[0].setSize(vdWidth, vdHeight);
      ytPlayer[1].setSize(vdWidth, vdHeight);
   }
   
   // リサイズイベント
   window.onresize = function () {
     resize();
   };
   
   // youtubeId取得
   function getYoutubeId(url){
      var youtubeId
      if(url.length > 11){
         youtubeId = url.substring((url.length - 11),url.length);
      }else{
         youtubeId = url;
      }
      return youtubeId;
   }
   
   // 対象プレイヤー取得
   function getPlayer(eventDom){
      var player
      var id_name = eventDom.target.parentNode.getAttribute("id");
      if(id_name == "buttonsYou"){
        player = ytPlayer[0];
     }else if(id_name == "buttonsYou2"){
        player = ytPlayer[1];
     }
     return player;
   }
});
function init(){
  /* ピッチインピッチアウトによる拡大縮小を禁止 */
  document.documentElement.addEventListener('touchstart', function (e) {
  if (e.touches.length >= 2) {e.preventDefault();}
  }, {passive: false});
  /* ダブルタップによる拡大を禁止 */
  var t = 0;
  document.documentElement.addEventListener('touchend', function (e) {
  var now = new Date().getTime();
  if ((now - t) < 350){
    e.preventDefault();
  }
  t = now;
  }, false);
}
document.addEventListener("DOMContentLoaded", init, false);
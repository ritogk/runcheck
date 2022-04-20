window.onload = function () {
  $.ajax({
    type: "GET",
    url: "/analysis/access_youyou",
  })
  $("#select2_read_category").select2({
    dropdownAutoWidth: true,
    width: "100%",
    placeholder: "選択してください。",
  })
  $("#select2_save_category").select2({
    tags: true,
    width: "100%",
    placeholder: "選択してください。",
    dropdownAutoWidth: true,
    dropdownParent: $("#saveModal .modal-content"),
  })
  // 読み込み
  if (global_read_id) read(global_read_id)
  // Apple端末Chrome以外の時「倍速」ボタンを非活性
  var userAgent = window.navigator.userAgent
  if (
    userAgent.indexOf("iPhone") != -1 ||
    userAgent.indexOf("iPod") != -1 ||
    userAgent.indexOf("iPad") != -1
  ) {
    if (userAgent.indexOf("CriOS") == -1) {
      document.getElementById("multiSlow").disabled = true
      document.getElementById("multiFast").disabled = true
    }
  }
}
// [同時再生]ボタン押下
function btnClick_MultiPlay() {
  if (
    getPlayer(0).getPlayerState() == 3 ||
    getPlayer(0).getPlayerState() == 5 ||
    getPlayer(1).getPlayerState() == 3 ||
    getPlayer(1).getPlayerState() == 5
  )
    return // バッファリング中は再生しない
  // 再生端末判定(PC以外はミュート)
  var ua = navigator.userAgent
  if (
    ua.indexOf("iPhone") > 0 ||
    ua.indexOf("iPod") > 0 ||
    (ua.indexOf("Android") > 0 && ua.indexOf("Mobile") > 0)
  ) {
    // スマホ
    youMute()
  } else if (ua.indexOf("iPad") > 0 || ua.indexOf("Android") > 0) {
    // タブレット
    youMute()
  } else {
    // PC
  }
  // 再生
  var clickMe1 = document.getElementById("play")
  var clickMe2 = document.getElementById("play_2")
  clickMe1.click()
  clickMe2.click()
}

// [同時停止]ボタン押下
function btnClick_MultiPause() {
  var clickMe = document.getElementById("pause")
  var clickMe2 = document.getElementById("pause_2")
  clickMe.click()
  clickMe2.click()
}

// [倍速(-)]ボタン押下
function btnClick_MultiSlow() {
  youTubeSpeedControl(-0.25)
}

// [倍速(+)]ボタン押下
function btnClick_MultiFast() {
  youTubeSpeedControl(0.25)
}

// [ﾐｭｰﾄ解除]ボタン押下
function btnClick_MultiMuteRe() {
  youMuteRelease()
}

// [保存]ボタン押下
function btnClick_MultiSave() {
  if ($("#video1_time_st").val() == "") {
    $("#video1_time_st").val(getPlayer(0).getCurrentTime())
    $("#video1_url").val($("#idYou1").val())
  }
  if ($("#video2_time_st").val() == "") {
    $("#video2_time_st").val(getPlayer(1).getCurrentTime())
    $("#video2_url").val($("#idYou2").val())
  }
}

// [セット]ボタン押下
function btnClick_MultiSet() {
  const video1_url = $("#idYou1").val();
  const video2_url = $("#idYou2").val();
  if(video1_url === ''){
    alert('動画1のYoutube[URL]を入力して下さい。')
    return;
  }
  if(video2_url === ''){
    alert('動画2のYoutube[URL]を入力して下さい。')
    return;
  }

  $("#video1_time_st").val(getPlayer(0).getCurrentTime())
  $("#video1_url").val(video1_url)
  $("#video2_time_st").val(getPlayer(1).getCurrentTime())
  $("#video2_url").val(video2_url)
  $("#range_filed").show()
  $("#multiSave").show()
  $("#buttonsYou").hide()
  $("#buttonsYou2").hide()
}

// [再読込]ボタン押下
function btnClick_MultiAgain() {
  btnClick_MultiPause()
  getPlayer(0).seekTo($("#video1_time_st").val())
  getPlayer(1).seekTo($("#video2_time_st").val())
}

// 読込
function read(comparison_id) {
  setTimeout(function () {
    $.ajax({
      type: "GET",
      url: "/ajax/find-comparsion/" + comparison_id,
    })
      .done(function (data, textStatus, jqXHR) {
        // video1
        $("#idYou1").val(data.video1_url)
        $("#videoSelct").click()
        $("#video1_time_st").val(data.video1_time_st)
        setTimeout(function () {
          document.getElementById("pause").click()
          getPlayer(0).seekTo(data.video1_time_st)
        }, 1300)
        // video2
        $("#idYou2").val(data.video2_url)
        $("#videoSelct2").click()
        $("#video2_time_st").val(data.video2_time_st)
        setTimeout(function () {
          document.getElementById("pause_2").click()
          getPlayer(1).seekTo(data.video2_time_st)
        }, 1300)
        // メモ欄
        $("#memoPanel").show()
        $("#memo_disp").html(data.memo)
        $("#title_disp").html(data.title)
        // 読込欄
        $("#select2_read_category").val(data.id)
        // シーク表示
        $("#range_filed").show()
        // 調整欄非表示
        $("#buttonsYou").hide()
        $("#buttonsYou2").hide()
        // モーダル画面を閉じる
        $("#readModal").modal("hide")
      })
      .fail(function (jqXHR, textStatus, errorThrown) {})
  }, 1000)
}

// youtubeボタン表示切替
function youBtnDispChange(elementId) {
  if ($(elementId).css("display") == "block") {
    $(elementId).hide()
  } else {
    $(elementId).show()
  }
}

// スライダー変更イベント
$(function ($) {
  $(".slider").on("input", function () {
    let val = $(this).val()
    let time_interval =
      (getPlayer(0).getDuration() - $("#video1_time_st").val()) / 100
    if (getPlayer(0).getDuration() > getPlayer(1).getDuration())
      time_interval =
        (getPlayer(1).getDuration() - $("#video2_time_st").val()) / 100
    document.getElementById("pause").click()
    document.getElementById("pause_2").click()
    getPlayer(0).seekTo(
      Number($("#video1_time_st").val()) + time_interval * val
    )
    getPlayer(1).seekTo(
      Number($("#video2_time_st").val()) + time_interval * val
    )
  })
})
//        // チェンジイベントサンプル
//        $(function($) {
//            $('#test1').change(function() {
//                alert('test');
//            });
//        });

function btnClick_ReadTweat(e,t){$.ajax({type:"GET",url:"/home_release_update/"+e}).done((function(n,o,i){url="https://runcheck.homisoftware.net/top-tweat?id="+e,window.location.href="https://twitter.com/intent/tweet?text="+t+" "+url})).fail((function(e,t,n){}))}function btnClick_ReadDelete(e){window.location.href="/home_destroy/"+e}function deleteConfirm(e){return confirm("「"+e+"」を削除します。\nよろしいですか?")}$((function(e){function t(){jQuery(".comparison_group").each((function(t){category=jQuery(this).find(".card-text").html(),video_type=jQuery(this).find(".video_type_value").val(),category.indexOf(e("#serach_category").val())>-1&&video_type.indexOf(e("#serach_video_type").val())>-1?jQuery(this).show():jQuery(this).hide()}))}e("#serach_category").change((function(){t()})),e("#serach_video_type").change((function(){t()}))}));

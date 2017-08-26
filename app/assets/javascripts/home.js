// (function(global) {
//   $(document).ready(function() {
//     $(".li-tag").droppable({
//       drop: function(event, ui) {
//         var $tag = $(this),
//           $photo = $(ui.draggable);

//         var tag_name = $tag.attr("data-name");
//         var photo_id = $photo.attr("data-id");

//         if (_.isEmpty(tag_name) || _.isEmpty(photo_id)) {
//           console.log("哎呀，你没有选好标签啊。。。");
//         } else {
//           $.ajax({
//             url: "/photos/" + photo_id + ".json",
//             method: "PUT",
//             data: { tag_name: tag_name }
//           }).done(function(data) {
//             console.log(data);

//             $photo.parent().find("span.photo-tag").text(data.photo.tag_name);
//           });
//         }
//       }
//     });

//     $(".tag").on("click", function() {
//       $photo_tag = $(this).find("span.photo-tag");
//       $tag_input = $(this).find("input.tag-input");

//       $photo_tag.hide();
//       $tag_input.show();
//       $tag_input.focus();
//     });

//     $(".tag-input").blur(function() {
//       var value = $(this).val();
//       var photo_id = $(this).attr("data-id");

//       var _this = $(this);

//       if (_.isEmpty(value)) {
//         toggleInput(_this, "");
//         return;
//       }

//       $.ajax({
//         url: "/photos/" + photo_id + ".json",
//         method: "PUT",
//         data: { tag_name: value }
//       }).done(function(data) {
//         console.log(data);

//         toggleInput(_this, value);
//         if (isIncludeTags(value)) {
//           $("ul.tags").append(
//             "<li class='li-tag' data-name='" + value + "'> " + value + " </li>"
//           );
//         }
//       });
//     });

//     var toggleInput = function(input, value) {
//       input.hide();
//       input.siblings(".photo-tag").show();
//       if (!_.isEmpty(value)) {
//         input.siblings(".photo-tag").text(value);
//       }
//     };

//     var isIncludeTags = function(value) {
//       if (_.isEmpty(value)) {
//         return false;
//       }
//       var tags = [];
//       $("ul.tags > li").each(function() {
//         tags.push($(this).attr("data-name"));
//       });

//       if (_.isEmpty(tags)) {
//         return true;
//       }

//       _.includes(tags, value);
//     };
//   });
// })(window);

(function(global) {
  $(document).ready(function() {
    $(document).on("click", ".js-upload-photo", function() {
      $("#fileupload").fileupload({
        url: "/photos",
        dataType: "json",
        maxFileSize: 5000000, // 5M
        minFileSize: 1,
        start: function(e) {},
        done: function(e, data) {
          global.location.href = "/";
        },
        fail: function(e, data) {
          console.log("Uploads fail");
          alert("上传失败");
        }
      });
    });

    $(".photo-url").draggable({ revert: true });
  });
})(window);

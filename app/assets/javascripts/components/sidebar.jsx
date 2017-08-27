window.Sidebar = React.createClass({
  tagDroppable: function() {
    const self = this;
    $(".li-tag").droppable({
      drop: function(event, ui) {
        // console.log("drop");

        const $tag = $(this),
          $photo = $(ui.draggable);

        let tag_name = $tag.attr("data-name");
        let photo_id = $photo.attr("data-id");
        let photo_index = +$photo.attr("data-index");

        if (_.isEmpty(tag_name) || _.isEmpty(photo_id)) {
          console.log("哎呀，你没有选好标签啊。。。");
        } else {
          $.ajax({
            url: "/photos/" + photo_id + ".json",
            method: "PUT",
            data: { tag_name: tag_name }
          }).done(function(data) {
            // console.log(data);

            self.props.onPhotoDrop(data.photo, photo_index);
          });
        }
      }
    });
  },
  componentWillReceiveProps: function(nextProps) {
    if (this.props != nextProps) {
      this.tagDroppable();
    }
  },
  componentDidMount: function() {
    this.tagDroppable();
  },
  render: function() {
    let tags = this.props.tags;

    return (
      <div className="col-md-3 sidebar">
        <h3>Tags</h3>
        <ul className="tags">
          <li className="li-tag" onClick={this.props.onTagClick}>
            全部
          </li>
          {tags.map(
            function(tag, i) {
              return (
                <li
                  key={"li" + tag.id}
                  className="li-tag"
                  data-name={tag.name}
                  data-id={tag.id}
                  onClick={this.props.onTagClick}
                >
                  {tag.name}
                </li>
              );
            }.bind(this)
          )}
        </ul>

        <a
          className="btn btn-primary js-upload-photo fileinput-button"
          href="javascript:;"
          onClick={this.props.onUploadFile}
        >
          Upload Photo
          <input id="fileupload" type="file" name="file" />
        </a>
      </div>
    );
  }
});

window.Sidebar = React.createClass({
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

window.Home = React.createClass({
  getInitialState: function() {
    return {
      current_tag: "",
      tags: this.props.tags,
      photos: [],
      pagination: {
        current_page: 0,
        total_count: 0
      }
    };
  },
  tagClick: function(event) {
    const $this = $(event.target);
    const $photo_tag = $this.find("span.photo-tag");
    const $tag_input = $this.find("input.tag-input");

    $photo_tag.hide();
    $tag_input.show();
    $tag_input.focus();
  },
  tagInputBlur: function(index, event) {
    const $this = $(event.target);
    let value = $this.val();
    let photo_id = $this.attr("data-id");

    if (_.isEmpty(value)) {
      this.toggleInput($this, "");
      return;
    }

    this.handleSubmitTag(photo_id, value, $this, index);
  },
  toggleInput: function(input) {
    input.hide();
    input.siblings(".photo-tag").show();
  },
  tagDroppable: function() {
    const self = this;
    $(".li-tag").droppable({
      drop: function(event, ui) {
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
            console.log(data);

            var photos = React.addons.update(self.state.photos, {
              [photo_index]: {
                tag_name: { $set: data.photo.tag_name }
              }
            });
            console.log(photos);

            self.setState({ photos: photos });
            $photo.parent().find("span.photo-tag").text(data.photo.tag_name);
          });
        }
      }
    });
  },
  uploadFile: function(event) {
    console.log($(event.target));
    const self = this;
    $("#fileupload").fileupload({
      url: "/photos",
      dataType: "json",
      maxFileSize: 5000000, // 5M
      minFileSize: 1,
      start: function(e) {},
      done: function(e, data) {
        console.log(data.result);
        let result = data.result;
        if (result.status == "ok") {
          photos = _.cloneDeep(self.state.photos);
          photos.unshift(result.photo);
          self.setState({ photos: photos });
        } else {
          alert("上传失败");
        }
      },
      fail: function(e, data) {
        console.log("Uploads fail");
        alert("上传失败");
      }
    });
  },
  handleTagClick: function(event) {
    const $this = $(event.target);
    let tag_id = $this.attr("data-id");

    this.setState({ current_tag: tag_id }, function() {
      this.handleSearch(tag_id);
    });
  },
  handleSubmitTag: function(photo_id, value, input, index) {
    let self = this;
    $.ajax({
      url: "/photos/" + photo_id + ".json",
      method: "PUT",
      data: { tag_name: value }
    }).done(function(data) {
      console.log(data.result);

      self.toggleInput(input);

      console.log(self.state.photos);
      var photos = React.addons.update(self.state.photos, {
        [index]: {
          tag_name: { $set: data.photo.tag_name }
        }
      });
      console.log(photos);

      self.setState({ tags: data.tags, photos: photos });
    });
  },
  handlePaginationChange: function(page) {
    this.handleSearch(this.state.current_tag, page);
  },
  handleSearch: function(tag_id, page) {
    const self = this;
    let params = {};

    if (!_.isEmpty(tag_id)) {
      params["tag_id"] = tag_id;
    }
    params["page"] = page;

    $.getJSON("/", params, function(data) {
      console.log(data);
      self.setState({ photos: data.photos, pagination: data.pagination });
    });
  },
  componentDidMount: function() {
    console.log(this.state.tags);
    $(".photo-url").draggable({ revert: true });

    this.tagDroppable();

    this.handleSearch();
  },
  renderMain: function() {
    return (
      <div className="col-md-9 main">
        <div className="photos">
          <div className="row">
            {this.state.photos.map(
              function(photo, i) {
                return (
                  <div className="col-md-4" key={photo.id}>
                    <div className="photo">
                      <img
                        src={photo.url}
                        className="photo-url"
                        data-id={photo.id}
                        data-index={i}
                      />
                      <div className="photo-info">
                        <p className="title">
                          Title: {photo.title}
                        </p>
                        <p className="date">
                          Date: {photo.created_at}
                        </p>
                        <p className="tag" onClick={this.tagClick}>
                          Tag:
                          <span className="photo-tag">{photo.tag_name}</span>
                          <input
                            className="tag-input"
                            name="tag"
                            data-id={photo.id}
                            onBlur={this.tagInputBlur.bind(this, i)}
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }.bind(this)
            )}
          </div>

          <Pagination
            paginate={this.state.pagination}
            onChange={this.handlePaginationChange}
          />
        </div>
      </div>
    );
  },
  render: function() {
    let content = this.renderMain();

    return (
      <div className="row">
        <Sidebar
          tags={this.state.tags}
          onUploadFile={this.uploadFile}
          onTagClick={this.handleTagClick}
        />

        {content}
      </div>
    );
  }
});

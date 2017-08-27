window.Pagination = React.createClass({
  handleClick: function(page) {
    // console.log(page);
    if (this.props.onChange) {
      this.props.onChange(page);
    }
  },
  render: function() {
    // console.log(this.props.paginate);
    const paginate = this.props.paginate;

    let current_page = parseInt(paginate.current_page);
    let total_count = parseInt(paginate.total_count);
    let current_per = 9,
      padding = 2,
      pages = [],
      total_page = 1;

    if (paginate.current_per) {
      current_per = parseInt(paginate.current_per);
    }
    if (paginate.perv_page) {
      perv_page = parseInt(paginate.perv_page);
    }

    total_page = Math.ceil(total_count / current_per);

    // 格式
    // << < current_page, 2, 3 > >>
    // 1, 2, current_page, 4, 5
    // 4, 5, current_page
    if (current_page > padding) {
      for (let i = padding; i >= 1; --i) {
        pages.push(current_page - i);
      }
    } else if (current_page > 1) {
      for (let i = 1; i < current_page; ++i) {
        pages.push(i);
      }
    }

    pages.push(current_page);

    if (total_page - current_page > padding) {
      for (var i = current_page + 1; i <= current_page + padding; ++i) {
        pages.push(i);
      }
    } else if (current_page < total_page) {
      for (var i = current_page + 1; i <= total_page; ++i) {
        pages.push(i);
      }
    }
    // console.log(pages);

    let showPrev = current_page > 1;
    let showNext = current_page < total_page;

    const self = this;
    return (
      <div className="pagination-info">
        <ui className="pagination">
          {showPrev &&
            <li>
              <a href="javascript:;" onClick={self.handleClick.bind(this, "")}>
                {" << "}
              </a>
            </li>}
          {showPrev &&
            <li>
              <a
                href="javascript:;"
                onClick={self.handleClick.bind(this, current_page - 1)}
              >
                {" < "}
              </a>
            </li>}
          {pages.length > 1 &&
            pages.map(function(page) {
              return (
                <li className={page == current_page ? "active" : ""} key={page}>
                  <a
                    href="javascript:;"
                    onClick={self.handleClick.bind(self, page)}
                  >
                    {page}
                  </a>
                </li>
              );
            })}
          {showNext &&
            <li>
              <a
                href="javascript:;"
                onClick={self.handleClick.bind(this, current_page + 1)}
              >
                {" > "}
              </a>
            </li>}

          {showNext &&
            <li>
              <a
                href="javascript:;"
                onClick={this.handleClick.bind(this, total_page)}
              >
                {" >> "}
              </a>
            </li>}
        </ui>
      </div>
    );
  }
});

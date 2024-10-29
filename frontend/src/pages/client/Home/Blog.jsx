import React from "react";

const Blog = () => {
  return (
    <div className="blog-area pt-55 pb-80">
      <div className="container">
        {/* Section-title start */}
        <div className="row">
          <div className="col-12">
            <div className="section-title text-center">
              <h2 className="title-border">From The Blog</h2>
            </div>
          </div>
        </div>
        {/* Section-title end */}
        <div className="row">
          {/* Single-blog start */}
          <div className="col-lg-4 col-md-6 col-12">
            <div className="single-blog mt-30">
              <div className="blog-photo">
                <a href="#">
                  <img src="client_css/img/blog/1.webp" alt />
                </a>
              </div>
              <div className="blog-info">
                <div className="post-meta fix">
                  <div className="post-year floatleft">
                    <h4 className="post-title">
                      <a href="#" tabIndex={0}>
                        Sweet Street Life 2022
                      </a>
                    </h4>
                  </div>
                </div>
                <div className="like-share fix">
                  <a href="#">
                    <i className="zmdi zmdi-favorite" />
                    <span>89 Like</span>
                  </a>
                  <a href="#">
                    <i className="zmdi zmdi-comments" />
                    <span>59 Comments</span>
                  </a>
                  <a href="#">
                    <i className="zmdi zmdi-share" />
                    <span>29 Share</span>
                  </a>
                </div>
                <p>
                  There are many variations of passages of Lorem Ipsum alteratio
                  available, but the majority have suffered If you are going to
                  use a passage Lorem Ipsum, you alteration in some form.
                </p>
                <a href="#" className="button-2 text-dark-red">
                  Read more...
                </a>
              </div>
            </div>
          </div>
          {/* Single-blog end */}
          {/* Single-blog start */}
          <div className="col-lg-4 col-md-6 col-12">
            <div className="single-blog mt-30">
              <div className="blog-photo">
                <a href="#">
                  <img src="client_css/img/blog/2.webp" alt />
                </a>
              </div>
              <div className="blog-info">
                <div className="post-meta fix">
                  <div className="post-year floatleft">
                    <h4 className="post-title">
                      <a href="#" tabIndex={0}>
                        Designer`s look 2022
                      </a>
                    </h4>
                  </div>
                </div>
                <div className="like-share fix">
                  <a href="#">
                    <i className="zmdi zmdi-favorite" />
                    <span>45 Like</span>
                  </a>
                  <a href="#">
                    <i className="zmdi zmdi-comments" />
                    <span>56 Comments</span>
                  </a>
                  <a href="#">
                    <i className="zmdi zmdi-share" />
                    <span>27 Share</span>
                  </a>
                </div>
                <p>
                  There are many variations of passages of Lorem Ipsum alteratio
                  available, but the majority have suffered If you are going to
                  use a passage Lorem Ipsum, you alteration in some form.
                </p>
                <a href="#" className="button-2 text-dark-red">
                  Read more...
                </a>
              </div>
            </div>
          </div>
          {/* Single-blog end */}
          {/* Single-blog start */}
          <div className="col-lg-4 col-md-6 col-12">
            <div className="single-blog mt-30">
              <div className="blog-photo">
                <a href="#">
                  <img src="client_css/img/blog/3.webp" alt />
                </a>
              </div>
              <div className="blog-info">
                <div className="post-meta fix">
                  <div className="post-year floatleft">
                    <h4 className="post-title">
                      <a href="#" tabIndex={0}>
                        Fashion drawing 2022
                      </a>
                    </h4>
                  </div>
                </div>
                <div className="like-share fix">
                  <a href="#">
                    <i className="zmdi zmdi-favorite" />
                    <span>78 Like</span>
                  </a>
                  <a href="#">
                    <i className="zmdi zmdi-comments" />
                    <span>25 Comments</span>
                  </a>
                  <a href="#">
                    <i className="zmdi zmdi-share" />
                    <span>43 Share</span>
                  </a>
                </div>
                <p>
                  There are many variations of passages of Lorem Ipsum alteratio
                  available, but the majority have suffered If you are going to
                  use a passage Lorem Ipsum, you alteration in some form.
                </p>
                <a href="#" className="button-2 text-dark-red">
                  Read more...
                </a>
              </div>
            </div>
          </div>
          {/* Single-blog end */}
        </div>
      </div>
    </div>
  );
};

export default Blog;

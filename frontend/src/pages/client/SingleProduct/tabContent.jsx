import React from 'react'

const TabContent = () => {
  return (
    <div className="product-area single-pro-area pt-80 pb-80 product-style-2">
  <div className="container">	
    {/* single-product-tab start */}
    <div className="single-pro-tab">
      <div className="row">
        <div className="col-md-3 col-12">
          {/* Nav tabs */}
          <ul className="single-pro-tab-menu  nav">
            <li className="nav-item"><button className="nav-link" data-bs-target="#description" data-bs-toggle="tab">Description</button></li>
            <li className="nav-item"><button className="nav-link active" data-bs-target="#reviews" data-bs-toggle="tab">Reviews</button></li>
            <li className="nav-item"><button className="nav-link" data-bs-target="#information" data-bs-toggle="tab">Information</button></li>
            <li className="nav-item"><button className="nav-link" data-bs-target="#tags" data-bs-toggle="tab">Tags</button></li>
          </ul>
        </div>
        <div className="col-md-9 col-12">
          {/* Tab panes */}
          <div className="tab-content">
            <div className="tab-pane" id="description">
              <div className="pro-tab-info pro-description">
                <h3 className="tab-title title-border mb-30">dummy Product name</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer accumsan egestas elese ifend. Phasellus a felis at est bibendum feugiat ut eget eni Praesent et messages in con sectetur posuere dolor non.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer accumsan egestas elese ifend. Phasellus a felis at est bibendum feugiat ut eget eni Praesent et messages in con sectetur posuere dolor non.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer accumsan egestas elese ifend. Phasellus a felis at est bibendum feugiat ut eget eni Praesent et messages in con sectetur posuere dolor non.</p>
              </div>
            </div>
            <div className="tab-pane active" id="reviews">
              <div className="pro-tab-info pro-reviews">
                <div className="customer-review mb-60">
                  <h3 className="tab-title title-border mb-30">Customer review</h3>
                  <ul className="product-comments clearfix">
                    <li className="mb-30">
                      <div className="pro-reviewer">
                        <img src="img/reviewer/1.webp" alt />
                      </div>
                      <div className="pro-reviewer-comment">
                        <div className="fix">
                          <div className="floatleft mbl-center">
                            <h5 className="text-uppercase mb-0"><strong>Gerald Barnes</strong></h5>
                            <p className="reply-date">27 Jun, 2022 at 2:30pm</p>
                          </div>
                          <div className="comment-reply floatright">
                            <a href="#"><i className="zmdi zmdi-mail-reply" /></a>
                            <a href="#"><i className="zmdi zmdi-close" /></a>
                          </div>
                        </div>
                        <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer accumsan egestas elese ifend. Phasellus a felis at est bibendum feugiat ut eget eni Praesent et messages in con sectetur posuere dolor non.</p>
                      </div>
                    </li>
                    <li className="threaded-comments">
                      <div className="pro-reviewer">
                        <img src="img/reviewer/2.webp" alt />
                      </div>
                      <div className="pro-reviewer-comment">
                        <div className="fix">
                          <div className="floatleft mbl-center">
                            <h5 className="text-uppercase mb-0"><strong>Gerald Barnes</strong></h5>
                            <p className="reply-date">27 Jun, 2022 at 2:30pm</p>
                          </div>
                          <div className="comment-reply floatright">
                            <a href="#"><i className="zmdi zmdi-mail-reply" /></a>
                            <a href="#"><i className="zmdi zmdi-close" /></a>
                          </div>
                        </div>
                        <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer accumsan egestas elese ifend. Phasellus a felis at est bibendum feugiat ut eget eni Praesent et messages in con sectetur posuere dolor non.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="leave-review">
                  <h3 className="tab-title title-border mb-30">Leave your reviw</h3>
                  <div className="your-rating mb-30">
                    <p className="mb-10"><strong>Your Rating</strong></p>
                    <span>
                      <a href="#"><i className="zmdi zmdi-star-outline" /></a>
                    </span>
                    <span className="separator">|</span>
                    <span>
                      <a href="#"><i className="zmdi zmdi-star-outline" /></a>
                      <a href="#"><i className="zmdi zmdi-star-outline" /></a>
                    </span>
                    <span className="separator">|</span>
                    <span>
                      <a href="#"><i className="zmdi zmdi-star-outline" /></a>
                      <a href="#"><i className="zmdi zmdi-star-outline" /></a>
                      <a href="#"><i className="zmdi zmdi-star-outline" /></a>
                    </span>
                    <span className="separator">|</span>
                    <span>
                      <a href="#"><i className="zmdi zmdi-star-outline" /></a>
                      <a href="#"><i className="zmdi zmdi-star-outline" /></a>
                      <a href="#"><i className="zmdi zmdi-star-outline" /></a>
                      <a href="#"><i className="zmdi zmdi-star-outline" /></a>
                    </span>
                    <span className="separator">|</span>
                    <span>
                      <a href="#"><i className="zmdi zmdi-star-outline" /></a>
                      <a href="#"><i className="zmdi zmdi-star-outline" /></a>
                      <a href="#"><i className="zmdi zmdi-star-outline" /></a>
                      <a href="#"><i className="zmdi zmdi-star-outline" /></a>
                      <a href="#"><i className="zmdi zmdi-star-outline" /></a>
                    </span>
                  </div>
                  <div className="reply-box">
                    <form action="#">
                      <div className="row">
                        <div className="col-md-6">
                          <input type="text" placeholder="Your name here..." name="name" />
                        </div>
                        <div className="col-md-6">
                          <input type="text" placeholder="Subject..." name="name" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <textarea className="custom-textarea" name="message" placeholder="Your review here..." defaultValue={""} />
                          <button type="submit" data-text="submit review" className="button-one submit-button mt-20">submit review</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>		
            </div>
            <div className="tab-pane" id="information">
              <div className="pro-tab-info pro-information">
                <h3 className="tab-title title-border mb-30">Product information</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer accumsan egestas elese ifend. Phasellus a felis at est bibendum feugiat ut eget eni Praesent et messages in con sectetur posuere dolor non.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer accumsan egestas elese ifend. Phasellus a felis at est bibendum feugiat ut eget eni Praesent et messages in con sectetur posuere dolor non.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer accumsan egestas elese ifend. Phasellus a felis at est bibendum feugiat ut eget eni Praesent et messages in con sectetur posuere dolor non.</p>
              </div>											
            </div>
            <div className="tab-pane" id="tags">
              <div className="pro-tab-info pro-information">
                <h3 className="tab-title title-border mb-30">tags</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer accumsan egestas elese ifend. Phasellus a felis at est bibendum feugiat ut eget eni Praesent et messages in con sectetur posuere dolor non.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer accumsan egestas elese ifend. Phasellus a felis at est bibendum feugiat ut eget eni Praesent et messages in con sectetur posuere dolor non.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer accumsan egestas elese ifend. Phasellus a felis at est bibendum feugiat ut eget eni Praesent et messages in con sectetur posuere dolor non.</p>
              </div>											
            </div>
          </div>									
        </div>
      </div>
    </div>
    {/* single-product-tab end */}
  </div>
</div>

  );
}

export default TabContent
import axios from "axios";
import React,{ useEffect,  } from "react";
import { useParams } from "react-router-dom";

const MainSingleNews = () => {
  const [single, setSingleNews] = React.useState([]);
  const baseURL = "http://127.0.0.1:8000";
  const {id}=useParams()
  const getToken = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email: "manhlvph40739@fpt.edu.vn",
        password: "manhlvph40739@fpt.edu.vn",
      });
      const adminToken = response.data.token;
      console.log("token", adminToken);
      return adminToken;
    } catch (error) {
      console.error("error", error);
    }
  };
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const token = await getToken();
        const resdata = await axios.get(
          `http://127.0.0.1:8000/api/admin/AdNews/show/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("res", resdata);
        setSingleNews(Array.isArray(resdata.data.data) ? resdata.data.data : [resdata.data.data]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNews();
  }, [id]);
    return (
        <div className="blog-area blog-2 blog-details-area  pt-80 pb-80">
        <div className="container">
          <div className="blog">
            <div className="row">
              {/* Single-blog start */}
              {single.map((item)=>(
                <div key={item.id} className="col-12">
                <div className="single-blog mb-30">
                  <div className="blog-photo">
                    <a href="#">
                      <img src={`${baseURL}${item.image}`} alt="" />
                    </a>
                    <div className="like-share fix">
                      <a href="#">
                        <i className="zmdi zmdi-account" />
                        <span>Thomas</span>
                      </a>
                      <a href="#">
                        <i className="zmdi zmdi-favorite" />
                        <span>89 Like</span>
                      </a>
                      <a href="#">
                        <i className="zmdi zmdi-comments" />
                        <span>59 Comments</span>
                      </a>
                      <a className="d-none d-sm-inline-block" href="#">
                        <i className="zmdi zmdi-share" />
                        <span>29 Share</span>
                      </a>
                    </div>
                  </div>
                  <div className="blog-info blog-details-info">
                    <h4 className="post-title post-title-2">
                      <a href="#">{item.title}</a>
                    </h4>
                    <p>
                     {item.content}
                    </p>
                    <p>
                    </p>
                    <div className="post-share-tag clearfix mt-40">
                      <div className="post-share floatleft">
                        <span className="text-uppercase">
                          <strong>Share</strong>
                        </span>
                        <a href="#">
                          <i className="zmdi zmdi-facebook" />
                        </a>
                        <a href="#">
                          <i className="zmdi zmdi-twitter" />
                        </a>
                        <a href="#">
                          <i className="zmdi zmdi-linkedin" />
                        </a>
                        <a href="#">
                          <i className="zmdi zmdi-vimeo" />
                        </a>
                        <a href="#">
                          <i className="zmdi zmdi-dribbble" />
                        </a>
                        <a href="#">
                          <i className="zmdi zmdi-instagram" />
                        </a>
                      </div>
                      <div className="post-share post-tag floatright">
                        <span className="text-uppercase">
                          <strong>tags</strong>
                        </span>
                        <a href="#">Shirt</a>
                        <a href="#">Bag</a>
                        <a href="#">Accessories</a>
                        <a href="#">Pant</a>
                      </div>
                    </div>
                    <div className="pro-reviews mt-60">
                      <div className="customer-review mb-60">
                        <h3 className="tab-title title-border mb-30">
                          Customer comments
                        </h3>
                        <ul className="product-comments clearfix">
                          <li className="mb-30">
                            <div className="pro-reviewer">
                              <img src="https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2018%2F07%2Ftinker-hatfield-air-jordan-15-worst-design-0.jpg?q=90&w=1400&cbr=1&fit=max" alt="" />
                            </div>
                            <div className="pro-reviewer-comment">
                              <div className="fix">
                                <div className="floatleft mbl-center">
                                  <h5 className="text-uppercase mb-0">
                                    <strong>Gerald Barnes</strong>
                                  </h5>
                                  <p className="reply-date">27 Jun, 2022 at 2:30pm</p>
                                </div>
                                <div className="comment-reply floatright">
                                  <a href="#">
                                    <i className="zmdi zmdi-mail-reply" />
                                  </a>
                                  <a href="#">
                                    <i className="zmdi zmdi-close" />
                                  </a>
                                </div>
                              </div>
                              <p className="mb-0">
                                Lorem ipsum dolor sit amet, consectetur adipiscing
                                elit. Integer accumsan egestas elese ifend. Phasellus
                                a felis at est bibendum feugiat ut eget eni Praesent
                                et messages in con sectetur posuere dolor non.
                              </p>
                            </div>
                          </li>
                          <li className="threaded-comments">
                            <div className="pro-reviewer">
                              <img src="https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2018%2F07%2Ftinker-hatfield-air-jordan-15-worst-design-0.jpg?q=90&w=1400&cbr=1&fit=max" alt="" />
                            </div>
                            <div className="pro-reviewer-comment">
                              <div className="fix">
                                <div className="floatleft mbl-center">
                                  <h5 className="text-uppercase mb-0">
                                    <strong>Gerald Barnes</strong>
                                  </h5>
                                  <p className="reply-date">27 Jun, 2022 at 2:30pm</p>
                                </div>
                                <div className="comment-reply floatright">
                                  <a href="#">
                                    <i className="zmdi zmdi-mail-reply" />
                                  </a>
                                  <a href="#">
                                    <i className="zmdi zmdi-close" />
                                  </a>
                                </div>
                              </div>
                              <p className="mb-0">
                                Lorem ipsum dolor sit amet, consectetur adipiscing
                                elit. Integer accumsan egestas elese ifend. Phasellus
                                a felis at est bibendum feugiat ut eget eni Praesent
                                et messages in con sectetur posuere dolor non.
                              </p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="leave-review">
                        <h3 className="tab-title title-border mb-30">
                          Leave your reviw
                        </h3>
                        <div className="reply-box">
                          <form action="#">
                            <div className="row">
                              <div className="col-md-6 col-12">
                                <input
                                  type="text"
                                  placeholder="Your name here..."
                                  name="name"
                                />
                              </div>
                              <div className="col-md-6 col-12">
                                <input
                                  type="text"
                                  placeholder="Your email here..."
                                  name="email"
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12">
                                <textarea
                                  className="custom-textarea"
                                  name="message"
                                  placeholder="Your review here..."
                                  defaultValue={""}
                                />
                                <button
                                  type="submit"
                                  data-text="submit review"
                                  className="button-one submit-button mt-20"
                                >
                                  submit review
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              ))}
              
            </div>
          </div>
        </div>
      </div>
      
    );
  };
  
  export default MainSingleNews;
  
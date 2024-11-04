import axios from "axios";
import React, { useEffect } from "react";

const MainNews = () => {
  const [news, setNews] = React.useState([]);
  const baseURL = "http://127.0.0.1:8000";
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
          "http://127.0.0.1:8000/api/admin/AdNews",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("res", resdata);
        setNews(resdata.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNews();
  }, []);
  return (
    <div className="blog-area blog-2   ">
      <div className="container">
        <div className="blog">
          <div className="row">
            {/* Single-blog start */}
            {news.map((item) => (
              <div key={item.id} className="col-lg-4 col-md-6 col-12">
                <div className="single-blog mb-30">
                  <div className="blog-photo">  
                      <a href={`news/${item.id}`}>
                        <img
                          src={`${baseURL}${item.image}`}
                          alt={item.title}
                        />
                      </a>
                    <div className="like-share text-center fix">
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
                  </div>
                  <div className="blog-info">
                    <div className="post-meta fix">
                      <div className="post-year floatleft">
                        <h4 className="post-title">
                          <a href="#" tabIndex={0}>
                            {item.title}
                          </a>
                        </h4>
                      </div>
                    </div>
                    <p>
                      {item.author}
                    </p>
                    <a href="#" className="button-2 text-dark-red">
                      Read more...
                    </a>
                  </div>
                </div>
              </div>
            ))}

            {/* Single-blog end */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNews;

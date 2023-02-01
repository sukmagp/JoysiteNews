import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Col, Container, Nav, Navbar } from "react-bootstrap";
import { Circles } from "react-loader-spinner";
import { useState } from "react";
import { useEffect } from "react";
import "./Styling.scss";

export const News = () => {
  const [search, setSearch] = useState();
  const [news, setNews] = useState([]);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    // other code
    getNews();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getNews() {
    setLoading((loading = true));
    const API_URL = `https://newsapi.org/v2/everything?q=${search}&sortBy=publishedAt&apiKey=9e43a771c30c4b81aa1d0c1f5aaba310`;
    const news = fetch(API_URL);
    news
      .then(function (res) {
        return res.json();
      })
      .then((res) => {
        setNews(res.articles || []);
        setLoading((loading = false));
      })
      .catch((err) => {});
  }

  return (
    <div className="body">
      {/* <!--========== Navbar ==========--> */}
      <Navbar bg="dark" variant="dark" className="nav-bar">
        <Container>
          <Navbar.Brand href="#home" className="text-brand">
            <img
              alt=""
              src="/logoQ.png"
              width="100"
              height="68"
              className="brands"
            />{" "}
            Joysite News
          </Navbar.Brand>
          <Nav className="ml-auto nav-text">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
            <Nav.Link href="#about">About Us</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {/* <!--========== Form Serach ==========--> */}
      <main id="home">
        <section className="py-5 container">
          <div className="row">
            <div className="col-lg-6 col-md-8 mx-auto">
              <form className="d-flex form-search">
                <input
                  className="form-control me-2 search-input"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="search-button"
                  type="button"
                  onClick={getNews}
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </section>
        {/* <!--========== Content ==========--> */}
        <div className="album py-5">
          <div className="container cards">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {loading ? (
                <Circles color="#ff8000" />
              ) : (
                news.map((item, index) => (
                  <div className="col" key={index}>
                    <Col className="cards">
                      <Card style={{ width: "22rem" }}>
                        <Card.Img
                          style={{ maxHeight: "200px" }}
                          variant="top"
                          src={item.urlToImage}
                        />
                        <Card.Body>
                          <Card.Title>{item.title}</Card.Title>
                          <Card.Text className="card-date mb-2 text-muted">
                            {item.publishedAt}
                          </Card.Text>
                          <Card.Text>{item.description}</Card.Text>
                          <Button href={item.url} className="read-news">
                            Read More...
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
      {/* <!--========== Footer ==========--> */}
      <footer className="footer">
        <p className="footer__copy">&#169; sukmagp. All right reserved</p>
      </footer>
    </div>
  );
};

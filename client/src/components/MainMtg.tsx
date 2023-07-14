import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../review.css';

type ReviewsData = {
  review: string;
  name: string;
  date: string;
};

class MainMtg extends Component {
  state = {
    reviews: {},
    currentPage: 1
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await fetch('data.json', { mode: 'no-cors' });
      const data = await response.json();
      this.setState({ reviews: data });
    } catch (error) {
      console.error(error);
    }
  };

  setCurrentPage = (pageNumber: number) => {
    this.setState({ currentPage: pageNumber });
  };

  render() {
    const { reviews, currentPage } = this.state;
    const myLang = this.props.language;
    const dataReviews = reviews[myLang];

    const perPage = 10;

    if (Object.keys(reviews).length !== 0 && dataReviews) {
      const indexOfLastReview = currentPage * perPage;
      const indexOfFirstReview = indexOfLastReview - perPage;
      const currentReviews = Object.keys(dataReviews).slice(indexOfFirstReview, indexOfLastReview);

      const totalPages = Math.ceil(Object.keys(dataReviews).length / perPage);
      const pageNumbers = [];

      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }

      return (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            minHeight: '100vh',
            background: '#d5efff',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              // background: '#d5efff',
            }}
          >
            {currentReviews.map((el, index) => (
              <div
                className="review"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderLeft: '1px solid black',
                  width: '250px',
                  height: '300px',
                  margin: '20px 0 40px 0',
                  padding: '20px',
                }}
                key={index} // Уникальный ключ для каждого элемента
              >
                <div className="review-text">{dataReviews[el].review}</div>
                <div className="review-name">{dataReviews[el].name}</div>
                <div className="review-date">{dataReviews[el].date}</div>
              </div>
            ))}
          </div>
          <div
            style={{
              position: 'fixed',
              bottom: '10px',
            }}
          >
            {pageNumbers.map((pageNumber) => (
              <button
                className="pagination"
                type="button"
                key={pageNumber}
                onClick={() => this.setCurrentPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        </div>
      );
    }

    return null;
  }
}

const mapStateToProps = (state: { language: { language: string } }) => ({
  language: state.language.language,
});

export default connect(mapStateToProps)(MainMtg);
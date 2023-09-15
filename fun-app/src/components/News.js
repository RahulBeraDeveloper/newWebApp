import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import WeatherApp from './WeatherApp';

function News(props) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - ReportRover`;
    updateNews();
  }, [props.category]);

  const capitalizeFirstLetter = (str) => {
    if (typeof str !== 'string' || str.length === 0) {
      return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const updateNews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=cbcd008b80134d36a3f53d71858e6da1&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    try {
      let data = await fetch(url);
      let parsedData = await data.json();

      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
    }
  }

  const handlePrevHandler = async () => {
    setPage(page - 1);
    updateNews();
  };

  const handleNextHandler = async () => {
    setPage(page + 1);
    updateNews();
  };

  return (
    <div className="container my-3">
      <h1 className='text-center' style={{ margin: '40px 0px' }}>
        ReportRover - Top {capitalizeFirstLetter(props.category)}
        <WeatherApp />
      </h1>

      {loading ? <Spinner /> : (
        <div className='row'>
          {articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <NewsItem
                title={element.title}
                description={element.description}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
                author={element.author}
                date={element.publishedAt}
                source={element.source.name}
              />
            </div>
          ))}
        </div>
      )}
      <div className='container d-flex justify-content-between'>
        <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevHandler}>&larr; Previous</button>
        <button disabled={(page + 1 > Math.ceil(totalResults / props.pageSize))} type="button" className="btn btn-dark" onClick={handleNextHandler}> Next &rarr;</button>
      </div>
    </div>
  );
}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;

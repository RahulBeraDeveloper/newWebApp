import React from 'react';

const NewsItem = (props) => {
  const { title, description, imageUrl, newsUrl, author, date, source } = props;

  return (
    <div className='my-3'>
      <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ zIndex: 1, left: '84%' }}>
          {source}
        </span>
        <img
          src={!imageUrl ? "https://overclockers.ru/st/legacy/blog/428111/416593_O.jpg" : imageUrl}
          className='card-img-top'
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5> {/* Fixed the closing tag for h5 */}
          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small className="text-muted"> By {author ? author : "unknown"} on {new Date(date).toGMTString()}</small>
          </p>
          <a rel="noopener noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">
            Read more
          </a>
        </div>
      </div>
    </div>
  );
}

export default NewsItem;

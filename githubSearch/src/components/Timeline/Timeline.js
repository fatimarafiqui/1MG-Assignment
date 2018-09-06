import React from 'react';
import { Timeline } from 'antd';
import './Timeline.css';

const TimelineItem = (data, isOrderReversed) => {
  if(data) {
    const { sha, author } = data;
    const { login, avatar_url, html_url } = author;
    return (
      <Timeline.Item color='blue' key={ sha }>
        <div className={`card ${isOrderReversed ? 'reversed' : '' }`}>
          <div className='avatar'>
            <img src={ avatar_url } alt={ login } />
          </div>
          <div className='card-content'>
            <div className='card-text user-name'>
              { login }
            </div>
            <div className='card-text'>
              <b>SHA:</b> { sha }
            </div>
            <div className='card-text'>
              <a href={ html_url } target='_blank'>Github Profile</a>
            </div>
          </div>
        </div>
      </Timeline.Item>
    );
  }
  return null;
}

const TimelineComponent = (props) => {
  const { data } = props;
  return (
    <div className='timeline-container'>
      <Timeline mode='alternate'>
      {data.map((item, i) => {
        const isOrderReversed = i%2;
        return (
          TimelineItem(item, isOrderReversed)
        );
      })}
      </Timeline>
    </div>
  );
}

export default TimelineComponent;
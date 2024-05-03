import React from 'react';
import FeedListItem from './FeedListItem';

interface FeedListProps {
    feedData: Array<{
        id: string;
        brand: {
            name: string;
            logo: string;
        };
        brandName: string;
        banner_image: string;
        feed_title: string;
    }>;
    onFeedClick: (feed: any) => void;
}

const FeedList: React.FC<FeedListProps> = ({ feedData, onFeedClick }) => {
  document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("scroll", function (e) {
      let documentHeight = document.body.scrollHeight;
      let currentScroll = window.scrollY + window.innerHeight;

      let modifier = 200;
      if (currentScroll + modifier > documentHeight) {
        console.log("You are at the bottom!");
      }
    });
  });

  return (
    <div className="feed-list">
      {feedData.map((feed) => (
        <div key={feed.id}>
          <FeedListItem feed={feed} onClick={() => onFeedClick(feed)} />
        </div>
      ))}
    </div>
  );
};

export default FeedList;

import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import FeedList from './components/FeedList/FeedList';
import FeedDetailsModal from './components/FeedDetails/FeedDetailsModal';
import { fetchFeed, fetchComments } from './services/api';

function App() {
    const [feedData, setFeedData] = useState<any[]>([]);
    const [selectedFeed, setSelectedFeed] = useState<any | null>(null);
    const [comments, setComments] = useState<any[]>([]);
    const [page, setPage] = useState(0);

    const getFeedData = useCallback(async () => {
        try {
            const data = await fetchFeed(page + 1);
            setFeedData(prevData => (page === 0 ? data : [...prevData, ...data]));
        } catch (error) {
            console.error('Error fetching feed data:', error);
        }
    }, [page]);

    const getComments = useCallback(async (briefRef: string) => {
        try {
            const data = await fetchComments(briefRef);
            setComments(data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    }, []);

    useEffect(() => {
        getFeedData();
    }, [getFeedData]);

    const handleFeedClick = useCallback((feed: any) => {
        setSelectedFeed(feed);
        getComments(feed.briefref);
    }, [getComments]);

    const handleCloseModal = useCallback(() => {
        setSelectedFeed(null);
        setComments([]);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop ===
                document.documentElement.offsetHeight
            ) {
                setPage(prevPage => prevPage + 1);
            }
        };

        const debouncedHandleScroll = debounce(handleScroll, 200);

        window.addEventListener('scroll', debouncedHandleScroll);

        return () => {
            window.removeEventListener('scroll', debouncedHandleScroll);
        };
    }, []);

    const debounce = (func: Function, delay: number) => {
        let timer: NodeJS.Timeout;
        return (...args: any[]) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    return (
        <div className="App">
            <FeedList feedData={feedData} onFeedClick={handleFeedClick} />
            {selectedFeed && (
                <FeedDetailsModal feed={selectedFeed} comments={comments} onClose={handleCloseModal} />
            )}
        </div>
    );
}

export default App;

import React from 'react';
import CommentItem from './CommentItem';

interface Comment {
    avatar: string;
    name: string;
    comment: string;
    id: string; // Assuming there's a unique identifier for each comment
}

interface CommentsListProps {
    comments: Comment[];
}

const CommentsList: React.FC<CommentsListProps> = ({ comments }) => {
    return (
        <div className="comments-list">
            {comments.map(comment => (
                <CommentItem key={comment.id} comment={comment} />
            ))}
        </div>
    );
};

export default CommentsList;

import React from 'react';

export interface CommentItemProps {
    comment: {
        avatar: string;
        name: string;
        comment: string;
    };
}

const CommentItem: React.FC<CommentItemProps> = ({ comment: { avatar, name, comment } }) => {
    return (
        <div className="comment">
            <img src={avatar} alt={name} />
            <div>
                <p>{name}</p>
                <p>{comment}</p>
            </div>
        </div>
    );
};

export default CommentItem;

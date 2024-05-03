import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Typography, IconButton, CardMedia, Box } from '@mui/material';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar } from '@mui/material';
import { formatDate } from '../../utils/dateFormat';

interface FeedDetailsModalProps {
    feed?: {
        ad_1_image: string;
        ad_2_image: string;
        brand: {
            name: string;
            logo: string;
        };
        starts_on: Date;
        banner_text: string;
        description: string;
    };
    comments?: {
        user: {
            name: string;
            avatar: string;
        };
        comment: string;
        submitted_on: Date;
    }[];
    onClose: () => void;
}

const FeedDetailsModal: React.FC<FeedDetailsModalProps> = ({ feed, comments, onClose }) => {
    const [currentItemIndex, setCurrentItemIndex] = useState(0);

    const handleScroll = (direction: 'up' | 'down') => {
        setCurrentItemIndex((prevIndex) => {
            if (direction === 'up' && prevIndex > 0) {
                return prevIndex - 1;
            } else if (direction === 'down' && prevIndex < 1) {
                return prevIndex + 1;
            }
            return prevIndex;
        });
    };

    return (
        <Dialog open={true} onClose={onClose} maxWidth="xl" fullWidth sx={{ height: '100%' }}>
            <DialogTitle sx={{ position: 'absolute', zIndex: 9, padding: '8px 12px' }}>
                <IconButton sx={{ color: '#fff', backgroundColor: '#0b0be3' }} onClick={onClose}>
                    <CloseIcon sx={{fontSize: "14px"}}/>
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ padding: 0 }}>
                <Box display="flex" sx={{ height: '100%' }}>
                    <Box flex={1} pr={1} sx={{ backgroundColor: '#000', position: 'relative' }}>
                        <Box className="icon-slide" position="absolute" top={'40%'} right={0} sx={{ opacity: currentItemIndex === 0 ? '0.4' : '1' }}>
                            <IconButton onClick={() => handleScroll("up")} sx={{ backgroundColor: '#0b0be3', color: '#fff', }}>
                                <ExpandLessOutlinedIcon sx={{fontSize: "14px"}} />
                            </IconButton>
                        </Box>
                        <CardMedia
                            component="img"
                            src={currentItemIndex === 0 ? feed?.ad_1_image : feed?.ad_2_image}
                            alt="Feed Image"
                            className='card-media'
                            sx={{ width: "50%", height: "100%", margin: '0 auto', objectFit: 'contain', objectPosition: 'center' }}
                        />
                        <Box className="icon-slide" position="absolute" bottom={'40%'} right={0} sx={{ opacity: currentItemIndex !== 0 ? '0.4' : '1' }}>
                            <IconButton onClick={() => handleScroll("down")} sx={{ backgroundColor: '#0b0be3', color: '#fff', }}>
                                <KeyboardArrowDownOutlinedIcon sx={{fontSize: "14px"}} />
                            </IconButton>
                        </Box>
                    </Box>
                    <Box pl={2} pr={2} className="feed-details" sx={{ height: '100%', overflow: 'auto' }}>
                        <Box display="flex" flexDirection="column" pt={2}>
                            <Box display="flex" alignItems="start" sx={{ borderBottom: "1px solid #ccc" }}>
                                <Avatar alt={feed?.brand.name} src={feed?.brand?.logo} sx={{ width: 24, height: 24, mr: 1 }} />
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: '-5px', fontSize: '16px' }}>{feed?.brand.name}</Typography>
                                    <Typography variant="subtitle1" sx={{fontSize: '14px', paddingBottom: '5px'}}>{formatDate(feed?.starts_on)}</Typography>
                                </Box>
                            </Box>

                            <Box mb={1} sx={{ borderBottom: "1px solid #ccc", padding: '10px 0' }}>
                                <Typography variant="h6" fontWeight="bold" sx={{fontSize: '17px'}}>{feed?.banner_text}</Typography>
                            </Box>

                            <Box display="flex" alignItems="start" sx={{ borderBottom: "1px solid #ccc", marginBottom: '8px', paddingBottom: '8px' }}>
                                <Avatar alt={feed?.brand.name} src={feed?.brand?.logo} sx={{ width: 24, height: 24, mr: 1 }} />
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: '-5px', fontSize: '14px' }}>{feed?.brand.name}</Typography>
                                    <Typography variant="subtitle1" sx={{ fontSize: '12px', lineHeight: '18px' }}>{feed?.description}</Typography>
                                </Box>
                            </Box>

                            <Box mt="auto" mb={'10px'}>
                                {comments?.map((userComment, index) => (
                                    <Box key={index} display="flex" alignItems="start" mb={'10px'}>
                                        <Avatar alt={userComment.user.name} src={userComment.user.avatar} sx={{ width: 24, height: 24, mr: 1 }} />
                                        <Box sx={{ fontWeight: 'bold', marginTop: '-5px', fontSize: '14px' }}>
                                            <Typography variant="subtitle1" sx={{ fontSize: '12px', fontWeight: 'bold' }}>{userComment.user.name}</Typography>
                                            <Typography variant="body1" sx={{ fontSize: '12px' }}>{userComment.comment}</Typography>
                                            <Typography variant="subtitle1" sx={{ fontSize: '11px', lineHeight: '18px' }}>{formatDate(userComment.submitted_on)}</Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default FeedDetailsModal;

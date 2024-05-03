import React from "react";
import {
  Card,
  Avatar,
  Box,
  CardContent,
  Typography,
} from "@mui/material";

interface FeedItemProps {
  feed: {
    id: string;
    brand: {
      name: string;
      logo: string;
    };
    brandName: string;
    banner_image: string;
    feed_title: string;
  };
  onClick: () => void;
}

const FeedListItem: React.FC<FeedItemProps> = ({ feed, onClick }) => {
  return (
    <Card sx={{ width: "440px", margin: "15px auto", border: "1px solid #f1f1f1", borderRadius: "4px" }}>
      <CardContent sx={{ padding: "16px 16px 16px !important" }}>
        <div className="feed-item" onClick={onClick} style={{ textAlign: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 15px" }}>
            <Box sx={{ display: "flex", alignItems: "center", }}>
              <Avatar alt="Brand Logo" src={feed?.brand?.logo} sx={{ width: 24, height: 24, mr: 1,  }} />
              <span style={{ fontWeight: '500', fontSize: '15px' }}>{feed.brand.name}</span>
            </Box>
            <Typography
              component="span"
              sx={{ color: "#0b0be3", fontWeight: "bold", cursor: "pointer", fontSize: "14px" }}
              onClick={() => console.log("Join Brief Now")}
            >
              JOIN BRIEF NOW
            </Typography>
          </Box>
          <div style={{ position: "relative", textAlign: "center" }}>
            <img
              src={feed.banner_image}
              alt={feed.brand.name}
              style={{
                width: "100%",
                height: "415px",
                objectFit: "cover",
                objectPosition: "bottom",
                margin: "10px auto 0",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                position: "absolute",
                bottom: '10px',
                color: "#fff",
                fontSize: '16px',
                width: '60%',
                fontWeight: 'bold',
                textAlign: 'left',
                left: "2rem",
                transform: "translateY(-32%)",
              }}
            >
              {feed.feed_title}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedListItem;

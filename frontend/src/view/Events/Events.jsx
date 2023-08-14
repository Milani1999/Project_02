import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import NewsCard from "../../components/NewsCard/NewsCard";

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  // ...theme.typography.body2,
  // padding: theme.spacing(1),
  // textAlign: 'center',
  // color: theme.palette.text.secondary,
}));

export default function Events() {
  const [newsData, setNewsData] = React.useState([]);

  React.useEffect(() => {
    async function fetchNewsData() {
      try {
        const response = await fetch("/api/news");
        const data = await response.json();
        setNewsData(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchNewsData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <h1 className="h1-heading">News and Events</h1>
      <Grid container spacing={2}>
        {newsData.map((news, index) => (
          <Grid item xs={6} md={4} lg={3} key={index}>
            <Item>
              <NewsCard
                ImgSrc={news.image}
                ImgAlt={news.title}
                title={news.title}
                description={
                  news.content.length > 200
                    ? `${news.content.substring(0, 177)}...`
                    : news.content
                }
                btnText="Read More"
                link={`news/${news.id}`}
              />
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

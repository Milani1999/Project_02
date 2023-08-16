import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import NewsCard from "../../components/NewsCard/NewsCard";

const Item = styled(Paper)(({ theme }) => ({
  // ... (your Paper styling)
}));

export default function Events() {
  const [newsData, setNewsData] = React.useState([]);
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = React.useState(1);

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

  const totalPages = Math.ceil(newsData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, newsData.length);
  const visibleNews = newsData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <h1 className="h1-heading">News and Events</h1>
      <Grid container spacing={2}>
        {visibleNews.map((news, index) => (
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
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            style={{
              marginRight: "5px",
              fontWeight: currentPage === index + 1 ? "bold" : "normal",
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </Box>
  );
}

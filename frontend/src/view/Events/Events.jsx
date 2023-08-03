import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import NewsCard from "../../components/NewsCard/NewsCard";
import img01 from "../../assets/ImageResources/im01.jpg";
import img02 from "../../assets/ImageResources/im02.jpg";
import img03 from "../../assets/ImageResources/im03.jpg";
import img04 from "../../assets/ImageResources/im04.jpg";0

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  // ...theme.typography.body2,
  // padding: theme.spacing(1),
  // textAlign: 'center',
  // color: theme.palette.text.secondary,
}));

export default function Events() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <h1 className='h1-heading' style={{fontFamily: 'Roboto'}}>News And Events</h1>
      <Grid container spacing={2}>
        <Grid item xs={6} md={4} lg={3}>
          <Item>
            <NewsCard 
            ImgSrc={img01}
            ImgAlt="English Day Celebration"
            title="English Day Celebration"
            description="English Day Celebration happened on the 10th of September 2023, at the Zarina Hall Universal International School."
            btnText="Learn More"
            link="EngDay"
            /></Item>
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <Item><NewsCard 
          ImgSrc={img01}
          ImgAlt="Inter-College Sports Competition"
          title="College Sports"
          description="Inter-College Sports Competition happened on the 10th of September 2023, at the Balangoda Municipal Grounds."
          btnText="Learn More"
          link="SportsDay"
          /></Item>
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <Item><NewsCard 
          ImgSrc={img03}
          ImgAlt="AISL Speech Contest"
          title="AISL Speech"
          description="Inter-College Sports Competition happened on the 10th of September 2023, at the Balangoda Municipal Grounds."
          btnText="Learn More"
          link="AISL Speech Contest"
          /></Item>
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <Item><NewsCard 
          ImgSrc={img04}
          ImgAlt="Water Day"
          title="World Water Day"
          description="Inter-College Sports Competition happened on the 10th of September 2023, at the Balangoda Municipal Grounds."
          btnText="Read More"
          link="Water Day"
          /></Item>
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <Item><NewsCard 
          ImgSrc={img01}
          ImgAlt="World Rose Day"
          title="Rose Day"
          description="The primary, pre-primary students of Universal International Schools celebrated the Rose Day on the 2nd of February 2018."
          btnText="Read More"
          link="RoseDay"
          /></Item>
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <Item><NewsCard 
          ImgSrc={img02}
          ImgAlt="End Examination"
          title="End Examination"
          description="The end examination of Universal International School was conducted on the 20th of August, with the staff and students."
          btnText="Read More"
          link="EndExam"
          /></Item>
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <Item><NewsCard 
          ImgSrc={img02}
          ImgAlt="End Examination"
          title="End Examination"
          description="The end examination of Universal International School was conducted on the 20th of August, with the staff and students."
          btnText="Read More"
          link="EndExam"
          /></Item>
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <Item><NewsCard 
          ImgSrc={img02}
          ImgAlt="End Examination"
          title="End Examination"
          description="The end examination of Universal International School was conducted on the 20th of August, with the staff and students."
          btnText="Read More"
          link="EndExam"
          /></Item>
        </Grid>
      </Grid>
    </Box>
  );
}


<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,700;1,300;1,500&display=swap');
</style>
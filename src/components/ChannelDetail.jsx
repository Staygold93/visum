import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { Videos, ChannelCard } from './';
import { fetchFromAPI } from './utils/fetchFromAPI';



const ChannelDetail = () => {
  const [channelDetail, setchannelDetail] = useState(null)

  const [videos, setvideos] = useState([])

  const { id } = useParams();
  console.log(channelDetail)

  useEffect(() => {
    fetchFromAPI(`channels?part="snippet&id=${id}`)
      .then((data) => setchannelDetail(data?.items[0]))

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
      .then((data) => setvideos(data?.items));

  }, [id])

  return (
    <Box minHeight='95vh'>
      <Box>
        <div style={{
          height: '300px',
          background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(203,203,199,1) 52%, rgba(109,238,150,1) 92%)',
          zIndex: 10,
        }} />

        <ChannelCard channelDetail={channelDetail} marginTop="-110px" />

      </Box>
      <Box p={2} display="flex">
      <Box sx={{ mr: { sm: '100px' } }}/>
        <Videos videos={videos} />

    </Box>
  </Box>
  );
}

export default ChannelDetail
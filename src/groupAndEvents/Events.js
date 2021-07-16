import React, { useState, useEffect } from 'react';
import axios from 'axios'
import EventDetailCard from './EventDetailCard';
import EventCard from './EventCard'
import { VStack, Feature, Stack, StackDivider, Box, Center, Grid, GridItem, Button, ButtonGroup, Text, Heading, SimpleGrid, IconButton, Flex, Spacer, Avatar } from "@chakra-ui/react"
import { StarIcon } from '@chakra-ui/icons';


//need to pass as props
let sampleEvents = [{
  date: "Fri July 23 2021 16:30:00 GMT-0500 (Central Daylight Time)", name: "Hack Reactor Graduation", location: "Zoom",
  description: "Bring your friends and family to our virtual graduation! Cap and gown not required.",
  attending: ["a", "b"]
},
{
  date: "Sun Aug 15 2021 11:00:00 GMT-0500 (Central Daylight Time)", name: "No FOMO Brunch", location: "TBD",
  description: "Be financially reckless and grab avocado toast! YOLO. Internet slang from after 2012 and TikTok NOT welcome.",
  attending: ["a", "b", "c", "d", "e", "f"]
},
{
  date: "Sat July 31 2021 14:00:00 GMT-0500 (Central Daylight Time)", name: "Austin Bouldering Project", location: "929 Springdale Rd.",
  description: "Grab a harness and live on the cliff’s edge with friends old and new! SOs welcome. We’ll plan to grab beers at the bar across the street afterwards. Forget the name but reservation under the name Jack!",
  attending: ["a", "b"]
}]

//need to pass as a prop
const sampleUserId = "c";

export default function Events(props) {

  const [events, setEvents] = useState([]);

  const getEvents = (groupId) => {
    const url = 'http://localhost:3001/events';
    const config = {
      params: {
        groupId: groupId,
      }
    };
    axios.get(url, config)
      .then((results) => {
        setEvents(results.data);
        console.log(results.data);
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
  };

  useEffect(() => {
    if (props?.groupId !== undefined) {
      console.log('hello from events')
      getEvents(props.groupId)
    }
  }, [props.groupId])

  function Feature({ title, desc, ...rest }) {
    let groupEvents = sampleEvents.reverse();
    return (
      groupEvents.map((each, i) => {
        return (
          <EventCard userId={props.userId} each={each} />
        )
      })
    )
  }

  return (
    <Box  >
      <Stack>
        <Feature />
      </Stack>
    </Box>
  )
}
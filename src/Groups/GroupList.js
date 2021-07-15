import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { IconButton } from '@chakra-ui/react';
import { TriangleDownIcon } from '@chakra-ui/icons';
import { TriangleUpIcon } from '@chakra-ui/icons';
import GroupItem from './GroupItem';
import AddGroupModal from './AddGroupModal';
import JoinGroupModal from './JoinGroupModal';

const GroupList = (props) => {
  const [groups, setGroups] = useState([]);
  // [{ name: 'Drumline' }, { name: 'DnD' }, { name: 'Foodies' }, { name: 'Green Thumb' }]
  const [displayedGroups, setDisplayedGroups] = useState([]); // default to show three groups
  const [toggleTriangle, setToggleTriangle] = useState(false);

  const getGroups = (userEmail) => {
    const url = 'http://localhost:3001/groups';
    const config = {
      params: {
        userId: props.userId,
      }
    };
    axios.get(url, config)
      .then((result) => {
        setGroups(result.data)
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
  };

  // get group base on groupCode
  const getOneGroup = (groupCode) => {
    const url = 'http://localhost:3001/groups/getOne';
    const config = {
      params: {
        groupCode: groupCode,
      }
    };
    axios.get(url, config)
      .then((result) => {
        props.setCurrentGroup(result.data);
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
  };

  // joinGroups - HTTP PUT Request? HOW TO HANDLE LOGIN ???
  // PUT Request to group & user
  const joinGroup = (userId, groupCode) => {
    const url = 'http://localhost:3001/groups/code';
    const config = {
      params: {
        groupCode: groupCode,
        userId: userId,
      }
    };
    axios.get(url, config)
    .then((result) => {
      // update current Group
      getOneGroup(groupCode);
      //refetch groups
    })
    .catch((err) => {
      console.error('Error: ', err);

    });



  };

  const createGroup = (userId, group) => {
    const url = `http://localhost:3001/groups`;
    axios.post(url, group)
    .then((result) => {
      let newGroup = JSON.parse(result.config.data);
      // props.setCurrentGroup(JSON.parse(result.config.data))
      // call getGroups to get updated listed of groups
      getGroups(props.userId);
      getOneGroup(newGroup.code)
    })
    .catch((err) => {
      console.error('Error: ', err);
    })
  };

  const showMoreGroups = (e) => {
    setDisplayedGroups(groups);
    setToggleTriangle(!toggleTriangle)
  };

  const collapseGroups = (e) => {
    setDisplayedGroups(groups.slice(0, 3));
    setToggleTriangle(!toggleTriangle)
  };

  useEffect(() => {
    setDisplayedGroups(groups.slice(0, 3))
  }, [groups])

  useEffect(() => {
    getGroups(props.userId);
  }, [props.userId]);

  return (
    <>
      <AddGroupModal createGroup={createGroup} userEmail={props.userEmail} userId={props.userId}/>
      <JoinGroupModal joinGroup={joinGroup} userId={props.userId} />
      <GroupItem groups={groups} displayedGroups={displayedGroups} setCurrentGroup={props.setCurrentGroup} />
      {!toggleTriangle ?
        <IconButton
          aria-label="Load more groups"
          variant="ghost"
          icon={<TriangleDownIcon />}
          onClick={showMoreGroups} /> :
        <IconButton
          aria-label="Collapse groups"
          variant="ghost"
          icon={<TriangleUpIcon />}
          onClick={collapseGroups} />}
    </>
  )

};

export default GroupList;

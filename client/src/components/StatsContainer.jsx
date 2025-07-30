import React from 'react';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/StatsContainer';
import StatItem from './StatItem';
import { SlEnvolopeLetter } from "react-icons/sl";
import { FcAcceptDatabase } from "react-icons/fc";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';

export default function StatsContainer() {
  const { stats } = useAppContext();

  const defaultStats = [
    {
      title: 'applied applications',
      count: stats.applied || 0,
      icon: <FaSuitcaseRolling />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'interviews scheduled',
      count: stats.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'jobs rejected',
      count: stats.rejected || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
    {
      title: 'jobs offer',
      count: stats.offer || 0,
      icon: <SlEnvolopeLetter />,
      color: 'blue',
      bcg: '#ffeeee',
    },
    {
      title: 'jobs accepted',
      count: stats.accepted || 0,
      icon: <FcAcceptDatabase />,
      color: 'green',
      bcg: '#ffeeee',
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
    </Wrapper>
  );
}
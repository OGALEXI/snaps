import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchNonUserPosts } from '../../../store/posts';
import ScrollableFeed from 'react-scrollable-feed';
import ScrollCard from './ScrollCard';
import './UserFeed.css'


function UserFeed() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  console.log(posts)

  useEffect(() => {
    dispatch(fetchNonUserPosts());
  }, [dispatch])

  return (
    <div id="scrolly-feed-guy">
      <ScrollableFeed>
        {posts?.map((post) => <ScrollCard post={post}></ScrollCard>)}
      </ScrollableFeed>
      <p>Nothing more.</p>
    </div>
  );
}

export default UserFeed;
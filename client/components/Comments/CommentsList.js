import {
  CommentArea,
} from './styled';
import CommentsItem from './CommentsItem';
import { communityActions } from '../../store/reducers/community';
import { useDispatch } from "react-redux";
import { useEffect } from 'react';
import { useRouter } from "next/router";

const CommentsList = ({ list }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  console.log(list);
  // useEffect(() => {
  //   dispatch(communityActions.loadPostDetailRequest(id));
  // }, [list]);

  return (
    <CommentArea>
      {list &&
        list
          .slice(0)
          .reverse()
          .map((comment) => (
            <CommentsItem key={comment.id} {...comment} />
          ))}
    </CommentArea>
  );
}

export default CommentsList;
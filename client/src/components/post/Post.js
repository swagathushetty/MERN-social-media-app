import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import Spinner from '../layout/spinner'
import PostItem from '../posts/PostItem'
import {getPost} from '../../actions/post'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const Post = ({getPost,post:{post,loading},match}) => {
    useEffect(()=>{
        getPost(match.params.id)
    },[getPost])

    return loading ||post===null ? <Spinner/>:( <Fragment>
        <Link to="/posts" className="btn">back to posts</Link>
    { post && <PostItem post={post} showActions={false}/>}
    { post && <CommentForm postId={post._id} /> }
    <div className="comment">
     {post && post.comments.map((comment)=>{
         return <CommentItem key={comment.id} comment={comment} postId={post._id}/>
     })}
      </div>
    </Fragment>)
    
}


Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps,{ getPost})(Post)
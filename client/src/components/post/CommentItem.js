import React, { Fragment } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import {deleteComment} from '../../actions/post'

const CommentItem = ({auth,postId,comment:{_id,text,name,avatar,user,date},deleteComment}) => {
    return (
        <div className="comments">
            <div className="post bg-white p-1 my-1">
                <div>
                    <Link to={`/profile/${user}`}>
                        <img
                            className="round-img"
                            src={avatar}
                            alt=""
                        />
                        <h4>{name}</h4>
                    </Link>
                </div>
                <div>
                    <p className="my-1">
                        {text}
            </p>
                    <p className="post-date">
                        <Moment format='YYYY/mm/DD'>{date}</Moment>
            </p>
                    { auth && _id && !auth.loading && user === auth.user._id && (
                        <button
                            onClick={() => deleteComment(postId,_id)}
                            type='button'
                            className='btn btn-danger'
                        >
                            <i className='fas fa-times' />
                        </button>
                    )}
                </div>
            </div>
         </div>   
    )
}
        

CommentItem.propTypes = {
    postId:PropTypes.number.isRequired,
    comment:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired,
    deleteComment:PropTypes.func.isRequired,
}

const mapStateToProps=state=>({
    auth:state.props
})

export default connect(mapStateToProps,{deleteComment})(CommentItem)
import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
    constructor(props){
        super(props);
    }

    renderComments(comments){
        if(comments != null){
            let modifyComment = comments.map((comment)=>{
                return(
                    <React.Fragment>
                        <div className = "row">
                            <p>{comment.comment}</p>
                        </div>
                        <div className = "row">
                            <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</p>  
                        </div>
                    </React.Fragment>
                );
                console.log(modifyComment);
            });

            return(
                modifyComment
            );
        }
        else{
            return(
                <div>
                </div>
            );
        }
    }

    render() { 
       const dish = this.props.dish;
       if(!dish){
           return(
               <div>
                </div>
           );
       }
       else{
            return ( 
                <div className = "container">
                    <div className = "row">
                        <div className = "col-sm-12 col-md-5 m-1">
                        <Card>
                            <CardImg width="100%" src = {dish.image} alt = {dish.name}/>
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                        </div>
                        <div className = "col-sm-12 col-md-5 m-1">
                            <h4>Comments</h4>
                            <div>
                                {this.renderComments(dish.comments)}
                            </div>
                        </div>
                    </div>
                </div>
            );
       }
        
    }
}
 
export default DishDetail;
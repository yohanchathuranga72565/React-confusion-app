import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';



    function RenderDish({dish}){
        return(
            <Card>
                <CardImg width="100%" src = {dish.image} alt = {dish.name}/>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }




    function RenderComments({dish}){
        const comments = dish.comments;
        if(comments){
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

    const DishDetail = (props) => { 
       const dish = props.dish;
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
                            <RenderDish dish = {dish}/>
                        </div>
                        <div className = "col-sm-12 col-md-5 m-1">
                            <h4>Comments</h4>
                            <div>
                                <RenderComments dish = {dish}/>
                            </div>
                        </div>
                    </div>
                </div>
            );
       }
        
    }

 
export default DishDetail;
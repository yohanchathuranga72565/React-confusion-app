import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { addComment } from '../redux/ActionCreators';
import { Loading  } from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';


    function RenderDish({dish}){
        return(
            <Card>
                <CardImg width="100%" src = {baseUrl + dish.image} alt = {dish.name}/>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }

    function RenderComments({comments, dishId, postComment}){
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
                <React.Fragment>
                {modifyComment}
                <div className="row">
                    <CommentForm className="my-2"
                        dishId={dishId}
                        postComment={postComment }
                    />
                </div>
                </React.Fragment>
            );
        }
        else{
            return(
                <div>
                </div>
            );
        }
    }

    const DishDetail = ({dish, comments, dishId, postComment, isLoading, errMess}) => { 
        if(isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }

        else if (errMess){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{errMess }</h4>
                    </div>
                </div>
            );
        }
    
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
                        <Breadcrumb>
                            <BreadcrumbItem><Link to ="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className = "row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComments
                                comments={comments} 
                                dishId = {dish.id}
                                postComment = {postComment}
                            />
                            
                        </div>
                    </div>
                </div>
            );
       }
        
    }

    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => (val) && (val.length >= len);

    class CommentForm extends Component {
        constructor(props){
            super(props);
            this.state = {
                isModalOpen: false
            };
    

            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        toggleModal(){
            this.setState({
                isModalOpen: !this.state.isModalOpen,
            });
        }

        handleSubmit(values){
            this.toggleModal();
            this.props.postComment(this.props.dishId, values.rating, values.name, values.comment);
        }


        render() { 
            return (
                <React.Fragment>
                    <Button outline onClick={this.toggleModal}>
                        <span className="fa fa-edit fa-sm"></span> Submit Comment
                    </Button>
                    <Modal isOpen = {this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>
                            <h5>Submit Comment</h5>
                        </ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group mx-2">
                                        <Label htmlFor="rating">
                                            Rating
                                        </Label>
                                    
                                        <Control.select model = ".rating" name = "rating"
                                            className="form-control"
                                        >
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                            <option>6</option>
                                        </Control.select>
                                
                                </Row>
                                <Row className="form-group mx-2">
                                    <Label htmlFor="name">
                                        Your Name
                                    </Label>
                                    <Control.text model=".name" id="name" name="name" className="form-control"
                                    placeholder = "Your Name"
                                    validators = {{ 
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                     }}
                                    />
                                    <Errors 
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{ 
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 16 characters or less'
                                         }}
                                    />
                                </Row>
                                <Row className="form-group mx-2">
                                    <Label htmlFor="comment">
                                        Comment
                                    </Label>
                                    <Control.textarea model=".comment" id="comment" name="comment" className="form-control" rows="6" />
                                </Row>
                                <Row className="form-group mx-2">
                                    <Button type = "submit" color = "primary">
                                        Submit
                                    </Button>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </React.Fragment>
            );
        }
    }

 
export default DishDetail;
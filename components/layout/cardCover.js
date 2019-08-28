import React from 'react'

class CardCover extends React.Component{

    static defaultProps = {
        avatar: "",
        name: "",
        text_head: "",
        text:""
      }

      constructor(props) {
        super(props);
      }

      onSummit = () =>{
        setTimeout(function(){ 
            window.location.href = "/main"
         }, 3000);

      }

    render(){
        return(
            <div className="warp-cover">
                <div className="warp-text">
                    <h1>{this.props.text_head}</h1>
                    <button 
                        type="button" 
                        className="btn"
                        onClick = {this.onSummit}
                    >
                        <h6>{this.props.text}</h6></button>
                </div>
                <div className="cover">
                    <img src={this.props.avatar} alt={this.props.cover}/>
                </div>

            </div>
        )
    }
} 
export default CardCover;
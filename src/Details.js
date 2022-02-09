import { Component } from "react";
import { withRouter } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import Carousel from "./Carousel";
import ThemeContext from "./ThemeContext";


class Detail extends Component {
    constructor(){
        super();

        this.state = {loading:true};
    }

    async componentDidMount(){
        const res = await fetch(
            `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
        );
        const json = await res.json();

        this.setState(
            Object.assign({
                    loading:false
            },
            json.pets[0]
            )
        )

    }
    render(){
        
        if(this.state.loading == true){
            return (
                <h2>Loading . . . . .</h2>
            )
        }

        const {animal, breed, city, state, description, name, images} = this.state;
        return(
            <div className="details">
                <div>
                    <Carousel images={images}/>
                    <h1>{name}</h1>
                    <h2>{`${animal} - ${breed} - ${city}, ${state}`}</h2>
                    <ThemeContext.Consumer>
                        {([theme]) => (
                            <button style={{backgroundColor:theme}}>Adopt {name}</button>
                        )
                        }
                    </ThemeContext.Consumer>
                    
                    <p>{description}</p>
                </div>
            </div>
        )
    }
}
const DetailsWithRouter = withRouter(Detail);
export default function DetailsErrorBoundary(props) {
    return (
      <ErrorBoundary>
        <DetailsWithRouter {...props} />
      </ErrorBoundary>
    );
  }
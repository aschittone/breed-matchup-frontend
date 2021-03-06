import React from 'react'
import { Icon, Input, Image } from 'semantic-ui-react'



class InputForm extends React.Component{


	constructor(props) {
		super(props)

		this.onSubmit=this.onSubmit.bind(this)

		this.state = {
			name: ''
		}
	}

	onSubmit = (event) => {
		this.props.fetchBlogs(this.state.name)
	}

	handleChange = (e) => {
		this.setState({ name: e.target.value})
	}

	render(){
		return (
			<div>
			<Image src='https://cdn.pixabay.com/photo/2014/04/02/14/07/black-306213__340.png' centered size='large'/>
				<div>
				<h1>Enter a Medium Username</h1>
				</div><br></br>
				<div className="InputForm">


			<Input onChange={this.handleChange}
			    icon={<Icon onClick={this.onSubmit} name='search' inverted circular link />}
			    placeholder='Search...'
			 />
			 </div>
			</div>
		)
	}
}



export default InputForm

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import InputForm from './components/InputForm'
// import Layout from './styles/layout'
import HumanTraits from './components/humanTraits'


import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment
} from 'semantic-ui-react'

const FixedMenu = () => (
  <div>
<Menu fixed='top' size='large'>
  <Container>
    <Menu.Item as='a'>Find Your Perfect Match Dog</Menu.Item>
    <Menu.Menu position='right'>
      <Menu.Item className='item'>
        <Button as='a'>Log in</Button>
      </Menu.Item>
      <Menu.Item>
        <Button as='a' primary>Sign Up</Button>
      </Menu.Item>
    </Menu.Menu>
  </Container>
</Menu>

<Segment style={{ padding: '8em 0em' }} vertical>
        <Grid container stackable verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as='h3' style={{ fontSize: '2em' }}>Match your personality to the right dog for you</Header>
              <p style={{ fontSize: '1.33em' }}>
                Our personality-matching algorithm analyzes your writing to correlate the four most relevant traits between you and our database of dog breeds. 
                These traits are: energy, focus, confidence, and independence.
              </p>
              
              <h2>Input Your Writing Sample</h2>
          <InputForm fetchAnalysis={this.fetchAnalysis}/>

       
              <Button size='huge'>Try it Out</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Container text>
          <Header as='h3' style={{ fontSize: '2em' }}>Hear from our customers:</Header>
          <p style={{ fontSize: '1.33em' }}>
            Put some kind of testimonial here?
          </p>
          
        </Container>
      </Segment>
      <Segment inverted vertical style={{ padding: '5em 0em' }}>
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row>
              <Grid.Column width={3}>
                <Header inverted as='h4' content='About' />
                <List link inverted>
                  <List.Item as='a'>Sitemap</List.Item>
                  <List.Item as='a'>Contact Us</List.Item>
                  <List.Item as='a'></List.Item>
                  <List.Item as='a'></List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={7}>
                <Header as='h4' inverted>Footer Header</Header>
                <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
      </div>
)



class App extends Component {

  state ={
    personalityTraits: [],
    dog: []
  }


  //this sends a fetch request to Watson and gets back all of the personality info data
  // personInfo is the entire object, we used data from the big 5
  // energy = activity level
  // confidence = inverse of self-consciousness
  // focus = self-efficacy
  // independence = adventurousness
  fetchAnalysis = (text) => {
    const createParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({userInput: {input: text}})
    }
    fetch('http://localhost:3000/api/v1/get_traits', createParams)
      .then(res => res.json()).then(personInfo => {

      let person = [
        {energy: ((personInfo.tree.children[0].children[0].children[2].children[0].percentage)*100)},
        {confidence: (100-((personInfo.tree.children[0].children[0].children[4].children[4].percentage)*100))},
        {focus: ((personInfo.tree.children[0].children[0].children[1].children[5].percentage)*100)},
        {independence: ((personInfo.tree.children[0].children[0].children[0].children[0].percentage)*100)}
      ]


      // below is the fetch to get the dog breed (it's inside the fetch above)
      const dogParams = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({personInfo: {info: person}})
      }

      fetch('http://localhost:3000/api/v1/get_breed', dogParams)
        .then(res => res.json()).then(dogInfo => {
          let dog = dogInfo

        })

        this.setState({
          personalityTraits: person
        })
        console.log(this.state.personalityTraits)
    })
  }

  render() {
    if (this.state.personalityTraits.length > 1 ) {
      return (
      <div className="App">
        <div className="App-header">
        <FixedMenu/>
          
          <h2>Input your Writing Sample</h2>
        </div>
          <InputForm fetchAnalysis={this.fetchAnalysis}/>
          <HumanTraits person={this.state.personalityTraits}/>
      </div>
    );
    } else {
      return (
      <div className="App">
        <div className="App-header">
        <FixedMenu/>
          
          <h2>Input Your Writing Sample</h2>
        </div>
          <InputForm fetchAnalysis={this.fetchAnalysis}/>
      </div>
    );
    }
  }
}


export default App;

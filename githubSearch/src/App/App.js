import React, { Component } from 'react';
import { Input, Icon, Button, Spin } from 'antd';

import Timeline from 'components/Timeline';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      githubUsername: 'git',
      repoName: 'git',
      tagStart: 'v2.2.0-rc1',
      tagEnd: 'v2.2.0-rc2',
      data: [],
      isLoading: true,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  componentDidMount() {
    this.updateData();
  }

  updateData() {
    const { githubUsername, repoName, tagStart, tagEnd } = this.state;
    const apiEndPoint = `https://api.github.com/repos/${githubUsername}/${repoName}/compare/${tagStart}...${tagEnd}`;
    fetch(apiEndPoint)
      .then(response => response.json())
      .then(data => {
        const parsedData = data.commits.reduce((acc, curr) => {
          if ('author' in curr && curr.author) {
            const { sha, author } = curr;
            acc.push({sha, author});
          }
          return acc;
        }, []);
        console.log(parsedData);
        this.setState({ data: parsedData });
        this.setState({ isLoading: false });
      });
  }

  handleInputChange(e) {
    const target = e.target;
    const state = {};
    state[target.id] = target.value;
    this.setState(state);
  }

  handleFormSubmit(e) {
    this.setState({ isLoading: true });
    this.updateData();
  }

  render() {
    const { githubUsername, repoName, tagStart, tagEnd, data, isLoading } = this.state;
    return (
      <div>
        <header className='header'>
          <div className='logo-container'>
            <Icon className="logo" type="github" theme="outlined" />
          </div>
          <form className='search-form' onSubmit={ this.handleFormSubmit }>
            <div><Input id='githubUsername' addonBefore="Username" value={githubUsername} placeholder="Github Username" onChange={ this.handleInputChange } /></div>
            <div><Input id='repoName' addonBefore="Repository" value={repoName} placeholder="Repository name" onChange={ this.handleInputChange } /></div>
            <div><Input id='tagStart' addonBefore="Starting Tag" value={tagStart} placeholder="Starting tag" onChange={ this.handleInputChange } /></div>
            <div><Input id='tagEnd' addonBefore="End Tag" value={tagEnd} placeholder="End tag" onChange={ this.handleInputChange } /></div>
            <div><Button type="primary" icon="search" onClick={ this.handleFormSubmit }>Search</Button></div>
          </form>
        </header>
        <main>
          <div className="content">
            {isLoading && <Spin size="large" />}
            {!isLoading && <Timeline data={data}/>}
          </div>
        </main>
      </div>
    );
  }
}

export default App;
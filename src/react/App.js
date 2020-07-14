import React from 'react';
import { Typography, Link } from '@material-ui/core';
import AppStepper from './components/stepper/AppStepper';
import { channels } from '../shared/constants';

const { ipcRenderer } = window;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appName: '',
      appVersion: ''
    }
  }

  componentDidMount() {
    ipcRenderer.send(channels.APP_INFO);

    ipcRenderer.on(channels.APP_INFO, (event, arg) => {
      ipcRenderer.removeAllListeners(channels.APP_INFO);
      const { appName, appVersion } = arg;
      this.setState({ appName, appVersion });
    })
  }

  render() {
    const { appName, appVersion } = this.state;
    return (
      <div className="app">
        <Typography className="app-title" variant="h4" component="h2">
          {appName}
        </Typography>
        <Typography variant="caption" component="h2">
          v{appVersion}
        </Typography>
        <AppStepper />
        <Typography variant="body1" component="h2">
          <Link href="/login">
            Login
          </Link>
        </Typography>
      </div>
    );
  }
}

export default App;
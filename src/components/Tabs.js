import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import ControlledExpansionPanels from './ControlledExpansionPanels';

function TabContainer(props) {
    return (
        <ControlledExpansionPanels />
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '15%',
        flexShrink: 0,
    },
});

class CenteredTabs extends React.Component {
    state = {
        value: "alerts",
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    onActive(tab) {
        console.log(arguments);
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div className="classes.root">
                <Paper className={classes.root}>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                        defaultSelectedIndex={0}
                    >
                        <Tab index="0" value="alerts" label="Alerts">
                        </Tab>
                        <Tab index="1" value="cases" label="Cases">
                        </Tab>
                        <Tab index="2" value="customers" label="Customers" />
                    </Tabs>
                </Paper>
                {value === 'alerts' && <TabContainer />}
                {value === 'cases' && <TabContainer />}
                {value === 'customers' && <TabContainer />}
                </div>
        );
    }
}

CenteredTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CenteredTabs);
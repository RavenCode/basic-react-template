import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { getInstances } from '../actions/InstanceAction'

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        paddingLeft: 5,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 150,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class SingleSelect extends React.Component {
    state = {
        val: 0,
        name: 'hai',
        options: [],
        instances: [],
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    getInstances() {
        return getInstances()
    }

    async componentDidMount() {
        try {
            const instances = await this.getInstances();

            this.setState({ instances: instances})

            for (var i = 0; i < this.state.instances.length; i++) {
                this.state.options[i] = this.state.instances[i].name
            }
            console.log(this.state.options[0])

        } catch (e) {
            console.log(e)
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.root} autoComplete="off">

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-auto-width">Single Select</InputLabel>
                    <Select
                        value={this.state.val}
                        onChange={this.handleChange}
                        input={<Input name="val" id="age-auto-width" />}
                        autoWidth
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={0}>{this.state.options[0]}</MenuItem>
                        <MenuItem value={0}>{this.state.options[1]}</MenuItem>
                    </Select>
                    <FormHelperText>Instance</FormHelperText>
                </FormControl>
            </form>
        );
    }
}

SingleSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleSelect);
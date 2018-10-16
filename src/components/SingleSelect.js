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
        age: '',
        name: 'hai',
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.root} autoComplete="off">

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-auto-width">Single Select</InputLabel>
                    <Select
                        value={this.state.age}
                        onChange={this.handleChange}
                        input={<Input name="age" id="age-auto-width" />}
                        autoWidth
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Option 1</MenuItem>
                        <MenuItem value={20}>Option 2</MenuItem>
                        <MenuItem value={30}>Option 3</MenuItem>
                    </Select>
                    <FormHelperText>Select Label</FormHelperText>
                </FormControl>
            </form>
        );
    }
}

SingleSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleSelect);
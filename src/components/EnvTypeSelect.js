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
        val: 0,
        name: 'hai',
        data: [],
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
                        value={this.state.val}
                        onChange={this.handleChange}
                        input={<Input name="val" id="age-auto-width" />}
                        autoWidth
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={0}>DEV</MenuItem>
                        <MenuItem value={1}>STAGE</MenuItem>
                        <MenuItem value={2}>PROD</MenuItem>
                    </Select>
                    <FormHelperText>Environment</FormHelperText>
                </FormControl>
            </form>
        );
    }
}

SingleSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleSelect);
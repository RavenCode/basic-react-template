import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import FormHelperText from '@material-ui/core/FormHelperText';


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
    types: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    type: {
        margin: theme.spacing.unit / 4,
    },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const options = [
    'Option 1',
    'Option 2',
    'Option 3',
];

class MultipleSelect extends React.Component {
    state = {
        name: [],
    };

    handleChange = event => {
        this.setState({ name: event.target.value });
    };

    render() {
        const { classes, theme } = this.props;

        return (
            <div className={classes.root}>
                {/* <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="select-multiple">Instance</InputLabel>
                    <Select
                        multiple
                        value={this.state.name}
                        onChange={this.handleChange}
                        input={<Input id="select-multiple" />}
                        MenuProps={MenuProps}
                    >
                        {options.map(name => (
                            <MenuItem
                                key={name}
                                value={name}
                                style={{
                                    fontWeight:
                                        this.state.name.indexOf(name) === -1
                                            ? theme.typography.fontWeightRegular
                                            : theme.typography.fontWeightMedium,
                                }}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl> */}
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="select-multiple-type">Type</InputLabel>
                    <Select
                        multiple
                        value={this.state.name}
                        onChange={this.handleChange}
                        input={<Input id="select-multiple-type" />}
                        renderValue={selected => (
                            <div className={classes.types}>
                                {selected.map(value => (
                                    <Chip key={value} label={value} className={classes.type} />
                                ))}
                            </div>
                        )}
                        MenuProps={MenuProps}
                    >
                        {options.map(name => (
                            <MenuItem
                                key={name}
                                value={name}
                                style={{
                                    fontWeight:
                                        this.state.name.indexOf(name) === -1
                                            ? theme.typography.fontWeightRegular
                                            : theme.typography.fontWeightMedium,
                                }}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>Select Label</FormHelperText>
                </FormControl>
            </div>
        );
    }
}

MultipleSelect.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MultipleSelect);
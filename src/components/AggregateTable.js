import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { getAggregateInformation } from '../actions/AggregateAction'
import { getInstanceInformation } from '../actions/InstanceAction'
import { getAllErrors } from '../actions/ErrorAction'
import { signalRInvokeMiddleware } from '../actions/SignalRAction'
import * as SignalR from '@aspnet/signalr';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import MultiSelect from './MultiSelect';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const INSTANCE_ID = '44ercoGfO8Ipfypls2Zc'

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
    { id: 'aggValueId', numeric: false, disablePadding: false, label: 'Aggregation Identifier' },
    { id: 'errorMessage', numeric: false, disablePadding: false, label: 'Aggregation Preview' },
    { id: 'count', numeric: true, disablePadding: false, label: 'Count' },
    { id: 'pinned', numeric: false, disablePadding: false, label: 'Pin Icon Here' },
];

const rowsX = [
    { id: 'typeId', numeric: false, disablePadding: false, label: 'Env Type ID' },
    { id: 'errorType', numeric: false, disablePadding: false, label: 'Error Type' },
    { id: 'errorMessage', numeric: false, disablePadding: false, label: 'Error Message' },
];

class AggregateTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    toggleFilters = property => event => {

    };

    render() {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

        return (
            <TableHead>
                <TableRow>
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                numeric={row.numeric}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

AggregateTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

class AggregateTableHead2 extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    toggleFilters = property => event => {

    };

    render() {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

        return (
            <TableHead>
                <TableRow>
                    {rowsX.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                numeric={row.numeric}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

AggregateTableHead2.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});

let AggregateTableToolbar = props => {
    const { numSelected, classes } = props;

    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div className={classes.spacer} />
            <div className={classes.actions}>
                <Tooltip title="Filter list">
                    <MultiSelect />
                </Tooltip>
            </div>
            
        </Toolbar>

    );
};

AggregateTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};

AggregateTableToolbar = withStyles(toolbarStyles)(AggregateTableToolbar);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        // minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    minColumnWidth: 10,
});

class AggregateTable extends React.Component {
    state = {
        order: 'asc',
        orderBy: 'count',
        selected: [],
        data: [],
        errorCollection:[],
        page: 0,
        rowsPerPage: 10,
        hubConnection: null,
        aggregate1Name: '',
        aggregate2Name: '',
        open: false,
        currentAggregate: {}
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(state => ({ selected: state.data.map(n => n.id) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    getAggregateInformation() {
        return getAggregateInformation(INSTANCE_ID, '0', '1')
    }

    getInstanceInformation() {
        return getInstanceInformation(INSTANCE_ID)
    }

    getErrors = (event, id ) => {
        let instanceData = {}
        let instances = []
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        fetch(('https://gocfire-alpha.appspot.com/api/Errors/' + INSTANCE_ID + '/' + 0 + '/' + newSelected), {
            method: 'GET'
        })
                .then((resp) => {
                    return resp.json()
                })
                .then((data) => {
                    console.log(data)

                    this.setState({ errorCollection: data })
                })
                .catch((error) => {
                    console.log(error, "catch the hoop")
                })

                var errorCollection = this.state.errorCollection
                console.log(errorCollection)
                let aggregateData = {
                    id: newSelected,
                    errorCollection: errorCollection
                }

        this.setState({ open: true, currentAggregate: aggregateData });
    }

    async componentDidMount() {
        try {
            const instanceInfo = await this.getInstanceInformation()
            const aggregateInfo = await this.getAggregateInformation()
            this.setState({ data: aggregateInfo })

            this.setState({ aggregate1Name: instanceInfo.aggregateGroup1Name, aggregate2Name: instanceInfo.aggregateGroup2Name })

            for (var i = 0; i < this.state.data.length; i++) {
                this.state.data[i].aggValueId = this.state.aggregate1Name
            }

            const hubConnection = new HubConnectionBuilder()
                .withUrl('https://gocfire-alpha.appspot.com/api/Aggregation/counterhub')
                .configureLogging(LogLevel.Information)
                .build();
            

            this.setState({ hubConnection }, () => {
                this.state.hubConnection
                    .start()
                    .then(() => console.log('Connection started!'))
                    .catch(err => console.log('Error while establishing connection :('));

                this.state.hubConnection.on("SendCounterUpdate", (aggregateId, count) => {
                    console.log("received some stuff from signalR and it was " + aggregateId + " ; " + count);
                });
            });

        } catch (e) {
            console.log(e)
        }
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    render() {
        const { classes } = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page, errorCollection } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        const emptyRows2 = rowsPerPage - Math.min(rowsPerPage, errorCollection.length - page * rowsPerPage);

        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle id="scroll-dialog-title">Aggregate - {this.state.currentAggregate.id}</DialogTitle>
                    <DialogContent>
                        <div className={classes.tableWrapper}>
                            <Table className={classes.table} aria-labelledby="tableTitle">
                                <AggregateTableHead2
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={this.handleSelectAllClick}
                                    onRequestSort={this.handleRequestSort}
                                    rowCount={errorCollection.length}
                                />
                                <TableBody>
                                    {stableSort(errorCollection, getSorting(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map(x => {
                                            const isSelected = this.isSelected(x.id);
                                            return (
                                                <TableRow
                                                    hover
                                                    role="checkbox"
                                                    aria-checked={isSelected}
                                                    tabIndex={-1}
                                                    key={x.id}
                                                    selected={isSelected}
                                                >
                                                    <TableCell>{x.typeId}</TableCell>
                                                    <TableCell>{x.errorType}</TableCell>
                                                    <TableCell>{x.errorMessage}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    {emptyRows2 > 0 && (
                                        <TableRow style={{ height: 50 * emptyRows2 }}>
                                            <TableCell colSpan={4} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            <Paper className={classes.root}>
                <AggregateTableToolbar numSelected={selected.length} />
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <AggregateTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {stableSort(data, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    const isSelected = this.isSelected(n.id);
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => this.getErrors(event, n.id)}
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.id}
                                            selected={isSelected}
                                        >
                                            {/* <TableCell padding="checkbox">
                                                Derp
                                            </TableCell> */}
                                            <TableCell>{n.aggValueId}</TableCell>
                                            <TableCell>{n.errorMessage}</TableCell>
                                            <TableCell numeric>{n.count}</TableCell>
                                            <TableCell>{n.pinned}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={5} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
            </div>

        );
    }
}

AggregateTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AggregateTable);
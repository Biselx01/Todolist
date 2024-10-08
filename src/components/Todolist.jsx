import { useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react'; 
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-material.css";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

dayjs.locale('en-gb');

function Todolist(){
    const [todo, setTodo] = useState({description: "", priority: "", duedate: dayjs().toISOString() });
    const [todos, setTodos] = useState([]);
    const [colDefs] = useState([
        {field: "description", filter: true, floatingFilter: true, checkboxSelection: true},
        {field: "priority", filter: true, floatingFilter: true, sortable: true,
            cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'}
        },
        {field: "duedate", filter: true, floatingFilter: true},
    ]);
    const gridRef = useRef();

    const handleAdd = () => {
        if(!todo.description || !todo.duedate || !todo.priority) {
            alert("Please enter a todo");
        } else {
            const formattedTodo = {
                ...todo,
                duedate: dayjs(todo.duedate).format('DD/MM/YYYY')
            };
            setTodos([formattedTodo, ...todos]);
            setTodo({description: "", duedate: dayjs().toISOString(), priority: ""});
        }
    }

    const handleDelete = () => {
        if(gridRef.current.getSelectedNodes().length > 0){
            setTodos(todos.filter((_, index) => 
                gridRef.current.getSelectedNodes()[0].id != index));
        } else {
            alert("Please select a todo to delete");
        }
    }

    const handleDateChange = (date) => {
        setTodo({ ...todo, duedate: date.toISOString() });
    }

    return(
        <>
            <Stack 
                direction="row" 
                spacing={2} 
                alignItems="center" 
                justifyContent="center"
                mt={6}
            >
                <TextField
                    label="Description"
                    value={todo.description}
                    onChange={(e) => setTodo({...todo, description: e.target.value})}
                />
                <Box>
                    <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="priority-label">Priority</InputLabel>
                        <Select
                            labelId="priority-label"
                            label="Priority"
                            id="priority-select"
                            value={todo.priority}
                            onChange={(e) => setTodo({ ...todo, priority: e.target.value })}
                        >
                            <MenuItem value="Low">Low</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="High">High</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
                    <DatePicker
                        label="Date"
                        value={dayjs(todo.duedate)}
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField {...params} variant='standard' />}
                    />
                </LocalizationProvider>
                <Button 
                    variant="contained" 
                    onClick={handleAdd}
                    endIcon={<SendIcon />}>  
                    Add Todo
                </Button>
                <Button 
                    variant="outlined"
                    color="error" 
                    onClick={handleDelete}
                    startIcon={<DeleteIcon />}>  
                    Delete
                </Button>
            </Stack>
            <Box
                className="ag-theme-material" 
                sx={{ height: 400, width: '100%', mt: 4 }}
            >
                <AgGridReact
                    ref={gridRef}
                    onGridReady={ params => gridRef.current = params.api}
                    rowData={todos}
                    columnDefs={colDefs}
                    rowSelection='single'
                />
            </Box>
        </>
    );
}

export default Todolist;
import React from 'react'
import { TextField, Grid, InputAdornment, IconButton, Icon} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

const Input = ({name, half, label, autoFocus, type, handleChange, handleShowPassword}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
        <TextField
            name= {name}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
            InputLabelProps={{style: { color: "#FEFEFE" } }}
            InputProps={{
                    style: { color: "#FEFEFE" },
                    endAdornment: name === "password" ? (
                        <InputAdornment position="end">
                            <IconButton style={{color:"#FEFEFE"}} onClick={handleShowPassword}>
                                {type === "password" ? < VisibilityOutlinedIcon/> : <VisibilityOffOutlinedIcon/>}
                            </IconButton>
                        </InputAdornment>
                    ) : null
                }}
        />
    </Grid>
  )
}

export default Input
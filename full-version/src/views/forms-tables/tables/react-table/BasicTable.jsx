// material-ui
import Grid from '@mui/material/Grid';

// project-imports
import BasicTable from 'sections/tables/react-table/BasicTable';
import { GRID_COMMON_SPACING } from 'config';

// ==============================|| REACT TABLE - BASIC ||============================== //

export default function Basic() {
  return (
    <Grid container spacing={GRID_COMMON_SPACING}>
      <Grid size={{ xs: 12, lg: 6 }}>
        <BasicTable title="Basic Table" />
      </Grid>
      <Grid size={{ xs: 12, lg: 6 }}>
        <BasicTable title="Striped Table" striped />
      </Grid>
      <Grid size={12}>
        <BasicTable title="Footer" footer />
      </Grid>
    </Grid>
  );
}

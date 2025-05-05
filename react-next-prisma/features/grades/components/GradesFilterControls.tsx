'use client';

import { useRouter } from 'next/navigation';
import { Box, ToggleButtonGroup, ToggleButton, useMediaQuery, useTheme } from '@mui/material';
import { EFilter } from '../grades.types';

interface GradesFilterControlsProps {
  currentFilter: string;
}

export default function GradesFilterControls({ currentFilter }: GradesFilterControlsProps) {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleFilterChange = (_: React.MouseEvent<HTMLElement>, newFilter: string | null) => {
    if (newFilter) {
      router.push(`/grades?filter=${newFilter}`);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', mb: 3 }}>
      <ToggleButtonGroup
        value={currentFilter}
        exclusive
        onChange={handleFilterChange}
        aria-label="filter grades data"
        size={isMobile ? 'small' : 'medium'}
      >
        <ToggleButton value={EFilter.ALL}>
          Show All Data
        </ToggleButton>
        <ToggleButton value={EFilter.CLASS_AVERAGES}>
          Class Averages
        </ToggleButton>
        <ToggleButton value={EFilter.PASSING_AVERAGE}>
          Passing Average (&gt;55)
        </ToggleButton>
        <ToggleButton value={EFilter.HIGH_PERFORMING}>
          High Performing (&gt;70)
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
import { Grid } from '@chakra-ui/react';

const Bestseller = () => {
  return (
    <Grid
      templateColumns={{
        base: 'repeat(1, 1fr)',
        md: 'repeat(3, 1fr)',
        lg: 'repeat(4, 1fr)',
      }}
      rowGap={4}
      columnGap={4}
    ></Grid>
  );
};

export default Bestseller;

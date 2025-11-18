// material-ui
import Divider from '@mui/material/Divider';

// project-imports
import Hero from 'sections/landing/Hero';
// import Technologies from 'sections/landing/Technologies';
// import Combo from 'sections/landing/Combo';
// import FigmaBlock from 'sections/landing/FigmaBlock';
// import Apps from 'sections/landing/Apps';
// import Free from 'sections/landing/Free';
import Testimonial from 'sections/landing/Testimonial';
import Partner from 'sections/landing/Partner';
import Subscribe from 'sections/landing/Subscribe';
import SimpleLayout from 'layout/SimpleLayout';
import Service from 'sections/landing/Service';
import Portfolio from 'sections/landing/Portfolio';
import Core from 'sections/landing/Core';

// ==============================|| LANDING PAGE ||============================== //

export default function Landing() {
  return (
    <SimpleLayout>
      <Hero />
      <Partner />
      {/* <Combo /> */}
      {/* <FigmaBlock /> */}
      {/* <Apps /> */}
      <Core />
      <Service />
      <Portfolio />
      {/* <Free /> */}
      <Testimonial />
      <Subscribe />
      <Divider sx={{ borderColor: 'secondary.light' }} />
    </SimpleLayout>
  );
}

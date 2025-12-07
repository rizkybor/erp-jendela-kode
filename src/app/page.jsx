// material-ui
import Divider from '@mui/material/Divider';

// project-imports
import Hero from 'sections/landing/Hero';
import Testimonial from 'sections/landing/Testimonial';
import Partner from 'sections/landing/Partner';
import Subscribe from 'sections/landing/Subscribe';
import SimpleLayout from 'layout/SimpleLayout';
import Service from 'sections/landing/Service';
import Portfolio from 'sections/landing/Portfolio';
import Core from 'sections/landing/Core';
import AIBlock from 'sections/landing/AIBlock';
import RequestChatBot from 'sections/landing/RequestChatBot';

// ==============================|| LANDING PAGE ||============================== //

export default function Landing() {
  return (
    <SimpleLayout>
      <Hero />
      <Partner />
      <Core />
      <Service />
 <div id="our-portfolio">
        <Portfolio />
      </div>
      <AIBlock />
      <RequestChatBot />
      <Testimonial />
      <Subscribe />
      <Divider sx={{ borderColor: 'secondary.light' }} />
    </SimpleLayout>
  );
}

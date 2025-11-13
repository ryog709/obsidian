import Navigation from '@/components/layout/Navigation';
import Hero from '@/components/sections/Hero';
import CourseOverview from '@/components/sections/CourseOverview';
import Features from '@/components/sections/Features';
import ContactForm from '@/components/forms/ContactForm';
import Footer from '@/components/layout/Footer';
import { Box } from '@mui/material';

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Navigation />
      <Box sx={{ pt: '80px' }}>
        <Hero />
        <CourseOverview />
        <Features />
        <ContactForm />
        <Footer />
      </Box>
    </Box>
  );
}

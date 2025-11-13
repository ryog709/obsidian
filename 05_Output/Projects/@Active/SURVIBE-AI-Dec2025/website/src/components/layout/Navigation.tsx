'use client';

import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'ホーム', href: '#home' },
    { label: 'コース', href: '#courses' },
    { label: '特徴', href: '#features' },
    { label: 'お問い合わせ', href: '#contact' },
  ];

  return (
    <AppBar 
      position="fixed"
      sx={{
        background: scrolled 
          ? 'rgba(255, 255, 255, 0.95)' 
          : 'rgba(255, 255, 255, 1)',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        boxShadow: scrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
        transition: 'all 0.3s ease',
        color: '#0f172a',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                fontSize: '1.5rem',
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              SURVIBE AI
            </Typography>
          </Link>

          {isMobile ? (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              sx={{ color: '#0f172a' }}
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 3 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  href={item.href}
                  sx={{
                    color: '#0f172a',
                    fontWeight: 500,
                    '&:hover': {
                      background: 'rgba(59, 130, 246, 0.1)',
                      color: '#3b82f6',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <Button
                component={Link}
                href="#contact"
                variant="contained"
                sx={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
                  color: 'white',
                  fontWeight: 600,
                  px: 3,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #db2777 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.5)',
                  },
                }}
              >
                無料相談
              </Button>
            </Box>
          )}
        </Toolbar>

        {/* Mobile Menu */}
        {isMobile && mobileMenuOpen && (
          <Box
            sx={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
              zIndex: 1000,
            }}
          >
            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  sx={{
                    justifyContent: 'flex-start',
                    color: '#0f172a',
                    fontWeight: 500,
                    py: 1.5,
                    '&:hover': {
                      background: 'rgba(59, 130, 246, 0.1)',
                      color: '#3b82f6',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <Button
                component={Link}
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                variant="contained"
                sx={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
                  color: 'white',
                  fontWeight: 600,
                  py: 1.5,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #db2777 100%)',
                  },
                }}
              >
                無料相談
              </Button>
            </Box>
          </Box>
        )}
      </Container>
    </AppBar>
  );
}

import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Landing } from '@/pages/Landing';
import { Pricing } from '@/pages/Pricing';
import { SignIn, SignUp } from '@/pages/Auth';
import { Overview } from '@/pages/dashboard/Overview';
import { Collections } from '@/pages/dashboard/Collections';
import { CollectionEditor } from '@/pages/dashboard/CollectionEditor';
import { Settings } from '@/pages/dashboard/Settings';
import { ClientGallery } from '@/pages/ClientGallery';
import { RequireAuth } from '@/components/RequireAuth';
import { ToastViewport } from '@/components/ui/Toast';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Public client-facing gallery */}
        <Route path="/g/:slug" element={<ClientGallery />} />

        {/* Authenticated studio dashboard */}
        <Route
          path="/app"
          element={
            <RequireAuth>
              <Overview />
            </RequireAuth>
          }
        />
        <Route
          path="/app/collections"
          element={
            <RequireAuth>
              <Collections />
            </RequireAuth>
          }
        />
        <Route
          path="/app/collections/:id"
          element={
            <RequireAuth>
              <CollectionEditor />
            </RequireAuth>
          }
        />
        <Route
          path="/app/settings"
          element={
            <RequireAuth>
              <Settings />
            </RequireAuth>
          }
        />

        <Route path="*" element={<Landing />} />
      </Routes>
      <ToastViewport />
    </BrowserRouter>
  );
}

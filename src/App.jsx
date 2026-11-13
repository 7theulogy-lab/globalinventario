import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import VentaView from './components/VentaView';

function saleFromHistory() {
  const { screen, ventaId } = window.history.state ?? {};
  if (!['venta', 'edit'].includes(screen) || !ventaId) return null;

  try {
    const ventas = JSON.parse(window.localStorage.getItem('inventario_list') ?? '[]');
    return ventas.find(venta => venta.id === ventaId) ?? null;
  } catch {
    return null;
  }
}

function LocalApp() {
  const [currentVenta, setCurrentVenta] = useState(saleFromHistory);

  // Escuchar el botón físico "Atrás" del dispositivo PDA/Android
  useEffect(() => {
    const handlePopState = () => setCurrentVenta(saleFromHistory());
    const handleStorage = event => {
      if (event.key === 'inventario_list') setCurrentVenta(saleFromHistory());
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const handleSelectVenta = (venta) => {
    // Cuando entramos a una venta, agregamos un paso al historial del navegador (pda)
    window.history.pushState({ screen: 'venta', ventaId: venta.id }, '');
    setCurrentVenta(venta);
  };

  const handleBackToDashboard = () => {
    // Si apretamos la flecha virtual, forzamos el botón atrás del navegador 
    // para mantener limpio el historial
    if (window.history.state?.screen === 'edit') {
      window.history.go(-2);
    } else if (window.history.state?.screen === 'venta') {
      window.history.back(); // Esto dispara popstate y cierra la vista
    } else {
      setCurrentVenta(null);
    }
  };

  return (
    <div className="min-h-screen">
      {currentVenta ? (
        <VentaView venta={currentVenta} onBack={handleBackToDashboard} />
      ) : (
        <Dashboard onSelectVenta={handleSelectVenta} />
      )}
    </div>
  );
}

export default LocalApp;

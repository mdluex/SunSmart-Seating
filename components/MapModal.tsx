
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { NumericLocationPoint, Language } from '../types';
import { useTranslation } from '../hooks/useTranslation';

// Minimal TypeScript declarations for Google Maps API
declare global {
  interface Window { google?: typeof google; }
  namespace google.maps {
    class Map {
      constructor(mapDiv: HTMLElement, opts?: MapOptions);
      setCenter(latLng: LatLng | LatLngLiteral): void;
      setZoom(zoom: number): void;
      getZoom(): number | undefined; 
      fitBounds(bounds: LatLngBounds | LatLngBoundsLiteral): void;
      addListener(eventName: string, handler: Function): MapsEventListener;
    }
    interface MapOptions {
      center?: LatLng | LatLngLiteral;
      zoom?: number;
      mapTypeId?: string | MapTypeId;
      disableDefaultUI?: boolean;
      streetViewControl?: boolean;
      zoomControl?: boolean;
      draggableCursor?: string;
      draggingCursor?: string;
    }
    enum MapTypeId { ROADMAP, SATELLITE, HYBRID, TERRAIN }
    class Marker {
      constructor(opts?: MarkerOptions);
      setMap(map: Map | null): void;
      setPosition(latLng: LatLng | LatLngLiteral | null | undefined): void;
      getPosition(): LatLng | null | undefined;
      setDraggable(draggable: boolean): void;
      addListener(eventName: string, handler: Function): MapsEventListener; 
    }
    interface MarkerOptions {
      position?: LatLng | LatLngLiteral;
      map?: Map;
      title?: string;
      draggable?: boolean;
    }
    
    interface LatLng { 
      lat(): number; 
      lng(): number; 
      equals(other: LatLng): boolean;
      toString(): string;
      toJSON(): LatLngLiteral;
    }

    class LatLng {
      constructor(lat: number, lng: number, noWrap?: boolean);
      lat(): number;
      lng(): number;
      equals(other: LatLng): boolean;
      toString(): string;
      toJSON(): LatLngLiteral;
    }

    interface LatLngLiteral { lat: number; lng: number; }
    interface MapsEventListener { remove(): void; }
    interface LatLngBounds { /* Minimal */ }
    interface LatLngBoundsLiteral { /* Minimal */ }
    interface MapMouseEvent { latLng: LatLng; }

    // google.maps.event namespace
    namespace event {
      function clearInstanceListeners(instance: object): void;
    }
  }
}


interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (location: NumericLocationPoint | null) => void;
  initialLocation: NumericLocationPoint | null;
  language: Language;
}

const DEFAULT_CENTER = { lat: 30.0444, lng: 31.2357 }; // Cairo
const DEFAULT_ZOOM = 12;
const MAP_CLICK_ZOOM = 15; 

export const MapModal: React.FC<MapModalProps> = ({ isOpen, onClose, onConfirm, initialLocation, language }) => {
  const { t } = useTranslation();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerInstanceRef = useRef<google.maps.Marker | null>(null);
  const mapClickListenerRef = useRef<google.maps.MapsEventListener | null>(null);
  const markerDragListenerRef = useRef<google.maps.MapsEventListener | null>(null);


  const [selectedLocation, setSelectedLocation] = useState<NumericLocationPoint | null>(initialLocation);
  const [isApiReady, setIsApiReady] = useState(false);

  useEffect(() => {
    setSelectedLocation(initialLocation);
  }, [initialLocation, isOpen]);


  useEffect(() => {
    const checkGoogle = setInterval(() => {
      if (window.google && window.google.maps && window.google.maps.LatLng && window.google.maps.event) {
        clearInterval(checkGoogle);
        setIsApiReady(true);
      }
    }, 100);
    return () => clearInterval(checkGoogle);
  }, []);

  const updateMarkerAndLocation = useCallback((latLng: google.maps.LatLng | null) => {
    if (latLng) {
      const newLoc = { lat: latLng.lat(), lon: latLng.lng() };
      setSelectedLocation(newLoc);
      if (markerInstanceRef.current) { 
        markerInstanceRef.current.setPosition(latLng);
        if (mapInstanceRef.current) { 
           markerInstanceRef.current.setMap(mapInstanceRef.current);
        }
      } else if (mapInstanceRef.current) { 
        markerInstanceRef.current = new window.google.maps.Marker({
          position: latLng,
          map: mapInstanceRef.current,
          draggable: true,
        });
        if (markerDragListenerRef.current) markerDragListenerRef.current.remove();
        markerDragListenerRef.current = markerInstanceRef.current.addListener('dragend', () => {
             const marker = markerInstanceRef.current;
             if (marker) {
                const newPosition = marker.getPosition();
                if (newPosition) { 
                    updateMarkerAndLocation(newPosition);
                }
             }
        });
      }
      const currentZoom = mapInstanceRef.current?.getZoom();
      if(mapInstanceRef.current && currentZoom !== undefined && currentZoom < MAP_CLICK_ZOOM) {
        mapInstanceRef.current.setZoom(MAP_CLICK_ZOOM);
        mapInstanceRef.current.setCenter(latLng);
      } else if (mapInstanceRef.current) {
        mapInstanceRef.current.setCenter(latLng);
      }

    } else { 
        setSelectedLocation(null);
        if(markerInstanceRef.current) {
            markerInstanceRef.current.setMap(null); 
        }
    }
  }, []); 


  useEffect(() => {
    if (!isOpen || !isApiReady || !mapContainerRef.current) {
      return;
    }

    const center = selectedLocation
      ? { lat: selectedLocation.lat, lng: selectedLocation.lon }
      : initialLocation 
        ? { lat: initialLocation.lat, lng: initialLocation.lon }
        : DEFAULT_CENTER;
    const zoom = (selectedLocation || initialLocation) ? MAP_CLICK_ZOOM : DEFAULT_ZOOM;

    mapInstanceRef.current = new window.google.maps.Map(mapContainerRef.current, {
      center: center,
      zoom: zoom,
      disableDefaultUI: true,
      streetViewControl: false,
      zoomControl: true,
      draggableCursor: 'pointer',
      draggingCursor: 'grabbing',
    });

    if (selectedLocation) { 
      updateMarkerAndLocation(new window.google.maps.LatLng(selectedLocation.lat, selectedLocation.lon));
    }
    
    if (mapClickListenerRef.current) mapClickListenerRef.current.remove();
    mapClickListenerRef.current = mapInstanceRef.current.addListener('click', (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        updateMarkerAndLocation(e.latLng);
      }
    });
    
    return () => { 
        if (mapClickListenerRef.current) {
            mapClickListenerRef.current.remove();
            mapClickListenerRef.current = null;
        }
        if (markerDragListenerRef.current) {
            markerDragListenerRef.current.remove();
            markerDragListenerRef.current = null;
        }
        if (markerInstanceRef.current) {
            markerInstanceRef.current.setMap(null); 
            markerInstanceRef.current = null;
        }

        if (isApiReady && mapInstanceRef.current) {
             window.google.maps.event.clearInstanceListeners(mapInstanceRef.current);
        }
        if (isApiReady && mapContainerRef.current) { 
             window.google.maps.event.clearInstanceListeners(mapContainerRef.current);
        }
        
        mapInstanceRef.current = null; 
        
        if (mapContainerRef.current) {
          mapContainerRef.current.innerHTML = '';
        }
    };

  }, [isOpen, isApiReady, initialLocation, updateMarkerAndLocation]); // selectedLocation removed from deps


  useEffect(() => {
    if (isOpen && isApiReady) {
      const initialDelay = 500; 
      const clickInterval = 200; 
      const maxAttempts = 3;
      const timeoutIds: number[] = [];
      const dialogTextToSearch = "This page can't load Google Maps correctly"; // No leading dot

      const performAttempt = (attemptNum: number) => {
        if (attemptNum > maxAttempts) {
          return;
        }

        const buttonsToTry = document.querySelectorAll('button.dismissButton, button');
        let clickedThisAttempt = false;

        for (const btn of Array.from(buttonsToTry)) {
          if (clickedThisAttempt) break;

          if (btn instanceof HTMLButtonElement) {
            const buttonText = btn.textContent?.trim().toUpperCase();
            
            let parentDialog = btn.closest('.gm-style-moc') || 
                               btn.closest('.gm-err-container') || 
                               btn.closest('.gm-err-dialog');
            
            if (!parentDialog) {
                const genericDialog = btn.closest('div[role="dialog"]');
                if (genericDialog?.textContent?.includes(dialogTextToSearch)) {
                    parentDialog = genericDialog;
                }
            }

            if (parentDialog && parentDialog.textContent?.includes(dialogTextToSearch)) {
              if (btn.classList.contains('dismissButton') || buttonText === 'OK') {
                btn.click();
                clickedThisAttempt = true;
              }
            }
          }
        }

        if (clickedThisAttempt) {
          return;
        }

        if (attemptNum < maxAttempts) {
          const nextAttemptTimeoutId = window.setTimeout(() => {
            performAttempt(attemptNum + 1);
          }, clickInterval);
          timeoutIds.push(nextAttemptTimeoutId);
        }
      };

      const firstAttemptTimeoutId = window.setTimeout(() => {
        performAttempt(1);
      }, initialDelay);
      timeoutIds.push(firstAttemptTimeoutId);

      return () => {
        for (const id of timeoutIds) {
          clearTimeout(id);
        }
      };
    }
  }, [isOpen, isApiReady]);


  const handleConfirm = () => {
    onConfirm(selectedLocation);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('mapModalTitle')}
      closeButtonAriaLabel={t('closeModal')}
    >
      <div className="space-y-4">
        <div 
            ref={mapContainerRef} 
            style={{ height: '350px', width: '100%', borderRadius: '0.375rem', overflow: 'hidden', border: '1px solid #cbd5e1' }}
            aria-label={t('interactiveMap')}
            role="application"
        >
          {/* Map will be rendered here */}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-slate-200">
          <Button onClick={handleConfirm} className="w-full sm:flex-1" aria-label={t('mapModalConfirmButton')}>
            {t('mapModalConfirmButton')}
          </Button>
          <Button onClick={onClose} className="w-full sm:flex-1 !bg-slate-500 hover:!bg-slate-600" aria-label={t('cancelButton')}>
            {t('cancelButton')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

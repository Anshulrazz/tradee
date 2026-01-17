import { useEffect, useRef } from 'react';

export function PDFViewer({ pdfUrl, title }: { pdfUrl: string; title: string }) {
  const viewerRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    // Load CloudPDF script if not already loaded
    const loadCloudPDF = () => {
      return new Promise((resolve, reject) => {
        if ((window as any).CloudPDF) {
          resolve((window as any).CloudPDF);
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://cloudpdf.io/viewer.min.js';
        script.type = 'text/javascript';
        script.onload = () => resolve((window as any).CloudPDF);
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    // Initialize CloudPDF viewer
    const initViewer = async () => {
      try {
        const CloudPDF = (await loadCloudPDF()) as any;

        if (viewerRef.current && !instanceRef.current) {
          const config = {
            documentId: 'fb359da1-fe14-4c09-89ef-6cc609eb61b1',
            darkMode: true,
          };

          instanceRef.current = await CloudPDF(config, viewerRef.current as HTMLElement);
        }
      } catch (error) {
        console.error('Failed to load CloudPDF:', error);
      }
    };

    initViewer();

    // Cleanup function
    return () => {
      if (instanceRef.current && (instanceRef.current as any).destroy) {
        (instanceRef.current as any).destroy() as any;
        instanceRef.current = null;
      }
    };
  }, [pdfUrl]);

  return (
    <div className="w-full border rounded-lg overflow-hidden bg-muted/20">
      <div className="bg-card border-b px-4 py-2">
        <p className="text-sm font-semibold text-foreground">{title || 'PDF Viewer'}</p>
      </div>
      <div
        ref={viewerRef}
        style={{ width: '100%', height: '800px' }}
        className="bg-background"
      />
    </div>
  );
}
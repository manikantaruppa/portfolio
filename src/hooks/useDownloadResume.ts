import { useCallback } from 'react';

export function useDownloadResume() {
  const handleDownload = useCallback(() => {
    const link = document.createElement('a');
    link.href = '/Manikanta_Resume.pdf';
    link.download = 'Manikanta_Ruppa_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return {
    handleDownload,
    handlePrint
  };
}

export const downloadResume = () => {
  // First try the direct download
  const link = document.createElement('a');
  link.href = '/resume.pdf';
  link.download = 'Ishwaq_Syed_Resume.pdf';
  link.target = '_blank';
  
  // Append to body, click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
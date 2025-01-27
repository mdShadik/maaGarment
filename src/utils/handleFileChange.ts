export const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: Function, setError: Function) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    } else {
      setError("Please select a file.");
    }
  };
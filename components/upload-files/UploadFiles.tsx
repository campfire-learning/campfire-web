import "./styles.css";

import Link from "next/link";
import React, { useEffect, useState } from "react";

export const UploadFiles = ({
  upload,
  currents,
}: {
  upload: (content: string[]) => void;
  currents?: any[];
}) => {
  const [newFiles, setNewFiles] = useState();
  const [existingFiles, setExistingFiles] = useState();

  useEffect(() => {
    setExistingFiles(currents);
  }, [currents]);

  const handleFileChange = (e) => {
    // console.log("handleFileChange");
    // console.log(e.target.files);
    if (e.target.files.length > 0) {
      setNewFiles(Array.from(e.target.files));
    }
  };

  const existingFilesView = () => {
    if (!existingFiles) {
      return <p className="upload-form-p">No files have been uploaded</p>;
    }

    return (
      <ol className="upload-form-ol">
        {existingFiles.map((file) => (
          <li key={file.name} className="upload-form-li">
            <Link href={file.url} target="_blank">
              {file.name}
            </Link>
          </li>
        ))}
      </ol>
    );
  };

  const newFilesView = () => {
    if (!newFiles) {
      return <p className="upload-form-p">No files are selected for upload</p>;
    }

    return (
      <ol className="upload-form-ol">
        {newFiles.map((file) => (
          <li key={file.name} className="upload-form-li">
            {file.name}
          </li>
        ))}
      </ol>
    );
  };

  const submitFiles = () => {
    try {
      // console.log("submitFiles");
      // console.log(newFiles);
      upload(newFiles);
      setNewFiles([]);
    } catch (error) {
      console.error(error);
      return (
        <>
          <h1>Oh uh - there is an error in submitFiles</h1>
          <h3 className="text-red">{JSON.stringify(error)}</h3>
        </>
      );
    }
  };

  return (
    <div>
      <div className="upload-form rounded-lg">{existingFilesView()}</div>
      <div className="upload-form rounded-lg">
        <div>
          <label htmlFor="uploads" className="upload-form-label">
            Choose PDF files to upload
          </label>
          <input
            hidden
            type="file"
            id="uploads"
            name="uploads"
            accept=".pdf, image/*, video/*"
            multiple
            onChange={handleFileChange}
          />
        </div>
        <div>{newFilesView()}</div>
        <div>
          <button className="upload-form-button" onClick={submitFiles}>
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

import { useState } from "react";
import { v4 as uuid } from "uuid";

const AUTH_ENDPOINT = "http://localhost:7071/api/auth/upload";

const Upload = () => {
  const [files, setFiles] = useState<FileList>();
  const [batchId, setBatchId] = useState<string>("");

  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // first get the signed url from the auth function
    // then upload the file to the signed url

    event.preventDefault();

    if (!files || files.length === 0) {
      setError("Select files");
      return;
    }

    // for grouping the files together
    const batchId = uuid();

    for (const file of files) {
      const authBody = {
        filename: file.name,
        password: "pass",
        batch_id: batchId,
      };

      setUploading(true);
      setError(null);
      setBatchId(batchId);

      try {
        // get signed url
        const authResponse = await fetch(AUTH_ENDPOINT, {
          method: "POST",
          body: JSON.stringify(authBody),
        });

        if (!authResponse.ok) {
          throw new Error("Failed to get signed url");
        }

        const authResponseBody = await authResponse.json();

        if (authResponseBody.error !== undefined) {
          throw new Error(authResponseBody.error);
        }

        if (authResponseBody.uploadUri === undefined) {
          throw new Error("Missing uploadUri");
        }
        if (authResponseBody.uploadUri === "") {
          throw new Error("Empty uploadUri");
        }
        if (!authResponseBody.uploadUri.startsWith("https://")) {
          throw new Error("uploadUri is not https");
        }

        // upload file to signed url
        const formData = new FormData();
        formData.append("file", file);
        const uploadResponse = await fetch(authResponseBody.uploadUri, {
          method: "PUT",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            "x-ms-blob-type": "BlockBlob",
          },
        });
        const uploadResponseBody = await uploadResponse.json();
        if (uploadResponseBody.error !== undefined) {
          throw new Error(uploadResponseBody.error);
        }
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : `${e}`);
      }
    }

    setUploading(false);
  };

  const handleChangeFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      setFiles(event.currentTarget.files);
    }
  };

  return (
    <form
      method="put"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
      className="
          flex flex-col justify-start items-center gap-y-8
          w-full max-w-xl
          my-8
          p-8
          border-4 border-[#2a2a2a] rounded-2xl
          bg-[#1a1a1a]
          relative
          shadow-inner
          drop-shadow
          "
    >
      <span className="absolute bottom-0 right-0 transform translate-y-1/3 bg-[#1a1a1a] px-1 mr-4 text-sm font-bold">
        Live demo <span className="text-emerald-500">&deg;</span>
      </span>
      <div className="divide-y-2 divide-[#2a2a2a]">
        <input
          type="file"
          name="fileInput"
          onChange={handleChangeFiles}
          multiple={true}
          className="
            w-full
            bg-[#1a1a1a] text-tm-white text-sm
            py-2 
            file:px-4 
            file:mx-4
            transition-transform duration-200
            file:rounded
            file:font-bold
            file:active:scale-95
            file:shadow
            file:border-none
            file:cursor-pointer
            "
        />
      </div>
      {files && files?.length > 0 && (
        <div className="flex flex-col justify-start items-start gap-y-2">
          <span className="text-sm font-bold">Files selected:</span>
          <ul className="list-disc list-inside">
            {Array.from(files).map((file) => (
              <li key={file.name}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
      <button
        type="submit"
        className="
            bg-tm-red
            font-bold py-2 px-8 rounded
            transition-transform duration-200
            active:scale-95
            shadow
            "
      >
        Upload and scan
      </button>
      {error && <span>{error}</span>}
      {uploading && <span>Uploading...</span>}
      {batchId && <span>Batch ID: {batchId}</span>}
    </form>
  );
};

export default Upload;

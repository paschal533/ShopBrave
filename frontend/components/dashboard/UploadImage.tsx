import { useState, useMemo, useCallback } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

const projectId = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_SECRET;
const projectIdAndSecret = `${projectId}:${projectSecret}`;

const client = ipfsHttpClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: `Basic ${Buffer.from(projectIdAndSecret).toString(
      "base64"
    )}`,
  },
});

const UploadImage = ({ title, index, setFileUrl, fileUrl }: any) => {
  const uploadToInfura = async (file: any) => {
    try {
      const added = await client.add({ content: file });

      const url = `https://shopbrave.infura-ipfs.io/ipfs/${added.path}`;

      setFileUrl((prev: any) => [...prev, url]);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  const onDrop = useCallback(async (acceptedFile: any) => {
    await uploadToInfura(acceptedFile[0]);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    //@ts-ignore
    accept: "image/*",
    maxSize: 5000000,
  });

  // add tailwind classes acording to the file status
  const fileStyle = useMemo(
    () =>
      `bg-white border border-[#618b95] mt-4 rounded-md flex flex-col items-center p-0 rounded-sm border-dashed  
           ${isDragActive ? " border-file-active " : ""} 
           ${isDragAccept ? " p-0 " : ""} 
           ${isDragReject ? " border-file-reject " : ""}`,
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <div>
      <h1 className="text-[#1a3841] font-semibold text-md">{title}</h1>
      <div {...getRootProps()} className={fileStyle}>
        <input {...getInputProps()} />
        <div className="flexCenter cursor-pointer flex-col text-center">
          {fileUrl.length >= index ? (
            <div className=" justify-center w-full items-center align-middle flex">
              <div>
                <Image
                  src={fileUrl[index - 1]}
                  alt="Asset_file"
                  height={100}
                  width={300}
                />
              </div>
            </div>
          ) : (
            <div className="p-5 mt-4">
              <p className="font-poppins text-[#98b3b8] font-semibold text-sm">
                JPG, PNG, GIF, SVG, WEBM, Max 100mb.
              </p>

              <p className="font-poppins text-[#98b3b8] font-semibold text-sm">
                Drag and Drop File
              </p>
              <p className="font-poppins text-[#98b3b8] font-semibold text-sm mt-2">
                Or browse media on your device
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadImage;

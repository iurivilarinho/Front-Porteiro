import { Accept, useDropzone } from "react-dropzone";
import { Notification, NotificationProps } from "../input/notification";
import { cn } from "@/lib/utils";
import UploadCloudIcon from "@/assets/icons/uploadCloud";
import UploadImageIcon from "@/assets/icons/uploadImageIcon";
import { Button } from "../button/button";
import { Label } from "../input/label";
import { useState } from "react";
import CloseIcon from "@/assets/icons/closeIcon";

interface DragAndDropProps {
  id?: string;
  label?: string;
  onAddFile?: (files: File[]) => void;
  acceptedFileTypes?: Accept;
  notification?: NotificationProps;
}

const DragAndDrop = ({
  id,
  label,
  onAddFile,
  acceptedFileTypes,
  notification,
}: DragAndDropProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setSelectedFiles(acceptedFiles);
      if (onAddFile) {
        onAddFile(acceptedFiles);
      }
    },
    noClick: true,
    accept: acceptedFileTypes ?? {},
  });

  const handleRemoveFile = (fileName: string) => {
    const updatedFiles = selectedFiles.filter((file) => file.name !== fileName);
    setSelectedFiles(updatedFiles);
    if (onAddFile) {
      onAddFile(updatedFiles);
    }
  };

  return (
    <div className="grid w-full gap-3">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div
        {...getRootProps({
          className: cn(
            "flex flex-col items-center justify-center border-2 border-dashed rounded-md text-center gap-2 p-6",
            isDragActive ? "border-primary bg-muted" : "border-slate-300",
          ),
        })}
      >
        <>
          <input id={id} {...getInputProps()} />
          <UploadCloudIcon className="h-10 w-10 text-muted-foreground" />
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground">
              Arraste e solte arquivos aqui
            </p>
            <p className="font-semibold text-muted-foreground">ou</p>
          </div>
          <Button size="sm" onClick={open} type="button">
            Procure
          </Button>
        </>
      </div>
      {selectedFiles.length > 0 && (
        <div className="mt-2 grid gap-2">
          {selectedFiles.map((file) => (
            <div key={file.name} className="flex items-center gap-2">
              <UploadImageIcon />
              <span className="text-sm text-muted-foreground">{file.name}</span>
              {/* Botão de remover arquivo */}
              <button
                type="button"
                onClick={() => handleRemoveFile(file.name)}
                className="ml-2 text-muted-foreground"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
      {notification && <Notification {...notification} />}
    </div>
  );
};

export default DragAndDrop;

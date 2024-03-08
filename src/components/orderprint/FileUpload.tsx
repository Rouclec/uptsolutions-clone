import { Viewer, Worker } from "@react-pdf-viewer/core";

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";

export default function FileUpload({ url }: any) {
  return (
    <div>
      <div>
        {url ? (
          <div>
            <div className="">
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <Viewer fileUrl={url} />
              </Worker>
            </div>
          </div>
        ) : (
          <div>Preview Area Here</div>
        )}
      </div>
    </div>
  );
}

import { Viewer, Worker } from '@react-pdf-viewer/core';

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";

export default function FileUpload({ url }: any) {
  return (
    <div>
      <div>
        {url ? (
          <div>
              <div className=''>
                <Viewer fileUrl={url} />
              </div>
          </div>
        ) : (
          <div>Preview Area Here</div>
        )}
      </div>
    </div>
  );
}

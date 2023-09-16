import React, { useRef, useState } from "react";

export default function FileUpload({ url }: any) {
  return (
    <div>
      <div>
        {url ? (
          <div>
            <object
              data={url}
              type="application/pdf"
              width="100%"
              height="500px"
            >
              <p>
                Unable to display PDF file. <a href={url}>Download</a> instead.
              </p>
            </object>
          </div>
        ) : (
          <div>Preview Area Here</div>
        )}
      </div>
    </div>
  );
}

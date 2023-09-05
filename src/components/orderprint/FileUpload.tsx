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
                Unable to display PDF file.{" "}
                <a href="/uploads/media/default/0001/01/540cb75550adf33f281f29132dddd14fded85bfc.pdf">
                  Download
                </a>{" "}
                instead.
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

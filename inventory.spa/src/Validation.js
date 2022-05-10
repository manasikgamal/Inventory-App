import React from 'react'

export default function Validation() {
  return (
    <div>
        {({ imageList, onImageUpload, onImageRemoveAll, errors }) => (
    errors && <div>
      {errors.maxNumber && <span>Number of selected images exceed maxNumber</span>}
      {errors.acceptType && <span>Your selected file type is not allow</span>}
      {errors.maxFileSize && <span>Selected file size exceed maxFileSize</span>}
      {errors.resolution && <span>Selected file is not match your desired resolution</span>}
    </div>
  )}
    </div>
  )
}

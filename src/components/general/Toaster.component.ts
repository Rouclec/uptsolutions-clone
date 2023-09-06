import { toast, TypeOptions } from "react-toastify";

export const toaster = (text: string, type: TypeOptions) =>
  toast(text, {
    position: toast.POSITION.TOP_RIGHT,
    type: type,
  });

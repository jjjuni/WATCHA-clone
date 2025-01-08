import { useEffect } from "react"

const useTitle = (title, flag = true) => {
  useEffect(() => {
    if (title !== undefined && flag) {
      document.title = title;
    }
  }, [title, flag])
}

export default useTitle;
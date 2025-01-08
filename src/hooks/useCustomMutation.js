import { useMutation } from "@tanstack/react-query"
import { axiosLOGInstance } from "../apis/axios-instance";

const useCustionMutation = () => {
  const { mutateAsync } = useMutation({
    mutationFn: async ({url, data}) => {
      const response = await axiosLOGInstance.post(url, data)
      return response
    },
    onSuccess: (response) => {
      if(response.data.accessToken){
        localStorage.setItem("accessToken", response.data.accessToken)
        localStorage.setItem("refreshToken", response.data.refreshToken)
      }
    }
  })
  return mutateAsync;
}

export default useCustionMutation;
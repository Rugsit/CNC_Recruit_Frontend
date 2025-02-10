import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {"Content-Type": "application/json", 
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJ1Z3NpdC5uZXN0QGdtYWlsLmNvbSIsImV4cCI6MTczOTE5NTM0MCwiaWQiOiIwMTk0ZWZjYi1kOWI4LTdhZDUtOWNlMi00NWY5ZTMyYTdmMGYiLCJuYW1lIjoiUnVnc2l0IFJ1bmdyYXR0YW5hY2hhaSIsInJvbGUiOiJhZG1pbiJ9.dW403AXofsCO4dqPRX1dGT6zs8_mIRyJvTFLh0O_XCI",
    "Accept": "application/json"
  },
})

export default apiClient;
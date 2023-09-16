import { toast } from "react-hot-toast";

type Route = 'login' | 'register'

export function notification(route: Route) {
  notifySuccess(route);
  setTimeout(() => {
    notifyRedirect();
  }, 1000)
}

function notifySuccess(route: Route) {
  toast.success(
    `${route === 'login' ?
      'Accessing to your account' :
      'Your Accout was created successfully!'}`,
    { duration: 1000 }
  );
}

function notifyRedirect() {
  toast.loading(
    'Redirecting...',
    { duration: 1000 }
  )
}

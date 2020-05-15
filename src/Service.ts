import rp from "request-promise";

export const Auth = {
  clear(cb) {
    localStorage.clear();
    cb();
  },
  isAuthenticated: () => !!Auth.getJeton(),

  getJeton: () => localStorage.getItem("token"),

  login({ token, cb }) {
    localStorage.setItem("token", token);
    cb();
  },
  logout(cb) {
    localStorage.clear();
    cb();
  },
};

export const checKMail = ({ message, mail, url }): Promise<any> => {
  return rp({
    method: "POST",
    message: message,
    uri: `${process.env.REACT_APP_BASE_URL_API}/email/account-verification`,
    json: {
      mail,
      message,
      url,
    },
  });
};

export const ContactClienBytMail = ({
  message,
  mail,
  subject,
  url,
  name,
}): Promise<any> => {
  return rp({
    method: "POST",
    message: message,
    uri: `${process.env.REACT_APP_BASE_URL_API}/email/contact-customer`,
    json: {
      mail,
      message,
      subject,
      url,
      name,
    },
  });
};

export const deleteFile = ({ uid }): Promise<any> => {
  return rp({
    method: "DELETE",
    uri: `${process.env.REACT_APP_BASE_URL_API}/upload/photos/delete`,
    json: {
      uid,
    },
  });
};
